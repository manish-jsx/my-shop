// src/components/mobile/MobileSearchBar.jsx
'use client'
import { useState } from 'react'
import { Search, Mic, Camera, Filter } from 'lucide-react'

export default function MobileSearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isVoiceSearch, setIsVoiceSearch] = useState(false)

  return (
    <div className="px-4 py-3 bg-white border-b">
      <div className="relative flex items-center space-x-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands..."
            className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
            <button 
              onClick={() => setIsVoiceSearch(!isVoiceSearch)}
              className={`p-1.5 rounded-full transition-colors ${
                isVoiceSearch ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Mic className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filter Button */}
        <button className="p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
          <Filter className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Quick Search Tags */}
      <div className="flex space-x-2 mt-3 overflow-x-auto scrollbar-hide">
        {['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports', 'Books'].map((tag) => (
          <button
            key={tag}
            className="flex-shrink-0 px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-full hover:bg-blue-100 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
