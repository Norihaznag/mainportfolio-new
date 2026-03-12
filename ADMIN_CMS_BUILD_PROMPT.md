# Admin Dashboard & CMS System - Build Prompt (Vite + React)

## Executive Prompt for AI Assistant

You are an expert Vite + React full-stack developer building a fast, simple, and lightweight Admin Dashboard and CMS system for Azinag (a Moroccan web development agency). The system should allow admins to manage all website content, orders, pricing, and business operations from a centralized dashboard with blazing-fast performance.

### **Project Context**

- **Existing Stack:** Vite + React 18, TypeScript, Tailwind CSS, Supabase, React Router
- **Current State:** Public website with 3 languages (EN, FR, AR - Moroccan Darija)
- **Goal:** Build ultra-fast, lightweight admin panel to manage all content via CMS
- **Performance Target:** < 1s initial load, < 200ms route transitions

---

## 🏗️ Admin System Architecture (Vite-Based)

### **Why Vite?**
- ⚡ **Instant server start** - Development server starts in milliseconds
- 🚀 **Lightning-fast HMR** - Hot Module Replacement (< 100ms)
- 📦 **Minimal bundle** - Vite produces smaller production bundles
- 🎯 **Simple & focused** - No opinionated framework complexity
- 💨 **Native ES modules** - Leverages modern browser capabilities
- 🔧 **Zero config needed** - Works out of the box

### **Architecture Overview**
```
Vite + React 18
├── React Router (client-side navigation)
├── TypeScript (type safety)
├── Tailwind CSS (styling)
├── Supabase (backend database)
├── TanStack Query (data fetching)
└── Vite plugins for optimization
```

### **Folder Structure**
```
admin/
├── src/
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Orders.tsx
│   │   ├── Content.tsx
│   │   ├── Pricing.tsx
│   │   ├── Projects.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Team.tsx
│   │   └── Settings.tsx
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── FormEditor.tsx
│   │   ├── DataTable.tsx
│   │   └── common/
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useOrders.ts
│   │   └── useContent.ts
│   ├── services/
│   │   ├── supabase.ts
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── auth.ts
│   │   └── validators.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

### **Core Admin Features Required**

#### **1. Authentication & Security**
- Admin login system with email/password
- JWT-based authentication with refresh tokens
- Role-based access control (Admin, Editor, Viewer)
- Session management (auto-logout after 30 mins inactivity)
- Password reset functionality
- Login attempt throttling (max 5 attempts)
- Audit logs for all admin actions

#### **2. Dashboard Overview**
- Key metrics cards:
  - Total orders received (month/year)
  - Revenue summary
  - Total clients
  - Website visitors (optional - can integrate Google Analytics)
  - Pending orders/inquiries
- Charts/graphs for trends
- Quick action buttons
- Recent activity feed

#### **3. Content Management (CMS)**
Manage all website content by language:

**Pages to Manage:**
- Homepage content
- Pricing page (prices, descriptions, features)
- Portfolio/Showcase projects
- How It Works process steps
- About page (mission, vision, team, values)
- Contact/Order page descriptions
- Navigation links

**Management Features:**
- Live editor with preview
- Multi-language support (EN, FR, AR)
- Markdown or rich text editor
- SEO meta tags editor (title, description, keywords)
- Image upload and optimization
- Publish/draft states
- Version history / rollback capability
- Schedule content for future publish

#### **4. Orders & Inquiries Management**
- View all orders with filters:
  - Status (new, contacted, in-progress, completed, cancelled)
  - Date range
  - Language
  - Order type (company website, restaurant, e-commerce, custom)
- Order details view:
  - Client info (name, email, phone)
  - Project description
  - Requested services
  - Budget
  - Delivery deadline
  - Notes field
- Bulk actions (mark as done, assign to team, export)
- Email notifications to client
- Assign to team member
- Order status workflow

#### **5. Pricing Management**
- Edit all 4 pricing packages:
  - Package name (with language translations)
  - Price (with currency)
  - Delivery days
  - Features list (add/edit/remove features)
  - Description
  - Is highlighted/popular badge
- Add new packages
- Manage discounts/promotional pricing
- View pricing history

#### **6. Testimonials & Projects**
- Add/edit/delete portfolio projects:
  - Project name
  - Description
  - Category
  - Images/gallery
  - Technologies used
  - Client name
  - Results/metrics
- Add client testimonials:
  - Client name
  - Company
  - Quote/message
  - Rating (1-5 stars)
  - Position/role
  - Photo
- Manage display order
- Feature/pin projects

#### **7. Team Management**
- Admin user accounts
- Assign roles (Admin, Editor, Viewer)
- Manage permissions
- Team member activity logs
- Deactivate/remove users

#### **8. Settings & Configuration**
- General settings:
  - Site name, tagline
  - Contact email, phone
  - Business address
  - Social media links
  - Business hours
  - Service areas
- Email configuration:
  - SMTP settings
  - Email templates (new order, welcome, confirmation)
  - Notification recipients
- SEO settings:
  - Google verification codes
  - Google Analytics tracking
  - Sitemap configuration
- Backup & export data

#### **9. Analytics & Reporting**
- Page visit statistics
- Order funnel analysis
- Conversion rates
- Traffic sources
- Device breakdown (mobile/desktop/tablet)
- Export reports (PDF, CSV)
- Custom date ranges

#### **10. Multi-language Support**
- All content editable in 3 languages: EN, FR, AR
- Language tabs in forms
- Right-to-left (RTL) support for Arabic
- Translated UI for admin panel itself

---

## 📁 Database Schema (Supabase)

### **Tables to Create**

```sql
-- Admin Users
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  role ENUM('admin', 'editor', 'viewer') DEFAULT 'editor',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Page Content (CMS)
CREATE TABLE page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name VARCHAR NOT NULL, -- 'home', 'pricing', 'about', etc.
  language VARCHAR(2) NOT NULL, -- 'en', 'fr', 'ar'
  section_key VARCHAR NOT NULL, -- 'hero_title', 'features', etc.
  content TEXT NOT NULL,
  meta_title VARCHAR,
  meta_description VARCHAR,
  meta_keywords VARCHAR,
  published BOOLEAN DEFAULT false,
  published_by UUID REFERENCES admin_users(id),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(page_name, language, section_key)
);

