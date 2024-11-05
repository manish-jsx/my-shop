
// // src/components/products/ProductCard.jsx
// 'use client'
// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Card, CardBody, CardFooter, Button, Chip, Badge, Modal } from '@nextui-org/react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useCart } from '@/context/CartContext'
// import { useWishlist } from '@/context/WishlistContext'
// import { Star, Heart, Eye, ShoppingCart } from 'lucide-react'
// import QuickView from './QuickView'

// // Card variants for different layouts
// const cardVariants = {
//   grid: {
//     card: "h-full",
//     imageContainer: "pt-[100%]",
//     content: "p-4 space-y-2",
//   },
//   list: {
//     card: "flex flex-row h-48",
//     imageContainer: "w-48 relative",
//     content: "flex-1 p-4",
//   },
//   compact: {
//     card: "h-64",
//     imageContainer: "pt-[75%]",
//     content: "p-2 space-y-1",
//   }
// }

// export default function ProductCard({ product, variant = 'grid' }) {
//   const [isQuickViewOpen, setQuickViewOpen] = useState(false)
//   const { addToCart } = useCart()
//   const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
//   const [isHovered, setHovered] = useState(false)

//   const styles = cardVariants[variant]

//   const toggleWishlist = () => {
//     if (isInWishlist(product.id)) {
//       removeFromWishlist(product.id)
//     } else {
//       addToWishlist(product)
//     }
//   }

//   return (
//     <>
//       <motion.div
//         whileHover={{ y: -5 }}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className={styles.card}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         <Card className="h-full">
//           <CardBody className="p-0">
//             <div className={`relative ${styles.imageContainer} group`}>
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 fill
//                 className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
//                 priority
//               />
              
//               {/* Quick actions overlay */}
//               <AnimatePresence>
//                 {isHovered && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2"
//                   >
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       className="p-2 bg-white rounded-full"
//                       onClick={() => setQuickViewOpen(true)}
//                     >
//                       <Eye size={20} />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       className="p-2 bg-white rounded-full"
//                       onClick={toggleWishlist}
//                     >
//                       <Heart
//                         size={20}
//                         className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}
//                       />
//                     </motion.button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Badges */}
//               <div className="absolute top-2 left-2 flex flex-col gap-1">
//                 {product.stock < 5 && (
//                   <Badge color="warning">Low Stock</Badge>
//                 )}
//                 {product.featured && (
//                   <Badge color="secondary">Featured</Badge>
//                 )}
//               </div>
//             </div>

//             <div className={styles.content}>
//               <Link href={`/products/details/${product.id}`}>
//                 <h3 className="text-lg font-semibold hover:text-primary transition-colors">
//                   {product.name}
//                 </h3>
//               </Link>

//               <div className="flex items-center justify-between">
//                 <Chip size="sm" variant="flat">
//                   {product.category}
//                 </Chip>
//                 <div className="flex items-center gap-1">
//                   <Star
//                     size={16}
//                     className={product.rating >= 4.5 ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}
//                   />
//                   <span className="text-sm">{product.rating}</span>
//                 </div>
//               </div>

//               <p className="text-lg font-bold">${product.price.toFixed(2)}</p>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center gap-2"
//                 onClick={() => addToCart(product)}
//                 disabled={product.stock === 0}
//               >
//                 <ShoppingCart size={18} />
//                 {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
//               </motion.button>
//             </div>
//           </CardBody>
//         </Card>
//       </motion.div>

//       <QuickView
//         product={product}
//         isOpen={isQuickViewOpen}
//         onClose={() => setQuickViewOpen(false)}
//       />
//     </>
//   )
// }

// src/components/products/ProductCard.jsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, CardFooter, Button, Badge } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import QuickView from './QuickView'

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

                {product.stock < 5 && (
                  <Badge
                    content="Low Stock"
                    color="warning"
                    className="absolute top-2 left-2"
                  />
                )}
              </div>

              <div className={styles.content}>
                <h3 className="text-lg font-semibold">{product.name}</h3>
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