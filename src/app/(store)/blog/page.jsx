// src/app/(store)/blog/page.jsx
'use client'
import { useState } from 'react'
import { Card, CardBody, CardHeader, Button, Input, Chip, Select, SelectItem } from '@nextui-org/react'
import { Search, Calendar, User, Eye, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { blogPosts, blogCategories, getFeaturedPosts, getRecentPosts, getAllTags } from '@/lib/blog'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState('all')
  
  const featuredPosts = getFeaturedPosts(3)
  const recentPosts = getRecentPosts(6)
  const allTags = getAllTags()

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag)
    const isPublished = post.status === 'published'
    
    return matchesSearch && matchesCategory && matchesTag && isPublished
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              SHUKRA Gems Blog
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Discover the fascinating world of gemstones, healing crystals, and jewelry care
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500" />
                    <Chip 
                      color="primary" 
                      variant="solid" 
                      className="absolute top-4 left-4 z-10"
                    >
                      Featured
                    </Chip>
                  </div>
                  <CardBody className="p-6">
                    <Chip size="sm" variant="flat" color="secondary" className="mb-3">
                      {blogCategories.find(cat => cat.id === post.category)?.name}
                    </Chip>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime} min
                        </span>
                      </div>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button color="primary" variant="flat" className="w-full">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Search and Filters */}
        <section className="mb-12">
          <Card>
            <CardBody className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={<Search className="w-4 h-4 text-gray-400" />}
                  className="md:flex-1"
                />
                <Select
                  placeholder="All Categories"
                  selectedKeys={selectedCategory !== 'all' ? [selectedCategory] : []}
                  onSelectionChange={(keys) => setSelectedCategory(Array.from(keys)[0] || 'all')}
                  className="md:w-64"
                >
                  <SelectItem key="all">All Categories</SelectItem>
                  {blogCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  placeholder="All Tags"
                  selectedKeys={selectedTag !== 'all' ? [selectedTag] : []}
                  onSelectionChange={(keys) => setSelectedTag(Array.from(keys)[0] || 'all')}
                  className="md:w-48"
                >
                  <SelectItem key="all">All Tags</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Blog Posts Grid */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {selectedCategory === 'all' ? 'All Articles' : 
               blogCategories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <span className="text-gray-500">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800" />
                  </div>
                  <CardBody className="p-6">
                    <Chip size="sm" variant="flat" color="primary" className="mb-3">
                      {blogCategories.find(cat => cat.id === post.category)?.name}
                    </Chip>
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Chip key={tag} size="tiny" variant="flat" color="secondary">
                          {tag}
                        </Chip>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}m
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views}
                        </span>
                      </div>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <Button size="sm" variant="flat" color="primary" className="w-full">
                        Read Article
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