-- Orders/Inquiries
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name VARCHAR NOT NULL,
  client_email VARCHAR NOT NULL,
  client_phone VARCHAR NOT NULL,
  company_name VARCHAR,
  project_description TEXT,
  service_type VARCHAR, -- 'company_website', 'restaurant', 'ecommerce', 'custom'
  budget VARCHAR,
  status VARCHAR DEFAULT 'new', -- 'new', 'contacted', 'in_progress', 'completed', 'cancelled'
  language VARCHAR(2), -- 'en', 'fr', 'ar'
  internal_notes TEXT,
  assigned_to UUID REFERENCES admin_users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  contacted_at TIMESTAMP,
  completed_at TIMESTAMP
);

-- Pricing Packages
CREATE TABLE pricing_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en VARCHAR NOT NULL,
  name_fr VARCHAR NOT NULL,
  name_ar VARCHAR NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR DEFAULT 'DRH',
  delivery_days INTEGER NOT NULL,
  description_en TEXT,
  description_fr TEXT,
  description_ar TEXT,
  is_highlighted BOOLEAN DEFAULT false,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Pricing Features
CREATE TABLE pricing_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID REFERENCES pricing_packages(id) ON DELETE CASCADE,
  feature_en VARCHAR NOT NULL,
  feature_fr VARCHAR NOT NULL,
  feature_ar VARCHAR NOT NULL,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Portfolio Projects
