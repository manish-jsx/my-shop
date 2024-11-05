// // src/components/products/ProductGrid.jsx
// 'use client'
// import { motion } from 'framer-motion'
// import ProductCard from './ProductCard'

// export default function ProductGrid({ products }) {
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   }

//   return (
//     <motion.div
//       variants={container}
//       initial="hidden"
//       animate="show"
//       className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//     >
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </motion.div>
//   )
// }

// src/components/products/ProductGrid.jsx
'use client'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { Spinner } from '@nextui-org/react'

export default function ProductGrid({ products, loading = false }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  )
}