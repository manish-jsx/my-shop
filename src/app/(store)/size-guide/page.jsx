// src/app/(store)/size-guide/page.jsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tabs, Tab } from '@nextui-org/react'
import PageTransition from '@/components/ui/PageTransition'
import { Ruler, Info, Hand, Circle } from 'lucide-react'

export default function SizeGuidePage() {
  const [selectedCategory, setSelectedCategory] = useState('rings')

  const ringSizes = [
    { us: "4", uk: "H", eu: "47", circumference: "14.9", diameter: "4.7" },
    { us: "4.5", uk: "I", eu: "48", circumference: "15.3", diameter: "4.9" },
    { us: "5", uk: "J", eu: "49", circumference: "15.7", diameter: "5.0" },
    { us: "5.5", uk: "K", eu: "50", circumference: "16.1", diameter: "5.1" },
    { us: "6", uk: "L", eu: "51", circumference: "16.5", diameter: "5.2" },
    { us: "6.5", uk: "M", eu: "52", circumference: "16.9", diameter: "5.4" },
    { us: "7", uk: "N", eu: "54", circumference: "17.3", diameter: "5.5" },
    { us: "7.5", uk: "O", eu: "55", circumference: "17.7", diameter: "5.6" },
    { us: "8", uk: "P", eu: "56", circumference: "18.1", diameter: "5.8" },
    { us: "8.5", uk: "Q", eu: "58", circumference: "18.5", diameter: "5.9" },
    { us: "9", uk: "R", eu: "59", circumference: "18.9", diameter: "6.0" },
    { us: "9.5", uk: "S", eu: "60", circumference: "19.4", diameter: "6.2" },
    { us: "10", uk: "T", eu: "61", circumference: "19.8", diameter: "6.3" },
    { us: "10.5", uk: "U", eu: "62", circumference: "20.2", diameter: "6.4" },
    { us: "11", uk: "V", eu: "64", circumference: "20.6", diameter: "6.6" }
  ]

  const braceletSizes = [
    { size: "Extra Small", inches: "6.0 - 6.5", cm: "15.2 - 16.5", wrist: "Very Petite" },
    { size: "Small", inches: "6.5 - 7.0", cm: "16.5 - 17.8", wrist: "Petite" },
    { size: "Medium", inches: "7.0 - 7.5", cm: "17.8 - 19.1", wrist: "Average" },
    { size: "Large", inches: "7.5 - 8.0", cm: "19.1 - 20.3", wrist: "Large" },
    { size: "Extra Large", inches: "8.0 - 8.5", cm: "20.3 - 21.6", wrist: "Very Large" }
  ]

  const necklaceLengths = [
    { length: "14\"", name: "Choker", description: "Sits snugly around the neck" },
    { length: "16\"", name: "Princess", description: "Classic length, sits at base of throat" },
    { length: "18\"", name: "Matinee", description: "Rests on the chest, most popular length" },
    { length: "20\"", name: "Matinee Long", description: "Falls just below the collarbone" },
    { length: "24\"", name: "Opera", description: "Hangs to the bust line" },
    { length: "28-30\"", name: "Rope", description: "Falls at or below the bust line" },
    { length: "36\"+", name: "Lariat", description: "Very long, can be wrapped or knotted" }
  ]

  const measuringTips = [
    {
      title: "Ring Sizing",
      tips: [
        "Measure your finger at the end of the day when it's largest",
        "Ensure the ring slides over your knuckle comfortably",
        "Consider the width of the band - wider bands fit more snugly",
        "Account for temperature - fingers swell in heat, shrink in cold"
      ]
    },
    {
      title: "Bracelet Sizing",
      tips: [
        "Measure your wrist with a flexible tape measure",
        "Add 0.5\" for a snug fit, 1\" for comfortable fit",
        "Consider the bracelet style - bangles need to slide over hand",
        "Account for any medical conditions that affect swelling"
      ]
    },
    {
      title: "Necklace Sizing",
      tips: [
        "Consider your neckline and body proportions",
        "Try different lengths to see what's most flattering",
        "Think about layering - vary lengths by 2-4 inches",
        "Consider the pendant size when choosing length"
      ]
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
              startContent={<Ruler className="w-4 h-4" />}
            >
              Size Guide
            </Chip>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Find Your Perfect Fit
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get the perfect fit for your gemstone jewelry with our comprehensive sizing guide
            </p>
          </motion.div>
        </div>

        {/* Size Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Tabs 
            size="lg" 
            selectedKey={selectedCategory}
            onSelectionChange={setSelectedCategory}
            className="w-full"
          >
            <Tab key="rings" title="Rings">
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Circle className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Ring Size Chart</h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <Table aria-label="Ring sizes table">
                      <TableHeader>
                        <TableColumn>US SIZE</TableColumn>
                        <TableColumn>UK SIZE</TableColumn>
                        <TableColumn>EU SIZE</TableColumn>
                        <TableColumn>CIRCUMFERENCE (MM)</TableColumn>
                        <TableColumn>DIAMETER (MM)</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {ringSizes.map((size, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-semibold">{size.us}</TableCell>
                            <TableCell>{size.uk}</TableCell>
                            <TableCell>{size.eu}</TableCell>
                            <TableCell>{size.circumference}</TableCell>
                            <TableCell>{size.diameter}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      How to Measure Your Ring Size
                    </h3>
                    <div className="text-sm space-y-1">
                      <p>1. Wrap a string or thin strip of paper around your finger</p>
                      <p>2. Mark where the string/paper overlaps</p>
                      <p>3. Measure the length in millimeters</p>
                      <p>4. Find your size in the circumference column above</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>

            <Tab key="bracelets" title="Bracelets">
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Hand className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Bracelet Size Chart</h2>
                  </div>
                  
                  <Table aria-label="Bracelet sizes table">
                    <TableHeader>
                      <TableColumn>SIZE</TableColumn>
                      <TableColumn>INCHES</TableColumn>
                      <TableColumn>CENTIMETERS</TableColumn>
                      <TableColumn>WRIST TYPE</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {braceletSizes.map((size, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-semibold">{size.size}</TableCell>
                          <TableCell>{size.inches}</TableCell>
                          <TableCell>{size.cm}</TableCell>
                          <TableCell>{size.wrist}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Measuring Your Wrist
                    </h3>
                    <div className="text-sm space-y-1">
                      <p>1. Use a flexible measuring tape or string</p>
                      <p>2. Wrap snugly around your wrist bone</p>
                      <p>3. Note the measurement where the tape meets</p>
                      <p>4. Add 0.5-1 inch for comfortable fit</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>

            <Tab key="necklaces" title="Necklaces">
              <Card>
                <CardBody className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Circle className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Necklace Length Guide</h2>
                  </div>
                  
                  <Table aria-label="Necklace lengths table">
                    <TableHeader>
                      <TableColumn>LENGTH</TableColumn>
                      <TableColumn>NAME</TableColumn>
                      <TableColumn>DESCRIPTION</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {necklaceLengths.map((length, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-semibold">{length.length}</TableCell>
                          <TableCell>{length.name}</TableCell>
                          <TableCell>{length.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Choosing Necklace Length
                    </h3>
                    <div className="text-sm space-y-1">
                      <p>• Consider your neck length and body proportions</p>
                      <p>• Think about the necklines you wear most often</p>
                      <p>• For layering, vary lengths by 2-4 inches</p>
                      <p>• Pendant size affects how the necklace hangs</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </motion.div>

        {/* Professional Measuring Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Professional Measuring Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {measuringTips.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card className="h-full">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-semibold mb-4">{category.title}</h3>
                    <div className="space-y-2">
                      {category.tips.map((tip, tipIndex) => (
                        <div key={tipIndex} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <CardBody className="p-8">
              <h3 className="text-xl font-semibold mb-2">Need Help with Sizing?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our jewelry experts are here to help you find the perfect fit. We offer free resize services for most rings within 60 days of purchase.
              </p>
              <div className="text-sm text-gray-500">
                <p className="mb-2">📞 Call us at 1-800-SHUKRA-1</p>
                <p>✉️ Email sizing@shukragems.com</p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  )
}
