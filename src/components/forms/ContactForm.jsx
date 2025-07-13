// src/components/forms/ContactForm.jsx
'use client'
import { useState } from 'react'
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Input, 
  Textarea, 
  Select, 
  SelectItem,
  Chip
} from '@nextui-org/react'
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactForm({ variant = 'full', title = "Get in Touch" }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    interest: '',
    source: 'contact_form'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const interests = [
    { key: 'gemstone_consultation', label: 'Gemstone Consultation' },
    { key: 'custom_jewelry', label: 'Custom Jewelry Design' },
    { key: 'certification', label: 'Gemstone Certification' },
    { key: 'investment', label: 'Investment Gemstones' },
    { key: 'healing_stones', label: 'Healing & Spiritual Stones' },
    { key: 'jewelry_repair', label: 'Jewelry Repair & Maintenance' },
    { key: 'bulk_purchase', label: 'Bulk Purchase' },
    { key: 'other', label: 'Other' }
  ]

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Add timestamp and source
    const leadData = {
      ...formData,
      timestamp: new Date().toISOString(),
      status: 'new',
      id: Date.now() // In real app, backend would generate this
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store in localStorage for demo (in real app, send to backend)
      const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]')
      existingLeads.unshift(leadData)
      localStorage.setItem('leads', JSON.stringify(existingLeads))

      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        interest: '',
        source: 'contact_form'
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardBody className="text-center p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-4">
              Thank you for contacting SHUKRA Gems. Our team will get back to you within 24 hours.
            </p>
            <Button 
              color="primary" 
              onPress={() => setIsSubmitted(false)}
            >
              Send Another Message
            </Button>
          </motion.div>
        </CardBody>
      </Card>
    )
  }

  if (variant === 'compact') {
    return (
      <Card className="w-full">
        <CardHeader>
          <h3 className="text-lg font-semibold">{title}</h3>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Name"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                isRequired
              />
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                isRequired
              />
            </div>
            <Input
              label="Phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
            <Select
              label="I'm interested in"
              placeholder="Select your interest"
              selectedKeys={formData.interest ? [formData.interest] : []}
              onSelectionChange={(keys) => handleChange('interest', Array.from(keys)[0])}
            >
              {interests.map((interest) => (
                <SelectItem key={interest.key} value={interest.key}>
                  {interest.label}
                </SelectItem>
              ))}
            </Select>
            <Textarea
              label="Message"
              placeholder="Tell us more about your requirements..."
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              minRows={3}
              isRequired
            />
            <Button
              type="submit"
              color="primary"
              size="lg"
              startContent={<Send className="w-4 h-4" />}
              isLoading={isSubmitting}
              className="w-full"
            >
              Send Message
            </Button>
          </form>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Contact Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-gray-600">
              Ready to discover your perfect gemstone? Get in touch with our experts.
            </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  isRequired
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  isRequired
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
                <Select
                  label="I'm interested in"
                  placeholder="Select your interest"
                  selectedKeys={formData.interest ? [formData.interest] : []}
                  onSelectionChange={(keys) => handleChange('interest', Array.from(keys)[0])}
                >
                  {interests.map((interest) => (
                    <SelectItem key={interest.key} value={interest.key}>
                      {interest.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <Input
                label="Subject"
                placeholder="What can we help you with?"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
              />

              <Textarea
                label="Message"
                placeholder="Tell us more about your requirements, budget, or any questions you have..."
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                minRows={4}
                isRequired
              />

              <Button
                type="submit"
                color="primary"
                size="lg"
                startContent={<Send className="w-4 h-4" />}
                isLoading={isSubmitting}
                className="w-full"
              >
                Send Message
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>

      {/* Contact Information */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Visit Our Showroom</h3>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <p className="font-medium">SHUKRA Gems Flagship Store</p>
                <p className="text-sm text-gray-600">
                  123 Gem District Avenue<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-600">Mon-Sat 9AM-7PM EST</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium">hello@shukragems.com</p>
                <p className="text-sm text-gray-600">We respond within 24 hours</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <p className="font-medium">Business Hours</p>
                <div className="text-sm text-gray-600">
                  <p>Mon-Fri: 9:00 AM - 7:00 PM</p>
                  <p>Saturday: 10:00 AM - 6:00 PM</p>
                  <p>Sunday: 12:00 PM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="text-center">
            <h4 className="font-semibold mb-2">Need Immediate Assistance?</h4>
            <p className="text-sm text-gray-600 mb-4">
              For urgent gemstone consultations or high-value purchases
            </p>
            <Button 
              color="primary" 
              variant="flat" 
              startContent={<Phone className="w-4 h-4" />}
              className="w-full"
            >
              Call Now: +1 (555) 999-GEMS
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