CREATE TABLE portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en VARCHAR NOT NULL,
  name_fr VARCHAR NOT NULL,
  name_ar VARCHAR NOT NULL,
  description_en TEXT,
  description_fr TEXT,
  description_ar TEXT,
  category VARCHAR,
  images_urls TEXT[], -- Array of image URLs
  technologies VARCHAR[],
  client_name VARCHAR,
  results_en TEXT,
  results_fr TEXT,
  results_ar TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name VARCHAR NOT NULL,
  company_name VARCHAR,
  position VARCHAR,
  message_en TEXT NOT NULL,
  message_fr TEXT NOT NULL,
  message_ar TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url VARCHAR,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Settings
CREATE TABLE admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type VARCHAR, -- 'string', 'number', 'boolean', 'json'
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Activity Logs
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES admin_users(id),
  action VARCHAR NOT NULL, -- 'create', 'update', 'delete'
  entity_type VARCHAR NOT NULL, -- 'order', 'content', 'pricing', etc.
  entity_id VARCHAR,
  details TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎨 UI/UX Requirements

### **Admin Dashboard Layout**
```
┌─────────────────────────────────────────────┐
│  Logo          Admin Dashboard    Logout    │
├─────────────────────────────────────────────┤
│                                             │
│  [Sidebar]        [Main Content Area]       │
│  - Dashboard                                │
│  - Orders                                   │
│  - Content (CMS)                            │
│  - Pricing                                  │
│  - Projects                                 │
│  - Testimonials                             │
│  - Team                                     │
│  - Settings                                 │
│  - Logs                                     │
│                                             │
└─────────────────────────────────────────────┘
```

