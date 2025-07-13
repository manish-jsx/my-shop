// src/components/forms/QuoteRequestForm.jsx
'use client'
import { useState } from 'react'
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button, 
  Input, 
  Textarea, 
  Select, 
  SelectItem,
  Chip,
  Divider
} from '@nextui-org/react'
import { Calculator, Send, Diamond, Phone } from 'lucide-react'

export default function QuoteRequestForm({ isOpen, onClose, productInfo = null }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    timeline: '',
    requirements: '',
    consultation: false,
    source: 'quote_request'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const budgetRanges = [
    { key: 'under_1k', label: 'Under $1,000' },
    { key: '1k_5k', label: '$1,000 - $5,000' },
    { key: '5k_15k', label: '$5,000 - $15,000' },
    { key: '15k_50k', label: '$15,000 - $50,000' },
    { key: 'over_50k', label: 'Over $50,000' },
    { key: 'flexible', label: 'Flexible / Discuss' }
  ]

  const timelines = [
    { key: 'asap', label: 'As soon as possible' },
    { key: '1_week', label: 'Within 1 week' },
    { key: '1_month', label: 'Within 1 month' },
    { key: '3_months', label: 'Within 3 months' },
    { key: 'no_rush', label: 'No rush / When perfect piece is found' }
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

    const leadData = {
      ...formData,
      productInfo,
      timestamp: new Date().toISOString(),
      status: 'quote_requested',
      priority: 'high',
      type: 'quote_request',
      id: Date.now()
    }

    try {
      // Store in localStorage for demo
      const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]')
      existingLeads.unshift(leadData)
      localStorage.setItem('leads', JSON.stringify(existingLeads))

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        budget: '',
        timeline: '',
        requirements: '',
        consultation: false,
        source: 'quote_request'
      })

      onClose()
      
      // Show success notification (in real app)
      alert('Quote request submitted! Our gemstone experts will contact you within 24 hours.')
    } catch (error) {
      console.error('Error submitting quote request:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-purple-600" />
            <span>Request Custom Quote</span>
          </div>
          {productInfo && (
            <p className="text-sm text-gray-600">
              For: {productInfo.name}
            </p>
          )}
        </ModalHeader>
        
        <ModalBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            {productInfo && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Diamond className="w-8 h-8 text-purple-600" />
                  <div>
                    <h4 className="font-semibold">{productInfo.name}</h4>
                    <p className="text-sm text-gray-600">{productInfo.category}</p>
                    {productInfo.price && (
                      <Chip size="sm" color="primary" variant="flat">
                        Starting from {productInfo.price}
                      </Chip>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
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
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              description="For priority consultation and updates"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Budget Range"
                placeholder="Select your budget"
                selectedKeys={formData.budget ? [formData.budget] : []}
                onSelectionChange={(keys) => handleChange('budget', Array.from(keys)[0])}
                isRequired
              >
                {budgetRanges.map((range) => (
                  <SelectItem key={range.key} value={range.key}>
                    {range.label}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="Timeline"
                placeholder="When do you need this?"
                selectedKeys={formData.timeline ? [formData.timeline] : []}
                onSelectionChange={(keys) => handleChange('timeline', Array.from(keys)[0])}
                isRequired
              >
                {timelines.map((timeline) => (
                  <SelectItem key={timeline.key} value={timeline.key}>
                    {timeline.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <Textarea
              label="Specific Requirements"
              placeholder="Tell us about your vision - preferred gemstone, size, setting style, certification needs, or any special requirements..."
              value={formData.requirements}
              onChange={(e) => handleChange('requirements', e.target.value)}
              minRows={4}
              isRequired
            />

            <Divider />

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Free Gemstone Consultation
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Get expert advice on gemstone selection, certification, and investment value.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="consultation"
                  checked={formData.consultation}
                  onChange={(e) => handleChange('consultation', e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="consultation" className="text-sm">
                  Yes, I'd like to schedule a free 30-minute consultation call
                </label>
              </div>
            </div>
          </form>
        </ModalBody>
        
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleSubmit}
            isLoading={isSubmitting}
            startContent={<Send className="w-4 h-4" />}
          >
            Submit Quote Request
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
