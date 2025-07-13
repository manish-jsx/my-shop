// src/hooks/useReviews.js
'use client'
import { useState, useEffect } from 'react'

// Mock reviews data - replace with real API calls
const mockReviews = [
  {
    id: 1,
    productId: 1,
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
    response: {
      message: "Thank you so much for your wonderful review, Sarah! We're thrilled that you love your ruby pendant. Our craftsmen take great pride in creating exceptional pieces, and it means the world to us when customers appreciate the quality and beauty.",
      createdAt: "2024-12-02T09:15:00Z",
      author: "SHUKRA Gems Support"
    }
  },
  {
    id: 2,
    productId: 1,
    userName: "Michael Chen",
    userAvatar: "/images/avatars/user2.jpg",
    rating: 4,
    title: "Great quality, good value",
    comment: "The pendant is beautiful and well-made. Shipping was fast and packaging was secure. Would definitely buy from SHUKRA Gems again.",
    pros: ["High quality", "Fast shipping", "Secure packaging"],
    cons: ["Could include a gift box"],
    images: [],
    verifiedPurchase: true,
    status: "approved",
    createdAt: "2024-12-02T14:15:00Z",
    helpfulCount: 8,
    response: null
  },
  {
    id: 3,
    productId: 2,
    userName: "Emily Rodriguez",
    userAvatar: "/images/avatars/user3.jpg",
    rating: 5,
    title: "Perfect for everyday wear",
    comment: "These ruby earrings are exactly what I was looking for. They're elegant enough for special occasions but comfortable for daily wear. The color is gorgeous!",
    pros: ["Comfortable", "Versatile", "Beautiful color"],
    cons: [],
    images: ["/images/reviews/review3-1.jpg"],
    verifiedPurchase: true,
    status: "approved",
    createdAt: "2024-12-03T11:20:00Z",
    helpfulCount: 6,
    response: null
  },
  {
    id: 4,
    productId: 3,
    userName: "David Wilson",
    userAvatar: "/images/avatars/user4.jpg",
    rating: 5,
    title: "Engagement ring perfection",
    comment: "I proposed with this sapphire ring and she said yes! The quality is outstanding and the halo setting makes the center stone look even more brilliant. Customer service was excellent throughout the process.",
    pros: ["Outstanding quality", "Brilliant design", "Excellent service"],
    cons: [],
    images: ["/images/reviews/review4-1.jpg", "/images/reviews/review4-2.jpg"],
    verifiedPurchase: true,
    status: "approved",
    createdAt: "2024-12-04T16:45:00Z",
    helpfulCount: 15,
    response: {
      message: "Congratulations on your engagement, David! We're honored that you chose SHUKRA Gems for such a special moment. Wishing you and your fiancé a lifetime of happiness together!",
      createdAt: "2024-12-05T10:30:00Z",
      author: "SHUKRA Gems Support"
    }
  },
  {
    id: 5,
    productId: 4,
    userName: "Lisa Thompson",
    userAvatar: "/images/avatars/user5.jpg",
    rating: 4,
    title: "Beautiful emerald necklace",
    comment: "The emerald is stunning and the craftsmanship is top-notch. The only reason I'm giving 4 stars instead of 5 is that the chain feels a bit delicate for such a substantial pendant.",
    pros: ["Beautiful emerald", "Excellent craftsmanship", "Authentic certificate"],
    cons: ["Chain could be stronger"],
    images: [],
    verifiedPurchase: true,
    status: "pending",
    createdAt: "2024-12-05T09:30:00Z",
    helpfulCount: 2,
    response: null
  }
]

export function useReviews(productId = null) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Filter reviews by product if productId is provided
        const filteredReviews = productId 
          ? mockReviews.filter(review => review.productId === productId)
          : mockReviews
        
        // Only show approved reviews for public pages
        const publicReviews = filteredReviews.filter(review => review.status === 'approved')
        
        setReviews(publicReviews)
        setError(null)
      } catch (err) {
        setError('Failed to load reviews')
        setReviews([])
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [productId])

  const addReview = async (reviewData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newReview = {
        ...reviewData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        helpfulCount: 0,
        status: 'pending' // Reviews start as pending
      }
      
      // Don't add to local state since it's pending
      // setReviews(prev => [newReview, ...prev])
      
      return newReview
    } catch (error) {
      throw new Error('Failed to submit review')
    }
  }

  const markHelpful = async (reviewId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpfulCount: (review.helpfulCount || 0) + 1 }
          : review
      ))
    } catch (error) {
      throw new Error('Failed to mark review as helpful')
    }
  }

  const reportReview = async (reviewId, reason) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // In a real app, this would send a report to admin panel
      console.log(`Review ${reviewId} reported for: ${reason}`)
    } catch (error) {
      throw new Error('Failed to report review')
    }
  }

  // Calculate statistics
  const statistics = {
    total: reviews.length,
    averageRating: reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0,
    ratingDistribution: [5, 4, 3, 2, 1].map(rating => ({
      rating,
      count: reviews.filter(review => review.rating === rating).length,
      percentage: reviews.length > 0 
        ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 
        : 0
    })),
    verifiedCount: reviews.filter(review => review.verifiedPurchase).length,
    withPhotosCount: reviews.filter(review => review.images && review.images.length > 0).length
  }

  return {
    reviews,
    loading,
    error,
    statistics,
    addReview,
    markHelpful,
    reportReview
  }
}

// Hook for admin review management
export function useAdminReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        setLoading(true)
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Return all reviews including pending and rejected for admin
        setReviews(mockReviews)
        setError(null)
      } catch (err) {
        setError('Failed to load reviews')
        setReviews([])
      } finally {
        setLoading(false)
      }
    }

    fetchAllReviews()
  }, [])

  const moderateReview = async (reviewId, status) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, status, moderatedAt: new Date().toISOString() }
          : review
      ))
    } catch (error) {
      throw new Error('Failed to moderate review')
    }
  }

  const respondToReview = async (reviewId, responseMessage) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const response = {
        message: responseMessage,
        createdAt: new Date().toISOString(),
        author: 'SHUKRA Gems Support'
      }
      
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, response }
          : review
      ))
    } catch (error) {
      throw new Error('Failed to post response')
    }
  }

  const deleteReview = async (reviewId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setReviews(prev => prev.filter(review => review.id !== reviewId))
    } catch (error) {
      throw new Error('Failed to delete review')
    }
  }

  // Admin statistics
  const adminStatistics = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
    averageRating: reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0,
    withPhotos: reviews.filter(r => r.images && r.images.length > 0).length,
    verified: reviews.filter(r => r.verifiedPurchase).length,
    withResponses: reviews.filter(r => r.response).length
  }

  return {
    reviews,
    loading,
    error,
    statistics: adminStatistics,
    moderateReview,
    respondToReview,
    deleteReview
  }
}
