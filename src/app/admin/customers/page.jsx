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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Select,
  SelectItem
} from '@nextui-org/react'
import {
  Search,
  MoreVertical,
  Mail,
  Edit2,
  Trash2,
  UserPlus,
  Download,
  Filter
} from 'lucide-react'

// Sample customers data
const initialCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    totalOrders: 12,
    totalSpent: 1250.50,
    lastOrder: '2024-01-15',
    joinDate: '2023-06-20'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 234-5678',
    status: 'inactive',
    totalOrders: 8,
    totalSpent: 876.25,
    lastOrder: '2023-12-28',
    joinDate: '2023-08-15'
  },
  // Add more customer records as needed
]

export default function CustomersManager() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [customers, setCustomers] = useState(initialCustomers)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [editingCustomer, setEditingCustomer] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active'
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(customers.length / itemsPerPage)

  const handleEdit = (customer) => {
    setEditingCustomer(customer)
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: customer.status
    })
    onOpen()
  }

  const handleSubmit = () => {
    if (editingCustomer) {
      setCustomers(customers.map(c => 
        c.id === editingCustomer.id ? { ...editingCustomer, ...formData } : c
      ))
    } else {
      const newCustomer = {
        id: Date.now(),
        ...formData,
        totalOrders: 0,
        totalSpent: 0,
        lastOrder: '-',
        joinDate: new Date().toISOString().split('T')[0]
      }
      setCustomers([...customers, newCustomer])
    }
    onClose()
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: 'active'
    })
    setEditingCustomer(null)
  }

  const handleDelete = (customerId) => {
    setCustomers(customers.filter(c => c.id !== customerId))
  }

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const statusColorMap = {
    active: 'success',
    inactive: 'danger',
    pending: 'warning'
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="flex gap-2">
          <Button
            color="primary"
            variant="flat"
            startContent={<Download className="w-4 h-4"/>}
          >
            Export
          </Button>
          <Button
            color="primary"
            startContent={<UserPlus className="w-4 h-4"/>}
            onPress={() => {
              resetForm()
              onOpen()
            }}
          >
            Add Customer
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Input
          className="w-64"
          placeholder="Search customers..."
          startContent={<Search className="w-4 h-4 text-gray-400"/>}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          className="w-48"
          placeholder="Status"
          selectedKeys={[statusFilter]}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <SelectItem key="all">All Status</SelectItem>
          <SelectItem key="active">Active</SelectItem>
          <SelectItem key="inactive">Inactive</SelectItem>
          <SelectItem key="pending">Pending</SelectItem>
        </Select>
      </div>

      {/* Customers Table */}
      <Card>
        <CardBody>
          <Table aria-label="Customers table">
            <TableHeader>
              <TableColumn>CUSTOMER</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ORDERS</TableColumn>
              <TableColumn>TOTAL SPENT</TableColumn>
              <TableColumn>LAST ORDER</TableColumn>
              <TableColumn>JOIN DATE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {paginatedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                      <p className="text-sm text-gray-500">{customer.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={statusColorMap[customer.status]}
                      size="sm"
                      variant="flat"
                    >
                      {customer.status}
                    </Chip>
                  </TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>${customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell>{customer.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleEdit(customer)}
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
                            startContent={<Mail className="w-4 h-4" />}
                          >
                            Send Email
                          </DropdownItem>
                          <DropdownItem
                            className="text-danger"
                            color="danger"
                            startContent={<Trash2 className="w-4 h-4" />}
                            onPress={() => handleDelete(customer.id)}
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

          <div className="flex justify-center mt-4">
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
            />
          </div>
        </CardBody>
      </Card>

      {/* Customer Form Modal */}
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {editingCustomer ? 'Edit Customer' : 'Add Customer'}
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    placeholder="Enter customer name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    isRequired
                  />
                  <Input
                    label="Email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    isRequired
                  />
                  <Input
                    label="Phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Select
                    label="Status"
                    selectedKeys={[formData.status]}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <SelectItem key="active">Active</SelectItem>
                    <SelectItem key="inactive">Inactive</SelectItem>
                    <SelectItem key="pending">Pending</SelectItem>
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  {editingCustomer ? 'Update' : 'Add'} Customer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}