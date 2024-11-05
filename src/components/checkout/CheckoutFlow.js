// src/components/checkout/CheckoutFlow.js
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Button, Input, Spinner } from '@nextui-org/react'
import { useCart } from '@/context/CartContext'
import { loadRazorpayScript, createRazorpayOrder } from '@/lib/razorpay'

const steps = [
  { id: 1, title: 'Shipping' },
  { id: 2, title: 'Payment' },
  { id: 3, title: 'Review' },
  { id: 4, title: 'Confirmation' }
]

export default function CheckoutFlow() {
  const { cart, getCartTotal, clearCart, checkoutStep, setCheckoutStep } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [orderStatus, setOrderStatus] = useState(null)
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postal: ''
  })

  const handlePayment = async () => {
    try {
      setLoading(true)
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load')
      }

      const amount = getCartTotal()
      const { orderId } = await createRazorpayOrder(amount)

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: 'INR',
        name: 'Enchanted Collections',
        description: 'Purchase Payment',
        order_id: orderId,
        prefill: {
          name: shippingInfo.name,
          email: shippingInfo.email,
          contact: shippingInfo.phone
        },
        handler: async function (response) {
          try {
            const verificationResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            })
            
            const { isValid } = await verificationResponse.json()
            
            if (isValid) {
              setOrderStatus({
                status: 'success',
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id
              })
              setCheckoutStep(3)
              clearCart()
            } else {
              throw new Error('Payment verification failed')
            }
          } catch (err) {
            setError('Payment verification failed')
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
          }
        }
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (checkoutStep === 1) {
      await handlePayment()
    } else {
      setCheckoutStep(checkoutStep + 1)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        {/* Progress Steps */}
        <div className="flex justify-between">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${
                step.id <= checkoutStep + 1 ? 'text-primary' : 'text-gray-400'
              }`}
            >
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2">
                {orderStatus && step.id === 4 ? '✓' : step.id}
              </div>
              <span>{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={checkoutStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="p-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-4 mb-4 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {checkoutStep === 0 && (
                <>
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  <Input
                    label="Full Name"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    required
                  />
                  <Input
                    label="Phone"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    required
                  />
                  <Input
                    label="Address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      required
                    />
                    <Input
                      label="State"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      required
                    />
                  </div>
                  <Input
                    label="Postal Code"
                    value={shippingInfo.postal}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, postal: e.target.value })}
                    required
                  />
                </>
              )}

              {checkoutStep === 1 && (
                <>
                  <h2 className="text-xl font-semibold mb-4">Payment</h2>
                  <div className="space-y-4">
                    <p>Total Amount: ₹{getCartTotal()}</p>
                    <p className="text-sm text-gray-600">
                      You will be redirected to Razorpay to complete your payment.
                    </p>
                  </div>
                </>
              )}

              {checkoutStep === 2 && orderStatus && (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-green-600">
                    Payment Successful!
                  </h2>
                  <div className="space-y-2">
                    <p>Order ID: {orderStatus.orderId}</p>
                    <p>Payment ID: {orderStatus.paymentId}</p>
                    <p className="text-sm text-gray-600">
                      A confirmation email has been sent to {shippingInfo.email}
                    </p>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-4 mt-6">
                {checkoutStep > 0 && checkoutStep < 2 && (
                  <Button
                    variant="flat"
                    onClick={() => setCheckoutStep(checkoutStep - 1)}
                    disabled={loading}
                  >
                    Back
                  </Button>
                )}
                {checkoutStep < 2 && (
                  <Button
                    color="primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner size="sm" color="white" />
                    ) : checkoutStep === 1 ? (
                      'Pay Now'
                    ) : (
                      'Continue'
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}