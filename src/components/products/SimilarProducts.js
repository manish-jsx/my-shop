// src/components/products/SimilarProducts.js
'use client'
import { motion } from 'framer-motion'
import { products } from '@/lib/products'
import Link from 'next/link'
import Image from 'next/image'
import { Card, Button } from '@nextui-org/react'

export default function SimilarProducts({ currentProductId, category }) {
  const similarProducts = products
    .filter(product => 
      product.id !== currentProductId && 
      product.category === category
    )
    .slice(0, 4)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {similarProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/products/${product.id}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}