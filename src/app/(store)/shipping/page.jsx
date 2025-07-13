// src/app/(store)/shipping/page.jsx
'use client'
import { motion } from 'framer-motion'
import { Card, CardBody, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import PageTransition from '@/components/ui/PageTransition'
import { Truck, Clock, Globe, Shield, Package, MapPin } from 'lucide-react'

export default function ShippingPage() {
  const shippingMethods = [
    {
      method: "Standard Shipping",
      domestic: "3-5 business days",
      international: "7-14 business days",
      cost: "Free on orders $500+",
      tracking: "Yes"
    },
    {
      method: "Express Shipping",
      domestic: "1-2 business days",
      international: "3-5 business days",
      cost: "$25 domestic / $75 international",
      tracking: "Yes"
    },
    {
      method: "Overnight Shipping",
      domestic: "1 business day",
      international: "2-3 business days",
      cost: "$50 domestic / $150 international",
      tracking: "Yes"
    }
  ]

  const internationalRegions = [
    { region: "North America", time: "3-7 days", cost: "Starting at $25" },
    { region: "Europe", time: "7-14 days", cost: "Starting at $35" },
    { region: "Asia Pacific", time: "10-14 days", cost: "Starting at $45" },
    { region: "Middle East", time: "10-21 days", cost: "Starting at $55" },
    { region: "Latin America", time: "14-21 days", cost: "Starting at $60" },
    { region: "Africa", time: "14-28 days", cost: "Starting at $65" }
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
              startContent={<Truck className="w-4 h-4" />}
            >
              Shipping Information
            </Chip>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Shipping & Delivery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Fast, secure, and insured shipping for your precious gemstones worldwide
            </p>
          </motion.div>
        </div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            {
              icon: Shield,
              title: "Fully Insured",
              description: "All shipments are fully insured for their full value"
            },
            {
              icon: Package,
              title: "Secure Packaging",
              description: "Professional packaging to protect your gemstones"
            },
            {
              icon: Clock,
              title: "Fast Processing",
              description: "Orders processed within 1-2 business days"
            },
            {
              icon: Globe,
              title: "Worldwide Shipping",
              description: "We ship to over 100 countries worldwide"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardBody className="text-center p-6">
                  <feature.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Shipping Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">Shipping Options</h2>
          <Card>
            <CardBody>
              <Table aria-label="Shipping methods table">
                <TableHeader>
                  <TableColumn>METHOD</TableColumn>
                  <TableColumn>DOMESTIC</TableColumn>
                  <TableColumn>INTERNATIONAL</TableColumn>
                  <TableColumn>COST</TableColumn>
                  <TableColumn>TRACKING</TableColumn>
                </TableHeader>
                <TableBody>
                  {shippingMethods.map((method, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold">{method.method}</TableCell>
                      <TableCell>{method.domestic}</TableCell>
                      <TableCell>{method.international}</TableCell>
                      <TableCell>{method.cost}</TableCell>
                      <TableCell>
                        <Chip color="success" size="sm" variant="flat">
                          {method.tracking}
                        </Chip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </motion.div>

        {/* International Shipping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">International Shipping Zones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {internationalRegions.map((region, index) => (
              <Card key={index}>
                <CardBody className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">{region.region}</h3>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Delivery:</span> {region.time}</p>
                    <p><span className="font-medium">Cost:</span> {region.cost}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <Card>
            <CardBody className="p-6">
              <h3 className="text-xl font-semibold mb-4">Processing Time</h3>
              <div className="space-y-3 text-sm">
                <p>• Orders placed Monday-Friday before 2 PM EST ship same day</p>
                <p>• Weekend orders are processed on the next business day</p>
                <p>• Custom orders may require 5-10 business days for completion</p>
                <p>• Holiday processing times may vary</p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <h3 className="text-xl font-semibold mb-4">Customs & Duties</h3>
              <div className="space-y-3 text-sm">
                <p>• International customers are responsible for customs duties</p>
                <p>• Packages may be subject to inspection by customs</p>
                <p>• Delivery times may be extended due to customs processing</p>
                <p>• We declare the full value of all shipments</p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <CardBody className="p-8">
              <h3 className="text-xl font-semibold mb-2">Questions About Shipping?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our customer service team is available to help with shipping questions and tracking information.
              </p>
              <p className="font-semibold">
                📞 1-800-SHUKRA-1 | ✉️ shipping@shukragems.com
              </p>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  )
}
