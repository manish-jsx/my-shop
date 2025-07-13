// src/app/admin/orders/high-value/page.jsx
'use client'
import { useState } from 'react'
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Table, 
  TableHeader, 
  TableBody, 
  TableColumn, 
  TableRow, 
  TableCell,
  Chip,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Progress,
  Divider
} from '@nextui-org/react'
import { 
  Crown,
  DollarSign,
  AlertTriangle,
  Eye,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Star,
  Gem
} from 'lucide-react'

const highValueOrders = [
  {
    id: '#HV-2025-001',
    customer: {
      name: 'Victoria Sterling',
      email: 'victoria@sterling.com',
      phone: '+1 (555) 0123',
      tier: 'Platinum VIP',
      avatar: '/api/placeholder/40/40'
    },
    items: [
      { name: '10ct Kashmir Sapphire Ring', price: 89999, quantity: 1 },
      { name: 'Diamond Earrings Set', price: 15000, quantity: 1 }
    ],
    total: 104999,
    status: 'verification_required',
    priority: 'urgent',
    orderDate: '2025-07-10',
    expectedDelivery: '2025-07-20',
    progress: 25,
    specialInstructions: 'White glove delivery service required. Customer requests personal consultation.',
    riskLevel: 'high'
  },
  {
    id: '#HV-2025-002',
    customer: {
      name: 'Alexander Chen',
      email: 'alex.chen@techcorp.com',
      phone: '+1 (555) 0456',
      tier: 'Gold VIP',
      avatar: '/api/placeholder/40/40'
    },
    items: [
      { name: '8ct Burmese Ruby Necklace', price: 67500, quantity: 1 },
      { name: 'Matching Ruby Bracelet', price: 12500, quantity: 1 }
    ],
    total: 80000,
    status: 'authentication_pending',
    priority: 'high',
    orderDate: '2025-07-08',
    expectedDelivery: '2025-07-18',
    progress: 60,
    specialInstructions: 'Gift wrapping required. Include authenticity certificates.',
    riskLevel: 'medium'
  },
  {
    id: '#HV-2025-003',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@luxury.com',
      phone: '+1 (555) 0789',
      tier: 'Diamond Elite',
      avatar: '/api/placeholder/40/40'
    },
    items: [
      { name: '15ct Colombian Emerald', price: 125000, quantity: 1 }
    ],
    total: 125000,
    status: 'processing',
    priority: 'urgent',
    orderDate: '2025-07-05',
    expectedDelivery: '2025-07-15',
    progress: 85,
    specialInstructions: 'Museum-quality packaging. Insurance coverage $150,000.',
    riskLevel: 'high'
  }
]

