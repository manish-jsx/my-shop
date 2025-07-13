// src/components/forms/PopupLeadForm.jsx
'use client'
import { useState, useEffect } from 'react'
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
  Chip
} from '@nextui-org/react'
import { X, Gift, Sparkles, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PopupLeadForm({ 
  isOpen, 
  onClose, 
  trigger = 'time', 
  delay = 30000, // 30 seconds
  title = "Get 10% Off Your First Purchase",
  subtitle = "Join our exclusive gemstone community",
  offer = "10% off + free shipping on orders over $200"
}) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    interest: '',
    source: 'popup_form'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const interests = [
    { key: 'healing_stones', label: 'Healing & Spiritual Stones' },
    { key: 'luxury_jewelry', label: 'Luxury Jewelry' },
    { key: 'investment_gems', label: 'Investment Gemstones' },
    { key: 'custom_jewelry', label: 'Custom Design' },
    { key: 'birthstones', label: 'Birthstones' },
    { key: 'certification', label: 'Certified Gemstones' },
    { key: 'education', label: 'Learning About Gems' },
    { key: 'gifts', label: 'Gifts & Special Occasions' }
  ]

  useEffect(() => {
    if (trigger === 'time' && delay > 0) {
      const timer = setTimeout(() => {
        // Check if user has already seen the popup
        const hasSeenPopup = localStorage.getItem('hasSeenLeadPopup')
        if (!hasSeenPopup && !isOpen) {
          // Show popup after delay
          // This would typically be controlled by parent component
        }
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [trigger, delay, isOpen])

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
      timestamp: new Date().toISOString(),
      status: 'new',
      type: 'popup_lead',
      offer: offer,
      id: Date.now()
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store in localStorage for demo
      const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]')
      existingLeads.unshift(leadData)
      localStorage.setItem('leads', JSON.stringify(existingLeads))
      
      // Mark that user has seen popup
      localStorage.setItem('hasSeenLeadPopup', 'true')

      setIsSubmitted(true)
      setFormData({
        email: '',
        name: '',
        interest: '',
        source: 'popup_form'
      })
      
      // Close popup after 3 seconds and mark as submitted
      setTimeout(() => {
        onClose(true) // Pass true to indicate successful submission
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => onClose(false)} // Handle modal backdrop/escape dismissal
      size="lg"
      placement="center"
      backdrop="blur"
      hideCloseButton
      classNames={{
        base: "bg-white dark:bg-gray-900",
        body: "p-0",
        header: "p-0"
      }}
    >
      <ModalContent>
        {() => (
          <div className="relative overflow-hidden">
            {/* Close Button */}
            <Button
              isIconOnly
              variant="light"
              className="absolute top-2 right-2 z-10"
              onPress={() => onClose(false)} // Pass false to indicate dismissal
            >
              <X className="w-4 h-4" />
            </Button>

            {!isSubmitted ? (
              <>
                {/* Header Section */}
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    <Gift className="w-12 h-12 mx-auto mb-3" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">{title}</h2>
                  <p className="text-purple-100">{subtitle}</p>
                  <Chip 
                    color="warning" 
                    variant="solid" 
                    className="mt-3"
                    startContent={<Sparkles className="w-4 h-4" />}
                  >
                    {offer}
                  </Chip>
                </div>

                {/* Form Section */}
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="email"
                      label="Email Address"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      isRequired
                      startContent={<Mail className="w-4 h-4 text-gray-400" />}
                    />

                    <Input
                      label="First Name"
                      placeholder="Enter your first name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      isRequired
                    />

                    <Select
                      label="What interests you most?"
                      placeholder="Select your primary interest"
                      value={formData.interest}
                      onChange={(e) => handleChange('interest', e.target.value)}
                    >
                      {interests.map((interest) => (
                        <SelectItem key={interest.key} value={interest.key}>
                          {interest.label}
                        </SelectItem>
                      ))}
                    </Select>

                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? 'Claiming Offer...' : 'Claim My 10% Off'}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By signing up, you agree to receive marketing emails. Unsubscribe at any time.
                    </p>
                  </form>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to SHUKRA Gems!</h3>
                  <p className="text-gray-600 mb-4">
                    Your 10% discount code has been sent to your email. 
                    Start exploring our collection of authentic gemstones!
                  </p>
                  <Chip color="success" variant="flat">
                    Code: WELCOME10
                  </Chip>
                </motion.div>
              </div>
            )}
          </div>
        )}
      </ModalContent>
    </Modal>
  )
}
