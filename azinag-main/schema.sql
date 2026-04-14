-- Azinag SaaS Database Schema

-- Enable extensions
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text default 'user' check (role in ('admin', 'user')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders table
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  business_name text not null,
  business_type text not null,
  contact_name text not null,
  whatsapp_number text not null,
  email text not null,
  website_type text not null,
  language text default 'ar' check (language in ('ar', 'fr', 'en')),
  notes text,
  status text default 'pending' check (status in ('pending', 'in_progress', 'delivered')),
  price numeric not null
);

-- Pricing table
create table if not exists public.pricing (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  price numeric not null,
  description text,
  features text[] default '{}',
  color text default 'blue',
  sort_order integer default 0,
  active boolean default true,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add is_featured if upgrading existing schema
alter table public.pricing add column if not exists is_featured boolean default false;

-- Content table
create table if not exists public.content (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  type text default 'blog',
  content text,
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Site settings table
create table if not exists public.site_settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.orders enable row level security;
alter table public.users enable row level security;
alter table public.pricing enable row level security;
alter table public.content enable row level security;
alter table public.site_settings enable row level security;

-- Policies for orders (admin only)
drop policy if exists "Allow admins to read orders" on public.orders;
create policy "Allow admins to read orders" on public.orders
  for select
  using (
    exists (
      select 1 from public.users
      where users.id = auth.uid() and users.role = 'admin'
    )
  );

drop policy if exists "Allow admins to update orders" on public.orders;
create policy "Allow admins to update orders" on public.orders
  for update
  using (
    exists (
      select 1 from public.users
      where users.id = auth.uid() and users.role = 'admin'
    )
  );

-- Anyone can insert orders
drop policy if exists "Allow public to create orders" on public.orders;
create policy "Allow public to create orders" on public.orders
  for insert
  with check (true);

-- Policies for users table
drop policy if exists "Users can read own data" on public.users;
create policy "Users can read own data" on public.users
  for select
  using (auth.uid() = id);

drop policy if exists "Allow admins to read users" on public.users;
create policy "Allow admins to read users" on public.users
  for select
  using (
    exists (
      select 1 from public.users
      where users.id = auth.uid() and users.role = 'admin'
    )
  );

-- Public read access to pricing
drop policy if exists "Anyone can read pricing" on public.pricing;
create policy "Anyone can read pricing" on public.pricing
  for select
  using (active = true);

drop policy if exists "Admins can manage pricing" on public.pricing;
create policy "Admins can manage pricing" on public.pricing
  for all
  using (
    exists (
      select 1 from public.users
      where users.id = auth.uid() and users.role = 'admin'
    )
  );

-- Public read access to published content
drop policy if exists "Anyone can read published content" on public.content;
create policy "Anyone can read published content" on public.content
  for select
  using (published = true);

drop policy if exists "Admins can manage content" on public.content;
create policy "Admins can manage content" on public.content
  for all
  using (
    exists (
      select 1 from public.users
      where users.id = auth.uid() and users.role = 'admin'
    )
  );

-- Public read access to site settings
drop policy if exists "Anyone can read site settings" on public.site_settings;
create policy "Anyone can read site settings" on public.site_settings
  for select
  using (true);

drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings" on public.site_settings
  for all
  using (
    exists (
      select 1 from public.users
      where users.id = auth.uid() and users.role = 'admin'
    )
  );

-- Projects table (portfolio showcase)
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  tagline text,
  description text,
  live_url text,
  download_url text,
  github_repo text,
  thumbnail_url text,
  icon text,
  gradient text,
  platforms text[] default '{}',
  industry text,
  outcome text,
  tags text[] default '{}',
  category text default 'Web',
  sort_order integer default 0,
  featured boolean default false,
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add new columns if upgrading existing schema
alter table public.projects add column if not exists tagline text;
alter table public.projects add column if not exists download_url text;
alter table public.projects add column if not exists github_repo text;
alter table public.projects add column if not exists icon text;
alter table public.projects add column if not exists gradient text;
alter table public.projects add column if not exists platforms text[] default '{}';
alter table public.projects add column if not exists industry text;
alter table public.projects add column if not exists outcome text;

alter table public.projects enable row level security;

drop policy if exists "Anyone can read published projects" on public.projects;
create policy "Anyone can read published projects" on public.projects
  for select
  using (published = true);

drop policy if exists "Admins can manage projects" on public.projects;
create policy "Admins can manage projects" on public.projects
  for all
  using (
    exists (
      select 1 from public.users
      where users.id = auth.uid() and users.role = 'admin'
    )
  );

-- Indexes for performance
create index if not exists orders_created_at_idx on public.orders(created_at desc);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists users_email_idx on public.users(email);
create index if not exists pricing_sort_order_idx on public.pricing(sort_order);
create index if not exists pricing_active_idx on public.pricing(active);
create index if not exists content_published_idx on public.content(published);
create index if not exists site_settings_key_idx on public.site_settings(key);
create index if not exists projects_sort_order_idx on public.projects(sort_order);
create index if not exists projects_published_idx on public.projects(published);
create index if not exists projects_featured_idx on public.projects(featured);

-- Contact form submissions
create table if not exists public.contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.contact_submissions enable row level security;

-- Anyone can insert (public form)
drop policy if exists "Anyone can submit contact form" on public.contact_submissions;
create policy "Anyone can submit contact form" on public.contact_submissions
  for insert with check (true);

-- Only admins can read
drop policy if exists "Admins can read contact submissions" on public.contact_submissions;
create policy "Admins can read contact submissions" on public.contact_submissions
  for all
  using (
    exists (
      select 1 from public.users
      where users.id = auth.uid() and users.role = 'admin'
    )
  );

create index if not exists contact_submissions_created_at_idx on public.contact_submissions(created_at desc);
create index if not exists contact_submissions_read_idx on public.contact_submissions(read);

-- Apps table (SaaS & Downloadable)
create table if not exists public.apps (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  tagline text not null,
  description text,
  icon text,
  category text,
  badge text,
  monthly_price numeric,
  annual_price numeric,
  platforms jsonb default '{}'::jsonb,
  tiers jsonb default '[]'::jsonb,
  saas_features jsonb default '[]'::jsonb,
  screenshots jsonb default '[]'::jsonb,
  faq jsonb default '[]'::jsonb,
  live_demo_url text,
  documentation_url text,
  github_repo text,
  release_date timestamp with time zone default timezone('utc'::text, now()),
  latest_version text,
  sort_order integer default 0,
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.apps enable row level security;

drop policy if exists "Anyone can read published apps" on public.apps;
create policy "Anyone can read published apps" on public.apps
  for select
  using (published = true);

drop policy if exists "Admins can manage apps" on public.apps;
create policy "Admins can manage apps" on public.apps
  for all
  using (
    exists (
      select 1 from public.users
      where users.id = auth.uid() and users.role = 'admin'
    )
  );

create index if not exists apps_slug_idx on public.apps(slug);
create index if not exists apps_published_idx on public.apps(published);
create index if not exists apps_sort_order_idx on public.apps(sort_order);
