"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { getTranslation } from '@/lib/translations';

const technologies = [
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
];

const agencyValues = [
  { key: 'valueInnovation' },
  { key: 'valuePartnership' },
  { key: 'valueQuality' },
  { key: 'valueTrust' },
];

export default function AboutContent() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Agency Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {getTranslation('aboutUsTitle', language)}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {getTranslation('aboutUsIntro', language)}
        </p>
      </motion.div>

      {/* Agency Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-20"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {getTranslation('agencyValuesTitle', language)}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {agencyValues.map(({ key }) => (
            <div key={key} className="bg-muted/40 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">{getTranslation(key, language)}</h3>
              <p className="text-muted-foreground text-sm">{getTranslation(`${key}Desc`, language)}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Founder Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid lg:grid-cols-2 gap-16 items-center mb-20"
      >
        <div className="relative h-80 rounded-lg overflow-hidden">
          <Image
            src="https://avatars.githubusercontent.com/u/22285211?v=4"
            alt="Noureddine Azinag"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-2">{getTranslation('founderTitle', language)}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {getTranslation('founderBio', language)}
          </p>
        </div>
      </motion.div>

      {/* Trust Signals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-20 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          {getTranslation('trustSignalsTitle', language)}
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <div className="bg-muted/40 p-6 rounded-lg min-w-[180px]">
            <div className="text-3xl font-bold text-primary mb-2">5+</div>
            <div className="text-muted-foreground">{getTranslation('yearsInBusiness', language)}</div>
          </div>
          <div className="bg-muted/40 p-6 rounded-lg min-w-[180px]">
            <div className="text-3xl font-bold text-primary mb-2">3+</div>
            <div className="text-muted-foreground">{getTranslation('regionsServed', language)}</div>
          </div>
          <div className="bg-muted/40 p-6 rounded-lg min-w-[180px]">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">{getTranslation('clientSatisfaction', language)}</div>
          </div>
        </div>
        <div className="italic text-muted-foreground">
          {getTranslation('testimonialsPlaceholder', language)}
        </div>
      </motion.div>

      {/* Technologies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center"
      >
        <h3 className="text-2xl font-bold mb-4">{getTranslation('technologiesTitle', language)}</h3>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 mb-4 relative group-hover:scale-110 transition-transform">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-muted-foreground">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}