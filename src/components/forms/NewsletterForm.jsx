// src/components/forms/NewsletterForm.jsx
'use client'
import { useState } from 'react'
import { Button, Input, Card, CardBody, Chip } from '@nextui-org/react'
import { Mail, Gift, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NewsletterForm({ variant = 'default', className = '' }) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    const leadData = {
      email,
      source: 'newsletter',
      timestamp: new Date().toISOString(),
      status: 'subscribed',
      type: 'newsletter_signup',
      id: Date.now()
    }

    try {
      // Store in localStorage for demo
      const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]')
      existingLeads.unshift(leadData)
      localStorage.setItem('leads', JSON.stringify(existingLeads))

      setIsSubmitted(true)
      setEmail('')
    } catch (error) {
      console.error('Error subscribing:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center ${className}`}
      >
        <div className="flex items-center justify-center mb-2">
          <Gift className="w-6 h-6 text-green-600 mr-2" />
          <span className="text-green-600 font-semibold">Welcome to SHUKRA Gems!</span>
        </div>
        <p className="text-sm text-gray-600">
          Check your email for your exclusive 10% discount code.
        </p>
      </motion.div>
    )
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="sm"
          className="flex-1"
          required
        />
        <Button
          type="submit"
          color="primary"
          size="sm"
          isLoading={isSubmitting}
          isIconOnly
        >
          <Mail className="w-4 h-4" />
        </Button>
      </form>
    )
  }

  if (variant === 'footer') {
    return (
      <div className={className}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold">Stay Connected</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Get exclusive offers, gemstone insights, and new collection updates.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="sm"
            className="flex-1"
            required
          />
          <Button
            type="submit"
            color="primary"
            size="sm"
            isLoading={isSubmitting}
          >
            Subscribe
          </Button>
        </form>
      </div>
    )
  }

  return (
    <Card className={className}>
      <CardBody className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
            <Mail className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">Join Our VIP List</h3>
            <p className="text-sm text-gray-600">Get 10% off your first purchase</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <Chip size="sm" variant="flat" color="primary">Exclusive Offers</Chip>
          <Chip size="sm" variant="flat" color="secondary">New Arrivals</Chip>
          <Chip size="sm" variant="flat" color="success">Gem Insights</Chip>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startContent={<Mail className="w-4 h-4 text-gray-400" />}
            required
          />
          <Button
            type="submit"
            color="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full"
          >
            Get My 10% Discount
          </Button>
        </form>
        
        <p className="text-xs text-gray-500 mt-2">
          No spam, unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
        </p>
      </CardBody>
    </Card>
  )
}
