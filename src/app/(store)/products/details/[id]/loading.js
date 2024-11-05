// src/app/products/details/[id]/loading.js
import { Skeleton } from "@nextui-org/react"

export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Skeleton */}
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <Skeleton className="absolute inset-0" />
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-32 mb-2 rounded-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-48 mt-2" />
          </div>

          <Skeleton className="h-24 w-full" />

          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-32" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex gap-4">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Skeleton */}
      <div className="mt-16">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}