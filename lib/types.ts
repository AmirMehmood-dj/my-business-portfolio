export interface Project {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  category: 'Web' | 'Mobile' | 'AI' | 'Business'
  live_url?: string
  github_url?: string
  featured: boolean
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  thumbnail: string
  category: string
  read_time: number
  excerpt: string
  content: string
  published_at: string
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
  name: string
  icon?: string
  category: 'Frontend' | 'Mobile' | 'Backend' | 'Tools' | 'AI'
}

export interface Service {
  title: string
  description: string
  icon: string
  features: string[]
}

export interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
  type: 'work' | 'freelance' | 'project'
}
