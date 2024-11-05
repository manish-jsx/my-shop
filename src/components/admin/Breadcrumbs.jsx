// src/components/admin/Breadcrumbs.jsx
'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Breadcrumbs() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  return (
    <nav className="flex items-center space-x-2 text-sm mb-4">
      <Link href="/admin" className="text-gray-500 hover:text-primary">
        <Home className="w-4 h-4" />
      </Link>
      {paths.map((path, index) => {
        const href = `/admin/${paths.slice(0, index + 1).join('/')}`
        const isLast = index === paths.length - 1

        return (
          <motion.div
            key={path}
            className="flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            {isLast ? (
              <span className="font-medium capitalize">
                {path.replace('-', ' ')}
              </span>
            ) : (
              <Link
                href={href}
                className="text-gray-500 hover:text-primary capitalize"
              >
                {path.replace('-', ' ')}
              </Link>
            )}
          </motion.div>
        )
      })}
    </nav>
  )
}