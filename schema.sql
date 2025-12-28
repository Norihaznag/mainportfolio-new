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

-- Enable Row Level Security
alter table public.orders enable row level security;
alter table public.users enable row level security;

-- Policies for orders (admin only)
create policy "Allow admins to read orders" on public.orders
  for select
  using (
    exists (
      select 1 from public.users
      where users.id = auth.uid() and users.role = 'admin'
    )
  );

create policy "Allow admins to update orders" on public.orders
  for update
  using (
    exists (
      select 1 from public.users
      where users.id = auth.uid() and users.role = 'admin'
    )
  );

-- Anyone can insert orders
create policy "Allow public to create orders" on public.orders
  for insert
  with check (true);

-- Policies for users table
create policy "Users can read own data" on public.users
  for select
  using (auth.uid() = id);

create policy "Allow admins to read users" on public.users
  for select
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
