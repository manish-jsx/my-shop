// src/app/products/details/[id]/not-found.js
import Link from 'next/link'
import { Button } from '@nextui-org/react'

export default function ProductNotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
      <p className="text-gray-600 mb-8">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <div className="flex gap-4">
        <Link href="/products">
          <Button color="primary">
            Browse Products
          </Button>
        </Link>
        <Link href="/">
          <Button variant="bordered">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}