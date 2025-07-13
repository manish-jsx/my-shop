// src/app/(store)/products/page.jsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Select, SelectItem, Input, Button, Chip, Card, CardBody } from '@nextui-org/react'
import Link from 'next/link'
import ProductGrid from '@/components/products/ProductGrid'
import { products, categories, collections } from '@/lib/products'
import PageTransition from '@/components/ui/PageTransition'
import QuoteRequestForm from '@/components/forms/QuoteRequestForm'
import NewsletterForm from '@/components/forms/NewsletterForm'
import SocialMediaLinks from '@/components/ui/SocialMediaLinks'
import { Search, Filter, SlidersHorizontal, Sparkles, HelpCircle, MessageCircle } from 'lucide-react'
import { useMobile } from '@/hooks/useMobile'
import MobileSakuraLayout from '@/components/mobile/sakura/MobileSakuraLayout'
import MobileSakuraProductGrid from '@/components/mobile/sakura/MobileSakuraProductGrid'

export default function ProductsPage() {
  const isMobile = useMobile()
  const [filters, setFilters] = useState({
    category: 'all',
    collection: 'all',
    priceRange: 'all',
    search: ''
  })
  const [showFilters, setShowFilters] = useState(false)
  const [showQuoteForm, setShowQuoteForm] = useState(false)

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-500', label: 'Under $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000-2500', label: '$1,000 - $2,500' },
    { value: '2500+', label: '$2,500+' }
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = filters.category === 'all' || product.category === filters.category
    const matchesCollection = filters.collection === 'all' || product.collection === filters.collection
    const matchesSearch = !filters.search || 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.search.toLowerCase())
    
    // Price filtering logic would go here
    const matchesPrice = filters.priceRange === 'all' // Simplified for now
    
    return matchesCategory && matchesCollection && matchesSearch && matchesPrice
  })

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Show mobile UI on mobile devices
  if (isMobile) {
    return (
      <MobileSakuraLayout showHeader={true}>
        <MobileSakuraProductGrid products={filteredProducts} />
      </MobileSakuraLayout>
    )
  }

  return (
    <PageTransition>
      <div className="space-y-12">
        {/* Header Section */}
        <section className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <Chip 
              color="primary" 
              variant="flat" 
              startContent={<Sparkles className="w-4 h-4" />}
            >
              Explore Our Collection
            </Chip>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Premium Gemstone Collection
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover authentic gemstones, healing crystals, and luxury jewelry crafted with precision and care.
            </p>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-4 justify-between items-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Select
                size="sm"
                value={filters.category}
                onSelectionChange={(value) => handleFilterChange('category', value)}
                className="w-full sm:w-48"
                placeholder="Select Category"
              >
                <SelectItem key="all" value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </Select>

              <Select
                size="sm"
                value={filters.collection}
                onSelectionChange={(value) => handleFilterChange('collection', value)}
                className="w-full sm:w-48"
                placeholder="Select Collection"
              >
                <SelectItem key="all" value="all">All Collections</SelectItem>
                {collections.map((collection) => (
                  <SelectItem key={collection.id} value={collection.id}>
                    {collection.name}
                  </SelectItem>
                ))}
              </Select>

              <Select
                size="sm"
                value={filters.priceRange}
                onSelectionChange={(value) => handleFilterChange('priceRange', value)}
                className="w-full sm:w-48"
                placeholder="Price Range"
              >
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="flex gap-4 w-full lg:w-auto">
              <Input
                size="sm"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full lg:w-64"
                startContent={<Search className="w-4 h-4" />}
              />
              <Button
                size="sm"
                variant="flat"
                isIconOnly
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Active Filters */}
          {(filters.category !== 'all' || filters.collection !== 'all' || filters.priceRange !== 'all' || filters.search) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {filters.category !== 'all' && (
                <Chip
                  color="primary"
                  variant="flat"
                  onClose={() => handleFilterChange('category', 'all')}
                >
                  Category: {categories.find(c => c.id === filters.category)?.name}
                </Chip>
              )}
              {filters.collection !== 'all' && (
                <Chip
                  color="primary"
                  variant="flat"
                  onClose={() => handleFilterChange('collection', 'all')}
                >
                  Collection: {collections.find(c => c.id === filters.collection)?.name}
                </Chip>
              )}
              {filters.priceRange !== 'all' && (
                <Chip
                  color="primary"
                  variant="flat"
                  onClose={() => handleFilterChange('priceRange', 'all')}
                >
                  Price: {priceRanges.find(r => r.value === filters.priceRange)?.label}
                </Chip>
              )}
              {filters.search && (
                <Chip
                  color="primary"
                  variant="flat"
                  onClose={() => handleFilterChange('search', '')}
                >
                  Search: "{filters.search}"
                </Chip>
              )}
            </motion.div>
          )}
        </section>

        {/* Products Grid */}
        <section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filteredProducts.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600 dark:text-gray-400">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                </div>
                <ProductGrid products={filteredProducts} />
              </>
            ) : (
              <Card className="text-center py-12">
                <CardBody>
                  <div className="space-y-4">
                    <Search className="w-12 h-12 text-gray-400 mx-auto" />
                    <h3 className="text-xl font-semibold">No products found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your filters or search terms
                    </p>
                    <Button
                      color="primary"
                      onPress={() => setFilters({
                        category: 'all',
                        collection: 'all',
                        priceRange: 'all',
                        search: ''
                      })}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </CardBody>
              </Card>
            )}
          </motion.div>
        </section>

        {/* Need Help Section */}
        <section className="text-center space-y-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <HelpCircle className="w-12 h-12 text-purple-600 mx-auto" />
            <h3 className="text-2xl font-bold">Need Help Choosing?</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our gemstone experts are here to guide you. Get personalized recommendations 
              based on your needs, budget, and astrological requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                color="primary"
                size="lg"
                startContent={<MessageCircle className="w-5 h-5" />}
                onPress={() => setShowQuoteForm(true)}
              >
                Get Expert Consultation
              </Button>
              <Button
                variant="bordered"
                size="lg"
                as={Link}
                href="/contact"
              >
                Contact Support
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Newsletter Section */}
        <section className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <NewsletterForm />
          </motion.div>
        </section>

        {/* Social Media Section */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">Follow Our Gemstone Journey</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Discover new arrivals, gemstone education, and customer stories
            </p>
            <div className="flex justify-center">
              <SocialMediaLinks showLabels />
            </div>
          </motion.div>
        </section>

        {/* Quote Request Modal */}
        <QuoteRequestForm 
          isOpen={showQuoteForm} 
          onClose={() => setShowQuoteForm(false)}
        />
      </div>
    </PageTransition>
  )
}
