// src/components/reviews/ReviewForm.jsx
'use client'
import { useState } from 'react'
import { Card, CardBody, Button, Input, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Chip, useDisclosure } from '@nextui-org/react'
import { Star, Upload, X, Plus, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/useToast'

export default function ReviewForm({ productId, productName, onSubmit, onClose, isOpen }) {
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: '',
    pros: [''],
    cons: [''],
    images: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)
  const { showToast } = useToast()

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addProCon = (type) => {
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], '']
    }))
  }

  const removeProCon = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  const updateProCon = (type, index, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map((item, i) => i === index ? value : item)
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, event.target.result]
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.rating === 0) {
      showToast('Please select a rating', 'error')
      return
    }

    if (!formData.comment.trim()) {
      showToast('Please write a review comment', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      const reviewData = {
        ...formData,
        productId,
        pros: formData.pros.filter(pro => pro.trim()),
        cons: formData.cons.filter(con => con.trim()),
        userName: 'Current User', // This would come from auth context
        userAvatar: '/images/avatar-placeholder.jpg',
        verifiedPurchase: true, // This would be checked against purchase history
        createdAt: new Date().toISOString(),
        status: 'pending',
        helpfulCount: 0
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      onSubmit?.(reviewData)
      showToast('Review submitted successfully! It will be visible after moderation.', 'success')
      
      // Reset form
      setFormData({
        rating: 0,
        title: '',
        comment: '',
        pros: [''],
        cons: [''],
        images: []
      })
      
      onClose?.()
    } catch (error) {
      showToast('Failed to submit review. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>
          <div>
            <h3 className="text-xl font-bold">Write a Review</h3>
            <p className="text-sm text-gray-600">for {productName}</p>
          </div>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Overall Rating *</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-colors"
                  >
                    <Star
                      size={32}
                      className={
                        star <= (hoverRating || formData.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 hover:text-yellow-300"
                      }
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {formData.rating > 0 && (
                    <>
                      {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                      {formData.rating === 5 && ' - Excellent!'}
                      {formData.rating === 4 && ' - Very Good'}
                      {formData.rating === 3 && ' - Good'}
                      {formData.rating === 2 && ' - Fair'}
                      {formData.rating === 1 && ' - Poor'}
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Review Title */}
            <Input
              label="Review Title (Optional)"
              placeholder="Summarize your experience..."
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              maxLength={100}
            />

            {/* Review Comment */}
            <Textarea
              label="Your Review *"
              placeholder="Share your thoughts about this product..."
              value={formData.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
              minRows={4}
              maxRows={8}
              maxLength={2000}
              description={`${formData.comment.length}/2000 characters`}
            />

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pros */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-green-600">What did you like?</label>
                  <Button
                    size="sm"
                    variant="flat"
                    color="success"
                    onClick={() => addProCon('pros')}
                    startContent={<Plus size={14} />}
                  >
                    Add Pro
                  </Button>
                </div>
                {formData.pros.map((pro, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="What was good about this product?"
                      value={pro}
                      onChange={(e) => updateProCon('pros', index, e.target.value)}
                      size="sm"
                    />
                    <Button
                      size="sm"
                      variant="flat"
                      color="danger"
                      isIconOnly
                      onClick={() => removeProCon('pros', index)}
                      disabled={formData.pros.length === 1}
                    >
                      <Minus size={14} />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Cons */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-red-600">What could be improved?</label>
                  <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    onClick={() => addProCon('cons')}
                    startContent={<Plus size={14} />}
                  >
                    Add Con
                  </Button>
                </div>
                {formData.cons.map((con, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="What could be better?"
                      value={con}
                      onChange={(e) => updateProCon('cons', index, e.target.value)}
                      size="sm"
                    />
                    <Button
                      size="sm"
                      variant="flat"
                      color="danger"
                      isIconOnly
                      onClick={() => removeProCon('cons', index)}
                      disabled={formData.cons.length === 1}
                    >
                      <Minus size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <label className="text-sm font-semibold">Add Photos (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-sm text-gray-600">
                    Click to upload photos or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 5MB each (max 5 photos)
                  </p>
                </label>
              </div>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            color="primary" 
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={formData.rating === 0 || !formData.comment.trim()}
          >
            Submit Review
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
