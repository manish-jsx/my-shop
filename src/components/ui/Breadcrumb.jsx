// src/components/ui/Breadcrumb.jsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center space-x-2 text-sm py-4">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center"
      >
        <Link 
          href="/" 
          className="text-gray-500 hover:text-primary flex items-center"
        >
          <Home size={16} className="mr-1" />
          Home
        </Link>
      </motion.div>

      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center"
        >
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          {item.href ? (
            <Link 
              href={item.href}
              className="text-gray-500 hover:text-primary"
            >
              {item.name}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">
              {item.name}
            </span>
          )}
        </motion.div>
      ))}
    </nav>
  )
}