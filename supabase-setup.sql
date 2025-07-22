-- Create the projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  link TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on featured projects for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (you can modify this for authentication later)
CREATE POLICY "Allow all operations" ON projects
  FOR ALL USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO projects (title, description, image, link, featured) VALUES
(
  'E-Commerce Platform',
  'Modern e-commerce website with payment integration, inventory management, and admin dashboard built with Next.js and Stripe.',
  'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://example.com',
  true
),
(
  'Restaurant Website',
  'Beautiful restaurant website with online ordering system, reservation management, and menu showcase.',
  'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://example.com',
  true
),
(
  'SaaS Dashboard',
  'Comprehensive dashboard for SaaS application with analytics, user management, and real-time data visualization.',
  'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://example.com',
  true
),
(
  'Real Estate Platform',
  'Property listing website with advanced search, virtual tours, and agent management system.',
  'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://example.com',
  false
),
(
  'Portfolio Website',
  'Creative portfolio website for a photographer with image galleries, client testimonials, and contact forms.',
  'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://example.com',
  false
),
(
  'Task Management App',
  'Collaborative task management application with real-time updates, team collaboration, and project tracking.',
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://example.com',
  false
); 