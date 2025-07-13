// src/components/admin/QuickActions.jsx
'use client'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { Plus, Package, Tags, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

export default function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      label: 'Add Product',
      icon: Plus,
      color: 'success',
      href: '/admin/products?action=add',
      onClick: () => router.push('/admin/products?action=add')
    },
    {
      label: 'Manage Inventory',
      icon: Package,
      color: 'primary',
      href: '/admin/products/inventory',
      onClick: () => router.push('/admin/products/inventory')
    },
    {
      label: 'Create Promotion',
      icon: Tags,
      color: 'warning',
      href: '/admin/marketing/promotions?action=create',
      onClick: () => router.push('/admin/marketing/promotions?action=create')
    },
    {
      label: 'View Reports',
      icon: FileText,
      color: 'danger',
      href: '/admin/reports',
      onClick: () => router.push('/admin/reports')
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
            onPress={action.onClick}
          >
            {action.label}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}