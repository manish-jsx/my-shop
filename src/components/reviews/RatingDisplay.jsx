// src/components/reviews/RatingDisplay.jsx
'use client'
import { Star } from 'lucide-react'
import { Chip } from '@nextui-org/react'

export default function RatingDisplay({ 
  rating = 0, 
  reviewCount = 0, 
  size = 'md', 
  showCount = true, 
  showLabel = false,
  variant = 'default' 
}) {
  const formatRating = (rating) => {
    return rating % 1 === 0 ? rating.toString() : rating.toFixed(1)
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

  const starSize = {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24
  }[size]

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }[size]

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1">
        <Star size={starSize} className="fill-yellow-400 text-yellow-400" />
        <span className={`font-medium ${textSize}`}>
          {formatRating(rating)}
        </span>
        {showCount && reviewCount > 0 && (
          <span className={`text-gray-500 ${textSize}`}>
            ({reviewCount})
          </span>
        )}
      </div>
    )
  }

  if (variant === 'badge') {
    return (
      <Chip
        color={getRatingColor(rating)}
        size={size}
        variant="flat"
        startContent={<Star size={starSize - 2} className="fill-current" />}
      >
        {formatRating(rating)} {showCount && reviewCount > 0 && `(${reviewCount})`}
      </Chip>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {/* Star Rating */}
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={starSize}
              className={i < Math.floor(rating) 
                ? "fill-yellow-400 text-yellow-400" 
                : i < rating
                ? "fill-yellow-400/50 text-yellow-400/50"
                : "text-gray-300"}
            />
          ))}
        </div>

        {/* Rating Number */}
        <span className={`font-medium ${textSize}`}>
          {formatRating(rating)}
        </span>

        {/* Review Count */}
        {showCount && reviewCount > 0 && (
          <span className={`text-gray-500 ${textSize}`}>
            ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
          </span>
        )}
      </div>

      {/* Rating Label */}
      {showLabel && (
        <span className={`text-gray-600 ${textSize}`}>
          {getRatingLabel(rating)}
        </span>
      )}
    </div>
  )
}
