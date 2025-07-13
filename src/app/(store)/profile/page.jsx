// src/app/(store)/profile/page.jsx
'use client'
import { useState } from 'react'
import { useMobile } from '@/hooks/useMobile'
import MobileSakuraLayout from '@/components/mobile/sakura/MobileSakuraLayout'
import { 
  User, 
  Settings, 
  Heart, 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut,
  Edit,
  Star,
  Gift,
  Crown
} from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'

// Mobile Profile Component
function MobileSakuraProfile() {
  const [user] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    avatar: null,
    memberSince: '2023',
    gemstonePoints: 2450,
    tier: 'Gold'
  })

  const menuItems = [
    {
      section: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', href: '/profile/edit', color: 'text-purple-600' },
        { icon: MapPin, label: 'Manage Addresses', href: '/profile/addresses', color: 'text-blue-600' },
        { icon: CreditCard, label: 'Payment Methods', href: '/profile/payments', color: 'text-green-600' },
      ]
    },
    {
      section: 'Orders & Wishlist',
      items: [
        { icon: ShoppingBag, label: 'My Orders', href: '/orders', color: 'text-orange-600', badge: '3' },
        { icon: Heart, label: 'My Wishlist', href: '/wishlist', color: 'text-red-600', badge: '5' },
        { icon: Star, label: 'Reviews & Ratings', href: '/profile/reviews', color: 'text-yellow-600' },
      ]
    },
    {
      section: 'Rewards & Support',
      items: [
        { icon: Gift, label: 'Gemstone Points', href: '/profile/points', color: 'text-pink-600', badge: '2,450' },
        { icon: Crown, label: 'Membership Benefits', href: '/profile/membership', color: 'text-indigo-600' },
        { icon: HelpCircle, label: 'Help & Support', href: '/support', color: 'text-teal-600' },
      ]
    },
    {
      section: 'Settings',
      items: [
        { icon: Bell, label: 'Notifications', href: '/profile/notifications', color: 'text-gray-600' },
        { icon: Settings, label: 'App Settings', href: '/profile/settings', color: 'text-gray-600' },
        { icon: LogOut, label: 'Sign Out', href: '/sign-out', color: 'text-red-600' },
      ]
    }
  ]

  return (
    <div className="space-y-6 pb-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 mx-4 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-purple-100">{user.email}</p>
                <p className="text-xs text-purple-200">Member since {user.memberSince}</p>
              </div>
            </div>
            <button className="p-2 bg-white/20 rounded-full">
              <Edit className="w-4 h-4 text-white" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold">{user.gemstonePoints}</p>
              <p className="text-xs text-purple-200">Gemstone Points</p>
            </div>
            <div className="text-center">
              <div className="flex items-center space-x-1">
                <Crown className="w-4 h-4 text-yellow-300" />
                <p className="text-sm font-semibold">{user.tier}</p>
              </div>
              <p className="text-xs text-purple-200">Tier Status</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">⭐ 4.8</p>
              <p className="text-xs text-purple-200">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: ShoppingBag, label: 'Orders', color: 'bg-blue-50 text-blue-600' },
            { icon: Heart, label: 'Wishlist', color: 'bg-red-50 text-red-600' },
            { icon: Gift, label: 'Rewards', color: 'bg-pink-50 text-pink-600' },
            { icon: HelpCircle, label: 'Help', color: 'bg-teal-50 text-teal-600' }
          ].map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${action.color} rounded-2xl flex items-center justify-center mb-2`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-4 space-y-6">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-2">
              {section.section}
            </h3>
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 ${item.color} bg-gray-50 rounded-xl flex items-center justify-center`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* App Info */}
      <div className="px-4">
        <div className="bg-gray-50 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">SAKURA Gems</p>
          <p className="text-xs text-gray-500">Version 2.1.0</p>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const isMobile = useMobile()

  // Show mobile UI on mobile devices
  if (isMobile) {
    return (
      <MobileSakuraLayout showHeader={true}>
        <MobileSakuraProfile />
      </MobileSakuraLayout>
    )
  }

  // Desktop version
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-500" />
                </div>
                <h2 className="text-xl font-semibold">Priya Sharma</h2>
                <p className="text-gray-600">priya.sharma@email.com</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
              <p className="text-gray-600">Manage your account settings and preferences.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
