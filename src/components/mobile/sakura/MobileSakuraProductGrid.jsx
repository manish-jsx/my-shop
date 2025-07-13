// src/components/mobile/sakura/MobileSakuraProductGrid.jsx
'use client'
import { useState } from 'react'
import { Grid, List, Filter, SlidersHorizontal, Crown, Star, Sparkles } from 'lucide-react'
import MobileSakuraProductCard from './MobileSakuraProductCard'

export default function MobileSakuraProductGrid({ products = [] }) {
  const [layout, setLayout] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    priceRange: 'all',
    properties: [],
    certification: 'all'
  })

  const mockGemProducts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: [
      'Amethyst Crystal Cluster',
      'Rose Quartz Heart',
      'Clear Quartz Sphere',
      'Citrine Tumbled Stone',
      'Black Tourmaline Raw',
      'Labradorite Palm Stone',
      'Selenite Wand',
      'Tiger Eye Bracelet',
      'Moonstone Ring',
      'Obsidian Arrowhead',
      'Green Aventurine',
      'Fluorite Octahedron'
    ][i],
    price: [2499, 899, 1799, 599, 1299, 1099, 799, 1999, 4999, 699, 549, 3499][i],
    originalPrice: [3999, 1299, 2299, 899, 1899, 1599, 1199, 2999, 6999, 999, 799, 4999][i],
    rating: 4.5 + (i % 5) / 10,
    reviews: (i + 1) * 50 + Math.floor(Math.random() * 100),
    properties: [
      ['Healing', 'Meditation', 'Clarity'],
      ['Love', 'Self-care', 'Emotional'],
      ['Amplification', 'Clarity', 'Energy'],
      ['Abundance', 'Confidence', 'Joy'],
      ['Protection', 'Grounding', 'Cleansing'],
      ['Transformation', 'Intuition', 'Magic'],
      ['Cleansing', 'Charging', 'Purification'],
      ['Courage', 'Confidence', 'Grounding'],
      ['Love', 'Intuition', 'Femininity'],
      ['Protection', 'Grounding', 'Truth'],
      ['Luck', 'Opportunity', 'Heart'],
      ['Focus', 'Learning', 'Concentration']
    ][i],
    certified: i % 3 === 0,
    featured: i % 4 === 0,
    category: ['crystals', 'jewelry', 'raw-stones', 'tumbled'][i % 4]
  }))

  const displayProducts = products.length > 0 ? products : mockGemProducts

  const filterOptions = {
    categories: [
      { value: 'all', label: 'All Categories' },
      { value: 'crystals', label: 'Healing Crystals' },
      { value: 'jewelry', label: 'Gemstone Jewelry' },
      { value: 'raw-stones', label: 'Raw Stones' },
      { value: 'tumbled', label: 'Tumbled Stones' }
    ],
    priceRanges: [
      { value: 'all', label: 'All Prices' },
      { value: '0-500', label: 'Under ₹500' },
      { value: '500-1000', label: '₹500 - ₹1,000' },
      { value: '1000-2500', label: '₹1,000 - ₹2,500' },
      { value: '2500+', label: 'Above ₹2,500' }
    ],
    properties: [
      'Healing', 'Meditation', 'Love', 'Protection', 'Abundance', 
      'Clarity', 'Energy', 'Grounding', 'Intuition', 'Confidence'
    ],
    certifications: [
      { value: 'all', label: 'All Products' },
      { value: 'certified', label: 'Certified Only' },
      { value: 'uncertified', label: 'Regular Gems' }
    ]
  }

  const applyFilter = (key, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const toggleProperty = (property) => {
    setSelectedFilters(prev => ({
      ...prev,
      properties: prev.properties.includes(property)
        ? prev.properties.filter(p => p !== property)
        : [...prev.properties, property]
    }))
  }

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-bold text-gray-900">
            {displayProducts.length} Gems
          </h2>
          <Sparkles className="w-5 h-5 text-purple-500" />
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

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(true)}
            className="p-2 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors relative"
          >
            <SlidersHorizontal className="w-4 h-4 text-purple-600" />
            {(selectedFilters.category !== 'all' || selectedFilters.properties.length > 0) && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            )}
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedFilters.category !== 'all' || selectedFilters.properties.length > 0) && (
        <div className="px-4">
          <div className="flex flex-wrap gap-2">
            {selectedFilters.category !== 'all' && (
              <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full flex items-center space-x-1">
                <span>{filterOptions.categories.find(c => c.value === selectedFilters.category)?.label}</span>
                <button onClick={() => applyFilter('category', 'all')} className="ml-1">×</button>
              </span>
            )}
            {selectedFilters.properties.map(prop => (
              <span key={prop} className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full flex items-center space-x-1">
                <span>{prop}</span>
                <button onClick={() => toggleProperty(prop)} className="ml-1">×</button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Product Grid/List */}
      <div className="px-4">
        {layout === 'grid' ? (
          <div className="grid grid-cols-2 gap-4">
            {displayProducts.map((product) => (
              <MobileSakuraProductCard 
                key={product.id} 
                product={product} 
                layout="grid"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {displayProducts.map((product) => (
              <MobileSakuraProductCard 
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Filter Gems</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>Category</span>
                </h4>
                <div className="space-y-2">
                  {filterOptions.categories.map((category) => (
                    <label key={category.value} className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="category" 
                        value={category.value}
                        checked={selectedFilters.category === category.value}
                        onChange={(e) => applyFilter('category', e.target.value)}
                        className="w-4 h-4 text-purple-600 border-purple-300 focus:ring-purple-500" 
                      />
                      <span className="text-gray-700">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {filterOptions.priceRanges.map((range) => (
                    <label key={range.value} className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="priceRange" 
                        value={range.value}
                        checked={selectedFilters.priceRange === range.value}
                        onChange={(e) => applyFilter('priceRange', e.target.value)}
                        className="w-4 h-4 text-purple-600 border-purple-300 focus:ring-purple-500" 
                      />
                      <span className="text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gemstone Properties */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Star className="w-4 h-4 text-purple-500" />
                  <span>Properties</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {filterOptions.properties.map((property) => (
                    <label key={property} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={selectedFilters.properties.includes(property)}
                        onChange={() => toggleProperty(property)}
                        className="w-4 h-4 text-purple-600 border-purple-300 focus:ring-purple-500 rounded" 
                      />
                      <span className="text-sm text-gray-700">{property}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Certification */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <span>Certification</span>
                </h4>
                <div className="space-y-2">
                  {filterOptions.certifications.map((cert) => (
                    <label key={cert.value} className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="certification" 
                        value={cert.value}
                        checked={selectedFilters.certification === cert.value}
                        onChange={(e) => applyFilter('certification', e.target.value)}
                        className="w-4 h-4 text-purple-600 border-purple-300 focus:ring-purple-500" 
                      />
                      <span className="text-gray-700">{cert.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-8 pt-6 border-t">
              <button 
                onClick={() => {
                  setSelectedFilters({
                    category: 'all',
                    priceRange: 'all',
                    properties: [],
                    certification: 'all'
                  })
                }}
                className="flex-1 py-3 border border-purple-300 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
              >
                Clear All
              </button>
              <button 
                onClick={() => setShowFilters(false)}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
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
