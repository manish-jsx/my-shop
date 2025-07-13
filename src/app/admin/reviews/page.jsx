// src/app/admin/reviews/page.jsx
'use client'
import { useState, useEffect } from 'react'
import { 
  Card, 
  CardBody, 
  Button, 
  Chip, 
  Input, 
  Select, 
  SelectItem, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
  Textarea,
  Tabs,
  Tab
} from '@nextui-org/react'
import { 
  Star, 
  MessageCircle, 
  Search, 
  Filter, 
  BarChart3, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  XCircle,
  Flag,
  Reply,
  Download
} from 'lucide-react'
import { motion } from 'framer-motion'
import ReviewList from '@/components/reviews/ReviewList'
import { useToast } from '@/hooks/useToast'

// Mock data - replace with real API calls
const mockReviews = [
  {
    id: 1,
    productId: 1,
    productName: "Natural Ruby Pendant",
    userName: "Sarah Johnson",
    userAvatar: "/images/avatars/user1.jpg",
    rating: 5,
    title: "Absolutely stunning!",
    comment: "This ruby pendant exceeded my expectations. The color is vibrant and the craftsmanship is exceptional. I've received so many compliments wearing it.",
    pros: ["Beautiful color", "Excellent craftsmanship", "Fast shipping"],
    cons: ["Price is a bit high"],
    images: ["/images/reviews/review1-1.jpg", "/images/reviews/review1-2.jpg"],
    verifiedPurchase: true,
    status: "approved",
    createdAt: "2024-12-01T10:30:00Z",
    helpfulCount: 12,
    response: null
  },
  {
    id: 2,
    productId: 2,
    productName: "Classic Ruby Stud Earrings",
    userName: "Michael Chen",
    userAvatar: "/images/avatars/user2.jpg",
    rating: 4,
    title: "Great quality, good value",
    comment: "These earrings are well-made and look exactly as shown in the photos. My wife loves them for everyday wear.",
    pros: ["Good value", "Matches description", "Comfortable to wear"],
    cons: ["Could be slightly larger"],
    images: [],
    verifiedPurchase: true,
    status: "pending",
    createdAt: "2024-12-02T14:15:00Z",
    helpfulCount: 5,
    response: null
  },
  {
    id: 3,
    productId: 1,
    productName: "Natural Ruby Pendant",
    userName: "Anonymous User",
    userAvatar: null,
    rating: 2,
    title: "Not as advertised",
    comment: "The ruby looks different from the photos. Very disappointed with the purchase.",
    pros: [],
    cons: ["Different from photos", "Poor customer service"],
    images: [],
    verifiedPurchase: false,
    status: "rejected",
    createdAt: "2024-12-03T09:20:00Z",
    helpfulCount: 1,
    response: null
  }
]

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(mockReviews)
  const [selectedReview, setSelectedReview] = useState(null)
  const [responseText, setResponseText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { showToast } = useToast()

  // Statistics
  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
    averageRating: reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0,
    withPhotos: reviews.filter(r => r.images && r.images.length > 0).length,
    verified: reviews.filter(r => r.verifiedPurchase).length
  }

  const handleModerate = async (reviewId, status) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, status, moderatedAt: new Date().toISOString() }
          : review
      ))
      
      showToast(`Review ${status} successfully`, 'success')
    } catch (error) {
      showToast('Failed to moderate review', 'error')
    }
  }

  const handleReply = (review) => {
    setSelectedReview(review)
    setResponseText(review.response?.message || '')
    onOpen()
  }

  const submitResponse = async () => {
    if (!responseText.trim()) {
      showToast('Please enter a response', 'error')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const response = {
        message: responseText,
        createdAt: new Date().toISOString(),
        author: 'SHUKRA Gems Support'
      }
      
      setReviews(prev => prev.map(review => 
        review.id === selectedReview.id 
          ? { ...review, response }
          : review
      ))
      
      showToast('Response posted successfully', 'success')
      onClose()
      setResponseText('')
      setSelectedReview(null)
    } catch (error) {
      showToast('Failed to post response', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const exportReviews = () => {
    // Create CSV content
    const headers = ['ID', 'Product', 'Customer', 'Rating', 'Title', 'Comment', 'Status', 'Verified', 'Date']
    const csvContent = [
      headers.join(','),
      ...reviews.map(review => [
        review.id,
        `"${review.productName}"`,
        `"${review.userName}"`,
        review.rating,
        `"${review.title || ''}"`,
        `"${review.comment.replace(/"/g, '""')}"`,
        review.status,
        review.verifiedPurchase ? 'Yes' : 'No',
        new Date(review.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n')

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reviews-export-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    
    showToast('Reviews exported successfully', 'success')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Review Management</h1>
          <p className="text-gray-600 mt-1">Manage customer reviews and ratings</p>
        </div>
        <Button
          color="primary"
          variant="flat"
          startContent={<Download size={18} />}
          onClick={exportReviews}
        >
          Export Reviews
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardBody className="text-center p-4">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardBody className="text-center p-4">
              <div className="text-2xl font-bold text-warning">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardBody className="text-center p-4">
              <div className="text-2xl font-bold text-success">{stats.approved}</div>
              <div className="text-sm text-gray-600">Approved</div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardBody className="text-center p-4">
              <div className="text-2xl font-bold text-danger">{stats.rejected}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardBody className="text-center p-4">
              <div className="flex items-center justify-center gap-1">
                <div className="text-2xl font-bold text-yellow-500">{stats.averageRating}</div>
                <Star size={20} className="fill-yellow-400 text-yellow-400" />
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardBody className="text-center p-4">
              <div className="text-2xl font-bold text-purple-500">{stats.withPhotos}</div>
              <div className="text-sm text-gray-600">With Photos</div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardBody className="text-center p-4">
              <div className="text-2xl font-bold text-green-500">{stats.verified}</div>
              <div className="text-sm text-gray-600">Verified</div>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Reviews Management */}
      <Card>
        <CardBody className="p-6">
          <Tabs defaultSelectedKey="all" className="w-full">
            <Tab key="all" title={`All Reviews (${stats.total})`}>
              <ReviewList
                reviews={reviews}
                isAdmin={true}
                onModerate={handleModerate}
                onReply={handleReply}
              />
            </Tab>
            
            <Tab key="pending" title={`Pending (${stats.pending})`}>
              <ReviewList
                reviews={reviews.filter(r => r.status === 'pending')}
                isAdmin={true}
                onModerate={handleModerate}
                onReply={handleReply}
              />
            </Tab>
            
            <Tab key="approved" title={`Approved (${stats.approved})`}>
              <ReviewList
                reviews={reviews.filter(r => r.status === 'approved')}
                isAdmin={true}
                onModerate={handleModerate}
                onReply={handleReply}
              />
            </Tab>
            
            <Tab key="flagged" title="Flagged">
              <ReviewList
                reviews={reviews.filter(r => r.flagged)}
                isAdmin={true}
                onModerate={handleModerate}
                onReply={handleReply}
              />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Response Modal */}
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            <div>
              <h3 className="text-xl font-bold">
                {selectedReview?.response ? 'Edit Response' : 'Reply to Review'}
              </h3>
              <p className="text-sm text-gray-600">
                Review by {selectedReview?.userName} for {selectedReview?.productName}
              </p>
            </div>
          </ModalHeader>
          <ModalBody>
            {selectedReview && (
              <div className="space-y-4">
                {/* Original Review */}
                <Card className="bg-gray-50 dark:bg-gray-800">
                  <CardBody className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < selectedReview.rating 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="font-semibold">{selectedReview.title}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {selectedReview.comment}
                    </p>
                  </CardBody>
                </Card>

                {/* Response Textarea */}
                <Textarea
                  label="Your Response"
                  placeholder="Write a professional response to this review..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  minRows={4}
                  maxRows={8}
                  maxLength={1000}
                  description={`${responseText.length}/1000 characters`}
                />

                {/* Response Guidelines */}
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardBody className="p-4">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                      Response Guidelines:
                    </h4>
                    <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                      <li>• Thank the customer for their feedback</li>
                      <li>• Address specific concerns mentioned in the review</li>
                      <li>• Maintain a professional and helpful tone</li>
                      <li>• Offer solutions or invite further discussion if needed</li>
                      <li>• Keep responses concise and relevant</li>
                    </ul>
                  </CardBody>
                </Card>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              color="primary" 
              onClick={submitResponse}
              isLoading={isSubmitting}
              disabled={!responseText.trim()}
            >
              {selectedReview?.response ? 'Update Response' : 'Post Response'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
