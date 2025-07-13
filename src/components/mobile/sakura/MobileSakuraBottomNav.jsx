// src/components/mobile/sakura/MobileSakuraBottomNav.jsx
'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Search, ShoppingBag, Heart, User, Sparkles } from 'lucide-react'

const navItems = [
  { href: '/', icon: Home, label: 'Home', activeColor: 'text-purple-600' },
  { href: '/products', icon: Search, label: 'Explore', activeColor: 'text-purple-600' },
  { href: '/cart', icon: ShoppingBag, label: 'Cart', activeColor: 'text-purple-600', badge: 2 },
  { href: '/wishlist', icon: Heart, label: 'Wishlist', activeColor: 'text-purple-600', badge: 3 },
  { href: '/profile', icon: User, label: 'Profile', activeColor: 'text-purple-600' },
]

export default function MobileSakuraBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-purple-100 z-40 shadow-2xl">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ href, icon: Icon, label, activeColor, badge }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
          
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center py-2 px-3 min-w-[60px] transition-all duration-200 ${
                isActive 
                  ? `${activeColor} scale-105` 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="relative">
                {isActive && (
                  <div className="absolute -inset-2 bg-purple-100 rounded-xl opacity-50"></div>
                )}
                <div className="relative">
                  <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
                  {badge && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                      {badge}
                    </span>
                  )}
                </div>
              </div>
              <span className={`text-xs mt-1 font-medium ${isActive ? '' : ''}`}>
                {label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-purple-600 rounded-full"></div>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
