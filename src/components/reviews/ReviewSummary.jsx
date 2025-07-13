// src/components/reviews/ReviewSummary.jsx
'use client'
import { Card, CardBody, Progress, Button, Chip } from '@nextui-org/react'
import { Star, MessageCircle, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ReviewSummary({ reviews = [], onWriteReview }) {
  // Calculate statistics
  const totalReviews = reviews.length
  const averageRating = totalReviews > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
    : 0

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(review => review.rating === rating).length
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
    return { rating, count, percentage }
  })

  // Recent trends
  const recentReviews = reviews.slice(-10) // Last 10 reviews
  const recentAverage = recentReviews.length > 0 
    ? recentReviews.reduce((sum, review) => sum + review.rating, 0) / recentReviews.length 
    : 0

  const formatRating = (rating) => {
    return rating.toFixed(1)
  }

  const getRatingLabel = (rating) => {
    if (rating >= 4.5) return 'Excellent'
    if (rating >= 4.0) return 'Very Good'
    if (rating >= 3.0) return 'Good'
    if (rating >= 2.0) return 'Fair'
    return 'Poor'
  }

  const getRatingColor = (rating) => {
    if (rating >= 4.0) return 'success'
    if (rating >= 3.0) return 'warning'
    return 'danger'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Overall Rating Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardBody className="p-6">
            <div className="text-center space-y-4">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {formatRating(averageRating)}
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(averageRating) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-gray-300"}
                    />
                  ))}
                </div>
                <Chip 
                  color={getRatingColor(averageRating)} 
                  variant="flat"
                  className="mb-2"
                >
                  {getRatingLabel(averageRating)}
                </Chip>
                <p className="text-sm text-gray-600">
                  Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Recent Trend */}
              {recentReviews.length > 0 && (
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <BarChart3 size={16} />
                    <span>Recent trend: {formatRating(recentAverage)}</span>
                    <Chip size="sm" color={recentAverage > averageRating ? 'success' : 'warning'}>
                      {recentAverage > averageRating ? '↗' : recentAverage < averageRating ? '↘' : '→'}
                    </Chip>
                  </div>
                </div>
              )}

              <Button 
                color="primary" 
                variant="flat"
                onClick={onWriteReview}
                startContent={<MessageCircle size={18} />}
                className="w-full"
              >
                Write a Review
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Rating Distribution */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold mb-4">Rating Breakdown</h3>
            <div className="space-y-3">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm">{rating}</span>
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <Progress 
                      value={percentage} 
                      color="warning"
                      size="sm"
                      className="max-w-full"
                    />
                  </div>
                  <div className="text-sm text-gray-600 w-16 text-right">
                    {count} ({percentage.toFixed(0)}%)
                  </div>
                </div>
              ))}
            </div>

            {totalReviews === 0 && (
              <div className="text-center text-gray-500 py-4">
                <MessageCircle className="mx-auto mb-2" size={32} />
                <p>No reviews yet</p>
                <p className="text-sm">Be the first to review this product!</p>
              </div>
            )}
          </CardBody>
        </Card>
      </motion.div>
    </div>
  )
}
