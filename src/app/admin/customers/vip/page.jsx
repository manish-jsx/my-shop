// src/app/admin/customers/vip/page.jsx
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
  Divider,
  Input,
  Select,
  SelectItem
} from '@nextui-org/react'
import { 
  Crown,
  Star,
  Gem,
  Award,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Gift,
  TrendingUp,
  Eye,
  Edit,
  Plus,
  Search,
  Filter
} from 'lucide-react'

const vipCustomers = [
  {
    id: 'VIP-001',
    name: 'Victoria Sterling',
    email: 'victoria@sterling.com',
    phone: '+1 (555) 0123',
    avatar: '/api/placeholder/60/60',
    tier: 'Diamond Elite',
    joinDate: '2023-03-15',
    totalSpent: 524999,
    ordersCount: 18,
    loyaltyPoints: 52400,
    favoriteCategory: 'Sapphires',
    lastPurchase: '2025-07-10',
    nextTierProgress: 95,
    specialRequests: ['White glove delivery', 'Personal consultation'],
    location: 'New York, NY',
    birthday: '1985-09-22',
    preferredContact: 'Email'
  },
  {
    id: 'VIP-002',
    name: 'Alexander Chen',
    email: 'alex.chen@techcorp.com',
    phone: '+1 (555) 0456',
    avatar: '/api/placeholder/60/60',
    tier: 'Platinum VIP',
    joinDate: '2023-08-20',
    totalSpent: 287500,
    ordersCount: 12,
    loyaltyPoints: 28750,
    favoriteCategory: 'Rubies',
    lastPurchase: '2025-07-08',
    nextTierProgress: 72,
    specialRequests: ['Gift wrapping', 'Authenticity certificates'],
    location: 'San Francisco, CA',
    birthday: '1978-11-14',
    preferredContact: 'Phone'
  },
  {
    id: 'VIP-003',
    name: 'Sarah Johnson',
    email: 'sarah.j@luxury.com',
    phone: '+1 (555) 0789',
    avatar: '/api/placeholder/60/60',
    tier: 'Gold VIP',
    joinDate: '2024-01-10',
    totalSpent: 156800,
    ordersCount: 8,
    loyaltyPoints: 15680,
    favoriteCategory: 'Emeralds',
    lastPurchase: '2025-07-05',
    nextTierProgress: 42,
    specialRequests: ['Museum-quality packaging', 'Insurance documentation'],
    location: 'Miami, FL',
    birthday: '1990-05-08',
    preferredContact: 'Email'
  }
]

const tierColors = {
  'Diamond Elite': 'secondary',
  'Platinum VIP': 'default',
  'Gold VIP': 'warning'
}

const tierIcons = {
  'Diamond Elite': Crown,
  'Platinum VIP': Star,
  'Gold VIP': Gem
}

