// // src/app/products/details/[id]/page.js
// 'use client'
// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Button, Card, Chip } from '@nextui-org/react'
// import { useCart } from '@/context/CartContext'
// import { products } from '@/lib/products'
// import Link from 'next/link'
// import ProductImage from '@/components/products/ProductImage'
// import SimilarProducts from '@/components/products/SimilarProducts'
// import PageTransition from '@/components/ui/PageTransition'

// export default function ProductDetail({ params }) {
//   const { id } = params
//   const product = products.find(p => p.id.toString() === id)
//   const { addToCart } = useCart()
//   const [quantity, setQuantity] = useState(1)

//   if (!product) {
//     return (
//       <div className="text-center py-12">
//         <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
//         <Link href="/products">
//           <Button color="primary">
//             Back to Products
//           </Button>
//         </Link>
//       </div>
//     )
//   }


//   return (
//     <PageTransition>
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//           {/* Product Image */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="relative aspect-square rounded-lg overflow-hidden"
//           >
//             {/* <Image
//               src={product.image}
//               alt={product.name}
//               fill
//               className="object-cover"
//               priority
//             /> */}
//              <ProductImage src={product.image} alt={product.name} />
//           </motion.div>

//           {/* Product Info */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="space-y-6"
//           >
//             <div>
//               <Chip color="primary" variant="flat" className="mb-2">
//                 {product.category}
//               </Chip>
//               <h1 className="text-3xl font-bold">{product.name}</h1>
//               <p className="text-2xl font-semibold mt-2">
//                 ${product.price.toFixed(2)}
//               </p>
//             </div>

//             <p className="text-gray-600">
//               {product.description}
//             </p>

//             <Divider />

//             {/* Specifications */}
//             <div>
//               <h2 className="text-xl font-semibold mb-4">Specifications</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 {product.specifications?.map((spec) => (
//                   <div key={spec.name}>
//                     <p className="text-sm text-gray-600">{spec.name}</p>
//                     <p className="font-medium">{spec.value}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <Divider />

//             {/* Quantity and Add to Cart */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-4">
//                 <Button
//                   size="sm"
//                   variant="flat"
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 >
//                   -
//                 </Button>
//                 <span className="w-12 text-center">{quantity}</span>
//                 <Button
//                   size="sm"
//                   variant="flat"
//                   onClick={() => setQuantity(quantity + 1)}
//                 >
//                   +
//                 </Button>
//               </div>

//               <Button
//                 color="primary"
//                 size="lg"
//                 className="w-full"
//                 onClick={handleAddToCart}
//               >
//                 Add to Cart
//               </Button>
//             </div>
//           </motion.div>
//         </div>

//         {/* Similar Products */}
//         <div className="mt-16">
//           <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
//           <SimilarProducts 
//             currentProductId={product.id} 
//             category={product.category} 
//           />
//         </div>
//       </div>
//     </PageTransition>
//   )
// }


// // src/app/products/details/[id]/page.js
// 'use client'
// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Button, Card, Chip, Divider } from '@nextui-org/react'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import { useCart } from '@/context/CartContext'
// import { products } from '@/lib/products'
// // import ProductDetailView from '@/components/products/ProductDetailView'

// import { Star, Heart } from 'lucide-react'
// import SimilarProducts from '@/components/products/SimilarProducts'
// import PageTransition from '@/components/ui/PageTransition'

// export default async function ProductDetail({ params }) {
//   await new Promise(resolve => resolve()) // Wait for params
  
//   const router = useRouter()
//   const { addToCart } = useCart()
//   const [quantity, setQuantity] = useState(1)
  
//   const product = products.find(p => p.id.toString() === params.id)

//   if (!product) {
//     return (
//       <div className="text-center py-12">
//         <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
//         <Button 
//           color="primary"
//           onClick={() => router.push('/products')}
//         >
//           Back to Products
//         </Button>
//       </div>
//     )
//   }

//   const handleAddToCart = () => {
//     addToCart(product, quantity)
//   }

//   return (
//     <PageTransition>
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//           {/* Product Image */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="relative aspect-square rounded-lg overflow-hidden"
//           >
//             <Image
//               src={product.image}
//               alt={product.name}
//               fill
//               className="object-cover"
//               priority
//             />
//           </motion.div>

//           {/* Product Info */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="space-y-6"
//           >
//             <div>
//               <Chip color="primary" variant="flat" className="mb-2">
//                 {product.category}
//               </Chip>
//               <h1 className="text-3xl font-bold">{product.name}</h1>
//               <div className="flex items-center gap-2 mt-2">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       size={18}
//                       className={i < Math.floor(product.rating) 
//                         ? "fill-yellow-400 text-yellow-400" 
//                         : "text-gray-300"}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-sm text-gray-600">
//                   ({product.reviews} reviews)
//                 </span>
//               </div>
//               <p className="text-2xl font-semibold mt-2">
//                 ${product.price.toFixed(2)}
//               </p>
//             </div>

