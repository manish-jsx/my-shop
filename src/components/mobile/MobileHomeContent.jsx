// src/components/mobile/MobileHomeContent.jsx
'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Clock, Truck, Percent } from 'lucide-react'
import Image from 'next/image'

export default function MobileHomeContent() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const banners = [
    {
      id: 1,
      title: '50% OFF',
      subtitle: 'Electronics Sale',
      image: '/api/placeholder/350/180',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Free Delivery',
      subtitle: 'On orders above ₹499',
      image: '/api/placeholder/350/180',
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 3,
      title: 'New Arrivals',
      subtitle: 'Fashion Collection',
      image: '/api/placeholder/350/180',
      color: 'from-pink-500 to-rose-600'
    }
  ]

  const categories = [
    { name: 'Electronics', icon: '📱', color: 'bg-blue-100 text-blue-600' },
    { name: 'Fashion', icon: '👕', color: 'bg-purple-100 text-purple-600' },
    { name: 'Home', icon: '🏠', color: 'bg-green-100 text-green-600' },
    { name: 'Beauty', icon: '💄', color: 'bg-pink-100 text-pink-600' },
    { name: 'Sports', icon: '⚽', color: 'bg-orange-100 text-orange-600' },
    { name: 'Books', icon: '📚', color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Toys', icon: '🧸', color: 'bg-yellow-100 text-yellow-600' },
    { name: 'More', icon: '⋯', color: 'bg-gray-100 text-gray-600' }
  ]

  const deals = [
    {
      id: 1,
      title: 'iPhone 15 Pro',
      price: '₹1,29,900',
      originalPrice: '₹1,39,900',
      discount: '7% OFF',
      rating: 4.8,
      image: '/api/placeholder/120/120',
      badge: 'Best Seller'
    },
    {
      id: 2,
      title: 'Nike Air Max',
      price: '₹8,995',
      originalPrice: '₹12,995',
      discount: '31% OFF',
      rating: 4.6,
      image: '/api/placeholder/120/120',
      badge: 'Limited Time'
    },
    {
      id: 3,
      title: 'MacBook Air M2',
      price: '₹99,900',
      originalPrice: '₹1,19,900',
      discount: '17% OFF',
      rating: 4.9,
      image: '/api/placeholder/120/120',
      badge: 'Premium'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [banners.length])

  return (
    <div className="space-y-6">
      {/* Hero Banner Carousel */}
      <div className="relative mx-4">
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className={`w-full flex-shrink-0 h-48 bg-gradient-to-r ${banner.color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
                  <h2 className="text-3xl font-bold mb-2">{banner.title}</h2>
                  <p className="text-lg opacity-90 mb-4">{banner.subtitle}</p>
                  <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium w-fit hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
                  <div className="w-full h-full bg-white/10 rounded-l-3xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mx-4">
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: Clock, label: '10 Min Delivery', color: 'text-green-600' },
            { icon: Truck, label: 'Free Shipping', color: 'text-blue-600' },
            { icon: Percent, label: 'Daily Deals', color: 'text-red-600' },
            { icon: Star, label: 'Top Rated', color: 'text-yellow-600' }
          ].map(({ icon: Icon, label, color }, index) => (
            <button
              key={index}
              className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow"
            >
              <Icon className={`w-8 h-8 ${color} mb-2`} />
              <span className="text-xs font-medium text-gray-700 text-center">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shop by Category</h3>
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${category.color} rounded-2xl flex items-center justify-center text-2xl mb-2`}>
                {category.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Flash Deals */}
      <div className="mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">⚡ Flash Deals</h3>
          <button className="text-sm text-blue-600 font-medium">View All</button>
        </div>
        
        <div className="space-y-4">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-2xl shadow-sm border p-4 hover:shadow-md transition-shadow">
              <div className="flex space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  </div>
                  {deal.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {deal.badge}
                    </span>
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{deal.title}</h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">{deal.price}</span>
                    <span className="text-sm text-gray-500 line-through">{deal.originalPrice}</span>
                    <span className="text-sm font-medium text-green-600">{deal.discount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{deal.rating}</span>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="mx-4 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Viewed</h3>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex-shrink-0 w-32">
              <div className="w-32 h-32 bg-gray-100 rounded-xl mb-2"></div>
              <p className="text-sm font-medium text-gray-900 truncate">Product {item}</p>
              <p className="text-sm text-gray-600">₹999</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
