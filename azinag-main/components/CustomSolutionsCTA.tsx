'use client';

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '212609343953';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Bonjour, je suis intéressé par une solution sur mesure (Desktop · Mobile · Web · Backend). Pouvez-vous me contacter ?'
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_MESSAGE}`;

interface CustomSolutionsCTAProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function CustomSolutionsCTA({ className = '', variant = 'default' }: CustomSolutionsCTAProps) {
  if (variant === 'compact') {
    return (
      <div className={`border border-border-subtle rounded-2xl bg-surface p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}>
        <div>
          <p className="font-semibold text-ink mb-0.5">Besoin d'une solution sur mesure ?</p>
          <p className="text-sm text-ink-muted">Desktop · Mobile · Web · Backend</p>
        </div>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="custom-solutions-cta-compact"
          className="shrink-0 inline-flex items-center gap-2 bg-accent text-white font-semibold rounded-lg px-5 py-2.5 text-sm hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Discuter de votre projet
        </a>
      </div>
    );
  }

  return (
    <section className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink via-ink to-slate-800 px-8 py-12 text-white ${className}`} aria-label="Solutions sur mesure">
      {/* Decorative orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
      />

      <div className="relative max-w-2xl">
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3">Solutions Enterprise</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Besoin d'une solution sur mesure ?
        </h2>
        <p className="text-white/70 mb-2 text-[1.0625rem] leading-relaxed">
          Chaque entreprise est unique. Nous concevons et développons des applications adaptées à vos processus — pas l'inverse.
        </p>

        {/* Platform pills */}
        <div className="flex flex-wrap gap-2 mb-8 mt-5">
          {['🖥️ Desktop', '📱 Mobile', '🌐 Web', '⚙️ Backend'].map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-1 text-sm font-medium bg-white/10 border border-white/20 text-white rounded-full px-3 py-1"
            >
              {p}
            </span>
          ))}
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="custom-solutions-cta-main"
          className="inline-flex items-center gap-2.5 bg-white text-ink font-semibold rounded-lg px-6 py-3.5 text-[0.9375rem] hover:bg-surface transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366" width="20" height="20" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Discuter de votre projet →
        </a>
      </div>
    </section>
  );
}
