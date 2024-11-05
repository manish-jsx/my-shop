
// src/components/admin/orders/OrderDetails.jsx
'use client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Divider,
  User
} from '@nextui-org/react'
import {
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Phone,
  Mail,
  CreditCard
} from 'lucide-react'

export default function OrderDetails({ order, isOpen, onClose }) {
  if (!order) return null

  const statusIcon = {
    pending: Clock,
    processing: Clock,
    completed: CheckCircle2,
    cancelled: XCircle
  }

  const StatusIcon = statusIcon[order.status]

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <h3>Order Details</h3>
                <Chip
                  color={order.status === 'completed' ? 'success' : 
                         order.status === 'cancelled' ? 'danger' : 
                         'warning'}
                  startContent={<StatusIcon className="w-4 h-4" />}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Chip>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-6">
                {/* Order Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date Placed</p>
                    <p className="font-medium">{order.date}</p>
                  </div>
                </div>

                <Divider />

                {/* Customer Info */}
                <div>
                  <h4 className="font-medium mb-3">Customer Information</h4>
                  <User
                    name={order.customer.name}
                    description={order.customer.email}
                    avatarProps={{
                      src: order.customer.avatar
                    }}
                  />
                </div>

                <Divider />

                {/* Order Items */}
                <div>
                  <h4 className="font-medium mb-3">Order Items</h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div 
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Divider />

                {/* Order Summary */}
                <div>
                  <h4 className="font-medium mb-3">Order Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-gray-500">Subtotal</p>
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-500">Shipping</p>
                      <p className="font-medium">$0.00</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-500">Tax</p>
                      <p className="font-medium">${(order.total * 0.1).toFixed(2)}</p>
                    </div>
                    <Divider />
                    <div className="flex justify-between">
                      <p className="font-bold">Total</p>
                      <p className="font-bold">
                        ${(order.total * 1.1).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {order.status === 'pending' && (
                <Button color="primary" onPress={onClose}>
                  Process Order
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
