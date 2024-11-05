// src/components/wishlist/WishlistContent.jsx
'use client'
import { useWishlist } from '@/context/WishlistContext'
import ProductGrid from '@/components/products/ProductGrid'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Trash2 } from 'lucide-react'

export default function WishlistContent() {
  const { wishlist, clearWishlist } = useWishlist()

  if (wishlist.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-600 mb-8">
          Add some items to your wishlist to save them for later.
        </p>
        <Link href="/products">
          <Button color="primary" size="lg">
            Browse Products
          </Button>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Your Wishlist</h1>
          <p className="text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        <Button 
          color="danger" 
          variant="light"
          startContent={<Trash2 size={18} />}
          onClick={clearWishlist}
        >
          Clear Wishlist
        </Button>
      </div>

      <ProductGrid products={wishlist} />
    </motion.div>
  )
}