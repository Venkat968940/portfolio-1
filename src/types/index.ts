import type { IconType } from 'react-icons'

export interface NavItem {
  label: string
  id: string
}

export interface Skill {
  name: string
  level: number // 0 - 100
  icon: IconType
  color: string
}

export type SkillCategory =
  | 'Frontend'
  | 'UI & Styling'
  | 'Backend & AI'
  | 'Tools'

export interface SkillGroup {
  category: SkillCategory
  skills: Skill[]
}

export type ProjectCategory =
  | 'Enterprise'
  | 'Dashboard'
  | 'E-Commerce'
  | 'Healthcare'
  | 'React'

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  /** Detailed contribution bullets, shown in the project drawer. */
  highlights?: string[]
  image: string
  tags: string[]
  categories: ProjectCategory[]
  demo?: string
  github?: string
  featured?: boolean
}

export interface SocialLink {
  label: string
  href: string
  icon: IconType
}
