// src/components/ui/PageTransitions.jsx
'use client'
import { motion } from 'framer-motion'

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -20
  }
}

export function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export function SlideTransition({ children, direction = 'right' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'right' ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 'right' ? -20 : 20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export function FadeTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}