### **Design Guidelines**
- Consistent with main website (blue #2563eb theme)
- Dark mode option for eye comfort
- Responsive (works on mobile, tablet, desktop)
- Accessibility (WCAG AA compliant)
- Fast loading (< 2s per page)
- Real-time updates using Supabase subscriptions
- Toast notifications for actions
- Confirmation dialogs for destructive actions
- Data tables with sorting, filtering, pagination
- Form validation with clear error messages

---

## 🔧 Technical Requirements (Vite Stack)

### **Frontend Setup**
Create a new Vite React project:
```bash
npm create vite@latest admin -- --template react-ts
cd admin
npm install
```

### **Routing (React Router v6)**
Use client-side routing instead of server-side:
```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          {/* ... more routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### **Backend API (Supabase)**
Use Supabase as the backend instead of API routes:
```typescript
// src/services/supabase.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Usage in components
const loginAdmin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};
```

### **Data Fetching (TanStack Query)**
Use TanStack Query (React Query) for efficient data management:
```typescript
// src/hooks/useOrders.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '../services/supabase';

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (order) => {
      const { data, error } = await supabase
        .from('orders')
        .update(order)
        .eq('id', order.id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
```

### **Frontend Components**
Keep components simple and focused:
```typescript
// src/components/OrdersList.tsx
import { useOrders } from '../hooks/useOrders';
import DataTable from './DataTable';

export default function OrdersList() {
  const { data: orders, isLoading } = useOrders();

  if (isLoading) return <div>Loading...</div>;

  return (
    <DataTable
      columns={[
        { key: 'client_name', label: 'Client Name' },
        { key: 'status', label: 'Status' },
        { key: 'created_at', label: 'Date' },
      ]}
      data={orders || []}
    />
  );
}
```

### **Authentication Context**
Minimal auth solution with Supabase:
```typescript
// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  return { user, isLoading };
}
```

### **Protected Routes**
Simple route protection:
```typescript
// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Layout from './Layout';

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
```

### **Performance**
- Code splitting via React.lazy() for each page
- Image optimization (client-side compression with canvas)
- Vite's automatic chunk splitting
- Lazy loading for routes
- Caching strategy with TanStack Query
- Optimized bundle analysis with `vite-plugin-visualizer`

---

## ⚡ Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'vite-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Code splitting strategy
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
          ],
          'supabase': [
            '@supabase/supabase-js',
          ],
          'query': [
            '@tanstack/react-query',
          ],
        },
      },
    },
    // Optimize build
    minify: 'terser',
    target: 'esnext',
    sourcemap: false,
  },
  server: {
    port: 5173,
    // Proxy API calls to Supabase
    proxy: {
      '/api': {
        target: import.meta.env.VITE_SUPABASE_URL,
        changeOrigin: true,
      },
    },
  },
});
```

## 🚀 Admin Panel URL Structure (Client-Side Routing)

```
http://localhost:5173/login                    # Login page
http://localhost:5173/dashboard                # Main dashboard
http://localhost:5173/orders                   # Orders list
http://localhost:5173/orders/:id              # Order details
http://localhost:5173/content/:page           # Edit page content
http://localhost:5173/pricing                  # Manage pricing
http://localhost:5173/projects                 # Portfolio management
http://localhost:5173/testimonials             # Testimonials
http://localhost:5173/team                     # Team management
http://localhost:5173/settings                 # Settings
```

---

## 📋 Implementation Checklist

### **Phase 1: Project Setup (Day 1)**
- [ ] Create Vite + React project
- [ ] Install dependencies
- [ ] Set up TypeScript configuration
- [ ] Configure Tailwind CSS
- [ ] Set up Supabase client
- [ ] Create folder structure
- [ ] Configure environment variables

### **Phase 2: Authentication (Day 2-3)**
- [ ] Login page with form validation
- [ ] Supabase Auth integration
- [ ] Protected route wrapper
- [ ] useAuth hook
- [ ] Session persistence
- [ ] Logout functionality
- [ ] Password reset flow (optional)

### **Phase 3: Dashboard & Layout (Day 4-5)**
- [ ] Root App.tsx with React Router
- [ ] Layout component (sidebar + header)
- [ ] Sidebar navigation
- [ ] Dashboard page
- [ ] Key metrics cards
- [ ] Simple stats display
- [ ] Recent activity feed

### **Phase 4: Orders Management (Day 6-8)**
- [ ] Orders list page
- [ ] useOrders hook
- [ ] Simple table component
- [ ] Order details page
- [ ] Status update functionality
- [ ] Filter/search
- [ ] Bulk actions

### **Phase 5: Content Management (Day 9-11)**
- [ ] Content page structure
- [ ] Language tabs (EN, FR, AR)
- [ ] Text editor with preview
- [ ] Meta tags editor
- [ ] Publish/draft toggle
- [ ] useContent hook
- [ ] Content save functionality

### **Phase 6: Pricing Management (Day 12)**
- [ ] Pricing packages page
- [ ] Package CRUD
- [ ] Features editor
- [ ] Price update
- [ ] usePricing hook

### **Phase 7: Projects & Testimonials (Day 13-14)**
- [ ] Projects page
- [ ] Project CRUD
- [ ] Image upload
- [ ] Testimonials page
- [ ] Testimonial CRUD

### **Phase 8: Team & Settings (Day 15)**
- [ ] Team members page
- [ ] Settings page
- [ ] Basic admin config
- [ ] Activity logs (optional)

### **Phase 9: Optimization & Testing (Day 16-17)**
- [ ] Bundle analysis
- [ ] Code splitting verification
- [ ] Performance testing
- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] Build production bundle

### **Phase 10: Deployment (Day 18)**
- [ ] Deploy to hosting (Vercel, Netlify, etc.)
- [ ] Configure environment variables
- [ ] Test all features
- [ ] Set up domain

## 🔐 Security Checklist

- [ ] Authenticate with Supabase Auth (not custom JWT)
- [ ] All routes protected except /login
- [ ] Row-Level Security (RLS) on Supabase tables
- [ ] Validate all form inputs with Zod
- [ ] XSS protection (React handles by default)
- [ ] Environment variables for secrets
- [ ] HTTPS only in production
- [ ] Secure password storage (Supabase Auth handles)
- [ ] Activity logging for all changes
- [ ] Rate limiting on Supabase side

## ⚡ Performance Optimization Tips

### **Bundle Size**
- Use `vite-plugin-visualizer` to analyze bundle
- Target: < 150KB gzipped for admin dashboard
- Code splitting per page with React.lazy()

