# Azinag Web Solutions – Portfolio Site

Welcome to the codebase for **Azinag Web Solutions**, a modern agency portfolio built with Next.js, Tailwind CSS, and Supabase. This site showcases our services, projects, and contact information, with dynamic project management powered by Supabase.

---

## Project Overview

This site is designed for a web agency, featuring:
- Dynamic project listing (managed via Supabase)
- Internationalization (i18n) for multilingual support
- Responsive, modern design with Tailwind CSS
- SEO-friendly structure
- No admin dashboard – projects are managed directly in Supabase

---

## Page-by-Page Breakdown

### Home (`/`)
- **Hero Section:** Agency name, tagline, and call-to-action.
- **Featured Projects:** Highlights select projects, loaded dynamically from Supabase.
- **Services:** Overview of agency offerings.
- **Contact CTA:** Quick link to the contact page.
- **Footer:** Agency info, navigation, and copyright.

### About (`/about`)
- **Agency Story:** Who we are, our mission, and values.
- **Team/Expertise:** (If present) Overview of skills and experience.
- **Branding:** Uses "we/us" language and agency branding throughout.

### Projects (`/projects`)
- **Projects Grid:** All projects are fetched from Supabase and displayed in a responsive grid.
- **Project Details:** Each card shows project name, description, tech stack, and links (e.g., GitHub, live demo).
- **Dynamic Loading:** Updates automatically as projects are added/edited in Supabase.

### Contact (`/contact`)
- **Contact Form:** Users can send inquiries (form may be static or connected to an email service).
- **Agency Contact Info:** Email, phone, or other contact methods.
- **Internationalization:** All text supports multiple languages.

---

## Dynamic Features

- **Supabase Integration:**
  - All project data is stored and managed in Supabase.
  - No admin dashboard in the app; use the Supabase dashboard for CRUD operations.
- **Internationalization (i18n):**
  - Language switcher and translation support for all major pages.
- **Responsive Design:**
  - Mobile-first, accessible, and visually appealing.

---

## Branding Notes

- All content, metadata, and UI elements use "Azinag Web Solutions" and agency-focused language ("we", "our team", etc.).
- SEO and social tags reflect the agency brand.
- Consistent color palette and logo (if provided).

---

## Managing Projects

All project management (add, edit, delete) is handled directly in the Supabase dashboard:
1. **Log in to your Supabase project.**
2. **Navigate to the `projects` table.**
3. **Add/Edit/Delete rows** as needed. Each row should include fields like `id`, `title`, `description`, `techStack`, `githubUrl`, `demoUrl`, and any images.
4. **Changes are reflected instantly** on the site – no redeploy needed.

For more details, see `SUPABASE_MANAGEMENT.md` (if present).

---

## File Structure Reference

- `app/` – Next.js app directory (pages, layouts, styles)
- `components/` – Reusable UI and page components
- `lib/` – Utility libraries (Supabase client, translations, etc.)
- `public/` – Static assets
- `hooks/` – Custom React hooks

---

## Getting Started

1. Clone the repo
2. Install dependencies: `npm install`
3. Set up your `.env` with Supabase credentials
4. Run locally: `npm run dev`

---

## License

MIT. See [LICENSE](LICENSE) for details.