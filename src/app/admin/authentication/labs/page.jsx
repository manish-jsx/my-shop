// src/app/admin/authentication/labs/page.jsx
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Textarea,
  Avatar
} from '@nextui-org/react'
import { 
  Building,
  Award,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react'

const labPartners = [
  {
    id: 1,
    name: 'Gemological Institute of America',
    shortName: 'GIA',
    location: 'Carlsbad, CA, USA',
    website: 'www.gia.edu',
    email: 'partnerships@gia.edu',
    phone: '+1 (760) 603-4000',
    partnership: 'Premium',
    status: 'active',
    certificatesCount: 98,
    accuracy: 99.2,
    avgProcessingTime: 2.1,
    specialties: ['Diamond', 'Colored Stones', 'Pearls'],
    accreditation: 'ISO 17025',
    joinDate: '2020-03-15',
    logo: '/api/placeholder/60/60'
  },
  {
    id: 2,
    name: 'American Gemological Laboratories',
    shortName: 'AGL',
    location: 'New York, NY, USA',
    website: 'www.aglgemlab.com',
    email: 'contact@aglgemlab.com',
    phone: '+1 (212) 704-0727',
    partnership: 'Standard',
    status: 'active',
    certificatesCount: 45,
    accuracy: 97.8,
    avgProcessingTime: 3.5,
    specialties: ['Ruby', 'Sapphire', 'Emerald'],
    accreditation: 'ISO 17025',
    joinDate: '2021-07-20',
    logo: '/api/placeholder/60/60'
  },
  {
    id: 3,
    name: 'Swiss Gemmological Institute',
    shortName: 'SSEF',
    location: 'Basel, Switzerland',
    website: 'www.ssef.ch',
    email: 'info@ssef.ch',
    phone: '+41 61 262 06 40',
    partnership: 'Premium',
    status: 'active',
    certificatesCount: 32,
    accuracy: 96.9,
    avgProcessingTime: 4.2,
    specialties: ['Colored Stones', 'Pearls', 'Treatments'],
    accreditation: 'ISO 17025',
    joinDate: '2021-11-10',
    logo: '/api/placeholder/60/60'
  },
  {
    id: 4,
    name: 'Gem Research Swisslab',
    shortName: 'GRS',
    location: 'Bangkok, Thailand',
    website: 'www.grsgemlab.com',
    email: 'info@grsgemlab.com',
    phone: '+66 2 108 4301',
    partnership: 'Standard',
    status: 'pending',
    certificatesCount: 18,
    accuracy: 95.5,
    avgProcessingTime: 5.1,
    specialties: ['Ruby', 'Sapphire', 'Spinel'],
    accreditation: 'ISO 17025',
    joinDate: '2022-02-28',
    logo: '/api/placeholder/60/60'
  }
]

export default function LabPartnershipsPage() {
  const [selectedLab, setSelectedLab] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success'
      case 'pending': return 'warning'
      case 'suspended': return 'danger'
      default: return 'default'
    }
  }

  const getPartnershipColor = (partnership) => {
    switch (partnership) {
      case 'Premium': return 'secondary'
      case 'Standard': return 'primary'
      default: return 'default'
    }
  }

  const handleViewLab = (lab) => {
    setSelectedLab(lab)
    onOpen()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Building className="w-8 h-8 text-blue-600" />
            Lab Partnerships
          </h1>
          <p className="text-gray-600 mt-1">Manage relationships with certification laboratories</p>
        </div>
        <Button
          onPress={onAddOpen}
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
        >
          Add Lab Partner
        </Button>
      </div>

      {/* Partnership Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Partners</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-green-600">+2 this quarter</p>
              </div>
              <Building className="w-8 h-8 text-blue-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Partners</p>
                <p className="text-2xl font-bold text-green-600">10</p>
                <p className="text-xs text-gray-500">83% active rate</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Premium Partners</p>
                <p className="text-2xl font-bold text-purple-600">5</p>
                <p className="text-xs text-gray-500">Top tier labs</p>
              </div>
              <Award className="w-8 h-8 text-purple-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Accuracy</p>
                <p className="text-2xl font-bold text-blue-600">97.8%</p>
                <p className="text-xs text-green-600">+0.5% this month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Lab Partners Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Laboratory Partners</h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="Lab partners table">
            <TableHeader>
              <TableColumn>LABORATORY</TableColumn>
              <TableColumn>LOCATION</TableColumn>
              <TableColumn>PARTNERSHIP</TableColumn>
              <TableColumn>PERFORMANCE</TableColumn>
              <TableColumn>SPECIALTIES</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {labPartners.map((lab) => (
                <TableRow key={lab.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar src={lab.logo} size="sm" />
                      <div>
                        <p className="font-medium">{lab.name}</p>
                        <p className="text-sm text-gray-500">{lab.shortName}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{lab.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      color={getPartnershipColor(lab.partnership)} 
                      variant="flat"
                      size="sm"
                    >
                      {lab.partnership}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{lab.accuracy}% accuracy</p>
                      <p className="text-xs text-gray-500">{lab.avgProcessingTime} days avg</p>
                      <p className="text-xs text-gray-500">{lab.certificatesCount} certificates</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {lab.specialties.slice(0, 2).map((specialty, index) => (
                        <Chip key={index} size="tiny" variant="flat">
                          {specialty}
                        </Chip>
                      ))}
                      {lab.specialties.length > 2 && (
                        <Chip size="tiny" variant="flat">
                          +{lab.specialties.length - 2}
                        </Chip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      color={getStatusColor(lab.status)} 
                      variant="flat" 
                      size="sm"
                    >
                      {lab.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => handleViewLab(lab)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        color="primary"
                        variant="flat"
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

      {/* Lab Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent>
          <ModalHeader>Laboratory Partnership Details</ModalHeader>
          <ModalBody>
            {selectedLab && (
              <div className="space-y-6">
                {/* Lab Header */}
                <div className="flex items-center gap-4">
                  <Avatar src={selectedLab.logo} size="lg" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold">{selectedLab.name}</h3>
                      <Chip 
                        color={getPartnershipColor(selectedLab.partnership)} 
                        variant="flat"
                      >
                        {selectedLab.partnership} Partner
                      </Chip>
                    </div>
                    <p className="text-gray-600">{selectedLab.shortName}</p>
                    <p className="text-sm text-gray-500">Partner since {selectedLab.joinDate}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{selectedLab.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{selectedLab.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{selectedLab.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{selectedLab.website}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Accreditation</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-gold-400" />
                        <span className="text-sm">{selectedLab.accreditation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Verified Laboratory</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div>
                  <h4 className="font-semibold mb-3">Performance Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardBody className="text-center p-4">
                        <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Accuracy Rate</p>
                        <p className="text-lg font-bold text-yellow-600">{selectedLab.accuracy}%</p>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody className="text-center p-4">
                        <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Avg. Processing</p>
                        <p className="text-lg font-bold">{selectedLab.avgProcessingTime} days</p>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody className="text-center p-4">
                        <Award className="w-6 h-6 text-green-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Certificates</p>
                        <p className="text-lg font-bold text-green-600">{selectedLab.certificatesCount}</p>
                      </CardBody>
                    </Card>
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <h4 className="font-semibold mb-3">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLab.specialties.map((specialty, index) => (
                      <Chip key={index} variant="flat" color="primary">
                        {specialty}
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
              Contact Lab
            </Button>
            <Button color="primary">
              Edit Partnership
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Lab Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose} size="2xl">
        <ModalContent>
          <ModalHeader>Add New Lab Partner</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Laboratory Name" placeholder="e.g., Gemological Institute" />
              <Input label="Short Name" placeholder="e.g., GIA" />
              <Input label="Location" placeholder="e.g., Carlsbad, CA, USA" />
              <Input label="Website" placeholder="e.g., www.example.com" />
              <Input label="Email" placeholder="partnerships@lab.com" />
              <Input label="Phone" placeholder="+1 (555) 123-4567" />
              <Select label="Partnership Type">
                <SelectItem key="standard" value="standard">Standard</SelectItem>
                <SelectItem key="premium" value="premium">Premium</SelectItem>
              </Select>
              <Select label="Accreditation">
                <SelectItem key="iso17025" value="iso17025">ISO 17025</SelectItem>
                <SelectItem key="other" value="other">Other</SelectItem>
              </Select>
            </div>
            <Textarea
              label="Specializations"
              placeholder="e.g., Diamond, Ruby, Sapphire, Emerald"
              description="Comma-separated list of gemstone specialties"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onAddClose}>
              Cancel
            </Button>
            <Button color="primary">
              Add Partner
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
