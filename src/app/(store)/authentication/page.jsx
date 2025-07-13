// src/app/(store)/authentication/page.jsx
'use client'
import { motion } from 'framer-motion'
import { Card, CardBody, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import PageTransition from '@/components/ui/PageTransition'
import { Shield, Award, FileCheck, Search, Eye, CheckCircle2 } from 'lucide-react'

export default function AuthenticationPage() {
  const certificationBodies = [
    {
      name: "GIA",
      fullName: "Gemological Institute of America",
      speciality: "Diamonds, Colored Gemstones",
      recognition: "Worldwide Gold Standard",
      established: "1931"
    },
    {
      name: "SSEF",
      fullName: "Swiss Gemmological Institute",
      speciality: "Colored Gemstones, Pearls",
      recognition: "International Excellence",
      established: "1974"
    },
    {
      name: "Gübelin",
      fullName: "Gübelin Gem Lab",
      speciality: "Precious Gemstones",
      recognition: "Swiss Precision",
      established: "1923"
    },
    {
      name: "AGL",
      fullName: "American Gemological Laboratories",
      speciality: "American Standards",
      recognition: "US Market Leader",
      established: "1977"
    }
  ]

  const authenticationFeatures = [
    {
      icon: Eye,
      title: "Visual Inspection",
      description: "Expert gemologists examine each stone under magnification",
      details: "10x magnification, polarized light, and advanced optical equipment"
    },
    {
      icon: Search,
      title: "Advanced Testing",
      description: "Scientific instruments verify gemstone properties",
      details: "Spectroscopy, refractometry, and specific gravity testing"
    },
    {
      icon: FileCheck,
      title: "Documentation",
      description: "Comprehensive reports detail all findings",
      details: "Digital certificates with security features and online verification"
    },
    {
      icon: Shield,
      title: "Guarantee",
      description: "100% authenticity guarantee with money-back promise",
      details: "If any stone proves inauthentic, full refund plus compensation"
    }
  ]

  const testingMethods = [
    {
      test: "Refractive Index",
      purpose: "Identifies gemstone species",
      accuracy: "99.5%",
      equipment: "Digital Refractometer"
    },
    {
      test: "Specific Gravity",
      purpose: "Measures density",
      accuracy: "99.8%",
      equipment: "Hydrostatic Balance"
    },
    {
      test: "Spectroscopy",
      purpose: "Chemical composition",
      accuracy: "99.9%",
      equipment: "FTIR Spectrometer"
    },
    {
      test: "Microscopy",
      purpose: "Internal characteristics",
      accuracy: "Visual Expert",
      equipment: "Gemological Microscope"
    },
    {
      test: "Photoluminescence",
      purpose: "Treatment detection",
      accuracy: "99.7%",
      equipment: "UV-Vis Spectroscopy"
    }
  ]

  const treatmentTypes = [
    {
      treatment: "Heat Treatment",
      gemstones: "Ruby, Sapphire, Tanzanite",
      detection: "Microscopy, Spectroscopy",
      disclosure: "Always Disclosed"
    },
    {
      treatment: "Oil/Resin Filling",
      gemstones: "Emerald",
      detection: "UV Fluorescence, Microscopy",
      disclosure: "Always Disclosed"
    },
    {
      treatment: "Irradiation",
      gemstones: "Blue Topaz, Some Diamonds",
      detection: "Spectroscopy",
      disclosure: "Always Disclosed"
    },
    {
      treatment: "Fracture Filling",
      gemstones: "Diamond, Ruby",
      detection: "Microscopy, Flash Effect",
      disclosure: "Always Disclosed"
    }
  ]

  const verificationSteps = [
    "Receive gemstone with accompanying certificate",
    "Verify certificate authenticity on issuing lab's website",
    "Check security features on physical certificate",
    "Cross-reference gemstone characteristics with certificate",
    "Contact us if any discrepancies are found"
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
              Gemstone Authentication
            </Chip>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Certified Authentic Gemstones
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Every gemstone is rigorously tested and certified by world-renowned gemological laboratories
            </p>
          </motion.div>
        </div>

        {/* Authentication Promise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {authenticationFeatures.map((feature, index) => (
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
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {feature.description}
                  </p>
                  <p className="text-xs text-gray-500">{feature.details}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Certification Bodies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Recognized Certification Bodies</h2>
          <Card>
            <CardBody>
              <Table aria-label="Certification bodies table">
                <TableHeader>
                  <TableColumn>ORGANIZATION</TableColumn>
                  <TableColumn>SPECIALITY</TableColumn>
                  <TableColumn>RECOGNITION</TableColumn>
                  <TableColumn>ESTABLISHED</TableColumn>
                </TableHeader>
                <TableBody>
                  {certificationBodies.map((body, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <div className="font-semibold">{body.name}</div>
                          <div className="text-sm text-gray-500">{body.fullName}</div>
                        </div>
                      </TableCell>
                      <TableCell>{body.speciality}</TableCell>
                      <TableCell>{body.recognition}</TableCell>
                      <TableCell>{body.established}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </motion.div>

        {/* Testing Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Scientific Testing Methods</h2>
          <Card>
            <CardBody>
              <Table aria-label="Testing methods table">
                <TableHeader>
                  <TableColumn>TEST TYPE</TableColumn>
                  <TableColumn>PURPOSE</TableColumn>
                  <TableColumn>ACCURACY</TableColumn>
                  <TableColumn>EQUIPMENT</TableColumn>
                </TableHeader>
                <TableBody>
                  {testingMethods.map((method, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold">{method.test}</TableCell>
                      <TableCell>{method.purpose}</TableCell>
                      <TableCell>
                        <Chip size="sm" color="success" variant="flat">
                          {method.accuracy}
                        </Chip>
                      </TableCell>
                      <TableCell>{method.equipment}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </motion.div>

        {/* Treatment Disclosure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Treatment Disclosure</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardBody className="p-6">
                <h3 className="text-xl font-semibold mb-4">Common Treatments</h3>
                <div className="space-y-4">
                  {treatmentTypes.map((treatment, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{treatment.treatment}</h4>
                        <Chip size="sm" color="primary" variant="flat">
                          {treatment.disclosure}
                        </Chip>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <strong>Gemstones:</strong> {treatment.gemstones}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Detection:</strong> {treatment.detection}
                      </p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h3 className="text-xl font-semibold mb-4">Our Commitment</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Full Disclosure</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        All treatments are clearly documented and disclosed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Expert Analysis</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Gemologists with decades of experience examine every stone
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Third-Party Verification</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Independent laboratories confirm our assessments
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Money-Back Guarantee</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        100% refund if any stone proves inauthentic
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </motion.div>

        {/* Verification Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">How to Verify Your Certificate</h2>
          <Card>
            <CardBody className="p-8">
              <div className="space-y-6">
                {verificationSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{step}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <h3 className="font-semibold mb-3">Online Verification Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>GIA:</strong> gia.edu/report-check</p>
                    <p><strong>SSEF:</strong> ssef.ch/verification</p>
                  </div>
                  <div>
                    <p><strong>Gübelin:</strong> gubelingemlab.com/verify</p>
                    <p><strong>AGL:</strong> aglgemlab.com/verify</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Contact for Authentication */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <CardBody className="p-8">
              <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Authentication Questions?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our gemological experts are available to answer questions about certificates, treatments, or authenticity verification.
              </p>
              <div className="space-y-2">
                <p className="font-semibold">📞 1-800-SHUKRA-1</p>
                <p className="font-semibold">✉️ authenticate@shukragems.com</p>
                <p className="text-sm text-gray-500">Gemological consultation available Monday - Friday</p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  )
}
