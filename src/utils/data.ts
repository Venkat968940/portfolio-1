import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiMui,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiGraphql,
  SiTailwindcss,
  SiRedis,
  SiFigma,
  SiThreedotjs,
  SiVite,
} from 'react-icons/si'
import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaDribbble,
  FaAws,
} from 'react-icons/fa6'
import { HiOutlineCode, HiOutlineSparkles } from 'react-icons/hi'
import { TbLayoutGrid, TbRocket } from 'react-icons/tb'
import type {
  ExperienceItem,
  NavItem,
  Project,
  Service,
  SkillGroup,
  SocialLink,
  Stat,
  Testimonial,
} from '@/types'

export const PROFILE = {
  name: 'Venkatesh M',
  firstName: 'Venkatesh',
  role: 'React Developer',
  tagline: 'Frontend Engineer',
  intro:
    'I craft immersive, performant web experiences where engineering precision meets cinematic design — blending React, TypeScript, Three.js and motion to build interfaces people remember.',
  email: 'venkatesh@instrive.in',
  location: 'Remote',
  resume: '/resume.pdf',
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

export const STATS: Stat[] = [
  { label: 'Years of Experience', value: 8, suffix: '+' },
  { label: 'Projects Shipped', value: 120, suffix: '+' },
  { label: 'Technologies Mastered', value: 30, suffix: '+' },
  { label: 'Happy Clients', value: 45, suffix: '+' },
]

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 96, icon: SiReact, color: '#61DAFB' },
      { name: 'TypeScript', level: 93, icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', level: 95, icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Next.js', level: 90, icon: SiNextdotjs, color: '#FFFFFF' },
      { name: 'Three.js', level: 85, icon: SiThreedotjs, color: '#FFFFFF' },
      { name: 'Tailwind', level: 88, icon: SiTailwindcss, color: '#38BDF8' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 89, icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Express', level: 87, icon: SiExpress, color: '#FFFFFF' },
      { name: 'GraphQL', level: 82, icon: SiGraphql, color: '#E10098' },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'PostgreSQL', level: 84, icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB', level: 86, icon: SiMongodb, color: '#47A248' },
      { name: 'Redis', level: 78, icon: SiRedis, color: '#FF4438' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', level: 92, icon: SiGit, color: '#F05032' },
      { name: 'Docker', level: 80, icon: SiDocker, color: '#2496ED' },
      { name: 'Vite', level: 90, icon: SiVite, color: '#646CFF' },
    ],
  },
  {
    category: 'Cloud',
    skills: [{ name: 'AWS', level: 79, icon: FaAws, color: '#FF9900' }],
  },
  {
    category: 'UI/UX',
    skills: [
      { name: 'Figma', level: 88, icon: SiFigma, color: '#F24E1E' },
      { name: 'MUI', level: 91, icon: SiMui, color: '#007FFF' },
    ],
  },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Senior Frontend Architect',
    company: 'Lumina Labs',
    period: '2022 — Present',
    location: 'San Francisco, CA',
    description:
      'Lead the architecture of a design-system-driven platform serving 2M+ monthly users.',
    achievements: [
      'Cut Largest Contentful Paint by 48% with streaming SSR and route-level code splitting.',
      'Built a Three.js product configurator that lifted conversion by 23%.',
      'Mentored a team of 6 engineers and established the motion design language.',
    ],
  },
  {
    role: 'Frontend Engineer',
    company: 'Nebula Studio',
    period: '2019 — 2022',
    location: 'Remote',
    description:
      'Shipped award-winning marketing sites and interactive product experiences.',
    achievements: [
      'Delivered 40+ client projects with an average Lighthouse score above 95.',
      'Introduced GSAP + scroll-driven storytelling across the studio’s flagship work.',
      'Owned the component library adopted by every project team.',
    ],
  },
  {
    role: 'UI Developer',
    company: 'Pixela',
    period: '2017 — 2019',
    location: 'Austin, TX',
    description:
      'Translated complex design files into pixel-perfect, accessible interfaces.',
    achievements: [
      'Rebuilt the design hand-off pipeline, halving implementation time.',
      'Championed accessibility, reaching WCAG 2.1 AA across all products.',
    ],
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'aurora-os',
    title: 'Aurora OS',
    description: 'A spatial design system & component playground.',
    longDescription:
      'A WebGL-powered design system explorer with live theming, 3D component previews and a token editor. Built with React, Three.js and a custom motion engine.',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
    tags: ['React', 'Three.js', 'TypeScript', 'Zustand'],
    categories: ['Frontend', 'React', 'UI Design'],
    demo: 'https://example.com',
    github: 'https://github.com',
    featured: true,
  },
  {
    id: 'nova-commerce',
    title: 'Nova Commerce',
    description: 'Headless commerce platform with real-time inventory.',
    longDescription:
      'A full-stack commerce platform featuring a GraphQL API, real-time inventory sync, and a buttery storefront with optimistic UI and edge caching.',
    image:
      'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&q=80',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'GraphQL'],
    categories: ['Full Stack', 'Node', 'React'],
    demo: 'https://example.com',
    github: 'https://github.com',
    featured: true,
  },
  {
    id: 'pulse-analytics',
    title: 'Pulse Analytics',
    description: 'Realtime product analytics with live dashboards.',
    longDescription:
      'A realtime analytics suite streaming millions of events through WebSockets into animated, GPU-accelerated dashboards.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    tags: ['React', 'WebSocket', 'Redis', 'D3'],
    categories: ['Frontend', 'Full Stack', 'React'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: 'lyra-design',
    title: 'Lyra Design Kit',
    description: 'A premium Figma-to-code design toolkit.',
    longDescription:
      'A toolkit that bridges Figma and production code, generating typed React components from design tokens with zero hand-off friction.',
    image:
      'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1200&q=80',
    tags: ['Figma', 'TypeScript', 'MUI'],
    categories: ['UI Design', 'Frontend'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: 'orbit-api',
    title: 'Orbit API Gateway',
    description: 'Scalable Node gateway with rate-limiting & auth.',
    longDescription:
      'A horizontally scalable API gateway handling auth, rate-limiting and request shaping for a microservice fleet, containerised with Docker.',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    tags: ['Node.js', 'Express', 'Docker', 'Redis'],
    categories: ['Node', 'Full Stack'],
    github: 'https://github.com',
  },
  {
    id: 'flux-portfolio',
    title: 'Flux Motion',
    description: 'An award-winning interactive agency site.',
    longDescription:
      'A cinematic agency website with scroll-driven storytelling, pinned sections and a particle field hero — recognised with a site-of-the-day award.',
    image:
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80',
    tags: ['React', 'GSAP', 'Three.js'],
    categories: ['Frontend', 'UI Design', 'React'],
    demo: 'https://example.com',
    featured: true,
  },
]

export const PROJECT_FILTERS: Array<Project['categories'][number] | 'All'> = [
  'All',
  'Frontend',
  'Full Stack',
  'UI Design',
  'React',
  'Node',
]

export const SERVICES: Service[] = [
  {
    title: 'Web Development',
    description:
      'Production-grade web apps built with React, TypeScript and a relentless focus on performance.',
    icon: HiOutlineCode,
  },
  {
    title: 'UI / UX Design',
    description:
      'Design systems and interfaces that feel inevitable — clear, accessible and delightful.',
    icon: HiOutlineSparkles,
  },
  {
    title: 'Frontend Architecture',
    description:
      'Scalable component architecture, state strategy and tooling for teams that ship fast.',
    icon: TbLayoutGrid,
  },
  {
    title: 'Performance Engineering',
    description:
      'Core Web Vitals, bundle budgets and FPS-friendly animation — speed as a feature.',
    icon: TbRocket,
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Maya Chen',
    role: 'VP of Product',
    company: 'Lumina Labs',
    quote:
      'Aria turned an ambitious vision into the smoothest product experience our users have ever touched. Rare blend of craft and engineering.',
    avatar: 'https://i.pravatar.cc/120?img=47',
  },
  {
    name: 'David Okafor',
    role: 'Founder',
    company: 'Nebula Studio',
    quote:
      'Every project Aria touches ends up award-worthy. The motion work is on a different level entirely.',
    avatar: 'https://i.pravatar.cc/120?img=12',
  },
  {
    name: 'Sofia Romano',
    role: 'Design Director',
    company: 'Pixela',
    quote:
      'Pixel-perfect, accessible and fast. Aria is the engineer every designer dreams of working with.',
    avatar: 'https://i.pravatar.cc/120?img=32',
  },
  {
    name: 'Liam Park',
    role: 'CTO',
    company: 'Nova Commerce',
    quote:
      'We shipped a flagship platform in record time without compromising quality. A true architect.',
    avatar: 'https://i.pravatar.cc/120?img=68',
  },
]

export const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedinIn },
  { label: 'X', href: 'https://x.com', icon: FaXTwitter },
  { label: 'Dribbble', href: 'https://dribbble.com', icon: FaDribbble },
]
