// src/components/reviews/ReviewList.jsx
'use client'
import { useState } from 'react'
import { Card, CardBody, Button, Select, SelectItem, Pagination, Input } from '@nextui-org/react'
import { Search, Filter, SortAsc } from 'lucide-react'
import ReviewCard from './ReviewCard'
import { motion } from 'framer-motion'

export default function ReviewList({ reviews = [], onHelpful, onReport, isAdmin = false, onModerate }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('newest')
  const [filterBy, setFilterBy] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const reviewsPerPage = 5

  // Sort options
  const sortOptions = [
    { key: 'newest', label: 'Newest First' },
    { key: 'oldest', label: 'Oldest First' },
    { key: 'highest', label: 'Highest Rating' },
    { key: 'lowest', label: 'Lowest Rating' },
    { key: 'helpful', label: 'Most Helpful' }
  ]

  // Filter options
  const filterOptions = [
    { key: 'all', label: 'All Reviews' },
    { key: '5', label: '5 Stars' },
    { key: '4', label: '4 Stars' },
    { key: '3', label: '3 Stars' },
    { key: '2', label: '2 Stars' },
    { key: '1', label: '1 Star' },
    { key: 'verified', label: 'Verified Purchases' },
    { key: 'photos', label: 'With Photos' }
  ]

  // Admin filter options
  const adminFilterOptions = [
    ...filterOptions,
    { key: 'pending', label: 'Pending Approval' },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Rejected' }
  ]

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch = 
        review.comment.toLowerCase().includes(query) ||
        review.title?.toLowerCase().includes(query) ||
        review.userName.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    // Rating filter
    if (filterBy !== 'all') {
      if (['1', '2', '3', '4', '5'].includes(filterBy)) {
        return review.rating === parseInt(filterBy)
      }
      if (filterBy === 'verified') {
        return review.verifiedPurchase
      }
      if (filterBy === 'photos') {
        return review.images && review.images.length > 0
      }
      if (isAdmin) {
        if (['pending', 'approved', 'rejected'].includes(filterBy)) {
          return review.status === filterBy
        }
      }
    }

    return true
  })

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'highest':
        return b.rating - a.rating
      case 'lowest':
        return a.rating - b.rating
      case 'helpful':
        return (b.helpfulCount || 0) - (a.helpfulCount || 0)
      default:
        return 0
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage)
  const startIndex = (currentPage - 1) * reviewsPerPage
  const paginatedReviews = sortedReviews.slice(startIndex, startIndex + reviewsPerPage)

  const clearFilters = () => {
    setSearchQuery('')
    setFilterBy('all')
    setSortBy('newest')
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <Card>
        <CardBody className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <Input
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<Search size={18} />}
              className="flex-1"
            />
            
            <div className="flex gap-4 items-center">
              <Select
                label="Filter"
                placeholder="All Reviews"
                selectedKeys={filterBy !== 'all' ? [filterBy] : []}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0] || 'all'
                  setFilterBy(value)
                  setCurrentPage(1)
                }}
                className="w-48"
                startContent={<Filter size={16} />}
              >
                {(isAdmin ? adminFilterOptions : filterOptions).map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="Sort"
                placeholder="Newest First"
                selectedKeys={[sortBy]}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0] || 'newest'
                  setSortBy(value)
                  setCurrentPage(1)
                }}
                className="w-48"
                startContent={<SortAsc size={16} />}
              >
                {sortOptions.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>

              {(searchQuery || filterBy !== 'all' || sortBy !== 'newest') && (
                <Button variant="flat" onClick={clearFilters}>
                  Clear
                </Button>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <span>
              Showing {paginatedReviews.length} of {sortedReviews.length} review{sortedReviews.length !== 1 ? 's' : ''}
            </span>
          </div>
        </CardBody>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {paginatedReviews.length > 0 ? (
          <>
            {paginatedReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ReviewCard
                  review={review}
                  onHelpful={onHelpful}
                  onReport={onReport}
                  isAdmin={isAdmin}
                  onModerate={onModerate}
                />
              </motion.div>
            ))}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  total={totalPages}
                  page={currentPage}
                  onChange={setCurrentPage}
                  showControls
                  color="primary"
                />
              </div>
            )}
          </>
        ) : (
          <Card>
            <CardBody className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No reviews found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || filterBy !== 'all' 
                  ? "Try adjusting your search or filter criteria"
                  : "Be the first to review this product!"
                }
              </p>
              {(searchQuery || filterBy !== 'all') && (
                <Button variant="flat" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  )
}
