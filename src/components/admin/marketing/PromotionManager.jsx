
// src/components/admin/marketing/PromotionManager.jsx
'use client'
import { useState } from 'react'
import {
  Card,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Switch,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  MoreVertical,
  Gift,
  Timer,
  Users
} from 'lucide-react'

const initialPromotions = [
  {
    id: 1,
    name: 'First Time Purchase',
    description: '20% off on first purchase',
    type: 'discount',
    value: 20,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    target: 'new_customers',
    conditions: 'First purchase only',
    status: 'active',
    usageCount: 150
  },
  // Add more promotions...
]

export default function PromotionManager() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [promotions, setPromotions] = useState(initialPromotions)
  const [editingPromotion, setEditingPromotion] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'discount',
    value: '',
    startDate: '',
    endDate: '',
    target: 'all_customers',
    conditions: '',
    status: 'active'
  })

  const handleEdit = (promotion) => {
    setEditingPromotion(promotion)
    setFormData({
      name: promotion.name,
      description: promotion.description,
      type: promotion.type,
      value: promotion.value,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      target: promotion.target,
      conditions: promotion.conditions,
      status: promotion.status
    })
    onOpen()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    if (editingPromotion) {
      setPromotions(promotions.map(promo => 
        promo.id === editingPromotion.id ? { ...promo, ...formData } : promo
      ))
    } else {
      setPromotions([...promotions, { id: Date.now(), ...formData }])
    }
    onClose()
  }

  const handleDelete = (id) => {
    setPromotions(promotions.filter(promo => promo.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Promotions</h1>
        <Button
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
          onPress={() => {
            setEditingPromotion(null)
            setFormData({
              name: '',
              description: '',
              type: 'discount',
              value: '',
              startDate: '',
              endDate: '',
              target: 'all_customers',
              conditions: '',
              status: 'active'
            })
            onOpen()
          }}
        >
          Add Promotion
        </Button>
      </div>

      {/* Promotions Table */}
      <Card>
        <CardBody>
          <Table aria-label="Promotions table">
            <TableHeader>
              <TableColumn>PROMOTION</TableColumn>
              <TableColumn>TYPE</TableColumn>
              <TableColumn>TARGET</TableColumn>
              <TableColumn>DATE RANGE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {promotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{promotion.name}</p>
                      <p className="text-sm text-gray-500">{promotion.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      color="primary" 
                      variant="flat"
                      startContent={<Gift className="w-4 h-4" />}
                    >
                      {promotion.type}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      {promotion.target}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-gray-400" />
                      <div>
                        <p>{promotion.startDate}</p>
                        <p>{promotion.endDate}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={promotion.status === 'active' ? 'success' : 'default'}
                      variant="flat"
                    >
                      {promotion.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleEdit(promotion)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem
                            onClick={() => {
                              setPromotions(promotions.map(p => 
                                p.id === promotion.id 
                                  ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
                                  : p
                              ))
                            }}
                          >
                            {promotion.status === 'active' ? 'Deactivate' : 'Activate'}
                          </DropdownItem>
                          <DropdownItem
                            className="text-danger"
                            color="danger"
                            onClick={() => handleDelete(promotion.id)}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Promotion Form Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {editingPromotion ? 'Edit Promotion' : 'Add Promotion'}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Promotion Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    isRequired
                  />
                  
                  <Textarea
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />

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

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      isRequired
                    />
                    <Input
                      label="Target"
                      value={formData.target}
                      onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                      isRequired
                    />
                  </div>

                  <Textarea
                    label="Conditions"
                    value={formData.conditions}
                    onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
                  />

                  <Switch
                    isSelected={formData.status === 'active'}
                    onValueChange={(checked) => 
                      setFormData({ ...formData, status: checked ? 'active' : 'inactive' })
                    }
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
                  {editingPromotion ? 'Update' : 'Create'} Promotion
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
