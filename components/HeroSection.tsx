import { Button } from './Button';

interface HeroSectionProps {
  lang: string;
  title: string;
  highlight: string;
  description: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryHref: string;
}

export function HeroSection({
  lang,
  title,
  highlight,
  description,
  ctaPrimaryText,
  ctaSecondaryText,
  ctaPrimaryHref,
  ctaSecondaryHref,
}: HeroSectionProps) {
  return (
    <section className="py-20 sm:py-32 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 leading-tight">
            {title}
            <br />
            <span className="text-blue-600">{highlight}</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={ctaPrimaryHref} size="lg">
              {ctaPrimaryText}
            </Button>
            <Button href={ctaSecondaryHref} variant="secondary" size="lg">
              {ctaSecondaryText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
