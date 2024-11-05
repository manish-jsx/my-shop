// src/components/admin/marketing/DiscountManager.jsx
'use client'
import { useState } from 'react'
import {
  Card,
  CardBody,
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Switch,
  Progress
} from '@nextui-org/react'
import { 
  Plus,
  Edit2,
  Trash2,
  Copy,
  Tag,
  Percent,
  Calendar
} from 'lucide-react'

// Sample discounts data
const initialDiscounts = [
  {
    id: 1,
    code: 'SUMMER24',
    type: 'percentage',
    value: 20,
    minPurchase: 100,
    usageLimit: 1000,
    usageCount: 450,
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    status: 'active',
    appliesTo: 'all',
    excludedItems: []
  },
  // Add more discounts...
]

export default function DiscountManager() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [discounts, setDiscounts] = useState(initialDiscounts)
  const [editingDiscount, setEditingDiscount] = useState(null)

  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage',
    value: '',
    minPurchase: '',
    usageLimit: '',
    startDate: '',
    endDate: '',
    appliesTo: 'all',
    excludedItems: [],
    isActive: true
  })

  const handleEdit = (discount) => {
    setEditingDiscount(discount)
    setFormData({
      code: discount.code,
      type: discount.type,
      value: discount.value,
      minPurchase: discount.minPurchase,
      usageLimit: discount.usageLimit,
      startDate: discount.startDate,
      endDate: discount.endDate,
      appliesTo: discount.appliesTo,
      excludedItems: discount.excludedItems,
      isActive: discount.status === 'active'
    })
    onOpen()
  }

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
    // Show toast notification
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    onClose()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Discount Manager</h1>
        <Button
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
          onPress={() => {
            setEditingDiscount(null)
            setFormData({
              code: '',
              type: 'percentage',
              value: '',
              minPurchase: '',
              usageLimit: '',
              startDate: '',
              endDate: '',
              appliesTo: 'all',
              excludedItems: [],
              isActive: true
            })
            onOpen()
          }}
        >
          Create Discount
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: 'Active Discounts',
            value: '8',
            description: '3 expiring soon'
          },
          {
            title: 'Total Savings',
            value: '$12,450',
            description: 'This month'
          },
          {
            title: 'Usage Rate',
            value: '24%',
            description: 'Avg. redemption'
          }
        ].map((stat) => (
          <Card key={stat.title}>
            <CardBody>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Discounts Table */}
      <Card>
        <CardBody>
          <Table aria-label="Discounts table">
            <TableHeader>
              <TableColumn>CODE</TableColumn>
              <TableColumn>DISCOUNT</TableColumn>
              <TableColumn>DATE RANGE</TableColumn>
              <TableColumn>USAGE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {discounts.map((discount) => (
                <TableRow key={discount.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="font-mono">{discount.code}</span>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onClick={() => handleCopyCode(discount.code)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4" />
                      {discount.type === 'percentage' ? 
                        `${discount.value}% off` : 
                        `$${discount.value} off`}
                    </div>
                    {discount.minPurchase > 0 && (
                      <p className="text-sm text-gray-500">
                        Min. purchase: ${discount.minPurchase}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p>{discount.startDate}</p>
                        <p>{discount.endDate}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          {discount.usageCount}/{discount.usageLimit}
                        </span>
                        <span className="text-sm text-gray-500">
                          {Math.round((discount.usageCount / discount.usageLimit) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(discount.usageCount / discount.usageLimit) * 100}
                        color="primary"
                        size="sm"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={discount.status === 'active' ? 'success' : 'default'}
                      size="sm"
                      variant="flat"
                    >
                      {discount.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onClick={() => handleEdit(discount)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        variant="light"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Discount Form Modal */}
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {editingDiscount ? 'Edit Discount' : 'Create Discount'}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Discount Code"
                    placeholder="Enter discount code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    isRequired
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="Discount Type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      isRequired
                    >
                      <SelectItem key="percentage">Percentage</SelectItem>
                      <SelectItem key="fixed">Fixed Amount</SelectItem>
                    </Select>
                    <Input
                      type="number"
                      label={formData.type === 'percentage' ? 'Percentage Off' : 'Amount Off'}
                      placeholder="Enter value"
                      startContent={formData.type === 'percentage' ? '%' : '$'}
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      isRequired
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      label="Minimum Purchase"
                      placeholder="Enter minimum amount"
                      startContent="$"
                      value={formData.minPurchase}
                      onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                    />
                    <Input
                      type="number"
                      label="Usage Limit"
                      placeholder="Enter usage limit"
                      value={formData.usageLimit}
                      onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                      isRequired
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      label="Start Date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      isRequired
                    />
                    <Input
                      type="date"
                      label="End Date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      isRequired
                    />
                  </div>

                  <Select
                    label="Applies To"
                    value={formData.appliesTo}
                    onChange={(e) => setFormData({ ...formData, appliesTo: e.target.value })}
                    isRequired
                  >
                    <SelectItem key="all">All Products</SelectItem>
                    <SelectItem key="categories">Specific Categories</SelectItem>
                    <SelectItem key="products">Specific Products</SelectItem>
                  </Select>

                  <Switch
                    isSelected={formData.isActive}
                    onValueChange={(value) => setFormData({ ...formData, isActive: value })}
                  >
                    Active
                  </Switch>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  {editingDiscount ? 'Update' : 'Create'} Discount
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}