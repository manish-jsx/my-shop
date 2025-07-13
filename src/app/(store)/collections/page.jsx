'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { collections, products } from '@/lib/products'
import { Card, CardBody, Button, Chip } from '@nextui-org/react'
import Link from 'next/link'
import PageTransition from '@/components/ui/PageTransition'
import NewsletterForm from '@/components/forms/NewsletterForm'
import SocialMediaLinks from '@/components/ui/SocialMediaLinks'
import QuoteRequestForm from '@/components/forms/QuoteRequestForm'
import { Sparkles, Crown, Heart, Star, MessageCircle, Phone } from 'lucide-react'

export default function CollectionsPage() {
  const [showQuoteForm, setShowQuoteForm] = useState(false)

  const getCollectionIcon = (collectionId) => {
    const icons = {
      luxury: Crown,
      classic: Star,
      zodiac: Star,
      healing: Heart,
      anniversary: Heart,
      statement: Sparkles,
      fire: Sparkles,
      raw: Heart
    }
    return icons[collectionId] || Sparkles
  }

  const getProductCount = (collectionId) => {
    return products.filter(product => product.collection === collectionId).length
  }

  return (
    <PageTransition>
      <div className="space-y-12">
        {/* Header */}
        <section className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Chip 
              color="primary" 
              variant="flat" 
              className="mb-4"
              startContent={<Sparkles className="w-4 h-4" />}
            >
              Curated Collections
            </Chip>
            <h1 className="text-4xl md:text-5xl font-bold">
              Discover Our Collections
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Each collection tells a unique story, carefully curated to match your 
              personal style and spiritual journey. From luxury pieces to healing crystals, 
              find the perfect gemstones for every occasion.
            </p>
          </motion.div>
        </section>

        {/* Collections Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => {
            const IconComponent = getCollectionIcon(collection.id)
            const productCount = getProductCount(collection.id)
            
            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-blue-900/30">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                        </div>
                        <Chip size="sm" color="primary" variant="flat">
                          {productCount} pieces
                        </Chip>
                      </div>
                    </div>
                  </div>
                  
                  <CardBody className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {collection.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                          {collection.description}
                        </p>
                      </div>
                      
                      <Link href={`/collections/${collection.id}`}>
                        <Button 
                          color="primary" 
                          variant="flat" 
                          className="w-full group-hover:bg-primary group-hover:text-white transition-all"
                        >
                          Explore Collection
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )
          })}
        </section>

        {/* Featured Collection Highlight */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <Crown className="w-12 h-12 mx-auto text-primary" />
            <div>
              <h2 className="text-3xl font-bold mb-4">Luxury Collection</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience the pinnacle of luxury with our premium gemstone collection. 
                Each piece features rare, museum-quality stones with exceptional provenance 
                and unmatched beauty.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/collections/luxury">
                <Button size="lg" color="primary">
                  View Luxury Collection
                </Button>
              </Link>
              <Link href="/education/gemstone-grading">
                <Button size="lg" variant="bordered">
                  Learn About Quality
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Collection Benefits */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Expert Curation",
              description: "Each collection is carefully curated by our gemstone experts to ensure quality and authenticity."
            },
            {
              title: "Matching Sets",
              description: "Find perfectly coordinated pieces that complement each other in our themed collections."
            },
            {
              title: "Educational Value",
              description: "Learn about gemstone properties, meanings, and care instructions with every collection."
            }
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            >
              <Card>
                <CardBody className="text-center p-6">
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {benefit.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </section>

        {/* Collection Consultation CTA */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Crown className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4">Need Help Choosing a Collection?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Our collection specialists can help you find the perfect themed set based on your 
              style preferences, budget, and spiritual needs. Get personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                color="primary" 
                size="lg"
                onPress={() => setShowQuoteForm(true)}
                startContent={<MessageCircle className="w-4 h-4" />}
              >
                Get Collection Advice
              </Button>
              <Button 
                variant="bordered" 
                size="lg"
                startContent={<Phone className="w-4 h-4" />}
              >
                Speak to Specialist
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Newsletter Section */}
        <section className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <NewsletterForm />
          </motion.div>
        </section>

        {/* Social Media Section */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h3 className="text-xl font-semibold mb-4">See Our Collections in Action</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Follow us for styling tips, collection highlights, and customer showcases
            </p>
            <div className="flex justify-center">
              <SocialMediaLinks showLabels />
            </div>
          </motion.div>
        </section>

        {/* Quote Request Modal */}
        <QuoteRequestForm 
          isOpen={showQuoteForm} 
          onClose={() => setShowQuoteForm(false)}
        />
      </div>
    </PageTransition>
  )
}
