import type { IconType } from 'react-icons'

export interface NavItem {
  label: string
  id: string
}

export interface Stat {
  label: string
  value: number
  suffix?: string
}

export interface Skill {
  name: string
  level: number // 0 - 100
  icon: IconType
  color: string
}

export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Tools'
  | 'Cloud'
  | 'UI/UX'

export interface SkillGroup {
  category: SkillCategory
  skills: Skill[]
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  location: string
  description: string
  achievements: string[]
}

export type ProjectCategory =
  | 'Frontend'
  | 'Full Stack'
  | 'UI Design'
  | 'React'
  | 'Node'

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  categories: ProjectCategory[]
  demo?: string
  github?: string
  featured?: boolean
}

export interface Service {
  title: string
  description: string
  icon: IconType
}

export interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  avatar: string
}

export interface SocialLink {
  label: string
  href: string
  icon: IconType
}
