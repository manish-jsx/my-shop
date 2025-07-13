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
  UserPlus,
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
  MessageSquare,
  Gem,
  Shield,
  Award,
  Crown,
  Share2
} from 'lucide-react'

const menuItems = [
  { 
    title: 'Dashboard', 
    icon: LayoutDashboard, 
    path: '/admin',
  },
  { 
    title: 'Gemstone Catalog', 
    icon: Gem, 
    path: '/admin/products',
    submenu: [
      { title: 'All Gemstones', path: '/admin/products' },
      { title: 'Categories', path: '/admin/products/categories' },
      { title: 'Inventory', path: '/admin/products/inventory' },
      { title: 'Certifications', path: '/admin/products/certifications' }
    ]
  },
  { 
    title: 'Orders', 
    icon: ShoppingCart, 
    path: '/admin/orders',
    submenu: [
      { title: 'All Orders', path: '/admin/orders' },
      { title: 'High-Value Orders', path: '/admin/orders/high-value' },
      { title: 'Pending Verification', path: '/admin/orders/pending' },
      { title: 'Completed', path: '/admin/orders/completed' }
    ]
  },
  { 
    title: 'Customer Relations', 
    icon: Users, 
    path: '/admin/customers',
    submenu: [
      { title: 'All Customers', path: '/admin/customers' },
      { title: 'VIP Program', path: '/admin/customers/vip' },
      { title: 'Loyalty Rewards', path: '/admin/customers/loyalty' }
    ]
  },
  { 
    title: 'Reviews & Ratings', 
    icon: MessageSquare, 
    path: '/admin/reviews',
    submenu: [
      { title: 'All Reviews', path: '/admin/reviews' },
      { title: 'Pending Reviews', path: '/admin/reviews?status=pending' },
      { title: 'Review Analytics', path: '/admin/analytics/reviews' }
    ]
  },
  { 
    title: 'Lead Management', 
    icon: UserPlus, 
    path: '/admin/leads',
    submenu: [
      { title: 'All Leads', path: '/admin/leads' },
      { title: 'Contact Forms', path: '/admin/leads?type=contact_form' },
      { title: 'Quote Requests', path: '/admin/leads?type=quote_request' },
      { title: 'Newsletter Signups', path: '/admin/leads?type=newsletter' }
    ]
  },
  { 
    title: 'Authentication', 
    icon: Shield, 
    path: '/admin/authentication',
    submenu: [
      { title: 'Certificate Management', path: '/admin/authentication/certificates' },
      { title: 'Lab Partnerships', path: '/admin/authentication/labs' },
      { title: 'Verification Queue', path: '/admin/authentication/queue' }
    ]
  },
  { 
    title: 'Analytics', 
    icon: BarChart2, 
    path: '/admin/analytics',
    submenu: [
      { title: 'Business Overview', path: '/admin/analytics' },
      { title: 'Gemstone Performance', path: '/admin/analytics/gemstones' },
      { title: 'Customer Insights', path: '/admin/analytics/customers' },
      { title: 'Market Trends', path: '/admin/analytics/trends' }
    ]
  },
  { 
    title: 'Marketing', 
    icon: Tags, 
    path: '/admin/marketing',
    submenu: [
      { title: 'VIP Campaigns', path: '/admin/marketing/vip' },
      { title: 'Seasonal Promotions', path: '/admin/marketing/promotions' },
      { title: 'Email Marketing', path: '/admin/marketing/email' },
      { title: 'Social Media', path: '/admin/marketing/social' }
    ]
  },
  { 
    title: 'Social Media Management', 
    icon: Share2, 
    path: '/admin/social-media',
    submenu: [
      { title: 'Dashboard', path: '/admin/social-media' },
      { title: 'Content Calendar', path: '/admin/social-media/calendar' },
      { title: 'Content Library', path: '/admin/social-media/library' },
      { title: 'Post Scheduler', path: '/admin/social-media/scheduler' },
      { title: 'Analytics', path: '/admin/social-media/analytics' }
    ]
  },
  { 
    title: 'Reports', 
    icon: FileText, 
    path: '/admin/reports',
    submenu: [
      { title: 'Sales Reports', path: '/admin/reports/sales' },
      { title: 'Inventory Reports', path: '/admin/reports/inventory' },
      { title: 'Certification Reports', path: '/admin/reports/certificates' },
      { title: 'Custom Reports', path: '/admin/reports/custom' }
    ]
  },
  { 
    title: 'Blog & Content', 
    icon: FileText, 
    path: '/admin/blog',
    submenu: [
      { title: 'All Posts', path: '/admin/blog' },
      { title: 'Create New Post', path: '/admin/blog/new' },
      { title: 'Categories', path: '/admin/blog/categories' },
      { title: 'Comments', path: '/admin/blog/comments' }
    ]
  },
  { 
    title: 'Alerts & Monitoring', 
    icon: Bell, 
    path: '/admin/alerts',
  },
  { 
    title: 'Settings', 
    icon: Settings, 
    path: '/admin/settings',
    submenu: [
      { title: 'General Settings', path: '/admin/settings' },
      { title: 'Payment Settings', path: '/admin/settings/payments' },
      { title: 'Shipping Settings', path: '/admin/settings/shipping' },
      { title: 'Security Settings', path: '/admin/settings/security' }
    ]
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