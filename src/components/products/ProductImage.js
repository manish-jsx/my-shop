// src/components/products/ProductImage.js
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function ProductImage({ src, alt }) {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="relative">
      <motion.div
        className="relative aspect-square rounded-lg overflow-hidden cursor-zoom-in"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsZoomed(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-3xl aspect-square"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}