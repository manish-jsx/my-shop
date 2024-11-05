// // src/app/products/page.js
// 'use client'
// import { useState } from 'react'
// import { Select, SelectItem, Input, Button } from '@nextui-org/react'
// import ProductGrid from '@/components/products/ProductGrid'

// import { products } from '@/lib/products'
// import PageTransition from '@/components/ui/PageTransition'

// export default function ProductsPage() {
//   const [category, setCategory] = useState('all')
//   const [search, setSearch] = useState('')

//   const categories = [
//     { value: 'all', label: 'All Products' },
//     { value: 'charms', label: 'Charms' },
//     { value: 'jewelry', label: 'Jewelry' },
//     { value: 'lights', label: 'Lights' }
//   ]

//   const filteredProducts = products.filter(product => {
//     const matchesCategory = category === 'all' || product.category === category
//     const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
//                          product.description.toLowerCase().includes(search.toLowerCase())
//     return matchesCategory && matchesSearch
//   })

//   return (
//     <PageTransition>
//       <div className="space-y-8">
//         <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
//           <h1 className="text-2xl font-bold">All Products</h1>
//           <div className="flex gap-4 w-full md:w-auto">
//             <Select
//               size="sm"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full md:w-48"
//             >
//               {categories.map((cat) => (
//                 <SelectItem key={cat.value} value={cat.value}>
//                   {cat.label}
//                 </SelectItem>
//               ))}
//             </Select>
//             <Input
//               size="sm"
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full md:w-64"
//             />
//           </div>
//         </div>

//         <ProductGrid products={filteredProducts} />
//       </div>
//     </PageTransition>
//   )
// }

// src/app/products/page.js
'use client'
import { useState } from 'react'
import { Select, SelectItem, Input } from '@nextui-org/react'
import ProductGrid from '@/components/products/ProductGrid'
import { products, categories } from '@/lib/products'
import PageTransition from '@/components/ui/PageTransition'

export default function ProductsPage() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filteredProducts = products.filter(product => {
    const matchesCategory = category === 'all' || product.category === category
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <h1 className="text-2xl font-bold">All Products</h1>
          <div className="flex gap-4 w-full md:w-auto">
            <Select
              size="sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full md:w-48"
            >
              <SelectItem key="all" value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </Select>
            <Input
              size="sm"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64"
            />
          </div>
        </div>

        <ProductGrid products={filteredProducts} />
      </div>
    </PageTransition>
  )
}