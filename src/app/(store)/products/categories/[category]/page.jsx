// // src/app/products/[category]/page.js
// 'use client'
// import { products } from '@/lib/products'
// import ProductGrid from '@/components/products/ProductGrid'
// import { Button } from '@nextui-org/react'
// import Link from 'next/link'
// import PageTransition from '@/components/ui/PageTransition'

// export default function CategoryPage({ params }) {
//   const { category } = params
//   const categoryProducts = products.filter(
//     product => product.category.toLowerCase() === category.toLowerCase()
//   )

//   const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)

//   if (categoryProducts.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
//         <p className="text-gray-600 mb-8">
//           The category you're looking for doesn't exist or has no products.
//         </p>
//         <Link href="/products">
//           <Button color="primary">
//             View All Products
//           </Button>
//         </Link>
//       </div>
//     )
//   }

//   return (
//     <PageTransition>
//       <div className="space-y-8">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">{categoryTitle}</h1>
//           <Link href="/products">
//             <Button variant="light">
//               View All Products
//             </Button>
//           </Link>
//         </div>

//         <ProductGrid products={categoryProducts} />
//       </div>
//     </PageTransition>
//   )
// }

// src/app/products/categories/[category]/page.js
'use client'
import { products, categories } from '@/lib/products'
import ProductGrid from '@/components/products/ProductGrid'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import PageTransition from '@/components/ui/PageTransition'

export default function CategoryPage({ params }) {
  const { category } = params
  const categoryInfo = categories.find(cat => cat.id === category)
  const categoryProducts = products.filter(
    product => product.category === category
  )

  if (!categoryInfo) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <Link href="/products">
          <Button color="primary">
            View All Products
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{categoryInfo.name}</h1>
            <p className="text-gray-600">{categoryInfo.description}</p>
          </div>
          <Link href="/products">
            <Button variant="light">
              View All Products
            </Button>
          </Link>
        </div>

        <ProductGrid products={categoryProducts} />
      </div>
    </PageTransition>
  )
}