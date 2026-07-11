import {
  SiReact,
  SiJavascript,
  SiRedux,
  SiTailwindcss,
  SiNodedotjs,
  SiGit,
  SiFigma,
  SiGithub,
} from 'react-icons/si'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { HiOutlineSparkles } from 'react-icons/hi'
import type { NavItem, Project, SkillGroup, SocialLink } from '@/types'

export const PROFILE = {
  name: 'Venkatesh M',
  firstName: 'Venkatesh',
  role: 'React Developer',
  tagline: 'Frontend Engineer',
  intro:
    'I craft immersive, performant web experiences where engineering precision meets cinematic design — blending React, TypeScript, Three.js and motion to build interfaces people remember.',
  email: 'amvenky97@gmail.com',
  phone: '+91 7904251649',
  location: 'Remote',
  resume: '/resume.pdf',
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React.js / Next.js', level: 95, icon: SiReact, color: '#61DAFB' },
      { name: 'JavaScript', level: 93, icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Redux / Redux Toolkit', level: 90, icon: SiRedux, color: '#764ABC' },
    ],
  },
  {
    category: 'UI & Styling',
    skills: [
      { name: 'TailwindCSS / Material UI', level: 92, icon: SiTailwindcss, color: '#38BDF8' },
      { name: 'Figma', level: 82, icon: SiFigma, color: '#F24E1E' },
    ],
  },
  {
    category: 'Backend & AI',
    skills: [
      { name: 'Node.js', level: 80, icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'AI & Frontend Integration', level: 85, icon: HiOutlineSparkles, color: '#22D3EE' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Version Control', level: 91, icon: SiGit, color: '#F05032' },
      { name: 'GitHub', level: 92, icon: SiGithub, color: '#E2E8F0' },
      { name: 'GitHub Desktop', level: 88, icon: FaGithub, color: '#A78BFA' },
    ],
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'shares-vision',
    title: 'Shares Vision',
    description: 'Enterprise equity management SaaS for corporate share allocation.',
    longDescription:
      'A secure, multi-tenant React 19 & TypeScript platform designed for corporate equity allocation, compliance management, and auditing.',
    highlights: [
      'State management & performance: engineered a scalable global state architecture with Redux Toolkit to synchronise dynamic dashboards, rounding policies, user portfolios and batch crediting processes.',
      'Security & compliance: built a secure session lifecycle manager on react-idle-timer, coupled with automatic multi-step “Maker-Checker” authorization flows for high-risk transactional procedures.',
      'Document processing & export: integrated mammoth.js, exceljs and react-pdf to power import/export pipelines for corporate templates, financial audits and PDF statements.',
      'Observability & reliability: instrumented Azure Application Insights and custom React Error Boundaries, cutting diagnostic time for production UI exceptions by capturing runtime failures.',
      'Testing & CI/CD: wrote modular unit and integration tests with Mock Service Worker and Jest, establishing a pre-commit gate that ensured zero-regression builds under strict linting and coverage constraints.',
    ],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    tags: ['React 19', 'TypeScript', 'Redux Toolkit', 'MUI', 'Azure'],
    categories: ['Enterprise', 'Dashboard', 'React'],
    featured: true,
  },
  {
    id: 'healthcare-consultations',
    title: 'Healthcare Consultation Platform',
    description: 'Video consultations and scheduling with registered doctors and hospitals.',
    longDescription:
      'Enhanced a healthcare platform facilitating video consultations and appointment scheduling between patients and registered doctors and hospitals.',
    highlights: [
      'Extended the consultation booking flow across doctor, hospital and specialisation discovery.',
      'Integrated real-time video consultation sessions into the patient and practitioner journeys.',
    ],
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    tags: ['React', 'JavaScript', 'REST APIs', 'WebRTC'],
    categories: ['Healthcare', 'React'],
    featured: true,
  },
  {
    id: 'talent-tender',
    title: 'Talent Tender',
    description: 'Proposal creation, vendor bidding and final selection workflows.',
    longDescription:
      'Developed responsive Admin and Vendor portal interfaces using React, implementing end-to-end features across the procurement lifecycle with seamless API integration and a user-friendly design.',
    highlights: [
      'Built proposal creation, vendor bidding and final selection workflows end to end.',
      'Delivered responsive interfaces for both administrator and vendor personas.',
      'Integrated the portals with backend services through a shared, typed API layer.',
    ],
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
    tags: ['React', 'Redux', 'Material UI', 'REST APIs'],
    categories: ['Enterprise', 'Dashboard', 'React'],
  },
  {
    id: 'fashion-erp',
    title: 'Fashion ERP Back-Office',
    description: 'ERP system integrating sales and warehouse operations.',
    longDescription:
      'Crafted an ERP back-office system for a fashion-focused business, integrating sales and warehouse operations into a single operational surface.',
    highlights: [
      'Unified sales and warehouse operations within one back-office workspace.',
      'Modelled inventory, stock movement and order fulfilment flows for a fashion catalogue.',
    ],
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
    tags: ['React', 'JavaScript', 'Redux', 'Node.js'],
    categories: ['Enterprise', 'E-Commerce'],
  },
  {
    id: 'retail-billing',
    title: 'Department Store Billing',
    description: 'Online billing software optimising in-store transactions.',
    longDescription:
      'Engineered online billing software in ReactJS for a department store, optimising transaction processes, enhancing customer experience and improving operational efficiency.',
    highlights: [
      'Streamlined the checkout and transaction flow for high-volume counter usage.',
      'Improved operational efficiency for store staff through a faster, clearer billing interface.',
    ],
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    tags: ['ReactJS', 'JavaScript', 'Redux'],
    categories: ['E-Commerce', 'React'],
  },
]

export const PROJECT_FILTERS: Array<Project['categories'][number] | 'All'> = [
  'All',
  'Enterprise',
  'Dashboard',
  'E-Commerce',
  'Healthcare',
  'React',
]

export const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/Venkatesh-M-14', icon: FaGithub },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/venkatesh-m-3b88b21b1/',
    icon: FaLinkedinIn,
  },
]
