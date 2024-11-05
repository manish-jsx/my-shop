// src/app/wishlist/error.js
'use client'
import { Button } from "@nextui-org/react"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function WishlistError({ error, reset }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <AlertCircle size={48} className="text-danger mb-4" />
      <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-gray-600 mb-8">
        {error?.message || "We couldn't load your wishlist."}
      </p>
      <div className="flex gap-4">
        <Button 
          color="primary"
          onClick={() => reset()}
        >
          Try Again
        </Button>
        <Link href="/products">
          <Button variant="bordered">
            Browse Products
          </Button>
        </Link>
      </div>
    </div>
  )
}