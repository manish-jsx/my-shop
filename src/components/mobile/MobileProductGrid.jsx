// src/components/mobile/MobileProductGrid.jsx
'use client'
import { useState } from 'react'
import { Grid, List, Filter, SlidersHorizontal } from 'lucide-react'
import MobileProductCard from './MobileProductCard'

export default function MobileProductGrid({ products = [] }) {
  const [layout, setLayout] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  const mockProducts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    price: `₹${(i + 1) * 100}`,
    originalPrice: `₹${(i + 1) * 150}`,
    rating: 4.0 + (i % 10) / 10,
    reviews: (i + 1) * 100,
    image: `/api/placeholder/200/200`
  }))

  const displayProducts = products.length > 0 ? products : mockProducts

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-900">
            {displayProducts.length} Products
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Layout Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setLayout('grid')}
              className={`p-2 rounded-md transition-colors ${
                layout === 'grid' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`p-2 rounded-md transition-colors ${
                layout === 'list' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(true)}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Product Grid/List */}
      <div className="px-4">
        {layout === 'grid' ? (
          <div className="grid grid-cols-2 gap-4">
            {displayProducts.map((product) => (
              <MobileProductCard 
                key={product.id} 
                product={product} 
                layout="grid"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {displayProducts.map((product) => (
              <MobileProductCard 
                key={product.id} 
                product={product} 
                layout="list"
              />
            ))}
          </div>
        )}
      </div>

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', 'Above ₹2000'].map((range) => (
                    <label key={range} className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                <div className="space-y-2">
                  {['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony'].map((brand) => (
                    <label key={brand} className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
                <div className="space-y-2">
                  {['4★ & above', '3★ & above', '2★ & above', '1★ & above'].map((rating) => (
                    <label key={rating} className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button 
                onClick={() => setShowFilters(false)}
                className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
              <button 
                onClick={() => setShowFilters(false)}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
