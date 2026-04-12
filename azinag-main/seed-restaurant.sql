-- ─────────────────────────────────────────────────────────────────────────────
-- Azinag — Restaurant funnel seed
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- Safe to re-run: uses DELETE + INSERT, no duplicate risk
-- ─────────────────────────────────────────────────────────────────────────────


-- ── 1. Pricing packages ──────────────────────────────────────────────────────
-- Clear existing packages first (removes old software packages)
DELETE FROM public.pricing;

INSERT INTO public.pricing (name, price, description, features, is_featured, sort_order, active)
VALUES
  (
    'Présence',
    1200,
    'Pour les cafés, snacks et restaurants qui n''ont pas encore de site ou qui veulent être trouvés sur Google Maps.',
    ARRAY[
      'Site une page complet',
      'Menu et infos pratiques',
      'Bouton WhatsApp direct',
      'Fiche Google Maps créée et optimisée',
      'Nom de domaine .ma ou .com inclus (1 an)',
      'Livraison en 7 jours'
    ],
    false,
    1,
    true
  ),
  (
    'Vitrine',
    2800,
    'Pour les restaurants actifs qui veulent impressionner, montrer leurs plats et recevoir des contacts directs.',
    ARRAY[
      'Site multi-pages (Accueil, Menu, Galerie, Contact)',
      'Galerie photos optimisée jusqu''à 20 photos',
      'Formulaire de contact + bouton WhatsApp',
      'Google Maps intégré',
      'Hébergement inclus 1 an',
      '1 révision incluse',
      'Livraison en 10–14 jours'
    ],
    true,
    2,
    true
  ),
  (
    'Réservation+',
    4900,
    'Pour les restaurants établis qui veulent un système de réservation en ligne et un menu dynamique.',
    ARRAY[
      'Tout le pack Vitrine',
      'Système de réservation en ligne',
      'Menu dynamique modifiable sans développeur',
      'Bouton commande WhatsApp par plat',
      'Google Analytics configuré',
      '2 révisions incluses',
      'Livraison en 3 semaines'
    ],
    false,
    3,
    true
  );


-- ── 2. Site settings — booking URL and contact email ─────────────────────────
-- Insert or update booking_url
-- Replace the Calendly URL below with your actual booking link
INSERT INTO public.site_settings (key, value)
VALUES ('booking_url', 'https://calendly.com/azinag/appel-gratuit')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();

-- Insert or update contact_email
INSERT INTO public.site_settings (key, value)
VALUES ('contact_email', 'admin@azinag.site')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();


-- ── 3. Verify ────────────────────────────────────────────────────────────────
SELECT name, price, is_featured, sort_order FROM public.pricing ORDER BY sort_order;
SELECT key, value FROM public.site_settings WHERE key IN ('booking_url', 'contact_email');
