'use client'
import { use } from 'react'
import { products, collections } from '@/lib/products'
import ProductGrid from '@/components/products/ProductGrid'
import { Button, Chip, Card, CardBody } from '@nextui-org/react'
import Link from 'next/link'
import PageTransition from '@/components/ui/PageTransition'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function CollectionPage({ params }) {
  const resolvedParams = use(params)
  const { id } = resolvedParams
  const collection = collections.find(col => col.id === id)
  const collectionProducts = products.filter(
    product => product.collection === id
  )

  if (!collection) {
    return (
      <PageTransition>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Collection Not Found</h1>
          <p className="text-gray-600 mb-6">The collection you're looking for doesn't exist.</p>
          <Link href="/collections">
            <Button color="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collections
            </Button>
          </Link>
        </div>
      </PageTransition>
    )
  }

  const totalValue = collectionProducts.reduce((sum, product) => sum + product.price, 0)
  const averageRating = collectionProducts.reduce((sum, product) => sum + product.rating, 0) / collectionProducts.length || 0

  return (
    <PageTransition>
      <div className="space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/collections" className="text-gray-500 hover:text-primary">
            Collections
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 dark:text-white">{collection.name}</span>
        </nav>

        {/* Collection Header */}
        <section className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="space-y-4">
              <Chip 
                color="primary" 
                variant="flat"
                startContent={<Sparkles className="w-4 h-4" />}
              >
                {collection.name}
              </Chip>
              <h1 className="text-4xl md:text-5xl font-bold">
                {collection.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {collection.description}
              </p>
            </div>
          </motion.div>

          {/* Collection Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardBody className="text-center p-4">
                <div className="text-2xl font-bold text-primary">{collectionProducts.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Pieces</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center p-4">
                <div className="text-2xl font-bold text-primary">{averageRating.toFixed(1)}★</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center p-4">
                <div className="text-2xl font-bold text-primary">${Math.min(...collectionProducts.map(p => p.price)).toFixed(0)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Starting From</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center p-4">
                <div className="text-2xl font-bold text-primary">${totalValue.toFixed(0)}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Value</div>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Featured Collection Info */}
        {id === 'luxury' && (
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold">Why Choose Our Luxury Collection?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Exceptional Quality</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Each piece features museum-quality gemstones with superior clarity, 
                    color, and cut. All stones come with certificates of authenticity.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Rare Origins</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Sourced from the world's most prestigious mines including Kashmir sapphires, 
                    Burmese rubies, and Colombian emeralds.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Products Grid */}
        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Collection Pieces ({collectionProducts.length})
            </h2>
            <Link href="/products">
              <Button variant="flat" color="primary">
                View All Products
              </Button>
            </Link>
          </div>

          {collectionProducts.length > 0 ? (
            <ProductGrid products={collectionProducts} />
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This collection is being curated. Check back soon for new additions.
              </p>
              <Link href="/collections">
                <Button color="primary">
                  Explore Other Collections
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* Related Collections */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections
              .filter(col => col.id !== id)
              .slice(0, 3)
              .map((relatedCollection) => (
                <Card key={relatedCollection.id} className="hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{relatedCollection.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {relatedCollection.description}
                    </p>
                    <Link href={`/collections/${relatedCollection.id}`}>
                      <Button color="primary" variant="flat" size="sm" className="w-full">
                        Explore Collection
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              ))}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
