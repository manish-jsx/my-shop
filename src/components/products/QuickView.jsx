// src/components/products/QuickView.jsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image } from '@nextui-org/react'
import { useCart } from '@/context/CartContext'
import { Star, ShoppingCart } from 'lucide-react'

export default function QuickView({ product, isOpen, onClose }) {
  const { addToCart } = useCart()

  return (
    <Modal 
      size="3xl" 
      isOpen={isOpen} 
      onClose={onClose}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut"
            }
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn"
            }
          }
        }
      }}
    >
      <ModalContent>
        <ModalHeader>Quick View</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-6">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                className="object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-3xl font-bold">
                ${product.price.toFixed(2)}
              </p>

              <p className="text-gray-600">
                {product.description}
              </p>

              <div className="space-y-2">
                {product.specifications?.map((spec) => (
                  <div key={spec.name} className="flex justify-between">
                    <span className="text-gray-600">{spec.name}:</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  color="primary"
                  className="flex-1"
                  startContent={<ShoppingCart size={20} />}
                  onClick={() => {
                    addToCart(product)
                    onClose()
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  className="flex-1"
                  variant="bordered"
                  as="a"
                  href={`/products/details/${product.id}`}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}