// src/app/page.jsx
'use client'
import { motion } from 'framer-motion'
import ProductGrid from '@/components/products/ProductGrid'
import { products } from '@/lib/products'
import PageTransition from '@/components/ui/PageTransition'

export default function Home() {
  return (
    <PageTransition>
      <section className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold">Enchanted Collections</h1>
          <p className="text-xl text-gray-600">
            Discover our unique collection of charms, jewelry, and lights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-primary-50 rounded-lg text-center"
          >
            <h2 className="text-xl font-semibold">Charms</h2>
            <p>Unique and magical charms</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-primary-50 rounded-lg text-center"
          >
            <h2 className="text-xl font-semibold">Jewelry</h2>
            <p>Elegant and timeless pieces</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-primary-50 rounded-lg text-center"
          >
            <h2 className="text-xl font-semibold">Lights</h2>
            <p>Illuminate your space</p>
          </motion.div>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <ProductGrid products={products.slice(0, 6)} />
        </section>
      </section>
    </PageTransition>
  )
}