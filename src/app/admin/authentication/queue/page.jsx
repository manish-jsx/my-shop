// src/app/admin/authentication/queue/page.jsx
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
  Input,
  Textarea,
  Select,
  SelectItem
} from '@nextui-org/react'
import { 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  MessageSquare,
  Upload,
  Download,
  User,
  Calendar,
  Shield
} from 'lucide-react'

const verificationQueue = [
  {
    id: 'VQ-2025-001',
    gemstone: 'Kashmir Sapphire Ring',
    customer: 'Victoria Sterling',
    submittedDate: '2025-07-10',
    priority: 'urgent',
    status: 'pending_review',
    estimatedValue: 89999,
    submittedDocs: ['Certificate', 'Photos', 'Purchase Receipt'],
    assignedTo: 'Dr. Sarah Chen',
    notes: 'Customer requests expedited verification for insurance purposes',
    images: ['/api/placeholder/150/150', '/api/placeholder/150/150'],
    daysInQueue: 2
  },
  {
    id: 'VQ-2025-002',
    gemstone: 'Burmese Ruby Necklace',
    customer: 'Alexander Chen',
    submittedDate: '2025-07-08',
    priority: 'high',
    status: 'in_review',
    estimatedValue: 67500,
    submittedDocs: ['Certificate', 'Photos'],
    assignedTo: 'Dr. Michael Torres',
    notes: 'Heritage piece, requires historical documentation review',
    images: ['/api/placeholder/150/150'],
    daysInQueue: 4
  },
  {
    id: 'VQ-2025-003',
    gemstone: 'Colombian Emerald Earrings',
    customer: 'Sarah Johnson',
    submittedDate: '2025-07-05',
    priority: 'medium',
    status: 'additional_info_required',
    estimatedValue: 45200,
    submittedDocs: ['Photos'],
    assignedTo: 'Dr. Emily Rodriguez',
    notes: 'Missing lab certificate, customer contacted for additional documentation',
    images: ['/api/placeholder/150/150', '/api/placeholder/150/150'],
    daysInQueue: 7
  },
  {
    id: 'VQ-2025-004',
    gemstone: 'Natural Pearl Strand',
    customer: 'James Wilson',
    submittedDate: '2025-07-12',
    priority: 'low',
    status: 'pending_review',
    estimatedValue: 12800,
    submittedDocs: ['Certificate', 'Photos', 'X-ray Report'],
    assignedTo: null,
    notes: 'Complete documentation provided, awaiting expert assignment',
    images: ['/api/placeholder/150/150'],
    daysInQueue: 0
  }
]

