// src/app/admin/products/certifications/page.jsx
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
  Select,
  SelectItem,
  Textarea
} from '@nextui-org/react'
import { 
  Shield, 
  Award, 
  Upload, 
  Eye, 
  Download, 
  Plus,
  Search,
  Filter,
  FileCheck,
  AlertTriangle
} from 'lucide-react'

const certifications = [
  {
    id: 'GIA-2025-001',
    gemstone: 'Kashmir Sapphire',
    carat: '5.24',
    certificate: 'GIA',
    grade: 'AAA',
    status: 'verified',
    dateIssued: '2025-06-15',
    validUntil: '2030-06-15',
    price: '$45,999',
    image: '/api/placeholder/150/150'
  },
  {
    id: 'AGL-2025-002',
    gemstone: 'Burmese Ruby',
    carat: '3.12',
    certificate: 'AGL',
    grade: 'Pigeon Blood',
    status: 'pending',
    dateIssued: '2025-07-01',
    validUntil: '2030-07-01',
    price: '$32,500',
    image: '/api/placeholder/150/150'
  },
  {
    id: 'SSEF-2025-003',
    gemstone: 'Colombian Emerald',
    carat: '4.85',
    certificate: 'SSEF',
    grade: 'Premium',
    status: 'verified',
    dateIssued: '2025-05-20',
    validUntil: '2030-05-20',
    price: '$28,900',
    image: '/api/placeholder/150/150'
  },
  {
    id: 'GRS-2025-004',
    gemstone: 'Ceylon Sapphire',
    carat: '6.78',
    certificate: 'GRS',
    grade: 'Royal Blue',
    status: 'expired',
    dateIssued: '2020-03-10',
    validUntil: '2025-03-10',
    price: '$15,750',
    image: '/api/placeholder/150/150'
  }
]

const certifyingLabs = [
  { value: 'GIA', label: 'GIA (Gemological Institute of America)' },
  { value: 'AGL', label: 'AGL (American Gemological Laboratories)' },
  { value: 'SSEF', label: 'SSEF (Swiss Gemmological Institute)' },
  { value: 'GRS', label: 'GRS (Gem Research Swisslab)' },
  { value: 'Gübelin', label: 'Gübelin Gem Lab' }
]

export default function CertificationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedCert, setSelectedCert] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'success'
      case 'pending': return 'warning'
      case 'expired': return 'danger'
      default: return 'default'
    }
  }

  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = cert.gemstone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewCertificate = (cert) => {
    setSelectedCert(cert)
    onOpen()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            Certification Management
          </h1>
          <p className="text-gray-600 mt-1">Manage gemstone certificates and authenticity documents</p>
        </div>
        <Button
          onPress={onAddOpen}
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
        >
          Add Certificate
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Certificates</p>
                <p className="text-2xl font-bold text-gray-900">247</p>
                <p className="text-xs text-green-600">+12 this month</p>
              </div>
              <FileCheck className="w-8 h-8 text-blue-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-green-600">198</p>
                <p className="text-xs text-gray-500">80.2% of total</p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">32</p>
                <p className="text-xs text-gray-500">Needs review</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-red-600">17</p>
                <p className="text-xs text-gray-500">Next 90 days</p>
              </div>
              <Award className="w-8 h-8 text-red-500" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-wrap gap-4">
            <Input
              placeholder="Search certificates..."
              startContent={<Search className="w-4 h-4" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Select
              placeholder="Filter by status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="max-w-xs"
              startContent={<Filter className="w-4 h-4" />}
            >
              <SelectItem key="all" value="all">All Status</SelectItem>
              <SelectItem key="verified" value="verified">Verified</SelectItem>
              <SelectItem key="pending" value="pending">Pending</SelectItem>
              <SelectItem key="expired" value="expired">Expired</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

      {/* Certifications Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Gemstone Certificates</h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="Certifications table">
            <TableHeader>
              <TableColumn>GEMSTONE</TableColumn>
              <TableColumn>CERTIFICATE ID</TableColumn>
              <TableColumn>LAB</TableColumn>
              <TableColumn>GRADE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>VALUE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredCertifications.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar src={cert.image} size="sm" />
                      <div>
                        <p className="font-medium">{cert.gemstone}</p>
                        <p className="text-sm text-gray-500">{cert.carat} carats</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-mono text-sm">{cert.id}</p>
                      <p className="text-xs text-gray-500">Issued: {cert.dateIssued}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip size="sm" variant="flat">
                      {cert.certificate}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{cert.grade}</span>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      color={getStatusColor(cert.status)} 
                      variant="flat" 
                      size="sm"
                    >
                      {cert.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-green-600">{cert.price}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => handleViewCertificate(cert)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        color="primary"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* View Certificate Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>Certificate Details</ModalHeader>
          <ModalBody>
            {selectedCert && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <img 
                      src={selectedCert.image} 
                      alt={selectedCert.gemstone}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Gemstone</label>
                      <p className="text-lg font-semibold">{selectedCert.gemstone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Certificate ID</label>
                      <p className="font-mono">{selectedCert.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Certifying Lab</label>
                      <p>{selectedCert.certificate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Grade</label>
                      <p className="font-medium">{selectedCert.grade}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Carat Weight</label>
                      <p>{selectedCert.carat} carats</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <Chip 
                      color={getStatusColor(selectedCert.status)} 
                      variant="flat"
                      className="mt-1"
                    >
                      {selectedCert.status}
                    </Chip>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Valid Until</label>
                    <p>{selectedCert.validUntil}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Estimated Value</label>
                    <p className="font-bold text-green-600">{selectedCert.price}</p>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" startContent={<Download className="w-4 h-4" />}>
              Download Certificate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Certificate Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose} size="2xl">
        <ModalContent>
          <ModalHeader>Add New Certificate</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Gemstone Name" placeholder="e.g., Kashmir Sapphire" />
              <Input label="Carat Weight" placeholder="e.g., 5.24" />
              <Select label="Certifying Lab" placeholder="Select lab">
                {certifyingLabs.map((lab) => (
                  <SelectItem key={lab.value} value={lab.value}>
                    {lab.label}
                  </SelectItem>
                ))}
              </Select>
              <Input label="Certificate ID" placeholder="e.g., GIA-2025-001" />
              <Input label="Grade/Quality" placeholder="e.g., AAA, Pigeon Blood" />
              <Input label="Estimated Value" placeholder="e.g., $45,999" />
              <Input type="date" label="Date Issued" />
              <Input type="date" label="Valid Until" />
            </div>
            <Textarea
              label="Additional Notes"
              placeholder="Any additional certification details..."
              className="col-span-2"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload certificate document</p>
              <Button size="sm" variant="flat" className="mt-2">
                Choose File
              </Button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onAddClose}>
              Cancel
            </Button>
            <Button color="primary">
              Add Certificate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
