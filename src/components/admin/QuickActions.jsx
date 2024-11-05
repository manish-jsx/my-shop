// src/components/admin/QuickActions.jsx
'use client'
import { Button } from '@nextui-org/react'
import { Plus, Package, Tags, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

export default function QuickActions() {
  const actions = [
    {
      label: 'Add Product',
      icon: Plus,
      color: 'primary',
      href: '/admin/products/new'
    },
    {
      label: 'Manage Inventory',
      icon: Package,
      color: 'secondary',
      href: '/admin/inventory'
    },
    {
      label: 'Create Promotion',
      icon: Tags,
      color: 'success',
      href: '/admin/promotions/new'
    },
    {
      label: 'View Reports',
      icon: FileText,
      color: 'warning',
      href: '/admin/reports'
    }
  ]

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {actions.map((action, index) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button
            color={action.color}
            startContent={<action.icon className="w-4 h-4" />}
            className="whitespace-nowrap"
          >
            {action.label}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}