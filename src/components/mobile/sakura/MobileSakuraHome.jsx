// src/components/mobile/sakura/MobileSakuraHome.jsx
'use client'
import { useState, useEffect } from 'react'
import { 
  Star, Sparkles, Crown, Gift, Clock, Truck, Shield, 
  ChevronRight, Eye, Heart, ShoppingCart, Zap 
} from 'lucide-react'
import Link from 'next/link'

export default function MobileSakuraHome() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const banners = [
    {
      id: 1,
      title: '✨ New Arrivals',
      subtitle: 'Rare Gemstones',
      description: 'Discover authentic crystals',
      gradient: 'from-purple-600 via-pink-600 to-purple-700',
      cta: 'Explore Now'
    },
    {
      id: 2,
      title: '🎁 Special Offer',
      subtitle: 'Buy 2 Get 1 Free',
      description: 'On healing crystals',
      gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      cta: 'Shop Deal'
    },
    {
      id: 3,
      title: '👑 Premium Collection',
      subtitle: 'Certified Gems',
      description: 'Lab tested & authentic',
      gradient: 'from-amber-500 via-orange-600 to-red-600',
      cta: 'View Collection'
    }
    ,
    {
        id: 4,
        title: '🛒 Trending Now',
        subtitle: 'Top Picks',
        description: 'Shop the most loved crystals',
        gradient: 'from-pink-500 via-red-500 to-purple-600',
        cta: 'See Trends'
    },
    {
        id: 5,
        title: '🌟 Limited Edition',
        subtitle: 'Exclusive Gems',
        description: 'Rare finds, limited stock',
        gradient: 'from-indigo-500 via-blue-500 to-teal-500',
        cta: 'Grab Now'
    }
  ]

  // Touch handlers for banner swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }
    if (isRightSwipe) {
      setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
    }
  }

  const categories = [
    { name: 'Healing Crystals', icon: '💎', count: '150+ items', color: 'from-purple-500 to-pink-500' },
    { name: 'Gemstone Jewelry', icon: '💍', count: '200+ designs', color: 'from-blue-500 to-indigo-500' },
    { name: 'Raw Stones', icon: '🔮', count: '100+ varieties', color: 'from-green-500 to-emerald-500' },
    { name: 'Certified Gems', icon: '👑', count: '50+ premium', color: 'from-yellow-500 to-orange-500' },
    { name: 'Crystal Sets', icon: '✨', count: '30+ combos', color: 'from-pink-500 to-rose-500' },
    { name: 'Home Decor', icon: '🏠', count: '80+ pieces', color: 'from-teal-500 to-cyan-500' },
  ]

  const quickServices = [
    { icon: Zap, label: 'Flash Sale', subtitle: '70% OFF', color: 'text-red-500 bg-red-50' },
    { icon: Crown, label: 'Premium', subtitle: 'Certified', color: 'text-yellow-600 bg-yellow-50' },
    { icon: Gift, label: 'Gift Sets', subtitle: 'Ready to give', color: 'text-purple-500 bg-purple-50' },
    { icon: Shield, label: 'Authentic', subtitle: 'Lab tested', color: 'text-green-500 bg-green-50' }
  ]

  const featuredProducts = [
    {
      id: 1,
      name: 'Amethyst Crystal Cluster',
      price: '₹2,499',
      originalPrice: '₹3,999',
      rating: 4.8,
      reviews: 124,
      badge: 'Bestseller',
      image: '/gems/amethyst.jpg',
      properties: ['Healing', 'Meditation', 'Clarity']
    },
    {
      id: 2,
      name: 'Rose Quartz Heart',
      price: '₹899',
      originalPrice: '₹1,299',
      rating: 4.9,
      reviews: 89,
      badge: 'Love & Peace',
      image: '/gems/rose-quartz.jpg',
      properties: ['Love', 'Self-care', 'Emotional healing']
    },
    {
      id: 3,
      name: 'Clear Quartz Sphere',
      price: '₹1,799',
      originalPrice: '₹2,299',
      rating: 4.7,
      reviews: 156,
      badge: 'Master Healer',
      image: '/gems/clear-quartz.jpg',
      properties: ['Amplification', 'Clarity', 'Energy']
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [banners.length])

  return (
    <div className="space-y-6 pb-24 m-0 p-0 w-full max-w-full overflow-x-hidden">
      {/* Hero Banner Carousel */}
      <div className="relative w-full">
        <div 
          className="overflow-hidden w-full h-48"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex h-full"
            style={{ 
              transform: `translateX(-${currentBanner * 100}%)`,
              transition: 'transform 0.5s ease-out',
              width: `${banners.length * 100}%`
            }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className={`w-full h-48 bg-gradient-to-br ${banner.gradient} relative overflow-hidden flex-shrink-0`}
              >
                <div className="absolute inset-0 p-4 flex flex-col justify-center text-white">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold leading-tight">{banner.title}</h2>
                    <p className="text-lg font-semibold opacity-90 leading-tight">{banner.subtitle}</p>
                    <p className="text-sm opacity-80 mb-3">{banner.description}</p>
                    <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2 rounded-full font-semibold w-fit hover:bg-white/30 transition-all duration-200 flex items-center space-x-2 text-sm">
                      <span>{banner.cta}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Simplified decorative elements */}
                <div className="absolute right-4 top-4 w-16 h-16 bg-white/10 rounded-full opacity-50"></div>
                <div className="absolute right-8 bottom-8 w-8 h-8 bg-white/10 rounded-full opacity-30"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Banner Indicators */}
        <div className="flex justify-center space-x-2 mt-3 px-4">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentBanner 
                  ? 'bg-purple-600 w-6' 
                  : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Services */}
      <div className="px-4">
        <div className="grid grid-cols-4 gap-2">
          {quickServices.map(({ icon: Icon, label, subtitle, color }, index) => (
            <button
              key={index}
              className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 active:scale-95 min-h-[80px]"
            >
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-1`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-gray-900 text-center leading-tight">{label}</span>
              <span className="text-xs text-gray-500 text-center leading-tight">{subtitle}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900">Shop by Category</h3>
          <Link href="/categories" className="text-purple-600 font-medium text-sm flex items-center active:opacity-70">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              className="relative p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden active:scale-95"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5`}></div>
              <div className="relative">
                <div className="text-2xl mb-2">{category.icon}</div>
                <h4 className="font-semibold text-gray-900 text-sm leading-tight">{category.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{category.count}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900">✨ Featured Gems</h3>
          <Link href="/products" className="text-purple-600 font-medium text-sm flex items-center active:opacity-70">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="space-y-3">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border p-3 hover:shadow-md transition-all duration-200 active:scale-[0.98]">
              <div className="flex space-x-3">
                {/* Product Image */}
                <div className="relative w-20 h-20 flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl"></div>
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                    {product.badge}
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm leading-tight line-clamp-1">{product.name}</h4>
                  
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-base text-gray-900">{product.price}</span>
                    <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.properties.slice(0, 2).map((prop, index) => (
                      <span key={index} className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
                        {prop}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-1.5 px-3 rounded-lg font-medium text-xs hover:shadow-md transition-all duration-200 active:scale-95">
                      Add to Cart
                    </button>
                    <button className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors active:scale-95">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="px-4">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
          <h3 className="text-base font-bold text-center text-gray-900 mb-3">Why Choose SAKURA Gems?</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Shield, title: 'Authentic', subtitle: 'Lab Certified' },
              { icon: Truck, title: 'Fast Delivery', subtitle: '2-3 Days' },
              { icon: Crown, title: 'Premium', subtitle: 'Hand Picked' }
            ].map(({ icon: Icon, title, subtitle }, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-semibold text-xs text-gray-900 leading-tight">{title}</h4>
                <p className="text-xs text-gray-600 leading-tight">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
