// src/app/(store)/care/page.jsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Chip, Tabs, Tab, Accordion, AccordionItem } from '@nextui-org/react'
import PageTransition from '@/components/ui/PageTransition'
import { Heart, Droplets, Sun, Shield, AlertTriangle, Sparkles } from 'lucide-react'

export default function CarePage() {
  const [selectedGemstone, setSelectedGemstone] = useState('general')

  const generalCareTips = [
    {
      icon: Droplets,
      title: "Clean Gently",
      description: "Use mild soap and warm water with a soft brush",
      dos: ["Use soft-bristled toothbrush", "Rinse thoroughly", "Pat dry with soft cloth"],
      donts: ["Use harsh chemicals", "Scrub aggressively", "Use ultrasonic cleaners on all gems"]
    },
    {
      icon: Shield,
      title: "Store Properly",
      description: "Keep each piece separated to prevent scratching",
      dos: ["Use individual pouches", "Store in dry place", "Keep away from sunlight"],
      donts: ["Pile jewelry together", "Store in bathroom", "Leave exposed to air"]
    },
    {
      icon: Sun,
      title: "Protect from Elements",
      description: "Avoid exposure to chemicals and extreme temperatures",
      dos: ["Remove before swimming", "Apply perfume first", "Check settings regularly"],
      donts: ["Wear during sports", "Expose to household cleaners", "Ignore loose settings"]
    }
  ]

  const gemstoneSpecific = {
    diamond: {
      hardness: "10 (Hardest)",
      care: "Very durable, can be cleaned with soap and water",
      cleaning: "Ultrasonic and steam cleaning safe",
      storage: "Store separately to prevent scratching other gems",
      special: "Can scratch other gemstones, so store carefully"
    },
    ruby: {
      hardness: "9 (Very Hard)",
      care: "Durable but avoid sudden temperature changes",
      cleaning: "Soap and water, ultrasonic cleaning usually safe",
      storage: "Separate storage recommended",
      special: "Heat-treated rubies need gentle care"
    },
    sapphire: {
      hardness: "9 (Very Hard)",
      care: "Very durable, similar to ruby care",
      cleaning: "Most cleaning methods safe",
      storage: "Can be stored with other hard gems",
      special: "Blue sapphires are especially durable"
    },
    emerald: {
      hardness: "7.5-8 (Moderately Hard)",
      care: "More delicate, avoid ultrasonic cleaning",
      cleaning: "Gentle soap and water only",
      storage: "Store in soft pouch or lined box",
      special: "Often oil-treated, needs special care"
    },
    opal: {
      hardness: "5.5-6.5 (Soft)",
      care: "Very delicate, avoid heat and dryness",
      cleaning: "Damp cloth only, no soaking",
      storage: "Store with cotton to maintain moisture",
      special: "Can crack if dried out, avoid temperature changes"
    },
    turquoise: {
      hardness: "5-6 (Soft)",
      care: "Porous stone, avoid moisture and oils",
      cleaning: "Dry cloth only, no water",
      storage: "Store separately, very soft",
      special: "Can change color with skin oils"
    }
  }

  const cleaningSchedule = [
    { frequency: "Daily", action: "Remove before bed and store properly" },
    { frequency: "Weekly", action: "Gentle wipe with soft cloth" },
    { frequency: "Monthly", action: "Deep clean with appropriate method" },
    { frequency: "Quarterly", action: "Professional inspection and cleaning" },
    { frequency: "Annually", action: "Professional maintenance and re-setting check" }
  ]

  const warningItems = [
    { item: "Chlorine", risk: "Can damage gold and loosen settings" },
    { item: "Perfumes", risk: "Can dull gemstones and damage organic materials" },
    { item: "Lotions", risk: "Can build up and attract dirt" },
    { item: "Household cleaners", risk: "Contains harsh chemicals that can damage stones" },
    { item: "Exercise", risk: "Sweat and impact can damage jewelry" },
    { item: "Gardening", risk: "Dirt and chemicals can harm delicate stones" }
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
              startContent={<Heart className="w-4 h-4" />}
            >
              Jewelry Care
            </Chip>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Caring for Your Gemstones
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Preserve the beauty and value of your precious gemstones with proper care and maintenance
            </p>
          </motion.div>
        </div>

        {/* General Care Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Essential Care Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {generalCareTips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <tip.icon className="w-8 h-8 mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{tip.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Do:</h4>
                        <ul className="text-sm space-y-1">
                          {tip.dos.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-500">✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Don't:</h4>
                        <ul className="text-sm space-y-1">
                          {tip.donts.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-red-500">✗</span>
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

        {/* Gemstone-Specific Care */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Gemstone-Specific Care</h2>
          <Card>
            <CardBody className="p-6">
              <Tabs 
                size="lg" 
                selectedKey={selectedGemstone}
                onSelectionChange={setSelectedGemstone}
                className="w-full"
              >
                <Tab key="general" title="General">
                  <div className="space-y-4 pt-4">
                    <p className="text-gray-600 dark:text-gray-400">
                      Most gemstones can be safely cleaned with mild soap and warm water. However, each gemstone has unique properties that require specific care considerations.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3">Hardness Scale (Mohs)</h3>
                        <div className="space-y-2 text-sm">
                          <p><strong>9-10:</strong> Very hard (Diamond, Ruby, Sapphire)</p>
                          <p><strong>7-8:</strong> Hard (Emerald, Amethyst, Turquoise)</p>
                          <p><strong>5-6:</strong> Soft (Opal, Lapis Lazuli)</p>
                          <p><strong>Below 5:</strong> Very soft (Pearl, Amber)</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3">General Rules</h3>
                        <div className="space-y-2 text-sm">
                          <p>• Harder stones can scratch softer ones</p>
                          <p>• Softer stones need gentler cleaning</p>
                          <p>• Treated stones require special care</p>
                          <p>• Always check with professionals when unsure</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>

                {Object.entries(gemstoneSpecific).map(([stone, details]) => (
                  <Tab key={stone} title={stone.charAt(0).toUpperCase() + stone.slice(1)}>
                    <div className="space-y-4 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold mb-2">Hardness</h3>
                            <p className="text-sm">{details.hardness}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">General Care</h3>
                            <p className="text-sm">{details.care}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Cleaning Method</h3>
                            <p className="text-sm">{details.cleaning}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold mb-2">Storage</h3>
                            <p className="text-sm">{details.storage}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Special Notes</h3>
                            <p className="text-sm">{details.special}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                ))}
              </Tabs>
            </CardBody>
          </Card>
        </motion.div>

        {/* Cleaning Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <Card>
            <CardBody className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">Maintenance Schedule</h2>
              </div>
              <div className="space-y-3">
                {cleaningSchedule.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-medium">{item.frequency}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.action}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-bold">Avoid These</h2>
              </div>
              <div className="space-y-3">
                {warningItems.map((item, index) => (
                  <div key={index} className="p-3 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 rounded-r-lg">
                    <h3 className="font-medium">{item.item}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.risk}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Professional Care */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Professional Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Cleaning & Inspection</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quarterly professional cleaning and setting inspection to ensure your jewelry stays secure and beautiful.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Repairs & Restoration</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Expert repairs for damaged settings, worn prongs, and restoration of antique pieces.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Certification & Appraisal</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Updated appraisals and certifications for insurance and estate planning purposes.
                  </p>
                </div>
              </div>
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Contact us at care@shukragems.com to schedule professional services
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  )
}
