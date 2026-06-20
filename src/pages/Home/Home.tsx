import { motion } from 'framer-motion'
import {
  Hero,
  About,
  Skills,
  Experience,
  Projects,
  Services,
  Testimonials,
  Contact,
} from '@/components/sections'
import { Footer } from '@/components/layout'
import { useActiveSection } from '@/hooks'

const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'services',
  'testimonials',
  'contact',
]

const Home = () => {
  useActiveSection(SECTION_IDS)

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </motion.main>
  )
}

export default Home
