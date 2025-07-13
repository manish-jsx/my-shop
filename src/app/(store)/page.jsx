// src/app/(store)/page.jsx
'use client'
import { motion } from 'framer-motion'
import ProductGrid from '@/components/products/ProductGrid'
import { products, getFeaturedProducts, categories } from '@/lib/products'
import PageTransition from '@/components/ui/PageTransition'
import NewsletterForm from '@/components/forms/NewsletterForm'
import SocialMediaLinks from '@/components/ui/SocialMediaLinks'
import FeaturedReviews from '@/components/reviews/FeaturedReviews'
import { useReviews } from '@/hooks/useReviews'
import { Button, Card, CardBody, Chip } from '@nextui-org/react'
import Link from 'next/link'
import { Sparkles, Heart, Award, Shield } from 'lucide-react'
import { useMobile } from '@/hooks/useMobile'
import MobileSakuraLayout from '@/components/mobile/sakura/MobileSakuraLayout'
import MobileSakuraHome from '@/components/mobile/sakura/MobileSakuraHome'

export default function Home() {
  const isMobile = useMobile()
  const featuredProducts = getFeaturedProducts(6)
  const { reviews } = useReviews() // Get all reviews for featured reviews section
  
  // Show mobile UI on mobile devices
  if (isMobile) {
    return (
      <MobileSakuraLayout>
        <MobileSakuraHome />
      </MobileSakuraLayout>
    )
  }
  
  return (
    <PageTransition>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl"
          >
            <div className="space-y-4">
              <Chip 
                color="primary" 
                variant="flat" 
                className="mb-4"
                startContent={<Sparkles className="w-4 h-4" />}
              >
                Welcome to SHUKRA Gems
              </Chip>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Discover the Magic of Authentic Gems
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience the transformative power of genuine gemstones. From healing crystals to luxury jewelry, 
                discover pieces that enhance your energy and celebrate your unique journey.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products">
                <Button size="lg" color="primary" className="font-semibold">
                  Shop Gemstones
                </Button>
              </Link>
              <Link href="/collections">
                <Button size="lg" variant="bordered" className="font-semibold">
                  View Collections
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: Award,
              title: "Certified Quality",
              description: "GIA certified gemstones with authenticity guarantee"
            },
            {
              icon: Heart,
              title: "Healing Properties",
              description: "Carefully selected stones for spiritual wellness"
            },
            {
              icon: Sparkles,
              title: "Handcrafted Beauty",
              description: "Artisan-crafted jewelry with exceptional detail"
            },
            {
              icon: Shield,
              title: "Lifetime Warranty",
              description: "Protected investment with comprehensive coverage"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardBody className="text-center p-6">
                  <feature.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </section>

        {/* Gem Categories */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Shop by Gemstone</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover the perfect gemstone for your needs and desires
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.slice(0, 5).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Link href={`/products/categories/${category.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 to-pink-800 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                        </div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold">Featured Gemstones</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Handpicked exceptional pieces from our collection
              </p>
            </div>
            <Link href="/products">
              <Button variant="flat" color="primary">
                View All Products
              </Button>
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} />
        </section>

        {/* Educational Section */}
        <section className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Learn About Gemstones</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Discover the fascinating world of gemstones, their healing properties, 
              and how to care for your precious stones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/education">
                <Button color="primary" variant="flat">
                  Gem Education Center
                </Button>
              </Link>
              <Link href="/education/care-guides">
                <Button variant="bordered">
                  Care Guides
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Newsletter Signup */}
        <section className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <NewsletterForm />
          </motion.div>
        </section>

        {/* Social Media */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">Follow Our Journey</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Stay connected for the latest gemstone discoveries and customer stories
            </p>
            <div className="flex justify-center">
              <SocialMediaLinks showLabels />
            </div>
          </motion.div>
        </section>
      </div>
    </PageTransition>
  )
}