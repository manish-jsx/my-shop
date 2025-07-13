
// src/components/products/ProductCard.jsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, CardFooter, Button, Badge, Chip } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react'
import QuickView from './QuickView'
import RatingDisplay from '@/components/reviews/RatingDisplay'

const cardVariants = {
  grid: {
    card: "h-full",
    imageContainer: "pt-[100%]",
    content: "p-4 space-y-2",
  },
  list: {
    card: "flex flex-row h-48",
    imageContainer: "w-48 relative",
    content: "flex-1 p-4",
  },
  compact: {
    card: "h-64",
    imageContainer: "pt-[75%]",
    content: "p-2 space-y-1",
  }
}

export default function ProductCard({ product, variant = 'grid' }) {
  const [isQuickViewOpen, setQuickViewOpen] = useState(false)
  const [isHovered, setHovered] = useState(false)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  
  const styles = cardVariants[variant]
  const isWishlisted = isInWishlist(product.id)

  const toggleWishlist = (e) => {
    e.preventDefault()
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuickView = (e) => {
    e.preventDefault()
    setQuickViewOpen(true)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.card}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link href={`/products/details/${product.id}`}>
          <Card className="h-full">
            <CardBody className="p-0">
              <div className={`relative ${styles.imageContainer} group`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white rounded-full"
                        onClick={handleQuickView}
                      >
                        <Eye size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white rounded-full"
                        onClick={toggleWishlist}
                      >
                        <Heart
                          size={20}
                          className={isWishlisted ? "fill-red-500 text-red-500" : ""}
                        />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Category and Collection Chips */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <Chip 
                    size="sm" 
                    color="primary" 
                    variant="solid"
                    className="capitalize"
                  >
                    {product.category}
                  </Chip>
                  {product.collection && (
                    <Chip 
                      size="sm" 
                      color="secondary" 
                      variant="flat"
                      className="capitalize"
                    >
                      {product.collection}
                    </Chip>
                  )}
                </div>

                {/* Loyalty Points Badge */}
                {product.loyaltyPoints && (
                  <Badge
                    content={`${product.loyaltyPoints} pts`}
                    color="warning"
                    className="absolute top-2 right-2"
                  />
                )}
              </div>

              <div className={styles.content}>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                
                {/* Rating and Reviews */}
                <div className="mb-2">
                  <RatingDisplay 
                    rating={product.rating || 0}
                    reviewCount={product.reviews || 0}
                    size="sm"
                    variant="compact"
                  />
                </div>
                
                <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                
                <Button
                  color="primary"
                  className="w-full mt-2"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? (
                    'Out of Stock'
                  ) : (
                    <>
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </CardBody>
          </Card>
        </Link>
      </motion.div>

      <QuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  )
}