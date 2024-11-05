// src/components/cart/CartItem.js
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Button, Badge } from '@nextui-org/react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart, saveForLater } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex gap-4">
          <motion.div 
            className="relative w-24 h-24 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>
          
          <div className="flex-grow">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            
            <div className="flex items-center gap-2 mt-2">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  size="sm" 
                  variant="flat"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
              </motion.div>
              
              <Badge variant="flat" size="lg">
                {item.quantity}
              </Badge>
              
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  size="sm" 
                  variant="flat"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </motion.div>
            </div>
          </div>
          
          <div className="flex flex-col justify-between items-end">
            <motion.p 
              className="font-bold"
              key={item.quantity}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              ${(item.price * item.quantity).toFixed(2)}
            </motion.p>
            
            <div className="space-y-2">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  size="sm"
                  variant="light"
                  onClick={() => saveForLater(item.id)}
                >
                  Save for Later
                </Button>
              </motion.div>
              
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  color="danger" 
                  variant="light"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}