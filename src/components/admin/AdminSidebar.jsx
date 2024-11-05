// src/components/admin/AdminSidebar.jsx
'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@nextui-org/react'
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BarChart2,
  Tags,
  FileText,
  Bell,
  Gift,
  Percent,
  MessageSquare
} from 'lucide-react'

const menuItems = [
  { 
    title: 'Dashboard', 
    icon: LayoutDashboard, 
    path: '/admin',
  },
  { 
    title: 'Products', 
    icon: Package, 
    path: '/admin/products',
    submenu: [
      { title: 'All Products', path: '/admin/products' },
      { title: 'Categories', path: '/admin/products/categories' },
      { title: 'Inventory', path: '/admin/products/inventory' }
    ]
  },
  { 
    title: 'Orders', 
    icon: ShoppingCart, 
    path: '/admin/orders',
    submenu: [
      { title: 'All Orders', path: '/admin/orders' },
      { title: 'Pending', path: '/admin/orders/pending' },
      { title: 'Completed', path: '/admin/orders/completed' }
    ]
  },
  { 
    title: 'Customers', 
    icon: Users, 
    path: '/admin/customers' 
  },
  { 
    title: 'Analytics', 
    icon: BarChart2, 
    path: '/admin/analytics',
    submenu: [
      { title: 'Overview', path: '/admin/analytics' },
      { title: 'Sales', path: '/admin/analytics/sales' },
      { title: 'Traffic', path: '/admin/analytics/traffic' }
    ]
  },
  { 
    title: 'Marketing', 
    icon: Tags, 
    path: '/admin/marketing',
    submenu: [
      { title: 'Promotions', path: '/admin/marketing/promotions' },
      { title: 'Discounts', path: '/admin/marketing/discounts' },
      { title: 'Campaigns', path: '/admin/marketing/campaigns' }
    ]
  },
  { 
    title: 'Reports', 
    icon: FileText, 
    path: '/admin/reports' 
  },
  { 
    title: 'Settings', 
    icon: Settings, 
    path: '/admin/settings' 
  }
]

export default function AdminSidebar({ isCollapsed, onToggle }) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState([])

  const toggleExpanded = (title) => {
    setExpandedItems(prev => 
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const MenuItem = ({ item, isChild = false }) => {
    const isActive = pathname === item.path
    const isExpanded = expandedItems.includes(item.title)
    const hasSubmenu = item.submenu && item.submenu.length > 0

    return (
      <>
        <Link
          href={item.path}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
            ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'}
            ${isChild ? 'ml-9' : ''}
          `}
          onClick={(e) => {
            if (hasSubmenu) {
              e.preventDefault()
              toggleExpanded(item.title)
            }
          }}
        >
          {!isChild && <item.icon className="w-5 h-5" />}
          {!isCollapsed && (
            <>
              <span className="flex-grow">{item.title}</span>
              {hasSubmenu && (
                <ChevronDown 
                  className={`w-4 h-4 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`} 
                />
              )}
            </>
          )}
        </Link>
        
        {/* Submenu */}
        {!isCollapsed && hasSubmenu && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-1"
              >
                {item.submenu.map((subItem) => (
                  <MenuItem 
                    key={subItem.path} 
                    item={subItem} 
                    isChild 
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </>
    )
  }

  return (
    <aside className={`
      fixed left-0 top-0 h-screen bg-white border-r z-30
      transition-all duration-300
      ${isCollapsed ? 'w-20' : 'w-72'}
    `}>
      {/* Header */}
      <div className="h-16 border-b flex items-center justify-between px-4">
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-bold text-xl"
          >
            Admin
          </motion.span>
        )}
        <Button
          isIconOnly
          variant="light"
          onPress={onToggle}
          className={isCollapsed ? 'mx-auto' : ''}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {menuItems.map((item) => (
          <MenuItem key={item.path} item={item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
        {!isCollapsed && (
          <div className="text-xs text-gray-500 text-center">
            v1.0.0
          </div>
        )}
      </div>
    </aside>
  )
}