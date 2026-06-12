-- ================================================================
-- AMIR MEHMOOD PORTFOLIO — SUPABASE SETUP
-- Run this entire script in: Supabase Dashboard → SQL Editor
-- ================================================================

-- ----------------------------------------------------------------
-- 1. SETTINGS TABLE (generic key-value JSONB store)
-- ----------------------------------------------------------------
create table if not exists settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);
alter table settings enable row level security;
drop policy if exists "Public read settings" on settings;
drop policy if exists "Service role write settings" on settings;
create policy "Public read settings" on settings for select using (true);
create policy "Service role write settings" on settings for all using (auth.role() = 'service_role');

-- ----------------------------------------------------------------
-- 2. SKILLS TABLE
-- ----------------------------------------------------------------
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  order_index int default 0,
  created_at timestamptz default now()
);
alter table skills enable row level security;
drop policy if exists "Public read skills" on skills;
drop policy if exists "Service role write skills" on skills;
create policy "Public read skills" on skills for select using (true);
create policy "Service role write skills" on skills for all using (auth.role() = 'service_role');

-- ----------------------------------------------------------------
-- 3. SERVICES TABLE
-- ----------------------------------------------------------------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  icon text default 'Globe',
  features jsonb default '[]',
  order_index int default 0,
  created_at timestamptz default now()
);
alter table services enable row level security;
drop policy if exists "Public read services" on services;
drop policy if exists "Service role write services" on services;
create policy "Public read services" on services for select using (true);
create policy "Service role write services" on services for all using (auth.role() = 'service_role');

-- ----------------------------------------------------------------
-- 4. EXPERIENCE TABLE
-- ----------------------------------------------------------------
create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  period text default '',
  description text default '',
  type text default 'work',
  order_index int default 0
);
alter table experience enable row level security;
drop policy if exists "Public read experience" on experience;
drop policy if exists "Service role write experience" on experience;
create policy "Public read experience" on experience for select using (true);
create policy "Service role write experience" on experience for all using (auth.role() = 'service_role');

-- ----------------------------------------------------------------
-- 5. CONTACTS TABLE — allow public inserts (for the contact form)
-- ----------------------------------------------------------------
-- If the contacts table already exists, just add the insert policy.
-- If it doesn't exist yet, create it.
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  budget text default '',
  message text not null,
  status text default 'new',
  created_at timestamptz default now()
);
alter table contacts enable row level security;
drop policy if exists "Public insert contacts" on contacts;
drop policy if exists "Service role manage contacts" on contacts;
create policy "Public insert contacts" on contacts for insert with check (true);
create policy "Service role manage contacts" on contacts for all using (auth.role() = 'service_role');

-- ================================================================
-- SEED DATA (only inserts if table is empty)
-- ================================================================

-- Hero settings
insert into settings (key, value) values (
  'hero',
  '{"name":"Amir Mehmood","role":"Website & Application Developer · AI Prompt Engineer","tagline":"I build fast, scalable, and modern web & mobile applications that convert visitors into clients.","available":true}'::jsonb
) on conflict (key) do nothing;

-- About settings
insert into settings (key, value) values (
  'about',
  '{"bio1":"I''m Amir Mehmood, a Website & Application Developer with over 3 years of experience crafting high-performance applications. I''ve worked with startups, agencies, and enterprise clients across multiple industries.","bio2":"My approach combines strong engineering fundamentals with a sharp eye for design. Whether it''s a SaaS dashboard, an e-commerce platform, or a React Native app, I care deeply about the end user''s experience and the maintainability of the codebase.","values":["Clean, maintainable code","Performance-first mindset","Attention to UI/UX details","On-time delivery","Clear communication","Continuous learning"]}'::jsonb
) on conflict (key) do nothing;

-- Stats settings
insert into settings (key, value) values (
  'stats',
  '[{"value":"3+","label":"Years Experience"},{"value":"50+","label":"Projects Completed"},{"value":"30+","label":"Happy Clients"},{"value":"15+","label":"Technologies"}]'::jsonb
) on conflict (key) do nothing;

