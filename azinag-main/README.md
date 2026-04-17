# Azinag - High-Conversion SaaS for Moroccan Businesses

A production-ready SaaS website for selling productized web & app development services in Morocco.

## 🎯 Features

- **High-Conversion Homepage** - Clear value proposition with strong CTAs
- **Pricing Page** - 4 productized packages with MAD prices
- **Order Form** - Multi-step form with real-time price calculation
- **Admin Dashboard** - Manage orders and update status
- **WhatsApp Integration** - Direct communication button
- **Fully Responsive** - Mobile-first design
- **Arabic + French Ready** - RTL/LTR support
- **Production-Ready** - Security, validation, error handling built-in

## 🛠️ Tech Stack

- **Next.js 14+** - App Router, Server Components
- **TypeScript** - Full type safety
- **Tailwind CSS** - Responsive design
- **Supabase** - Auth, Database, Real-time
- **Server Actions** - Form handling
- **Zod** - Input validation
- **Vercel** - Deployment ready

## 📁 Project Structure

```
app/
├── layout.tsx                 # Root layout with header/footer
├── globals.css               # Global styles
├── page.tsx                  # Homepage
├── pricing/page.tsx          # Pricing page
├── order/page.tsx            # Order form
├── how-it-works/page.tsx     # How it works page
├── about/page.tsx            # About/trust page
└── admin/
    ├── login/page.tsx        # Admin login
    └── orders/page.tsx       # Admin dashboard

components/
├── Button.tsx                # CTA button
├── Input.tsx                 # Form input
├── Select.tsx                # Form select
├── Card.tsx                  # Card component
├── Header.tsx                # Navigation
├── Footer.tsx                # Footer
└── WhatsAppButton.tsx        # WhatsApp float button

lib/
├── supabase.ts              # Supabase client setup
├── database.types.ts        # TypeScript types
├── schemas.ts               # Zod validation schemas
└── actions.ts               # Server actions

schema.sql                    # Database schema (run in Supabase)
.env.example                  # Environment variables template
```

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <repo>
cd mainportfolio
npm install
```

### 2. Supabase Setup

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run the contents of `schema.sql`
4. Copy your project URL and keys

### 3. Environment Setup

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=+212661234567
```

### 4. Create Admin User

In Supabase:

1. Go to Authentication → Users
2. Create a new user with email & password
3. Go to SQL Editor and run:

```sql
update public.users set role = 'admin' where email = 'your-email@example.com';
```

### Mentor Pricing Feature (Gemma + Fallback)

The admin panel includes a Mentor workflow at `/adminos/mentor`.

What it does:
- Accepts uploaded `package.json` (or pasted JSON)
- Generates pricing recommendations for Morocco and GCC in USD
- Produces campaign guidance (30/60/90 plan, hooks, budget split, KPI targets, kill rules)
- Lets you apply a recommended tier directly into the Pricing admin form

Run locally with Ollama:

```bash
ollama pull gemma3:4b
ollama serve
```

Set these environment variables:

```env
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=gemma3:4b
OLLAMA_TIMEOUT_MS=14000
```

If Ollama is down or unreachable, Mentor still returns deterministic fallback estimates.

### Binary Uploads with Supabase Storage

Admin binary uploads (Windows/macOS/Linux installers) use Supabase Storage.

Set this environment variable:

```env
SUPABASE_FILES_BUCKET=files
```

Use a public bucket if you want direct download links for binaries.

### 5. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`
Admin: `http://localhost:3000/admin/login`

## 📱 Pages Overview

### Homepage (`/`)
- Hero with clear headline
- Social proof statistics
- 4-step how it works
- Services preview
- Final CTA

### Pricing (`/pricing`)
- 4 packages: Business Website, Restaurant, E-commerce, Custom App
- MAD prices included
- Feature lists
- FAQ section

### Order (`/order`)
- Multi-step form
- Business & contact info
- Website type selection
- Real-time price calculation
- Supabase integration
- Success confirmation

### How It Works (`/how-it-works`)
- 4 visual steps
- Timeline (14-30 days)
- What you get section
- Why us section

### About (`/about`)
- Founder story
- Mission & vision
- Company values
- Contact information

### Admin Orders (`/admin/orders`)
- Secure login
- View all orders
- Update order status
- Client details
- WhatsApp & email links

## 🔐 Security

- **Supabase Auth** - Secure user authentication
- **Row Level Security (RLS)** - Database-level permissions
- **Server Actions** - No API route exposure
- **Zod Validation** - Input validation on server
- **Environment Variables** - Secrets never in code
- **Admin Role Check** - Only admins can view orders

## ✅ Quality Checklist

- ✅ TypeScript strict mode
- ✅ No console errors
- ✅ No hydration issues
- ✅ Mobile-first responsive
- ✅ Lighthouse 95+ ready
- ✅ SEO metadata
- ✅ Error handling
- ✅ Arabic/French ready
- ✅ Vercel deployment ready
- ✅ Database with RLS

## 📊 Database Schema

### Orders Table
- `id` - UUID primary key
- `created_at` - Timestamp
- `business_name` - String
- `business_type` - Enum
- `contact_name` - String
- `whatsapp_number` - String
- `email` - String
- `website_type` - Enum
- `language` - Enum (ar, fr, en)
- `notes` - Text
- `status` - Enum (pending, in_progress, delivered)
- `price` - Numeric

### Users Table
- `id` - UUID (auth reference)
- `email` - String
- `role` - Enum (admin, user)
- `created_at` - Timestamp

## 🚀 Deployment to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel Settings
4. Deploy!

```bash
git push origin main
```

Vercel will automatically build and deploy.

## 💰 Monetization

Orders saved to Supabase include:
- Business details
- Contact information
- WhatsApp number
- Website requirements
- Budget/Price

Use this data to:
1. Follow up with clients
2. Track conversion rates
3. Analyze customer demographics
4. Optimize pricing

## 📝 Customization

### Change Prices
Edit `app/order/page.tsx` in the `prices` object:

```typescript
const prices: { [key: string]: number } = {
  website: 4999,      // Change here
  restaurant: 5999,
  ecommerce: 7999,
  app: 12999,
  custom: 10000,
};
```

### Change WhatsApp Number
Edit `.env.local`:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=+212YOUR_NUMBER
```

### Change Colors
Edit Tailwind classes in components (currently using blue-600 as primary).

### Add More Pages
Create new folders in `app/` directory and add `page.tsx`.

## 🐛 Troubleshooting

### "Supabase URL not found"
- Check `.env.local` has correct variables
- Restart dev server: `npm run dev`

### "Admin can't view orders"
- Check if user is marked as admin in database
- Run the SQL update command from setup

### Form not submitting
- Check browser console for errors
- Verify Supabase credentials
- Check RLS policies allow inserts

### WhatsApp link not working
- Verify `NEXT_PUBLIC_WHATSAPP_NUMBER` format: `+212...`
- Test link directly in browser

## 📚 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Zod Validation](https://zod.dev)

## 📄 License

Built for Azinag Web Solutions

## 🤝 Support

For issues or questions:
- Email: hello@azinag.site
- WhatsApp: +212661234567

---

**Ready to launch?** Your SaaS is production-ready. Deploy to Vercel and start selling! 🚀