//             <p className="text-gray-600">
//               {product.description}
//             </p>

//             <hr className="border-gray-200" />

//             {/* Specifications */}
//             <div>
//               <h2 className="text-xl font-semibold mb-4">Specifications</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 {product.specifications?.map((spec) => (
//                   <div key={spec.name}>
//                     <p className="text-sm text-gray-600">{spec.name}</p>
//                     <p className="font-medium">{spec.value}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <hr className="border-gray-200" />

//             {/* Quantity and Add to Cart */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-4">
//                 <Button
//                   size="sm"
//                   variant="flat"
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 >
//                   -
//                 </Button>
//                 <span className="w-12 text-center">{quantity}</span>
//                 <Button
//                   size="sm"
//                   variant="flat"
//                   onClick={() => setQuantity(quantity + 1)}
//                 >
//                   +
//                 </Button>
//               </div>

//               <div className="flex gap-4">
//                 <Button
//                   color="primary"
//                   size="lg"
//                   className="flex-1"
//                   onClick={handleAddToCart}
//                   disabled={product.stock === 0}
//                 >
//                   {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
//                 </Button>
//                 <Button
//                   size="lg"
//                   variant="flat"
//                   isIconOnly
//                 >
//                   <Heart />
//                 </Button>
//               </div>
//             </div>

//             {/* Stock Status */}
//             {product.stock < 5 && product.stock > 0 && (
//               <p className="text-warning">
//                 Only {product.stock} items left in stock!
//               </p>
//             )}
//           </motion.div>
//         </div>

//         {/* Similar Products */}
//         <div className="mt-16">
//           <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
//           <SimilarProducts 
//             currentProductId={product.id} 
//             category={product.category} 
//           />
//         </div>
//       </div>
//     </PageTransition>
//   )
// }

// // src/app/products/details/[id]/page.js
// import { products } from '@/lib/products'
// import ProductDetailView from '@/components/products/ProductDetailView'
// import { Button } from '@nextui-org/react'
// import Link from 'next/link'

// export async function generateMetadata({ params }) {
//   const product = products.find(p => p.id.toString() === params.id)
  
//   if (!product) {
//     return {
//       title: 'Product Not Found',
//       description: 'The requested product could not be found.'
//     }
//   }

//   return {
//     title: `${product.name} | Enchanted Collections`,
//     description: product.description,
//   }
// }

// export default function ProductPage({ params }) {
//   const product = products.find(p => p.id.toString() === params.id)

//   if (!product) {
//     return (
//       <div className="text-center py-12">
//         <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
//         <Link href="/products">
//           <Button color="primary">
//             Back to Products
//           </Button>
//         </Link>
//       </div>
//     )
//   }

//   return <ProductDetailView product={product} />
// }


// // src/app/products/details/[id]/page.js
// import { products } from '@/lib/products'
// import ProductDetailView from '@/components/products/ProductDetailView'
// import { Button } from '@nextui-org/react'
// import Link from 'next/link'

// // Helper function to get product by ID
// async function getProduct(id) {
//   // Simulate database delay
//   await new Promise((resolve) => setTimeout(resolve, 100))
//   return products.find(p => p.id.toString() === id)
// }

// export async function generateMetadata({ params }) {
//   const id = await Promise.resolve(params.id)
//   const product = await getProduct(id)
  
//   if (!product) {
//     return {
//       title: 'Product Not Found',
//       description: 'The requested product could not be found.'
//     }
//   }

//   return {
//     title: `${product.name} | Enchanted Collections`,
//     description: product.description,
//     openGraph: {
//       title: product.name,
//       description: product.description,
//       images: [
//         {
//           url: product.image,
//           width: 800,
//           height: 600,
//           alt: product.name
//         }
//       ]
//     }
//   }
// }

// export default async function ProductPage({ params }) {
//   // Await params.id resolution
//   const id = await Promise.resolve(params.id)
//   const product = await getProduct(id)

//   if (!product) {
//     return (
//       <div className="text-center py-12">
//         <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
//         <Link href="/products">
//           <Button color="primary">
//             Back to Products
//           </Button>
//         </Link>
//       </div>
//     )
//   }

//   return <ProductDetailView product={product} />
// }


// src/app/products/details/[id]/page.js
import { products } from '@/lib/products'
import ProductDetailView from '@/components/products/ProductDetailView'

import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CartDrawer from '@/components/cart/CartDrawer'

// Helper function to get product
function getProduct(productId) {
  return products.find(p => p.id.toString() === productId?.toString())
}

// Generate metadata
export async function generateMetadata({ params }) {
  const { id } = await params // Destructure after awaiting
  const product = getProduct(id)


  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    }
  }

  return {
    title: `${product.name} | Enchanted Collections`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name
        }
      ]
    }
  }
}

// Generate static params for static generation
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString()
  }))
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound()
  }

  return (
    <main>
  <ProductDetailView product={product} />

    </main>

  )

}