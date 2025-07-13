// src/app/(store)/returns/page.jsx
'use client'
import { motion } from 'framer-motion'
import { Card, CardBody, Chip, Button, Steps, StepsItem } from '@nextui-org/react'
import PageTransition from '@/components/ui/PageTransition'
import { RotateCcw, Calendar, Shield, CheckCircle, AlertTriangle, Mail } from 'lucide-react'

export default function ReturnsPage() {
  const returnSteps = [
    {
      title: "Contact Us",
      description: "Email or call us within 30 days to initiate your return"
    },
    {
      title: "Receive Authorization",
      description: "We'll provide a return authorization number and prepaid label"
    },
    {
      title: "Package & Ship",
      description: "Securely package your item and ship using our prepaid label"
    },
    {
      title: "Inspection",
      description: "We inspect the item to ensure it meets return conditions"
    },
    {
      title: "Refund Processed",
      description: "Your refund is processed within 5-7 business days"
    }
  ]

  const eligibleItems = [
    "Unworn jewelry in original condition",
    "Items with original packaging and certificates",
    "Non-personalized/non-custom pieces",
    "Items purchased within the last 30 days"
  ]

  const nonEligibleItems = [
    "Custom or personalized jewelry",
    "Engraved items",
    "Items worn or damaged",
    "Loose gemstones (unless defective)",
    "Items without proof of purchase"
  ]

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
              startContent={<RotateCcw className="w-4 h-4" />}
            >
              Returns & Exchanges
            </Chip>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Easy Returns & Exchanges
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We want you to love your gemstones. If you're not completely satisfied, we make returns simple and hassle-free.
            </p>
          </motion.div>
        </div>

        {/* Key Policies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Calendar,
              title: "30-Day Window",
              description: "Returns accepted within 30 days of delivery"
            },
            {
              icon: Shield,
              title: "Quality Guaranteed",
              description: "We stand behind the quality of every piece"
            },
            {
              icon: CheckCircle,
              title: "Free Return Shipping",
              description: "We provide prepaid return labels for all returns"
            }
          ].map((policy, index) => (
            <motion.div
              key={policy.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardBody className="text-center p-6">
                  <policy.icon className="w-8 h-8 mx-auto mb-4 text-green-500" />
                  <h3 className="font-semibold mb-2">{policy.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {policy.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Return Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">How to Return Your Item</h2>
          <Card>
            <CardBody className="p-8">
              <div className="space-y-8">
                {returnSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Eligible vs Non-Eligible Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <Card>
            <CardBody className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-semibold">Eligible for Return</h3>
              </div>
              <div className="space-y-3">
                {eligibleItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-semibold">Not Eligible for Return</h3>
              </div>
              <div className="space-y-3">
                {nonEligibleItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Exchange Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Card>
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-6">Exchange Policy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Size Exchanges</h3>
                  <div className="space-y-2 text-sm">
                    <p>• Free size exchanges within 30 days</p>
                    <p>• Available for rings and bracelets</p>
                    <p>• One free exchange per item</p>
                    <p>• Additional exchanges subject to shipping costs</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Item Exchanges</h3>
                  <div className="space-y-2 text-sm">
                    <p>• Exchange for different item of equal or greater value</p>
                    <p>• Price difference applies for higher value items</p>
                    <p>• Refund issued if new item is lower value</p>
                    <p>• Subject to availability</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Warranty vs Returns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-6">Returns vs. Warranty Claims</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Use Returns For:</h3>
                  <div className="space-y-2 text-sm">
                    <p>• Changed your mind about the purchase</p>
                    <p>• Item doesn't fit as expected</p>
                    <p>• Color or style isn't what you wanted</p>
                    <p>• Received as gift but prefer different item</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Use Warranty For:</h3>
                  <div className="space-y-2 text-sm">
                    <p>• Manufacturing defects</p>
                    <p>• Stone setting issues</p>
                    <p>• Metal quality problems</p>
                    <p>• Normal wear and tear repairs</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Contact for Returns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <CardBody className="p-8">
              <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Start Your Return</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Ready to return or exchange an item? Contact our customer service team to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button color="primary" size="lg">
                  Email Returns Team
                </Button>
                <Button variant="bordered" size="lg">
                  Call 1-800-SHUKRA-1
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Please have your order number ready when contacting us.
              </p>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  )
}
