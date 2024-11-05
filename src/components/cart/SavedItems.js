// src/components/cart/SavedItems.js
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Button } from '@nextui-org/react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export default function SavedItems() {
  const { savedItems, moveToCart } = useCart()

  if (!savedItems.length) return null

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Saved for Later</h2>
      <AnimatePresence>
        <div className="space-y-4">
          {savedItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      color="primary"
                      variant="light"
                      onClick={() => moveToCart(item.id)}
                    >
                      Move to Cart
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}