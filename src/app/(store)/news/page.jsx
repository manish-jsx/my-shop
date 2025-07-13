// src/app/(store)/news/page.jsx
'use client'
import { useState } from 'react'
import { Card, CardBody, Button, Input, Chip, Tabs, Tab } from '@nextui-org/react'
import { Calendar, User, ArrowRight, Search, Newspaper, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { blogPosts, blogCategories } from '@/lib/blog'

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState('all')

  // Filter for news-related content
  const newsCategories = ['industry-news', 'company-updates']
  const newsPosts = blogPosts.filter(post => 
    newsCategories.includes(post.category) && post.status === 'published'
  )

  const filteredNews = newsPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = selectedTab === 'all' || post.category === selectedTab
    return matchesSearch && matchesTab
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const latestNews = filteredNews.slice(0, 1)[0]
  const otherNews = filteredNews.slice(1)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Newspaper className="w-12 h-12" />
              <h1 className="text-4xl md:text-6xl font-bold">
                News & Updates
              </h1>
            </div>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Stay informed with the latest news from SHUKRA Gems and the gemstone industry
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <section className="mb-12">
          <Card>
            <CardBody className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <Input
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={<Search className="w-4 h-4 text-gray-400" />}
                  className="md:flex-1"
                />
                <Tabs
                  selectedKey={selectedTab}
                  onSelectionChange={setSelectedTab}
                  color="primary"
                  variant="bordered"
                >
                  <Tab key="all" title="All News" />
                  <Tab key="industry-news" title="Industry News" />
                  <Tab key="company-updates" title="Company Updates" />
                </Tabs>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Latest News Highlight */}
        {latestNews && (
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto bg-gradient-to-br from-blue-500 to-purple-500">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4">
                      <Chip color="primary" variant="solid" className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Latest News
                      </Chip>
                    </div>
                  </div>
                  <CardBody className="p-8 flex flex-col justify-center">
                    <Chip size="sm" variant="flat" color="secondary" className="mb-4 w-fit">
                      {blogCategories.find(cat => cat.id === latestNews.category)?.name}
                    </Chip>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {latestNews.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                      {latestNews.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(latestNews.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {latestNews.author}
                      </span>
                    </div>
                    <Link href={`/blog/${latestNews.slug}`}>
                      <Button color="primary" size="lg" className="w-fit">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardBody>
                </div>
              </Card>
            </motion.div>
          </section>
        )}

        {/* News Grid */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {selectedTab === 'all' ? 'All News' : 
               selectedTab === 'industry-news' ? 'Industry News' : 'Company Updates'}
            </h2>
            <span className="text-gray-500">
              {filteredNews.length} article{filteredNews.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherNews.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800" />
                    <div className="absolute top-4 left-4">
                      <Chip size="sm" color="primary" variant="flat">
                        {post.category === 'industry-news' ? 'Industry' : 'Company'}
                      </Chip>
                    </div>
                  </div>
                  <CardBody className="p-6">
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span>{post.author}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <Button size="sm" variant="flat" color="primary" className="w-full">
                        Read More
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Newspaper className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No news found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardBody className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Be the first to know about new product launches, industry insights, and company updates
              </p>
              <Link href="/newsletter">
                <Button size="lg" variant="flat" className="bg-white/20 text-white hover:bg-white/30">
                  Subscribe to Our Newsletter
                </Button>
              </Link>
            </CardBody>
          </Card>
        </section>
      </div>
    </div>
  )
}