const experts = [
  { id: 1, name: 'Dr. Sarah Chen', specialty: 'Colored Stones', workload: 3 },
  { id: 2, name: 'Dr. Michael Torres', specialty: 'Diamonds & Pearls', workload: 5 },
  { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Emeralds & Treatments', workload: 2 },
  { id: 4, name: 'Dr. Robert Kim', specialty: 'Ruby & Sapphire', workload: 4 }
]

export default function VerificationQueuePage() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isActionOpen, onOpen: onActionOpen, onClose: onActionClose } = useDisclosure()

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_review': return 'warning'
      case 'in_review': return 'primary'
      case 'additional_info_required': return 'danger'
      case 'approved': return 'success'
      case 'rejected': return 'danger'
      default: return 'default'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'danger'
      case 'high': return 'warning'
      case 'medium': return 'primary'
      case 'low': return 'success'
      default: return 'default'
    }
  }

  const getDaysColor = (days) => {
    if (days >= 7) return 'text-red-600'
    if (days >= 3) return 'text-yellow-600'
    return 'text-green-600'
  }

  const handleViewItem = (item) => {
    setSelectedItem(item)
    onOpen()
  }

  const handleAction = (item) => {
    setSelectedItem(item)
    onActionOpen()
  }

  const filteredQueue = verificationQueue.filter(item => 
    filterStatus === 'all' || item.status === filterStatus
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-8 h-8 text-blue-600" />
            Verification Queue
          </h1>
          <p className="text-gray-600 mt-1">Process pending gemstone authentication requests</p>
        </div>
        <div className="flex gap-3">
          <Select
            placeholder="Filter by status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-48"
          >
            <SelectItem key="all" value="all">All Status</SelectItem>
            <SelectItem key="pending_review" value="pending_review">Pending Review</SelectItem>
            <SelectItem key="in_review" value="in_review">In Review</SelectItem>
            <SelectItem key="additional_info_required" value="additional_info_required">Info Required</SelectItem>
          </Select>
          <Button color="primary" variant="flat">
            Bulk Actions
          </Button>
        </div>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">8</p>
                <p className="text-xs text-gray-500">2 urgent</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Review</p>
                <p className="text-2xl font-bold text-blue-600">5</p>
                <p className="text-xs text-gray-500">Active reviews</p>
              </div>
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Processing</p>
                <p className="text-2xl font-bold text-green-600">3.2</p>
                <p className="text-xs text-gray-500">days</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Info Required</p>
                <p className="text-2xl font-bold text-red-600">3</p>
                <p className="text-xs text-gray-500">Customer action needed</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Verification Queue Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Authentication Queue</h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="Verification queue table">
            <TableHeader>
              <TableColumn>ITEM</TableColumn>
              <TableColumn>CUSTOMER</TableColumn>
              <TableColumn>PRIORITY</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ASSIGNED TO</TableColumn>
              <TableColumn>QUEUE TIME</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredQueue.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar src={item.images[0]} size="sm" />
                      <div>
                        <p className="font-medium">{item.gemstone}</p>
                        <p className="text-sm text-gray-500">${item.estimatedValue.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">{item.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{item.customer}</p>
                        <p className="text-xs text-gray-500">Submitted: {item.submittedDate}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      color={getPriorityColor(item.priority)} 
                      variant="dot"
                      size="sm"
                    >
                      {item.priority}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      color={getStatusColor(item.status)} 
                      variant="flat" 
                      size="sm"
                    >
                      {item.status.replace('_', ' ')}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div>
                      {item.assignedTo ? (
                        <>
                          <p className="text-sm font-medium">{item.assignedTo}</p>
                          <p className="text-xs text-gray-500">Expert assigned</p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500 italic">Unassigned</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <p className={`text-lg font-bold ${getDaysColor(item.daysInQueue)}`}>
                        {item.daysInQueue}
                      </p>
                      <p className="text-xs text-gray-500">days</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => handleViewItem(item)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        color="primary"
                        onPress={() => handleAction(item)}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Expert Workload */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Expert Workload</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {experts.map((expert) => (
              <Card key={expert.id}>
                <CardBody className="p-4">
                  <div className="text-center">
                    <h4 className="font-semibold">{expert.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{expert.specialty}</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg font-bold">{expert.workload}</span>
                      <span className="text-sm text-gray-500">active cases</span>
                    </div>
                    <Chip 
                      size="sm" 
                      color={expert.workload > 4 ? 'danger' : expert.workload > 2 ? 'warning' : 'success'}
                      variant="flat"
                      className="mt-2"
                    >
                      {expert.workload > 4 ? 'High Load' : expert.workload > 2 ? 'Medium Load' : 'Available'}
                    </Chip>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Item Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent>
          <ModalHeader>Verification Details</ModalHeader>
          <ModalBody>
            {selectedItem && (
              <div className="space-y-6">
                {/* Item Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{selectedItem.gemstone}</h3>
                    <p className="text-gray-600">{selectedItem.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      ${selectedItem.estimatedValue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">Estimated Value</p>
                  </div>
                </div>

                {/* Customer & Timeline */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Customer Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{selectedItem.customer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Submitted: {selectedItem.submittedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{selectedItem.daysInQueue} days in queue</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Assignment Status</h4>
                    <div className="space-y-2">
                      <Chip 
                        color={getStatusColor(selectedItem.status)} 
                        variant="flat"
                      >
                        {selectedItem.status.replace('_', ' ')}
                      </Chip>
                      <Chip 
                        color={getPriorityColor(selectedItem.priority)} 
                        variant="dot"
                      >
                        {selectedItem.priority} priority
                      </Chip>
                      {selectedItem.assignedTo && (
                        <p className="text-sm">Assigned to: <strong>{selectedItem.assignedTo}</strong></p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Documentation */}
                <div>
                  <h4 className="font-semibold mb-3">Submitted Documentation</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedItem.submittedDocs.map((doc, index) => (
                      <Chip key={index} variant="flat" color="primary">
                        {doc}
                      </Chip>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedItem.images.map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt={`${selectedItem.gemstone} ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="font-semibold mb-3">Notes</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm">{selectedItem.notes}</p>
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
              Contact Customer
            </Button>
            <Button color="primary">
              Process Item
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Action Modal */}
      <Modal isOpen={isActionOpen} onClose={onActionClose} size="2xl">
        <ModalContent>
          <ModalHeader>Process Verification</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Select label="Action">
                <SelectItem key="approve" value="approve">Approve Verification</SelectItem>
                <SelectItem key="reject" value="reject">Reject Verification</SelectItem>
                <SelectItem key="request_info" value="request_info">Request Additional Info</SelectItem>
                <SelectItem key="assign_expert" value="assign_expert">Assign to Expert</SelectItem>
              </Select>
              
              <Select label="Assign to Expert">
                {experts.map((expert) => (
                  <SelectItem key={expert.id} value={expert.id.toString()}>
                    {expert.name} - {expert.specialty} ({expert.workload} cases)
                  </SelectItem>
                ))}
              </Select>

              <Textarea
                label="Comments"
                placeholder="Add your comments or feedback..."
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onActionClose}>
              Cancel
            </Button>
            <Button color="primary">
              Process
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
