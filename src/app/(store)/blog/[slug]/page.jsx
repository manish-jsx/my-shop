// src/app/(store)/blog/[slug]/page.jsx
'use client'
import { use } from 'react'
import { Card, CardBody, Chip, Button, Divider } from '@nextui-org/react'
import { Calendar, User, Clock, Eye, ArrowLeft, Share2, Heart, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getPostBySlug, getRecentPosts, blogCategories } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { useState } from 'react'

export default function BlogPostPage({ params }) {
  const [isLiked, setIsLiked] = useState(false)
  const resolvedParams = use(params)
  const post = getPostBySlug(resolvedParams.slug)
  const recentPosts = getRecentPosts(3).filter(p => p.id !== post?.id)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/blog">
            <Button variant="flat" startContent={<ArrowLeft className="w-4 h-4" />}>
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden">
                {/* Featured Image */}
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-purple-500 to-pink-500">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4">
                    <Chip color="primary" variant="solid">
                      {blogCategories.find(cat => cat.id === post.category)?.name}
                    </Chip>
                  </div>
                </div>

                <CardBody className="p-8">
                  {/* Article Header */}
                  <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                      {post.title}
                    </h1>
                    
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                      {post.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} min read</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{post.views} views</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <Chip key={tag} size="sm" variant="flat" color="secondary">
                          {tag}
                        </Chip>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                      <Button
                        variant="flat"
                        color={isLiked ? "danger" : "default"}
                        startContent={<Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />}
                        onPress={() => setIsLiked(!isLiked)}
                      >
                        {isLiked ? 'Liked' : 'Like'}
                      </Button>
                      <Button
                        variant="flat"
                        startContent={<Share2 className="w-4 h-4" />}
                        onPress={handleShare}
                      >
                        Share
                      </Button>
                    </div>
                  </header>

                  <Divider className="mb-8" />

                  {/* Article Content */}
                  <div 
                    className="prose prose-lg max-w-none dark:prose-invert prose-purple"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  <Divider className="my-8" />

                  {/* Author Bio */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{post.author}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Expert gemologist and jewelry specialist with over 15 years of experience in the industry. 
                          Passionate about educating others about the beauty and healing properties of gemstones.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Recent Posts */}
              <Card>
                <CardBody className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Recent Articles
                  </h3>
                  <div className="space-y-4">
                    {recentPosts.map((recentPost) => (
                      <Link key={recentPost.id} href={`/blog/${recentPost.slug}`}>
                        <div className="group cursor-pointer">
                          <div className="aspect-video bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-lg mb-3" />
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                            {recentPost.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(recentPost.publishedAt)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Categories */}
              <Card>
                <CardBody className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {blogCategories.map((category) => (
                      <Link key={category.id} href={`/blog?category=${category.id}`}>
                        <Button
                          variant="flat"
                          size="sm"
                          className="w-full justify-start"
                        >
                          {category.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <CardBody className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Get the latest gemstone insights delivered to your inbox
                  </p>
                  <Link href="/newsletter">
                    <Button variant="flat" className="bg-white/20 text-white w-full">
                      Subscribe to Newsletter
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
