// src/components/reviews/ReviewCard.jsx
'use client'
import { useState } from 'react'
import { Card, CardBody, Button, Avatar, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'
import { Star, ThumbsUp, ThumbsDown, Flag, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ReviewCard({ review, onHelpful, onReport, isAdmin = false, onModerate }) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0)
  const [hasVoted, setHasVoted] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpfulCount(prev => prev + 1)
      setHasVoted(true)
      onHelpful?.(review.id)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success'
      case 'pending': return 'warning'
      case 'rejected': return 'danger'
      default: return 'default'
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-4">
          <CardBody className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Avatar
                  src={review.userAvatar}
                  name={review.userName}
                  size="md"
                />
                <div>
                  <h4 className="font-semibold">{review.userName}</h4>
                  <p className="text-sm text-gray-500">
                    {review.verifiedPurchase && (
                      <Chip size="sm" color="success" variant="flat" className="mr-2">
                        Verified Purchase
                      </Chip>
                    )}
                    {formatDate(review.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Rating Stars */}
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
                
                {isAdmin && (
                  <Chip 
                    size="sm" 
                    color={getStatusColor(review.status)}
                    variant="flat"
                  >
                    {review.status}
                  </Chip>
                )}
              </div>
            </div>

            {/* Review Title */}
            {review.title && (
              <h5 className="font-semibold mb-2">{review.title}</h5>
            )}

            {/* Review Content */}
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {review.comment}
            </p>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
                    onClick={() => onOpen()}
                  />
                ))}
              </div>
            )}

            {/* Pros and Cons */}
            {(review.pros || review.cons) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {review.pros && (
                  <div>
                    <h6 className="font-semibold text-green-600 mb-2">Pros:</h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {review.pros.map((pro, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <ThumbsUp size={12} className="text-green-500" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {review.cons && (
                  <div>
                    <h6 className="font-semibold text-red-600 mb-2">Cons:</h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {review.cons.map((con, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <ThumbsDown size={12} className="text-red-500" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="flat"
                  onClick={handleHelpful}
                  disabled={hasVoted}
                  startContent={<ThumbsUp size={14} />}
                >
                  Helpful ({helpfulCount})
                </Button>
                
                <Button
                  size="sm"
                  variant="flat"
                  onClick={() => onReport?.(review.id)}
                  startContent={<Flag size={14} />}
                >
                  Report
                </Button>
                
                {review.response && (
                  <Button
                    size="sm"
                    variant="flat"
                    startContent={<MessageCircle size={14} />}
                  >
                    Store Response
                  </Button>
                )}
              </div>

              {isAdmin && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    color="success"
                    variant="flat"
                    onClick={() => onModerate?.(review.id, 'approved')}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    onClick={() => onModerate?.(review.id, 'rejected')}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>

            {/* Store Response */}
            {review.response && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar size="sm" name="SHUKRA Gems" />
                  <span className="font-semibold text-sm">SHUKRA Gems Response</span>
                  <span className="text-xs text-gray-500">
                    {formatDate(review.response.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {review.response.message}
                </p>
              </div>
            )}
          </CardBody>
        </Card>
      </motion.div>

      {/* Image Modal */}
      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Review Images</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              {review.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Review image ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
