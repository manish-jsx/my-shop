// src/components/mobile/sakura/MobileSakuraFooter.jsx
'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Home, 
  Search, 
  ShoppingBag, 
  Heart, 
  User,
  Sparkles,
  Gift,
  Star,
  MessageCircle
} from 'lucide-react'

const navItems = [
  { 
    href: '/', 
    icon: Home, 
    label: 'Home',
    activeColor: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  { 
    href: '/products', 
    icon: Search, 
    label: 'Explore',
    activeColor: 'text-pink-600',
    bgColor: 'bg-pink-50'
  },
  { 
    href: '/cart', 
    icon: ShoppingBag, 
    label: 'Cart',
    activeColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    badge: true
  },
  { 
    href: '/wishlist', 
    icon: Heart, 
    label: 'Wishlist',
    activeColor: 'text-red-600',
    bgColor: 'bg-red-50',
    badge: true
  },
  { 
    href: '/profile', 
    icon: User, 
    label: 'Account',
    activeColor: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
]

export default function MobileSakuraFooter() {
  const pathname = usePathname()
  const [cartCount] = useState(2)
  const [wishlistCount] = useState(5)

  const getBadgeCount = (label) => {
    if (label === 'Cart') return cartCount
    if (label === 'Wishlist') return wishlistCount
    return 0
  }

  const isActive = (href) => {
    if (href === '/') return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Floating Action Button for Quick Actions */}
      <div className="fixed bottom-24 right-4 z-50">
        <div className="relative">
          <button className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Sparkles className="w-6 h-6 text-white" />
          </button>
          
          {/* Quick Actions Menu (could be expanded with state) */}
          <div className="absolute bottom-16 right-0 opacity-0 pointer-events-none transition-all duration-300">
            <div className="flex flex-col space-y-3">
              <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-purple-100">
                <Gift className="w-5 h-5 text-purple-600" />
              </button>
              <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-pink-100">
                <Star className="w-5 h-5 text-pink-600" />
              </button>
              <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-blue-100">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Footer */}
      <nav className="bg-white border-t border-gray-100 shadow-lg m-0 w-full transform-none will-change-auto">
        {/* Top gradient line */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 w-full"></div>
        
        <div className="flex items-center justify-around py-1 px-0 w-full min-h-[64px]">
          {navItems.map(({ href, icon: Icon, label, activeColor, bgColor, badge }) => {
            const active = isActive(href)
            const badgeCount = getBadgeCount(label)
            
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center py-2 px-3 min-w-[64px] transition-all duration-200 transform ${
                  active 
                    ? 'scale-105' 
                    : 'hover:scale-105'
                }`}
              >
                <div className="relative">
                  {/* Background circle for active state */}
                  <div className={`absolute inset-0 rounded-full transition-all duration-200 ${
                    active 
                      ? `${bgColor} scale-110 opacity-100` 
                      : 'scale-75 opacity-0'
                  }`} style={{ transform: 'translate(-4px, -4px)', width: '32px', height: '32px' }}></div>
                  
                  {/* Icon container */}
                  <div className="relative z-10 p-1">
                    <Icon className={`w-6 h-6 transition-colors duration-200 ${
                      active 
                        ? activeColor
                        : 'text-gray-500'
                    }`} />
                  </div>
                  
                  {/* Badge */}
                  {badge && badgeCount > 0 && (
                    <div className="absolute -top-1 -right-1 z-20">
                      <div className="relative">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm ${
                          label === 'Cart' ? 'bg-blue-500' : 'bg-red-500'
                        }`}>
                          {badgeCount > 9 ? '9+' : badgeCount}
                        </div>
                        {/* Pulse animation for new items */}
                        <div className={`absolute inset-0 rounded-full animate-ping opacity-30 ${
                          label === 'Cart' ? 'bg-blue-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Label */}
                <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${
                  active 
                    ? activeColor
                    : 'text-gray-500'
                }`}>
                  {label}
                </span>
                
                {/* Active indicator dot */}
                <div className={`w-1 h-1 rounded-full mt-1 transition-all duration-200 ${
                  active 
                    ? activeColor.replace('text-', 'bg-') + ' opacity-100'
                    : 'bg-transparent opacity-0'
                }`}></div>
              </Link>
            )
          })}
        </div>
        
        {/* Safe area for devices with home indicator */}
        <div className="h-safe-area-inset-bottom bg-white"></div>
      </nav>

      {/* Overlay for bottom padding to prevent content from being hidden */}
      <div className="h-20 w-full"></div>
    </>
  )
}
