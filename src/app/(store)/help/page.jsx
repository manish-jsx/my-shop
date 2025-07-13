// src/app/(store)/help/page.jsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Accordion, AccordionItem, Input, Button, Chip } from '@nextui-org/react'
import PageTransition from '@/components/ui/PageTransition'
import { Search, HelpCircle, MessageCircle, Gem, Shield, Truck, RotateCcw } from 'lucide-react'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const helpCategories = [
    {
      icon: Gem,
      title: "Gemstone Information",
      description: "Learn about authenticity, certifications, and properties",
      color: "purple"
    },
    {
      icon: Truck,
      title: "Shipping & Delivery",
      description: "Shipping policies, tracking, and delivery information",
      color: "blue"
    },
    {
      icon: RotateCcw,
      title: "Returns & Exchanges",
      description: "Return policy, exchange process, and refunds",
      color: "green"
    },
    {
      icon: Shield,
      title: "Warranty & Care",
      description: "Product warranty, care instructions, and maintenance",
      color: "orange"
    }
  ]

  const faqs = [
    {
      category: "general",
      question: "Are your gemstones authentic?",
      answer: "Yes, all our gemstones are 100% authentic and come with proper certification. We provide GIA certificates for diamonds and other recognized certifications for colored gemstones."
    },
    {
      category: "general",
      question: "Do you offer custom jewelry design?",
      answer: "Yes, we offer custom jewelry design services. Our master craftsmen can create unique pieces based on your specifications using your choice of gemstones."
    },
    {
      category: "shipping",
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days within the US. International shipping takes 7-14 business days. We also offer expedited shipping options."
    },
    {
      category: "shipping",
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide. Shipping costs and delivery times vary by location. International orders may be subject to customs duties."
    },
    {
      category: "returns",
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all items in original condition. Custom pieces are non-returnable unless there's a manufacturing defect."
    },
    {
      category: "returns",
      question: "How do I return an item?",
      answer: "Contact our customer service to initiate a return. We'll provide a prepaid return label and detailed instructions."
    },
    {
      category: "care",
      question: "How should I care for my gemstone jewelry?",
      answer: "Each gemstone has specific care requirements. Generally, store separately, clean gently with soft cloth, and avoid harsh chemicals. Detailed care guides are provided with each purchase."
    },
    {
      category: "care",
      question: "What does your warranty cover?",
      answer: "Our lifetime warranty covers manufacturing defects, setting issues, and normal wear. It doesn't cover damage from misuse, loss, or theft."
    }
  ]

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Chip 
              color="primary" 
              variant="flat" 
              className="mb-4"
              startContent={<HelpCircle className="w-4 h-4" />}
            >
              Help Center
            </Chip>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              How Can We Help You?
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about our gemstones, shipping, returns, and more
            </p>
          </motion.div>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Input
            size="lg"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="w-5 h-5 text-gray-400" />}
            className="w-full"
          />
        </motion.div>

        {/* Help Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardBody className="text-center p-6">
                    <category.icon className={`w-12 h-12 mx-auto mb-4 text-${category.color}-500`} />
                    <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            <Accordion variant="bordered">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  aria-label={faq.question}
                  title={faq.question}
                  className="text-left"
                >
                  <p className="text-gray-600 dark:text-gray-300 pb-4">
                    {faq.answer}
                  </p>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center space-y-6"
        >
          <Card className="max-w-2xl mx-auto">
            <CardBody className="p-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Still Need Help?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Can't find what you're looking for? Our customer support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button color="primary" size="lg">
                  Contact Support
                </Button>
                <Button variant="bordered" size="lg">
                  Live Chat
                </Button>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  )
}