export default function HighValueOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const getStatusColor = (status) => {
    switch (status) {
      case 'verification_required': return 'warning'
      case 'authentication_pending': return 'primary'
      case 'processing': return 'success'
      case 'shipped': return 'success'
      default: return 'default'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'danger'
      case 'high': return 'warning'
      case 'medium': return 'primary'
      default: return 'default'
    }
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'danger'
      case 'medium': return 'warning'
      case 'low': return 'success'
      default: return 'default'
    }
  }

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'Diamond Elite': return <Crown className="w-4 h-4 text-purple-600" />
      case 'Platinum VIP': return <Star className="w-4 h-4 text-gray-600" />
      case 'Gold VIP': return <Gem className="w-4 h-4 text-yellow-600" />
      default: return null
    }
  }

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    onOpen()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Crown className="w-8 h-8 text-purple-600" />
            High-Value Orders
          </h1>
          <p className="text-gray-600 mt-1">Luxury orders requiring special attention and verification</p>
        </div>
        <div className="flex gap-3">
          <Button color="warning" variant="flat">
            Review Queue
          </Button>
          <Button color="primary">
            Bulk Actions
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-purple-600">$2.4M</p>
                <p className="text-xs text-green-600">+15% this month</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-orange-600">12</p>
                <p className="text-xs text-gray-500">Urgent attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">VIP Customers</p>
                <p className="text-2xl font-bold text-blue-600">28</p>
                <p className="text-xs text-gray-500">Active this month</p>
              </div>
              <Crown className="w-8 h-8 text-blue-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Order Value</p>
                <p className="text-2xl font-bold text-green-600">$85K</p>
                <p className="text-xs text-gray-500">Luxury segment</p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">High-Value Order Queue</h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="High-value orders table">
            <TableHeader>
              <TableColumn>CUSTOMER</TableColumn>
              <TableColumn>ORDER DETAILS</TableColumn>
              <TableColumn>VALUE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>PRIORITY</TableColumn>
              <TableColumn>PROGRESS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {highValueOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar src={order.customer.avatar} size="sm" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{order.customer.name}</p>
                          {getTierIcon(order.customer.tier)}
                        </div>
                        <p className="text-sm text-gray-500">{order.customer.tier}</p>
                        <p className="text-xs text-gray-400">{order.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.items[0].name}</p>
                      {order.items.length > 1 && (
                        <p className="text-sm text-gray-500">+{order.items.length - 1} more items</p>
                      )}
                      <p className="text-xs text-gray-400">Order: {order.orderDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-bold text-lg text-green-600">
                        ${order.total.toLocaleString()}
                      </p>
                      <Chip 
                        size="tiny" 
                        color={getRiskColor(order.riskLevel)}
                        variant="flat"
                      >
                        {order.riskLevel} risk
                      </Chip>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      color={getStatusColor(order.status)} 
                      variant="flat" 
                      size="sm"
                    >
                      {order.status.replace('_', ' ')}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      color={getPriorityColor(order.priority)} 
                      variant="dot"
                      size="sm"
                    >
                      {order.priority}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="w-full">
                      <Progress 
                        value={order.progress} 
                        size="sm"
                        color={order.progress > 75 ? 'success' : order.progress > 50 ? 'warning' : 'primary'}
                      />
                      <p className="text-xs text-gray-500 mt-1">{order.progress}% complete</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => handleViewOrder(order)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        color="primary"
                        variant="flat"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Order Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent>
          <ModalHeader>
            <div className="flex items-center justify-between w-full">
              <span>Order Details - {selectedOrder?.id}</span>
              <Chip 
                color={getPriorityColor(selectedOrder?.priority)} 
                variant="flat"
              >
                {selectedOrder?.priority} priority
              </Chip>
            </div>
          </ModalHeader>
          <ModalBody>
            {selectedOrder && (
              <div className="space-y-6">
                {/* Customer Information */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">Customer Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar src={selectedOrder.customer.avatar} size="md" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{selectedOrder.customer.name}</p>
                          {getTierIcon(selectedOrder.customer.tier)}
                        </div>
                        <p className="text-sm text-gray-500">{selectedOrder.customer.tier}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{selectedOrder.customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{selectedOrder.customer.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Divider />

                {/* Order Items */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">Order Items</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-green-600">${item.price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4 p-4 bg-purple-50 rounded-lg">
                    <span className="font-semibold text-lg">Total Order Value</span>
                    <span className="font-bold text-2xl text-purple-600">
                      ${selectedOrder.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Divider />

                {/* Order Progress */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">Order Progress</h4>
                  <Progress 
                    value={selectedOrder.progress} 
                    size="lg"
                    color={selectedOrder.progress > 75 ? 'success' : selectedOrder.progress > 50 ? 'warning' : 'primary'}
                    className="mb-3"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Current Status</label>
                      <Chip 
                        color={getStatusColor(selectedOrder.status)} 
                        variant="flat"
                        className="mt-1"
                      >
                        {selectedOrder.status.replace('_', ' ')}
                      </Chip>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Expected Delivery</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{selectedOrder.expectedDelivery}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                {selectedOrder.specialInstructions && (
                  <>
                    <Divider />
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Special Instructions</h4>
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm">{selectedOrder.specialInstructions}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button color="warning" variant="flat">
              Contact Customer
            </Button>
            <Button color="primary">
              Update Status
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
