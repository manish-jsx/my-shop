'use client'
import { motion } from 'framer-motion'
import PageTransition from '@/components/ui/PageTransition'
import ContactForm from '@/components/forms/ContactForm'
import SocialMediaLinks from '@/components/ui/SocialMediaLinks'
import { Card, CardBody, Button, Input, Textarea, Chip } from '@nextui-org/react'
import { Mail, Phone, MapPin, MessageCircle, Clock, Headphones } from 'lucide-react'

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <Chip 
              color="primary" 
              variant="flat" 
              className="mb-4"
              startContent={<Headphones className="w-4 h-4" />}
            >
              Customer Support
            </Chip>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              We're Here to Help
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have questions about gemstones, need expert advice, or require assistance with your order? 
              Our dedicated team of gem specialists is ready to help you find your perfect stone.
            </p>
          </motion.div>
        </section>

        {/* Contact Methods */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Phone,
              title: "Phone Support",
              primary: "+1 (555) 123-GEMS",
              secondary: "Mon-Fri: 9AM-7PM EST",
              description: "Speak directly with our gem experts",
              color: "text-green-600"
            },
            {
              icon: Mail,
              title: "Email Support",
              primary: "support@shukragems.com",
              secondary: "Response within 2 hours",
              description: "Detailed assistance via email",
              color: "text-blue-600"
            },
            {
              icon: MessageCircle,
              title: "Live Chat",
              primary: "Available 24/7",
              secondary: "Instant responses",
              description: "Quick answers to your questions",
              color: "text-purple-600"
            }
          ].map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardBody className="space-y-4 p-6">
                  <div className={`w-12 h-12 ${method.color} bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{method.title}</h3>
                  <div className="space-y-1">
                    <p className="font-medium">{method.primary}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{method.secondary}</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{method.description}</p>
                  <Button color="primary" variant="flat" size="sm">
                    Contact Now
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </section>

        {/* Contact Form & Info */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardBody className="space-y-6 p-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Send us a Message</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fill out the form below and our gem experts will get back to you within 24 hours.
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      placeholder="Enter your first name"
                      isRequired
                    />
                    <Input
                      label="Last Name"
                      placeholder="Enter your last name"
                      isRequired
                    />
                  </div>

                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    isRequired
                  />

                  <Input
                    type="tel"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                  />

                  <Input
                    label="Subject"
                    placeholder="What can we help you with?"
                    isRequired
                  />

                  <Textarea
                    label="Message"
                    placeholder="Tell us more about your inquiry..."
                    minRows={4}
                    isRequired
                  />

                  <Button color="primary" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardBody>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p className="font-semibold">SHUKRA Gems Headquarters</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Gemstone Plaza<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Monday - Friday: 9:00 AM - 7:00 PM EST<br />
                      Saturday: 10:00 AM - 6:00 PM EST<br />
                      Sunday: 12:00 PM - 5:00 PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p className="font-semibold">Email Addresses</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      General: info@shukragems.com<br />
                      Support: support@shukragems.com<br />
                      Sales: sales@shukragems.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Access */}
            <Card>
              <CardBody className="space-y-4 p-6">
                <h3 className="text-lg font-semibold">Quick Answers</h3>
                <div className="space-y-3">
                  {[
                    "How can I verify my gemstone's authenticity?",
                    "What's your return and exchange policy?",
                    "Do you offer gemstone certification?",
                    "How should I care for my gemstone jewelry?"
                  ].map((question, index) => (
                    <button
                      key={index}
                      className="text-left text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                    >
                      • {question}
                    </button>
                  ))}
                </div>
                <Button color="primary" variant="flat" size="sm" className="w-full">
                  View All FAQs
                </Button>
              </CardBody>
            </Card>
          </motion.div>
        </section>

        {/* Store Locations */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Visit Our Showrooms</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience our gemstones in person at one of our premium showroom locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                city: "New York",
                address: "123 Gemstone Plaza, NY 10001",
                phone: "+1 (555) 123-4567",
                hours: "Mon-Sat: 10AM-7PM"
              },
              {
                city: "Los Angeles", 
                address: "456 Beverly Center, CA 90210",
                phone: "+1 (555) 234-5678",
                hours: "Mon-Sat: 10AM-8PM"
              },
              {
                city: "Miami",
                address: "789 Ocean Drive, FL 33139",
                phone: "+1 (555) 345-6789",
                hours: "Mon-Sat: 11AM-7PM"
              }
            ].map((location, index) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardBody className="space-y-3 p-6">
                    <h3 className="text-lg font-semibold">{location.city} Showroom</h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {location.address}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {location.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {location.hours}
                      </p>
                    </div>
                    <Button color="primary" variant="flat" size="sm" className="w-full">
                      Get Directions
                    </Button>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Emergency Support */}
        <section className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 text-center space-y-6">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">
            Need Urgent Assistance?
          </h2>
          <p className="text-red-700 dark:text-red-300 max-w-2xl mx-auto">
            For urgent matters related to high-value orders, shipping issues, or authentication concerns, 
            contact our priority support line available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button color="danger" size="lg">
              Call Priority Support: +1 (555) URGENT-1
            </Button>
            <Button color="danger" variant="bordered" size="lg">
              Emergency Chat
            </Button>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
