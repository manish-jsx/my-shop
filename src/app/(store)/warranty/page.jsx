// src/app/(store)/warranty/page.jsx
'use client'
import { motion } from 'framer-motion'
import { Card, CardBody, Chip, Accordion, AccordionItem } from '@nextui-org/react'
import PageTransition from '@/components/ui/PageTransition'
import { Shield, Clock, CheckCircle, AlertCircle, FileText, Award } from 'lucide-react'

export default function WarrantyPage() {
  const warrantyTypes = [
    {
      type: "Lifetime Warranty",
      icon: Shield,
      color: "success",
      coverage: "Manufacturing defects, setting issues, normal wear",
      duration: "Lifetime of ownership",
      included: ["Free repairs", "Setting maintenance", "Prong retipping", "Ring resizing (one free)"],
      excluded: ["Loss or theft", "Damage from misuse", "Scratches on metal", "Normal patina"]
    },
    {
      type: "Gemstone Guarantee",
      icon: Award,
      color: "primary",
      coverage: "Authenticity and quality assurance",
      duration: "Lifetime guarantee",
      included: ["Authenticity guarantee", "Quality certification", "Treatment disclosure", "Origin documentation"],
      excluded: ["Color changes due to wear", "Natural inclusions", "Normal wear patterns", "Damage from chemicals"]
    },
    {
      type: "Craftsmanship Warranty",
      icon: CheckCircle,
      color: "secondary", 
      coverage: "Workmanship and construction",
      duration: "2 years from purchase",
      included: ["Setting defects", "Clasp issues", "Chain problems", "Mounting failures"],
      excluded: ["Normal wear", "Accidental damage", "Misuse", "Unauthorized repairs"]
    }
  ]

  const registrationSteps = [
    "Complete your purchase with SHUKRA Gems",
    "Receive your warranty certificate via email",
    "Register your jewelry within 30 days online",
    "Keep your receipt and certificate safe",
    "Contact us for any warranty claims"
  ]

  const maintenanceSchedule = [
    {
      timeframe: "Every 6 months",
      service: "Basic Inspection",
      description: "Check settings, clasps, and overall condition",
      cost: "Free"
    },
    {
      timeframe: "Every 12 months", 
      service: "Professional Cleaning",
      description: "Deep cleaning and detailed inspection",
      cost: "Free"
    },
    {
      timeframe: "Every 2 years",
      service: "Comprehensive Service",
      description: "Full inspection, maintenance, and minor repairs",
      cost: "Free under warranty"
    }
  ]

  const claimProcess = [
    {
      step: "Contact Customer Service",
      description: "Email warranty@shukragems.com or call 1-800-SHUKRA-1",
      details: "Provide order number, warranty certificate, and description of issue"
    },
    {
      step: "Initial Assessment",
      description: "Our team reviews your claim and may request photos",
      details: "We'll determine if the issue is covered under warranty"
    },
    {
      step: "Send for Evaluation",
      description: "If needed, send your jewelry for professional evaluation",
      details: "We provide prepaid, insured shipping labels"
    },
    {
      step: "Repair or Replace",
      description: "We repair or replace your jewelry as appropriate",
      details: "All warranty work is performed by certified jewelers"
    },
    {
      step: "Return to You",
      description: "Your jewelry is returned via insured shipping",
      details: "Typical turnaround time is 2-3 weeks"
    }
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
              startContent={<Shield className="w-4 h-4" />}
            >
              Warranty Information
            </Chip>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Lifetime Warranty Protection
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your investment in genuine gemstones is protected with our comprehensive lifetime warranty program
            </p>
          </motion.div>
        </div>

        {/* Warranty Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Our Warranty Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {warrantyTypes.map((warranty, index) => (
              <motion.div
                key={warranty.type}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <warranty.icon className={`w-8 h-8 text-${warranty.color}-500`} />
                      <h3 className="text-lg font-semibold">{warranty.type}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{warranty.coverage}</p>
                        <Chip size="sm" color={warranty.color} variant="flat">
                          {warranty.duration}
                        </Chip>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Included:</h4>
                        <ul className="text-sm space-y-1">
                          {warranty.included.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-orange-600 dark:text-orange-400 mb-2">Not Covered:</h4>
                        <ul className="text-sm space-y-1">
                          {warranty.excluded.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <AlertCircle className="w-3 h-3 text-orange-500 mt-1 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Registration Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Warranty Registration</h2>
          <Card>
            <CardBody className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">How to Register Your Jewelry</h3>
              </div>
              <div className="space-y-4">
                {registrationSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm">
                  <strong>Important:</strong> Registration must be completed within 30 days of purchase to activate full warranty coverage. 
                  Keep your warranty certificate and purchase receipt in a safe place.
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Maintenance Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Preventive Maintenance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {maintenanceSchedule.map((maintenance, index) => (
              <Card key={index}>
                <CardBody className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">{maintenance.timeframe}</h3>
                  </div>
                  <h4 className="text-lg font-medium mb-2">{maintenance.service}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{maintenance.description}</p>
                  <Chip size="sm" color="success" variant="flat">
                    {maintenance.cost}
                  </Chip>
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Regular maintenance helps prevent issues and keeps your warranty valid. 
              Schedule your appointment by calling 1-800-SHUKRA-1.
            </p>
          </div>
        </motion.div>

        {/* Claim Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Filing a Warranty Claim</h2>
          <Card>
            <CardBody className="p-6">
              <Accordion variant="bordered">
                {claimProcess.map((process, index) => (
                  <AccordionItem
                    key={index}
                    aria-label={process.step}
                    title={
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-primary text-white rounded-full text-sm flex items-center justify-center">
                          {index + 1}
                        </span>
                        {process.step}
                      </div>
                    }
                  >
                    <div className="pl-9 space-y-2">
                      <p className="text-gray-700 dark:text-gray-300">{process.description}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{process.details}</p>
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardBody>
          </Card>
        </motion.div>

        {/* Important Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Important Terms & Conditions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-3">Warranty Validity</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Valid only for original purchaser</li>
                    <li>• Must be registered within 30 days</li>
                    <li>• Requires proof of purchase</li>
                    <li>• Non-transferable to other parties</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Warranty Voids If</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Repaired by unauthorized jeweler</li>
                    <li>• Modified or altered without permission</li>
                    <li>• Damaged through misuse or negligence</li>
                    <li>• Resized more than twice</li>
                  </ul>
                </div>
              </div>
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  For complete terms and conditions, please refer to your warranty certificate or contact customer service.
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <CardBody className="p-8">
              <h3 className="text-xl font-semibold mb-2">Warranty Questions?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our warranty specialists are here to help with any questions about coverage, claims, or maintenance.
              </p>
              <div className="space-y-2">
                <p className="font-semibold">📞 1-800-SHUKRA-1</p>
                <p className="font-semibold">✉️ warranty@shukragems.com</p>
                <p className="text-sm text-gray-500">Monday - Friday, 9 AM - 6 PM EST</p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  )
}
