// src/components/mobile/sakura/MobileSakuraProductCard.jsx
'use client'
import { useState } from 'react'
import { Heart, ShoppingCart, Star, Eye, Share, Sparkles, Crown } from 'lucide-react'

export default function MobileSakuraProductCard({ product, layout = 'grid' }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    // Add to cart with animation
  }

  const handleWishlist = (e) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const handleQuickView = (e) => {
    e.stopPropagation()
    // Quick view modal
  }

  const gemProperties = product?.properties || ['Healing', 'Meditation', 'Energy']
  const certification = product?.certified || false

  if (layout === 'list') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-4 hover:shadow-lg transition-all duration-200">
        <div className="flex space-x-4">
          {/* Product Image */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden">
              {!imageLoaded && (
                <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 animate-pulse"></div>
              )}
            </div>
            
            {/* Certification Badge */}
            {certification && (
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Crown className="w-3 h-3 text-white" />
              </div>
            )}

            {/* Wishlist Button */}
            <button
              onClick={handleWishlist}
              className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
            </button>
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
              {product?.name || 'Amethyst Crystal Cluster - Premium Grade'}
            </h3>
            
            {/* Properties Tags */}
            <div className="flex flex-wrap gap-1 mb-2">
              {gemProperties.slice(0, 2).map((prop, index) => (
                <span key={index} className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
                  {prop}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-1 mb-2">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium">4.8</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-400">124 reviews</span>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <span className="font-bold text-gray-900">₹2,499</span>
              <span className="text-xs text-gray-500 line-through">₹3,999</span>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">38% OFF</span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Product Image */}
      <div className="relative aspect-square">
        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100">
          {!imageLoaded && (
            <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 animate-pulse"></div>
          )}
        </div>
        
        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <button
            onClick={handleWishlist}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
          </button>
          
          <button
            onClick={handleQuickView}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {certification && (
            <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              <Crown className="w-3 h-3" />
              <span>Certified</span>
            </div>
          )}
          <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            38% OFF
          </span>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-3">
          <button
            onClick={handleAddToCart}
            className="w-full bg-white/90 backdrop-blur-sm text-gray-900 py-2.5 rounded-xl text-sm font-semibold hover:bg-white transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 flex-1">
            {product?.name || 'Amethyst Crystal Cluster - Premium Grade A'}
          </h3>
          {product?.featured && (
            <Sparkles className="w-4 h-4 text-purple-500 ml-2 flex-shrink-0" />
          )}
        </div>
        
        {/* Properties */}
        <div className="flex flex-wrap gap-1 mb-3">
          {gemProperties.slice(0, 3).map((prop, index) => (
            <span key={index} className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
              {prop}
            </span>
          ))}
        </div>
        
        <div className="flex items-center space-x-1 mb-2">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs font-medium">4.8</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-400">124</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900">₹2,499</span>
            <span className="text-sm text-gray-500 line-through">₹3,999</span>
          </div>
          <div className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
            Save ₹1,500
          </div>
        </div>
      </div>
    </div>
  )
}
