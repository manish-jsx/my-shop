// src/components/products/ProductDetailView.jsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Card, Chip } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { Star, Heart } from 'lucide-react'
import SimilarProducts from './SimilarProducts'

export default function ProductDetailView({ product }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addToCart(product, quantity)
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
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews} reviews)
              </span>
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
        </motion.div>
      </div>

      {/* Similar Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
        <SimilarProducts 
          currentProductId={product.id} 
          category={product.category} 
        />
      </div>
    </div>
  )
}