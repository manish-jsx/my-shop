// src/components/reviews/FeaturedReviews.jsx
'use client'
import { Card, CardBody, Chip, Avatar } from '@nextui-org/react'
import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FeaturedReviews({ reviews = [] }) {
  // Get top 3 featured reviews (highest rated with photos)
  const featuredReviews = reviews
    .filter(review => review.rating >= 4 && review.status === 'approved')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  if (featuredReviews.length === 0) {
    return null
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Chip 
            color="primary" 
            variant="flat" 
            className="mb-4"
            startContent={<Quote className="w-4 h-4" />}
          >
            Customer Love
          </Chip>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real stories from real customers who found their perfect gemstones
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardBody className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-gray-300"}
                        />
                      ))}
                    </div>
                    {review.verifiedPurchase && (
                      <Chip size="sm" color="success" variant="flat">
                        Verified
                      </Chip>
                    )}
                  </div>

                  {/* Review Content */}
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-4 leading-relaxed">
                    "{review.comment}"
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={review.userAvatar}
                        name={review.userName}
                        size="sm"
                      />
                      <div>
                        <p className="font-semibold text-sm">{review.userName}</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Product Link */}
                    <Link 
                      href={`/products/details/${review.productId}`}
                      className="text-xs text-primary hover:underline"
                    >
                      View Product
                    </Link>
                  </div>

                  {/* Product Name */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Purchase: {review.productName}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Join thousands of satisfied customers who found their perfect gemstone
          </p>
          <Link 
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Shop Gemstones
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
