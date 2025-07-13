// src/components/products/ProductDetailView.jsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card, Chip } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { Star, Heart, MessageCircle, Phone } from 'lucide-react'
import SimilarProducts from './SimilarProducts'
import QuoteRequestForm from '@/components/forms/QuoteRequestForm'
import SocialMediaLinks from '@/components/ui/SocialMediaLinks'
import ReviewSummary from '@/components/reviews/ReviewSummary'
import ReviewList from '@/components/reviews/ReviewList'
import ReviewForm from '@/components/reviews/ReviewForm'
import RatingDisplay from '@/components/reviews/RatingDisplay'
import { useReviews } from '@/hooks/useReviews'
import { useToast } from '@/hooks/useToast'

export default function ProductDetailView({ product }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  
  // Reviews functionality
  const { reviews, loading: reviewsLoading, statistics, addReview, markHelpful, reportReview } = useReviews(product.id)
  const { showToast } = useToast()

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleReviewSubmit = async (reviewData) => {
    try {
      await addReview(reviewData)
      showToast('Review submitted successfully! It will be visible after moderation.', 'success')
    } catch (error) {
      showToast('Failed to submit review. Please try again.', 'error')
    }
  }

  const handleReviewHelpful = async (reviewId) => {
    try {
      await markHelpful(reviewId)
    } catch (error) {
      showToast('Failed to mark review as helpful', 'error')
    }
  }

  const handleReviewReport = async (reviewId) => {
    try {
      await reportReview(reviewId, 'Inappropriate content')
      showToast('Review reported successfully', 'success')
    } catch (error) {
      showToast('Failed to report review', 'error')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square rounded-lg overflow-hidden"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <Chip color="primary" variant="flat" className="mb-2">
              {product.category}
            </Chip>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2">
              <RatingDisplay 
                rating={statistics.averageRating > 0 ? statistics.averageRating : product.rating}
                reviewCount={statistics.total > 0 ? statistics.total : product.reviews}
                size="lg"
                showLabel
              />
            </div>
            <p className="text-2xl font-semibold mt-2">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <p className="text-gray-600">
            {product.description}
          </p>

          <hr className="border-gray-200" />

          {/* Specifications */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              {product.specifications?.map((spec) => (
                <div key={spec.name}>
                  <p className="text-sm text-gray-600">{spec.name}</p>
                  <p className="font-medium">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="flat"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                size="sm"
                variant="flat"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>

            <div className="flex gap-4">
              <Button
                color="primary"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              <Button
                size="lg"
                variant="flat"
                isIconOnly
              >
                <Heart />
              </Button>
            </div>
          </div>

          {/* Stock Status */}
          {product.stock < 5 && product.stock > 0 && (
            <p className="text-warning">
              Only {product.stock} items left in stock!
            </p>
          )}

          <hr className="border-gray-200" />

          {/* Loyalty Points & Bundle Offers */}
          {(product.loyaltyPoints || product.bundleOffers?.length > 0) && (
            <div className="space-y-4">
              {product.loyaltyPoints && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm">
                    Earn <span className="font-semibold">{product.loyaltyPoints} loyalty points</span> with this purchase
                  </span>
                </div>
              )}
              
              {product.bundleOffers?.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Bundle Offers Available:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.bundleOffers.map((offer, index) => (
                      <Chip key={index} size="sm" color="success" variant="flat">
                        {offer}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <hr className="border-gray-200" />

          {/* Add consultation CTA */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">Need Expert Advice?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Our gemstone experts can help you with certification, customization, and investment advice.
            </p>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                color="primary" 
                variant="flat"
                onPress={() => setShowQuoteForm(true)}
                startContent={<MessageCircle className="w-4 h-4" />}
              >
                Get Consultation
              </Button>
              <Button 
                size="sm" 
                variant="bordered"
                startContent={<Phone className="w-4 h-4" />}
              >
                Call Expert
              </Button>
            </div>
          </div>

          <hr className="border-gray-200" />

        </motion.div>
      </div>

      {/* Expert Consultation Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 text-center space-y-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Interested in This Gemstone?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Get personalized advice, custom sizing, certification details, or investment guidance 
            for this specific gemstone from our certified experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              color="primary" 
              size="lg"
              onPress={() => setShowQuoteForm(true)}
              startContent={<MessageCircle className="w-4 h-4" />}
            >
              Request Consultation
            </Button>
            <Button 
              variant="bordered" 
              size="lg"
              startContent={<Phone className="w-4 h-4" />}
            >
              Speak to Expert: +1 (555) 123-GEMS
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Share This Gemstone */}
      <section className="text-center mb-12">
        <h3 className="text-lg font-semibold mb-4">Share This Beautiful Gemstone</h3>
        <div className="flex justify-center">
          <SocialMediaLinks variant="share" productName={product.name} />
        </div>
      </section>

      {/* Similar Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
        <SimilarProducts 
          currentProductId={product.id} 
          category={product.category} 
        />
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
        
        {/* Review Summary */}
        <ReviewSummary 
          reviews={reviews}
          onWriteReview={() => setShowReviewForm(true)}
        />
        
        {/* Review List */}
        {!reviewsLoading && (
          <ReviewList
            reviews={reviews}
            onHelpful={handleReviewHelpful}
            onReport={handleReviewReport}
          />
        )}
        
        {reviewsLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading reviews...</p>
          </div>
        )}
      </div>

      {/* Quote Request Modal */}
      <QuoteRequestForm 
        isOpen={showQuoteForm} 
        onClose={() => setShowQuoteForm(false)}
        productInfo={{
          name: product.name,
          price: product.price,
          category: product.category,
          id: product.id
        }}
      />

      {/* Review Form Modal */}
      <ReviewForm
        isOpen={showReviewForm}
        onClose={() => setShowReviewForm(false)}
        productId={product.id}
        productName={product.name}
        onSubmit={handleReviewSubmit}
      />
    </div>
  )
}