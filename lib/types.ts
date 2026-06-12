export interface Project {
  id: string
  title: string
  description: string
  image: string
  images?: string[]
  tech: string[]
  category: 'Websites' | 'Applications'
  live_url?: string
  github_url?: string
  featured: boolean
  created_at: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  feedback: string
  rating: number
  avatar?: string
  created_at: string
}

export interface Contact {
  id: string
  name: string
  email: string
  budget: string
  message: string
  status: 'new' | 'read' | 'replied'
  created_at: string
}

export interface Skill {
  id: string
  name: string
  category: 'Frontend' | 'Mobile' | 'Backend' | 'Tools' | 'AI'
  order_index: number
  created_at: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  order_index: number
  created_at: string
}

export interface ExperienceItem {
  id: string
  title: string
  company: string
  period: string
  description: string
  type: 'work' | 'freelance' | 'project'
  order_index: number
}

export interface HeroSettings {
  name: string
  role: string
  tagline: string
  available: boolean
}

export interface AboutSettings {
  bio1: string
  bio2: string
  values: string[]
}

export interface StatItem {
  value: string
  label: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  read_time: string
  published: boolean
  published_at: string
  created_at: string
}
