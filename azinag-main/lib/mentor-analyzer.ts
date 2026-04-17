import type { ComplexityTier, PackageSignalSummary } from '@/lib/mentor-types';

type UnknownRecord = Record<string, unknown>;

export interface SanitizedPackageJson {
  name: string;
  version: string;
  dependencies: string[];
  devDependencies: string[];
  scripts: string[];
}

const FRAMEWORK_MATCHERS: Array<{ label: string; matchers: string[] }> = [
  { label: 'Next.js', matchers: ['next'] },
  { label: 'React', matchers: ['react'] },
  { label: 'Vue', matchers: ['vue'] },
  { label: 'Nuxt', matchers: ['nuxt'] },
  { label: 'Angular', matchers: ['@angular/core'] },
  { label: 'Svelte', matchers: ['svelte', '@sveltejs/kit'] },
  { label: 'React Native', matchers: ['react-native', 'expo'] },
  { label: 'NestJS', matchers: ['@nestjs/core'] },
  { label: 'Express', matchers: ['express'] },
];

const CAPABILITY_MATCHERS: Array<{ label: string; matchers: string[] }> = [
  { label: 'Web app', matchers: ['next', 'react', 'vue', 'nuxt', 'svelte'] },
  { label: 'API backend', matchers: ['express', 'fastify', '@nestjs/core', 'koa'] },
  { label: 'Database integration', matchers: ['prisma', 'typeorm', 'mongoose', 'pg', 'mysql2'] },
  { label: 'Mobile app', matchers: ['react-native', 'expo'] },
  { label: 'Desktop app', matchers: ['electron', '@tauri-apps/api'] },
  { label: 'Payments', matchers: ['stripe', 'paypal', 'mollie'] },
  { label: 'Auth', matchers: ['next-auth', '@supabase/supabase-js', 'auth0'] },
];

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function sanitizeToken(value: string): string {
  return value.trim().slice(0, 120).replace(/[^a-zA-Z0-9@._/-]/g, '');
}

function normalizePackageName(value: unknown): string {
  if (typeof value !== 'string') return 'untitled-package';
  const normalized = sanitizeToken(value);
  return normalized.length > 0 ? normalized : 'untitled-package';
}

function normalizeVersion(value: unknown): string {
  if (typeof value !== 'string') return '0.0.0';
  const normalized = value.trim().slice(0, 40);
  return normalized.length > 0 ? normalized : '0.0.0';
}

function normalizeObjectKeys(value: unknown, maxItems: number): string[] {
  if (!isRecord(value)) return [];

  return Object.keys(value)
    .slice(0, maxItems)
    .map((key) => sanitizeToken(key))
    .filter((key, index, array) => key.length > 0 && array.indexOf(key) === index);
}

function detectFrameworks(dependencies: string[]): string[] {
  const lowerDeps = dependencies.map((dep) => dep.toLowerCase());

  return FRAMEWORK_MATCHERS.filter((item) =>
    item.matchers.some((matcher) => lowerDeps.some((dep) => dep === matcher || dep.startsWith(`${matcher}/`)))
  ).map((item) => item.label);
}

function detectCapabilities(dependencies: string[], scripts: string[]): string[] {
  const lowerDeps = dependencies.map((dep) => dep.toLowerCase());
  const lowerScripts = scripts.map((script) => script.toLowerCase());

  const capabilities = CAPABILITY_MATCHERS.filter((item) =>
    item.matchers.some((matcher) => lowerDeps.some((dep) => dep === matcher || dep.startsWith(`${matcher}/`)))
  ).map((item) => item.label);

  if (lowerScripts.some((script) => script.includes('docker') || script.includes('deploy'))) {
    capabilities.push('Deployment automation');
  }
  if (lowerScripts.some((script) => script.includes('test'))) {
    capabilities.push('Automated testing');
  }

  return capabilities.filter((value, index, array) => array.indexOf(value) === index);
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function getComplexityTier(score: number): ComplexityTier {
  if (score < 35) return 'simple';
  if (score < 55) return 'standard';
  if (score < 75) return 'advanced';
  return 'enterprise';
}

function buildNotes(
  dependencyCount: number,
  devDependencyCount: number,
  scriptCount: number,
  frameworks: string[],
  capabilities: string[]
): string[] {
  const notes: string[] = [];

  if (frameworks.length === 0) {
    notes.push('No mainstream framework detected, estimate may need manual review.');
  }
  if (dependencyCount > 70) {
    notes.push('Large dependency surface detected, raise QA and maintenance margin.');
  }
  if (devDependencyCount > dependencyCount) {
    notes.push('Tooling-heavy project, plan onboarding and CI stabilization budget.');
  }
  if (scriptCount < 3) {
    notes.push('Minimal scripts found, include implementation/discovery buffer.');
  }
  if (!capabilities.includes('Automated testing')) {
    notes.push('No clear testing workflow detected, include risk buffer in pricing.');
  }

  return notes;
}

export function sanitizePackageJsonObject(value: unknown): SanitizedPackageJson | null {
  if (!isRecord(value)) return null;

  return {
    name: normalizePackageName(value.name),
    version: normalizeVersion(value.version),
    dependencies: normalizeObjectKeys(value.dependencies, 160),
    devDependencies: normalizeObjectKeys(value.devDependencies, 180),
    scripts: normalizeObjectKeys(value.scripts, 40),
  };
}

export function analyzePackageJson(pkg: SanitizedPackageJson): PackageSignalSummary {
  const frameworks = detectFrameworks(pkg.dependencies);
  const capabilities = detectCapabilities(pkg.dependencies, pkg.scripts);

  let rawScore = 18;
  rawScore += pkg.dependencies.length * 0.62;
  rawScore += pkg.devDependencies.length * 0.34;
  rawScore += pkg.scripts.length * 1.15;
  rawScore += frameworks.length * 4.2;
  rawScore += capabilities.length * 2.8;

  if (pkg.dependencies.some((dep) => dep.includes('typescript'))) rawScore += 4;
  if (pkg.dependencies.some((dep) => dep.includes('prisma') || dep.includes('typeorm'))) rawScore += 6;
  if (pkg.dependencies.some((dep) => dep.includes('stripe') || dep.includes('paypal'))) rawScore += 4;
  if (pkg.dependencies.length > 90) rawScore += 8;

  const complexityScore = Math.round(clampNumber(rawScore, 10, 100));

  return {
    packageName: pkg.name,
    version: pkg.version,
    dependencyCount: pkg.dependencies.length,
    devDependencyCount: pkg.devDependencies.length,
    scriptCount: pkg.scripts.length,
    detectedFrameworks: frameworks,
    detectedCapabilities: capabilities,
    complexityScore,
    complexityTier: getComplexityTier(complexityScore),
    notes: buildNotes(
      pkg.dependencies.length,
      pkg.devDependencies.length,
      pkg.scripts.length,
      frameworks,
      capabilities
    ),
  };
}
