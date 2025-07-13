// src/components/mobile/sakura/MobileSakuraCart.jsx
'use client'
import { useState } from 'react'
import { Minus, Plus, Trash2, Heart, ArrowLeft, ShoppingBag, Sparkles, Crown, Gift } from 'lucide-react'
import Link from 'next/link'

export default function MobileSakuraCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Amethyst Crystal Cluster',
      price: 2499,
      originalPrice: 3999,
      quantity: 1,
      properties: ['Healing', 'Meditation', 'Clarity'],
      inStock: true,
      certified: true,
      variant: 'Premium Grade A, 250g'
    },
    {
      id: 2,
      name: 'Rose Quartz Heart',
      price: 899,
      originalPrice: 1299,
      quantity: 2,
      properties: ['Love', 'Self-care', 'Emotional healing'],
      inStock: true,
      certified: false,
      variant: 'Medium Size, Polished'
    },
    {
      id: 3,
      name: 'Clear Quartz Sphere',
      price: 1799,
      originalPrice: 2299,
      quantity: 1,
      properties: ['Amplification', 'Clarity', 'Energy'],
      inStock: false,
      certified: true,
      variant: '6cm diameter, A+ Grade'
    }
  ])

  const [promoCode, setPromoCode] = useState('')
  const [showPromoInput, setShowPromoInput] = useState(false)

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const moveToWishlist = (id) => {
    // Move to wishlist logic
    removeItem(id)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0)
  const shipping = subtotal > 199900 ? 0 : 500 // Free shipping over ₹1,999
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-12 h-12 text-purple-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">Your cart is empty</h3>
            <p className="text-gray-600 max-w-sm">
              Start your gemstone journey! Add some beautiful crystals to your cart.
            </p>
          </div>
          <Link 
            href="/products"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            Explore Gems
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-6 h-6 text-purple-500" />
          <div>
            <h2 className="text-lg font-bold text-gray-900">Your Gemstone Cart</h2>
            <p className="text-sm text-gray-600">{cartItems.length} sacred items</p>
          </div>
        </div>
        <button className="text-sm text-purple-600 font-semibold">
          Clear All
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 px-4">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl shadow-sm border p-5 hover:shadow-md transition-shadow">
            <div className="flex space-x-4">
              {/* Product Image */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl"></div>
                
                {/* Certification Badge */}
                {item.certified && (
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                  {item.name}
                </h3>
                
                <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                  {item.variant}
                </p>

                {/* Properties */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.properties.slice(0, 2).map((prop, index) => (
                    <span key={index} className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
                      {prop}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <span className="font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    Save ₹{(item.originalPrice - item.price).toLocaleString()}
                  </span>
                </div>

                {!item.inStock && (
                  <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full inline-block mb-2">
                    Temporarily Out of Stock
                  </div>
                )}

                {/* Quantity and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center bg-purple-50 rounded-xl">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-purple-100 rounded-l-xl transition-colors"
                        disabled={!item.inStock}
                      >
                        <Minus className="w-4 h-4 text-purple-600" />
                      </button>
                      <span className="px-4 py-2 text-sm font-semibold min-w-[50px] text-center text-purple-600">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-purple-100 rounded-r-xl transition-colors"
                        disabled={!item.inStock}
                      >
                        <Plus className="w-4 h-4 text-purple-600" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => moveToWishlist(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code Section */}
      <div className="px-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
          {!showPromoInput ? (
            <button
              onClick={() => setShowPromoInput(true)}
              className="flex items-center space-x-2 text-green-600 font-semibold"
            >
              <Gift className="w-5 h-5" />
              <span>Apply Promo Code for Extra Savings</span>
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter SAKURA20 for 20% off"
                  className="flex-1 px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                  Apply
                </button>
              </div>
              <button
                onClick={() => setShowPromoInput(false)}
                className="text-sm text-gray-500"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div className="px-4">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span>Order Summary</span>
          </h3>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">₹{subtotal.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">You Save</span>
            <span className="text-green-600 font-semibold">-₹{savings.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className={shipping === 0 ? "text-green-600 font-semibold" : "text-gray-900"}>
              {shipping === 0 ? 'FREE ✨' : `₹${shipping.toLocaleString()}`}
            </span>
          </div>
          
          {shipping > 0 && (
            <div className="text-xs text-purple-600 bg-purple-100 p-2 rounded-xl">
              💎 Add ₹{(199900 - subtotal).toLocaleString()} more for FREE shipping
            </div>
          )}
          
          <div className="border-t border-purple-200 pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span className="text-gray-900">Total</span>
              <span className="text-purple-600">₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-20 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-purple-100 p-4 z-30">
        <div className="flex space-x-3">
          <Link 
            href="/products"
            className="flex-1 py-4 border-2 border-purple-200 text-purple-600 rounded-2xl font-semibold text-center hover:bg-purple-50 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/checkout"
            className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold text-center hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>Secure Checkout</span>
            <Crown className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
