// src/components/cart/CartDrawer.js
'use client'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Badge } from '@nextui-org/react'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const drawerRef = useRef(null)

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [isOpen, onClose])

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const total = getCartTotal()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-[90vw] max-w-md bg-white shadow-xl z-50 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <ShoppingBag size={20} />
                  Your Cart
                  <Badge color="primary" content={cart.length} />
                </h2>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onClick={onClose}
                >
                  <X size={20} />
                </Button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Your cart is empty</p>
                  <Button 
                    color="primary" 
                    variant="flat"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gray-50 rounded-lg p-3"
                      >
                        <div className="flex gap-3">
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h3 className="font-medium text-sm truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                isIconOnly
                                variant="flat"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus size={16} />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                size="sm"
                                isIconOnly
                                variant="flat"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus size={16} />
                              </Button>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            isIconOnly
                            color="danger"
                            variant="light"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="text-xl font-bold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="flat"
                    className="w-full"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                  <Link href="/checkout" onClick={onClose}>
                    <Button
                      color="primary"
                      className="w-full"
                    >
                      Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}