// src/app/products/details/[id]/error.js
'use client'

import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"

export default function ProductError() {
  const router = useRouter()

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-gray-600 mb-8">
        We couldn't load the product information.
      </p>
      <div className="flex gap-4">
        <Button
          color="primary"
          onClick={() => router.push('/products')}
        >
          Back to Products
        </Button>
        <Button
          variant="flat"
          onClick={() => router.refresh()}
        >
          Try Again
        </Button>
      </div>
    </div>
  )
}