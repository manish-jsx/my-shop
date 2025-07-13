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
      title: 'Product Not Found | SHUKRA Gems',
      description: 'The requested gemstone could not be found.'
    }
  }

  return {
    title: `${product.name} | SHUKRA Gems - Authentic ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}`,
    description: `${product.description.substring(0, 160)}... Shop authentic ${product.category} gemstones at SHUKRA Gems.`,
    keywords: `${product.name}, ${product.category}, gemstone, jewelry, authentic, certified, ${product.specifications?.map(spec => spec.value).join(', ')}`,
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
      ],
      type: 'website'
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.image,
      brand: {
        '@type': 'Brand',
        name: 'SHUKRA Gems'
      },
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'USD',
        availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'SHUKRA Gems'
        }
      },
      aggregateRating: product.rating && product.reviews ? {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviews
      } : undefined,
      category: product.category,
      additionalProperty: product.specifications?.map(spec => ({
        '@type': 'PropertyValue',
        name: spec.name,
        value: spec.value
      }))
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