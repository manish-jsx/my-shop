// src/components/mobile/sakura/MobileSakuraHeader.jsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, MapPin, Heart, ShoppingBag, Sparkles, Crown, Menu, X,
  Shield, Truck, RotateCcw, Award, Mail, Phone, User, Settings,
  Book, HelpCircle, Star, Gem, ArrowRight
} from 'lucide-react'

export default function MobileSakuraHeader() {
  const [location, setLocation] = useState('Mumbai, Maharashtra')
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white shadow-lg m-0 w-full">
        <div className="px-0 py-3 w-full">
          {/* Top Row - Location & Actions */}
          <div className="flex items-center justify-between mb-2 px-4">
            {/* Hamburger Menu */}
            <button 
              onClick={() => setShowSidebar(true)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full active:scale-95 transition-transform"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button 
              onClick={() => setShowLocationModal(true)}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 max-w-[160px] active:scale-95 transition-transform"
            >
              <MapPin className="w-4 h-4" />
              <div className="text-left min-w-0">
                <p className="text-xs opacity-80">Delivering to</p>
                <p className="text-sm font-medium truncate">{location}</p>
              </div>
            </button>

            <div className="flex items-center space-x-2">
              <button className="relative p-2 bg-white/20 backdrop-blur-sm rounded-full">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              
              <button className="relative p-2 bg-white/20 backdrop-blur-sm rounded-full">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center z-50">
                  2
                </span>
              </button>
            </div>
          </div>

          {/* Brand Row */}
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-lg font-bold">SAKURA Gems</h1>
                <p className="text-xs opacity-80">Premium Gemstone Collection</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 bg-yellow-400 text-purple-900 px-2 py-1 rounded-full">
              <Crown className="w-3 h-3" />
              <span className="text-xs font-semibold">Premium</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-2 w-full">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search gems, crystals, jewelry..."
              className="w-full px-10 py-2.5 bg-white/95 backdrop-blur-sm text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-500 text-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </div>
      </header>

      {/* Location Selection Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Select Your Location</h3>
              <button 
                onClick={() => setShowLocationModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <button className="w-full flex items-center space-x-4 p-4 bg-purple-50 border-2 border-purple-200 rounded-2xl">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-purple-600">Use Current Location</p>
                  <p className="text-sm text-gray-600">Get precise delivery time</p>
                </div>
              </button>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 mb-3">Popular Cities</h4>
                {[
                  { city: 'Mumbai', state: 'Maharashtra', time: '2-3 days' },
                  { city: 'Delhi', state: 'India', time: '1-2 days' },
                  { city: 'Bangalore', state: 'Karnataka', time: '2-3 days' },
                  { city: 'Pune', state: 'Maharashtra', time: '1-2 days' },
                  { city: 'Hyderabad', state: 'Telangana', time: '2-3 days' },
                  { city: 'Chennai', state: 'Tamil Nadu', time: '3-4 days' }
                ].map((loc) => (
                  <button
                    key={`${loc.city}-${loc.state}`}
                    onClick={() => {
                      setLocation(`${loc.city}, ${loc.state}`)
                      setShowLocationModal(false)
                    }}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{loc.city}, {loc.state}</p>
                      <p className="text-sm text-gray-500">Delivery in {loc.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-green-600 font-medium">Available</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Menu */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto">
            {/* Sidebar Header */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">SAKURA Gems</h2>
                    <p className="text-xs opacity-80">Premium Collection</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowSidebar(false)}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* User Profile Section */}
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Welcome Guest!</p>
                  <p className="text-xs opacity-80">Sign in for better experience</p>
                </div>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-6">
              {/* Quick Actions */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Link href="/profile" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <User className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">My Profile</span>
                  </Link>
                  <Link href="/orders" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <ShoppingBag className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">My Orders</span>
                  </Link>
                  <Link href="/wishlist" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Wishlist</span>
                  </Link>
                  <Link href="/settings" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Settings</span>
                  </Link>
                </div>
              </div>

              {/* Shop Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Shop</h3>
                <div className="space-y-2">
                  <Link href="/products" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <Gem className="w-5 h-5 text-red-500" />
                    <span className="font-medium">All Gemstones</span>
                  </Link>
                  <Link href="/products?category=ruby" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                    <span className="font-medium">Ruby</span>
                  </Link>
                  <Link href="/products?category=sapphire" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">Sapphire</span>
                  </Link>
                  <Link href="/products?category=emerald" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Emerald</span>
                  </Link>
                  <Link href="/products?category=diamond" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-5 h-5 bg-gray-200 rounded-full border-2 border-gray-400"></div>
                    <span className="font-medium">Diamond</span>
                  </Link>
                  <Link href="/products?category=healing" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    <span className="font-medium">Healing Crystals</span>
                  </Link>
                  <Link href="/products?collection=birthstone" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">Birthstones</span>
                  </Link>
                </div>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Company</h3>
                <div className="space-y-2">
                  <Link href="/about" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <span className="font-medium">About Us</span>
                  </Link>
                  <Link href="/collections" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <span className="font-medium">Collections</span>
                  </Link>
                  <Link href="/education" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <Book className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Education</span>
                  </Link>
                  <Link href="/contact" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <Mail className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Contact</span>
                  </Link>
                  <Link href="/careers" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <span className="font-medium">Careers</span>
                  </Link>
                  <Link href="/sustainability" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <span className="font-medium">Sustainability</span>
                  </Link>
                </div>
              </div>

              {/* Customer Service */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Customer Service</h3>
                <div className="space-y-2">
                  <Link href="/help" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <HelpCircle className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">Help Center</span>
                  </Link>
                  <Link href="/shipping" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <Truck className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Shipping Info</span>
                  </Link>
                  <Link href="/returns" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <RotateCcw className="w-5 h-5 text-purple-500" />
                    <span className="font-medium">Returns & Exchanges</span>
                  </Link>
                  <Link href="/size-guide" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <span className="font-medium">Size Guide</span>
                  </Link>
                  <Link href="/care" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <span className="font-medium">Jewelry Care</span>
                  </Link>
                  <Link href="/warranty" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">Warranty</span>
                  </Link>
                  <Link href="/authentication" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Authentication</span>
                  </Link>
                </div>
              </div>

              {/* Trust Badges */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Why Choose Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-sm">GIA Certified</p>
                      <p className="text-xs text-gray-600">Authentic gemstones</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                    <Truck className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-sm">Free Shipping</p>
                      <p className="text-xs text-gray-600">On orders over ₹500</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                    <RotateCcw className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-sm">30-Day Returns</p>
                      <p className="text-xs text-gray-600">Hassle-free returns</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="font-medium text-sm">Lifetime Warranty</p>
                      <p className="text-xs text-gray-600">On all jewelry pieces</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Contact Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Phone className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-sm">1-800-SAKURA-1</p>
                      <p className="text-xs text-gray-600">Call us anytime</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-sm">hello@sakuragems.com</p>
                      <p className="text-xs text-gray-600">Email support</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-sm">Mumbai • Delhi • Bangalore</p>
                      <p className="text-xs text-gray-600">Visit our stores</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Legal</h3>
                <div className="space-y-2">
                  <Link href="/privacy" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <span className="font-medium">Privacy Policy</span>
                  </Link>
                  <Link href="/terms" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <span className="font-medium">Terms of Service</span>
                  </Link>
                  <Link href="/cookies" onClick={() => setShowSidebar(false)} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <span className="font-medium">Cookie Policy</span>
                  </Link>
                </div>
              </div>

              {/* App Info */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-purple-600">SAKURA Gems</span>
                </div>
                <p className="text-xs text-gray-600 mb-3">Premium Gemstone Collection</p>
                <p className="text-xs text-gray-500">© 2025 All rights reserved</p>
                <p className="text-xs text-gray-500">Made with ❤️ for gem enthusiasts</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