-- Social links settings
insert into settings (key, value) values (
  'social',
  '{"github":"","linkedin":"https://www.linkedin.com/in/amirmehmood0325/","email":"meharamir985@gmail.com","whatsapp":"923018659791"}'::jsonb
) on conflict (key) do nothing;

-- Skills
insert into skills (name, category, order_index) values
  ('React', 'Frontend', 1),
  ('Next.js', 'Frontend', 2),
  ('JavaScript', 'Frontend', 3),
  ('TypeScript', 'Frontend', 4),
  ('Tailwind CSS', 'Frontend', 5),
  ('Framer Motion', 'Frontend', 6),
  ('HTML5 / CSS3', 'Frontend', 7),
  ('Redux', 'Frontend', 8),
  ('React Native', 'Mobile', 1),
  ('Expo', 'Mobile', 2),
  ('iOS / Android', 'Mobile', 3),
  ('Supabase', 'Backend', 1),
  ('Firebase', 'Backend', 2),
  ('Node.js', 'Backend', 3),
  ('MySQL', 'Backend', 4),
  ('REST APIs', 'Backend', 5),
  ('Git / GitHub', 'Tools', 1),
  ('Figma', 'Tools', 2),
  ('VS Code', 'Tools', 3),
  ('Vercel', 'Tools', 4),
  ('Prompt Engineering', 'AI', 1),
  ('AI Workflows', 'AI', 2),
  ('OpenAI API', 'AI', 3),
  ('LangChain', 'AI', 4);

-- Services
insert into services (title, description, icon, features, order_index) values
  ('Web Development', 'Building fast, scalable, and SEO-optimized web applications using modern technologies like Next.js, React, and TypeScript.', 'Globe', '["Next.js / React","TypeScript","REST & GraphQL APIs","Performance Optimization"]'::jsonb, 1),
  ('Mobile App Development', 'Creating cross-platform mobile applications with React Native and Expo that deliver native-like performance.', 'Smartphone', '["React Native","iOS & Android","Expo Framework","App Store Deployment"]'::jsonb, 2),
  ('UI/UX Implementation', 'Converting Figma designs into pixel-perfect, responsive interfaces with smooth animations and micro-interactions.', 'Palette', '["Figma to Code","Responsive Design","Framer Motion","Shadcn UI / Tailwind"]'::jsonb, 3),
  ('SEO Optimization', 'Implementing technical SEO best practices to boost search rankings and organic traffic for your web applications.', 'TrendingUp', '["Technical SEO","Core Web Vitals","Schema Markup","Performance Audit"]'::jsonb, 4),
  ('AI Solutions', 'Integrating AI capabilities into your products — from chatbots to content generation and intelligent automation.', 'Cpu', '["OpenAI Integration","AI Chatbots","Prompt Engineering","LangChain Workflows"]'::jsonb, 5);

-- Experience
insert into experience (title, company, period, description, type, order_index) values
  ('Full-Stack & Mobile Developer', 'Freelance / Remote', '2022 – Present', 'Delivering high-quality websites, web applications, and mobile solutions for clients worldwide. Specializing in React, Next.js, Node.js and React Native with a focus on performance and user experience.', 'freelance', 1),
  ('Website & Application Developer', 'TechSolutions Ltd.', '2020 – 2022', 'Led development of multiple SaaS products end-to-end, implemented design systems, and mentored junior developers. Reduced page load times by 35% through optimization strategies.', 'work', 2),
  ('React Developer', 'Digital Agency Co.', '2019 – 2020', 'Built responsive web applications and converted Figma designs to production code. Worked closely with designers and backend teams using Agile methodology.', 'work', 3),
  ('Open Source Contributor', 'Personal Projects', '2018 – Present', 'Developed and maintained open-source tools and templates used by hundreds of developers. Active contributor to the React and Next.js community.', 'project', 4);
