// src/components/mobile/MobileProductCard.jsx
'use client'
import { useState } from 'react'
import { Heart, ShoppingCart, Star, Eye, Share } from 'lucide-react'
import Image from 'next/image'

export default function MobileProductCard({ product, layout = 'grid' }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    // Add to cart logic
  }

  const handleWishlist = (e) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const handleQuickView = (e) => {
    e.stopPropagation()
    // Quick view logic
  }

  if (layout === 'list') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-4 hover:shadow-md transition-all duration-200 active:scale-[0.98]">
        <div className="flex space-x-4">
          {/* Product Image */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <div className="w-full h-full bg-gray-100 rounded-xl overflow-hidden">
              {!imageLoaded && (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
              )}
              <div 
                className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100"
                onLoad={() => setImageLoaded(true)}
              ></div>
            </div>
            
            {/* Wishlist Button */}
            <button
              onClick={handleWishlist}
              className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
            </button>
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 text-sm truncate mb-1">
              {product?.title || 'Product Name'}
            </h3>
            
            <div className="flex items-center space-x-1 mb-2">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-600">4.5</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-400">1.2k reviews</span>
            </div>

            <div className="flex items-center space-x-2 mb-2">
              <span className="font-bold text-gray-900 text-sm">₹999</span>
              <span className="text-xs text-gray-500 line-through">₹1,299</span>
              <span className="text-xs font-medium text-green-600">23% OFF</span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-all duration-200 active:scale-[0.98]">
      {/* Product Image */}
      <div className="relative aspect-square">
        <div className="w-full h-full bg-gray-100">
          {!imageLoaded && (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
          )}
          <div 
            className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100"
            onLoad={() => setImageLoaded(true)}
          ></div>
        </div>
        
        {/* Overlay Actions */}
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <button
            onClick={handleWishlist}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
          </button>
          
          <button
            onClick={handleQuickView}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            23% OFF
          </span>
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            Bestseller
          </span>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-2 left-2 right-2">
          <button
            onClick={handleAddToCart}
            className="w-full bg-white/90 backdrop-blur-sm text-gray-900 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
          {product?.title || 'Premium Wireless Headphones with Noise Cancellation'}
        </h3>
        
        <div className="flex items-center space-x-1 mb-2">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs text-gray-600">4.5</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-400">1.2k</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-bold text-gray-900">₹999</span>
          <span className="text-sm text-gray-500 line-through">₹1,299</span>
        </div>
      </div>
    </div>
  )
}