### **Runtime Performance**
- Use TanStack Query for efficient data fetching
- Implement pagination for large lists (50 items per page)
- Use memo() for expensive components
- Debounce search/filter inputs

### **Development**
- Vite dev server < 1s start time
- HMR < 100ms for instant feedback
- TypeScript strict mode for early error detection

## 📊 Example: Simple Dashboard Page

```typescript
// src/pages/Dashboard.tsx
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  // Fetch dashboard stats
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [orders, revenue, clients] = await Promise.all([
        supabase.from('orders').select('count(*)', { count: 'exact' }),
        supabase.rpc('get_monthly_revenue'), // Custom RPC function
        supabase.from('orders').select('client_email', { count: 'exact' }),
      ]);
      return { orders: orders.count, revenue: revenue.data, clients: clients.count };
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard title="Total Orders" value={stats?.orders || 0} />
        <StatCard title="Revenue" value={`${stats?.revenue || 0} DRH`} />
        <StatCard title="Clients" value={stats?.clients || 0} />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Monthly Orders</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats?.monthly || []}>
            <CartesianGrid />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
```

## 📝 Example: Simple Content Editor

```typescript
// src/pages/Content.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '../services/supabase';

const schema = z.object({
  page_name: z.string().min(1),
  language: z.enum(['en', 'fr', 'ar']),
  section_key: z.string().min(1),
  content: z.string().min(1),
  meta_title: z.string(),
  meta_description: z.string(),
});

type ContentForm = z.infer<typeof schema>;

export default function Content() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [selectedLang, setSelectedLang] = useState('en');
  const { register, handleSubmit } = useForm<ContentForm>({
    resolver: zodResolver(schema),
  });

  const saveMutation = useMutation({
    mutationFn: async (data: ContentForm) => {
      const { error } = await supabase
        .from('page_content')
        .upsert(data, { onConflict: 'page_name,language,section_key' });
      if (error) throw error;
    },
  });

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Content Manager</h1>

      <form onSubmit={handleSubmit((data) => saveMutation.mutate(data))} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <select {...register('page_name')} className="border rounded px-3 py-2">
            <option value="home">Home</option>
            <option value="pricing">Pricing</option>
            <option value="about">About</option>
          </select>

          <select {...register('language')} className="border rounded px-3 py-2">
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        <input
          {...register('meta_title')}
          placeholder="Meta Title"
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          {...register('content')}
          placeholder="Content"
          rows={8}
          className="w-full border rounded px-3 py-2"
        />

        <button
          type="submit"
          disabled={saveMutation.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saveMutation.isPending ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
```

## 🎯 Why Vite is Perfect for This

| Feature | Vite | Next.js |
|---------|------|---------|
| **Dev Server Start** | < 100ms | 2-5s |
| **HMR Speed** | < 100ms | 500ms+ |
| **Bundle Size** | ~50KB base | ~100KB base |
| **Complexity** | Simple | Opinionated |
| **Learning Curve** | Shallow | Moderate |
| **Perfect For** | Admin dashboards | Full-stack apps |

## 🚀 Getting Started

```bash
# Create project
npm create vite@latest admin -- --template react-ts
cd admin

# Install dependencies
npm install

# Install additional packages
npm install react-router-dom @supabase/supabase-js @tanstack/react-query react-hook-form zod

# Create .env.local
echo "VITE_SUPABASE_URL=your_url" > .env.local
echo "VITE_SUPABASE_ANON_KEY=your_key" >> .env.local

# Start development
npm run dev

# Build for production
npm run build
```

## 📝 Notes for Development

- Keep it simple - avoid unnecessary abstractions
- Supabase handles authentication, no JWT needed
- Use Supabase RLS for row-level security
- TanStack Query handles caching automatically
- React Router v6 for client-side navigation
- Environment variables in .env.local (never commit)
- Test thoroughly before deploying

---

This prompt provides everything needed to build a **fast, simple, and lightweight** admin CMS system for Azinag using Vite + React. Perfect for performance-focused development!
