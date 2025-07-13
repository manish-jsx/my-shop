// src/components/mobile/sakura/MobileSakuraWishlist.jsx
'use client'
import { useState } from 'react'
import { Heart, ShoppingCart, Share, Trash2, Grid, List, Sparkles, Crown, Star } from 'lucide-react'
import Link from 'next/link'
import MobileSakuraProductCard from './MobileSakuraProductCard'

export default function MobileSakuraWishlist() {
  const [layout, setLayout] = useState('grid')
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Amethyst Crystal Cluster',
      price: 2499,
      originalPrice: 3999,
      rating: 4.8,
      reviews: 124,
      properties: ['Healing', 'Meditation', 'Clarity'],
      inStock: true,
      certified: true,
      featured: true
    },
    {
      id: 2,
      name: 'Rose Quartz Heart',
      price: 899,
      originalPrice: 1299,
      rating: 4.9,
      reviews: 89,
      properties: ['Love', 'Self-care', 'Emotional'],
      inStock: true,
      certified: false,
      featured: false
    },
    {
      id: 3,
      name: 'Clear Quartz Sphere',
      price: 1799,
      originalPrice: 2299,
      rating: 4.7,
      reviews: 156,
      properties: ['Amplification', 'Clarity', 'Energy'],
      inStock: false,
      certified: true,
      featured: true
    },
    {
      id: 4,
      name: 'Labradorite Palm Stone',
      price: 1099,
      originalPrice: 1599,
      rating: 4.6,
      reviews: 78,
      properties: ['Transformation', 'Intuition', 'Magic'],
      inStock: true,
      certified: false,
      featured: false
    }
  ])

  const removeFromWishlist = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
  }

  const addToCart = (id) => {
    // Add to cart logic
    console.log('Added to cart:', id)
  }

  const shareWishlist = () => {
    // Share wishlist logic
    if (navigator.share) {
      navigator.share({
        title: 'My SAKURA Gems Wishlist',
        text: 'Check out my sacred gemstone collection!',
        url: window.location.href,
      })
    }
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-12 h-12 text-purple-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">Your wishlist is empty</h3>
            <p className="text-gray-600 max-w-sm">
              Save beautiful gemstones and crystals to your wishlist. Your sacred collection awaits!
            </p>
          </div>
          <Link 
            href="/products"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            Discover Gems
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-3">
          <Heart className="w-6 h-6 text-red-500 fill-current" />
          <div>
            <h2 className="text-lg font-bold text-gray-900">Your Sacred Wishlist</h2>
            <p className="text-sm text-gray-600">{wishlistItems.length} treasured gems</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Layout Toggle */}
          <div className="flex bg-purple-50 rounded-xl p-1">
            <button
              onClick={() => setLayout('grid')}
              className={`p-2 rounded-lg transition-colors ${
                layout === 'grid' 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-purple-400'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`p-2 rounded-lg transition-colors ${
                layout === 'list' 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-purple-400'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Share Button */}
          <button
            onClick={shareWishlist}
            className="p-2 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
          >
            <Share className="w-4 h-4 text-purple-600" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <div className="flex space-x-3">
          <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Add All to Cart</span>
          </button>
          <button className="px-4 py-3 border-2 border-purple-200 text-purple-600 rounded-2xl hover:bg-purple-50 transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="px-4">
        {layout === 'grid' ? (
          <div className="grid grid-cols-2 gap-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="relative">
                <MobileSakuraProductCard product={item} layout="grid" />
                
                {/* Wishlist Actions Overlay */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl shadow-sm border p-4 hover:shadow-lg transition-all duration-200">
                <div className="flex space-x-4">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden"></div>
                    
                    {/* Certification Badge */}
                    {item.certified && (
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 pr-2">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Heart className="w-4 h-4 fill-current text-red-500" />
                      </button>
                    </div>

                    {/* Properties */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.properties.slice(0, 2).map((prop, index) => (
                        <span key={index} className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
                          {prop}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{item.rating}</span>
                        <span>•</span>
                        <span>{item.reviews} reviews</span>
                      </div>
                      
                      {item.inStock ? (
                        <button
                          onClick={() => addToCart(item.id)}
                          className="flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:shadow-lg transition-all duration-200"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          <span>Add to Cart</span>
                        </button>
                      ) : (
                        <span className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-full font-medium">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="px-4 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-bold text-gray-900">You might also love</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Citrine Tumbled Stone', price: 599, originalPrice: 899, properties: ['Abundance', 'Joy'] },
            { name: 'Black Tourmaline Raw', price: 1299, originalPrice: 1899, properties: ['Protection', 'Grounding'] },
            { name: 'Selenite Wand', price: 799, originalPrice: 1199, properties: ['Cleansing', 'Purification'] },
            { name: 'Tiger Eye Bracelet', price: 1999, originalPrice: 2999, properties: ['Courage', 'Confidence'] }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-200">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100"></div>
              <div className="p-3">
                <h4 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-1">
                  {item.name}
                </h4>
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.properties.map((prop, i) => (
                    <span key={i} className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
                      {prop}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm">₹{item.price}</span>
                    <span className="text-xs text-gray-500 line-through">₹{item.originalPrice}</span>
                  </div>
                  <button className="p-1.5 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <Heart className="w-3 h-3 text-purple-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
