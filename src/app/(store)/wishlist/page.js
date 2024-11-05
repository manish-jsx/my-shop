// // src/app/wishlist/page.js
// // 'use client'
// import { useWishlist } from '@/context/WishlistContext'
// import ProductGrid from '@/components/products/ProductGrid'
// import { Button } from '@nextui-org/react'
// import Link from 'next/link'

// export default function WishlistPage() {
//   const { wishlist, clearWishlist } = useWishlist()

//   if (wishlist.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <h1 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h1>
//         <p className="text-gray-600 mb-8">
//           Add some items to your wishlist to save them for later.
//         </p>
//         <Link href="/products">
//           <Button color="primary">
//             Browse Products
//           </Button>
//         </Link>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">Your Wishlist</h1>
//         <Button 
//           color="danger" 
//           variant="light"
//           onClick={clearWishlist}
//         >
//           Clear Wishlist
//         </Button>
//       </div>
//       <ProductGrid products={wishlist} />
//     </div>
//   )
// }

// src/app/wishlist/page.js
import WishlistContent from '@/components/wishlist/WishlistContent'

export const metadata = {
  title: 'Your Wishlist | Enchanted Collections',
  description: 'View and manage your saved items.',
}

export default function WishlistPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <WishlistContent />
    </div>
  )
}