export default function VIPCustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [tierFilter, setTierFilter] = useState('all')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer)
    onOpen()
  }

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer)
    onEditOpen()
  }

  const filteredCustomers = vipCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTier = tierFilter === 'all' || customer.tier === tierFilter
    return matchesSearch && matchesTier
  })

  const getTierIcon = (tier) => {
    const IconComponent = tierIcons[tier]
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Crown className="w-8 h-8 text-purple-600" />
            VIP Customer Management
          </h1>
          <p className="text-gray-600 mt-1">Manage your most valued customers and their exclusive benefits</p>
        </div>
        <div className="flex gap-3">
          <Button color="secondary" variant="flat">
            Export VIP List
          </Button>
          <Button color="primary" startContent={<Plus className="w-4 h-4" />}>
            Add VIP Customer
          </Button>
        </div>
      </div>

      {/* VIP Tier Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Diamond Elite</p>
                <p className="text-2xl font-bold text-purple-600">12</p>
                <p className="text-xs text-green-600">+2 this month</p>
              </div>
              <Crown className="w-8 h-8 text-purple-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Platinum VIP</p>
                <p className="text-2xl font-bold text-gray-600">28</p>
                <p className="text-xs text-green-600">+5 this month</p>
              </div>
              <Star className="w-8 h-8 text-gray-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Gold VIP</p>
                <p className="text-2xl font-bold text-yellow-600">45</p>
                <p className="text-xs text-green-600">+8 this month</p>
              </div>
              <Gem className="w-8 h-8 text-yellow-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total VIP Revenue</p>
                <p className="text-2xl font-bold text-green-600">$8.2M</p>
                <p className="text-xs text-green-600">+22% this quarter</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-wrap gap-4">
            <Input
              placeholder="Search VIP customers..."
              startContent={<Search className="w-4 h-4" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Select
              placeholder="Filter by tier"
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="max-w-xs"
              startContent={<Filter className="w-4 h-4" />}
            >
              <SelectItem key="all" value="all">All Tiers</SelectItem>
              <SelectItem key="Diamond Elite" value="Diamond Elite">Diamond Elite</SelectItem>
              <SelectItem key="Platinum VIP" value="Platinum VIP">Platinum VIP</SelectItem>
              <SelectItem key="Gold VIP" value="Gold VIP">Gold VIP</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

      {/* VIP Customers Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">VIP Customer Directory</h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="VIP customers table">
            <TableHeader>
              <TableColumn>CUSTOMER</TableColumn>
              <TableColumn>VIP TIER</TableColumn>
              <TableColumn>LIFETIME VALUE</TableColumn>
              <TableColumn>LOYALTY POINTS</TableColumn>
              <TableColumn>LAST PURCHASE</TableColumn>
              <TableColumn>TIER PROGRESS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar src={customer.avatar} size="md" />
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                        <p className="text-xs text-gray-400">{customer.location}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Chip 
                        color={tierColors[customer.tier]} 
                        variant="flat"
                        startContent={getTierIcon(customer.tier)}
                      >
                        {customer.tier}
                      </Chip>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-bold text-green-600">
                        ${customer.totalSpent.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">{customer.ordersCount} orders</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{customer.loyaltyPoints.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{customer.lastPurchase}</p>
                      <p className="text-xs text-gray-500">{customer.favoriteCategory}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full">
                      <Progress 
                        value={customer.nextTierProgress} 
                        size="sm"
                        color={customer.nextTierProgress > 80 ? 'success' : 'primary'}
                        className="mb-1"
                      />
                      <p className="text-xs text-gray-500">{customer.nextTierProgress}% to next tier</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => handleViewCustomer(customer)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        color="primary"
                        variant="flat"
                        onPress={() => handleEditCustomer(customer)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Customer Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent>
          <ModalHeader>VIP Customer Profile</ModalHeader>
          <ModalBody>
            {selectedCustomer && (
              <div className="space-y-6">
                {/* Customer Header */}
                <div className="flex items-center gap-4">
                  <Avatar src={selectedCustomer.avatar} size="lg" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold">{selectedCustomer.name}</h3>
                      <Chip 
                        color={tierColors[selectedCustomer.tier]} 
                        variant="flat"
                        startContent={getTierIcon(selectedCustomer.tier)}
                      >
                        {selectedCustomer.tier}
                      </Chip>
                    </div>
                    <p className="text-gray-600">{selectedCustomer.email}</p>
                    <p className="text-sm text-gray-500">Member since {selectedCustomer.joinDate}</p>
                  </div>
                </div>

                <Divider />

                {/* Contact & Personal Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{selectedCustomer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{selectedCustomer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{selectedCustomer.location}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Personal Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Birthday: {selectedCustomer.birthday}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gem className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Favorite: {selectedCustomer.favoriteCategory}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Prefers: {selectedCustomer.preferredContact}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Divider />

                {/* Purchase History */}
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardBody className="text-center p-4">
                      <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Total Spent</p>
                      <p className="text-lg font-bold text-green-600">
                        ${selectedCustomer.totalSpent.toLocaleString()}
                      </p>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="text-center p-4">
                      <Gift className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-lg font-bold">{selectedCustomer.ordersCount}</p>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="text-center p-4">
                      <Award className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Loyalty Points</p>
                      <p className="text-lg font-bold text-yellow-600">
                        {selectedCustomer.loyaltyPoints.toLocaleString()}
                      </p>
                    </CardBody>
                  </Card>
                </div>

                {/* Tier Progress */}
                <div>
                  <h4 className="font-semibold mb-3">Tier Progression</h4>
                  <Progress 
                    value={selectedCustomer.nextTierProgress} 
                    size="lg"
                    color={selectedCustomer.nextTierProgress > 80 ? 'success' : 'primary'}
                    className="mb-2"
                  />
                  <p className="text-sm text-gray-600">
                    {selectedCustomer.nextTierProgress}% progress to next tier
                  </p>
                </div>

                {/* Special Requests */}
                <div>
                  <h4 className="font-semibold mb-3">Special Requests & Preferences</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.specialRequests.map((request, index) => (
                      <Chip key={index} size="sm" variant="flat" color="primary">
                        {request}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button color="secondary" variant="flat">
              Send VIP Offer
            </Button>
            <Button color="primary">
              Edit Profile
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Customer Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="2xl">
        <ModalContent>
          <ModalHeader>Edit VIP Customer</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Full Name" defaultValue={selectedCustomer?.name} />
              <Input label="Email" defaultValue={selectedCustomer?.email} />
              <Input label="Phone" defaultValue={selectedCustomer?.phone} />
              <Select label="VIP Tier" defaultSelectedKeys={[selectedCustomer?.tier]}>
                <SelectItem key="Gold VIP" value="Gold VIP">Gold VIP</SelectItem>
                <SelectItem key="Platinum VIP" value="Platinum VIP">Platinum VIP</SelectItem>
                <SelectItem key="Diamond Elite" value="Diamond Elite">Diamond Elite</SelectItem>
              </Select>
              <Input label="Location" defaultValue={selectedCustomer?.location} />
              <Input type="date" label="Birthday" defaultValue={selectedCustomer?.birthday} />
              <Select label="Preferred Contact" defaultSelectedKeys={[selectedCustomer?.preferredContact]}>
                <SelectItem key="Email" value="Email">Email</SelectItem>
                <SelectItem key="Phone" value="Phone">Phone</SelectItem>
                <SelectItem key="SMS" value="SMS">SMS</SelectItem>
              </Select>
              <Select label="Favorite Category" defaultSelectedKeys={[selectedCustomer?.favoriteCategory]}>
                <SelectItem key="Sapphires" value="Sapphires">Sapphires</SelectItem>
                <SelectItem key="Rubies" value="Rubies">Rubies</SelectItem>
                <SelectItem key="Emeralds" value="Emeralds">Emeralds</SelectItem>
                <SelectItem key="Diamonds" value="Diamonds">Diamonds</SelectItem>
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onEditClose}>
              Cancel
            </Button>
            <Button color="primary">
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
