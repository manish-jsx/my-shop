// src/app/admin/reports/certificates/page.jsx
'use client'
import { useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tabs,
  Tab,
  Progress,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/react'

import {
  Shield,
  Award,
  Calendar,
  Search,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  FileText,
  Globe,
  TrendingUp
} from 'lucide-react'

export default function CertificatesReportPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedTab, setSelectedTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState('last30days')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  // Mock data for certificates
  const certificateStats = [
    {
      title: 'Total Certificates',
      value: '2,847',
      change: '+156 this month',
      icon: Shield,
      color: 'blue'
    },
    {
      title: 'Verified Gems',
      value: '2,103',
      change: '73.9% of inventory',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Pending Verification',
      value: '67',
      change: 'Avg. 3-5 days',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Expiring Soon',
      value: '23',
      change: 'Next 30 days',
      icon: AlertTriangle,
      color: 'red'
    }
  ]

  const certificates = [
    {
      id: 'CERT-2025-001',
      gemstone: 'Kashmir Sapphire',
      weight: '5.47 ct',
      lab: 'GIA',
      issueDate: '2024-03-15',
      expiryDate: '2027-03-15',
      status: 'active',
      grade: 'AAA',
      value: '$45,000',
      owner: 'Sarah Johnson'
    },
    {
      id: 'CERT-2025-002',
      gemstone: 'Burmese Ruby',
      weight: '3.12 ct',
      lab: 'Gübelin',
      issueDate: '2024-01-20',
      expiryDate: '2027-01-20',
      status: 'active',
      grade: 'Premium',
      value: '$32,000',
      owner: 'Michael Chen'
    },
    {
      id: 'CERT-2025-003',
      gemstone: 'Colombian Emerald',
      weight: '4.85 ct',
      lab: 'SSEF',
      issueDate: '2024-02-10',
      expiryDate: '2025-08-15',
      status: 'expiring',
      grade: 'Fine',
      value: '$28,500',
      owner: 'Emma Rodriguez'
    },
    {
      id: 'CERT-2025-004',
      gemstone: 'Padparadscha Sapphire',
      weight: '2.94 ct',
      lab: 'GIA',
      issueDate: '2024-06-01',
      expiryDate: '2027-06-01',
      status: 'active',
      grade: 'Exceptional',
      value: '$67,000',
      owner: 'James Wilson'
    },
    {
      id: 'CERT-2025-005',
      gemstone: 'Natural Pearl',
      weight: '15.6 mm',
      lab: 'GIA',
      issueDate: '2024-04-12',
      expiryDate: 'N/A',
      status: 'pending',
      grade: 'Natural',
      value: '$12,500',
      owner: 'Lisa Park'
    }
  ]

  const labDistribution = [
    { lab: 'GIA', count: 1205, percentage: 42.3 },
    { lab: 'Gübelin', count: 756, percentage: 26.6 },
    { lab: 'SSEF', count: 432, percentage: 15.2 },
    { lab: 'AGTA', count: 289, percentage: 10.1 },
    { lab: 'Others', count: 165, percentage: 5.8 }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success'
      case 'expiring': return 'warning'
      case 'pending': return 'primary'
      case 'expired': return 'danger'
      default: return 'default'
    }
  }

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'Exceptional': return 'success'
      case 'Premium': return 'primary'
      case 'AAA': return 'secondary'
      case 'Fine': return 'warning'
      default: return 'default'
    }
  }

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate)
    onOpen()
  }

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.gemstone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.owner.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-600" />
              Certificate Reports
            </h1>
            <p className="text-gray-600 mt-1">Comprehensive gemstone certification analytics and management</p>
          </div>
          <div className="flex gap-2">
            <Button
              startContent={<Download className="w-4 h-4" />}
              variant="flat"
              color="primary"
            >
              Export Report
            </Button>
            <Button
              startContent={<FileText className="w-4 h-4" />}
              color="primary"
            >
              Generate Summary
            </Button>
          </div>
        </div>

       
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {certificateStats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-lg">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                  <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Tabs for different views */}
      <Card className="border-0 shadow-lg">
        <CardBody className="p-0">
          <Tabs 
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
            className="w-full"
          >
            <Tab key="overview" title="Overview">
              <div className="p-6 space-y-6">
                {/* Lab Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Certification Labs Distribution</h3>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-4">
                        {labDistribution.map((lab) => (
                          <div key={lab.lab} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                              <span className="font-medium">{lab.lab}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Progress 
                                value={lab.percentage} 
                                className="w-20"
                                color="primary"
                                size="sm"
                              />
                              <span className="text-sm text-gray-600 w-12">{lab.count}</span>
                              <span className="text-sm text-gray-500 w-12">{lab.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Recent Certificate Activity</h3>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium">5 certificates verified today</p>
                            <p className="text-xs text-gray-600">GIA, Gübelin labs</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                          <Clock className="w-5 h-5 text-yellow-600" />
                          <div>
                            <p className="text-sm font-medium">12 pending verification</p>
                            <p className="text-xs text-gray-600">Avg. processing time: 4 days</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <div>
                            <p className="text-sm font-medium">3 certificates expiring</p>
                            <p className="text-xs text-gray-600">Renewal required within 7 days</p>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Tab>

            <Tab key="certificates" title="All Certificates">
              <div className="p-6 space-y-4">
                {/* Filters */}
                <div className="flex flex-wrap gap-4">
                  <Input
                    placeholder="Search certificates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    startContent={<Search className="w-4 h-4 text-gray-400" />}
                    className="max-w-sm"
                  />
                  <Select
                    placeholder="Filter by status"
                    selectedKeys={[statusFilter]}
                    onSelectionChange={(keys) => setStatusFilter(Array.from(keys)[0])}
                    className="max-w-xs"
                  >
                    <SelectItem key="all">All Status</SelectItem>
                    <SelectItem key="active">Active</SelectItem>
                    <SelectItem key="expiring">Expiring Soon</SelectItem>
                    <SelectItem key="pending">Pending</SelectItem>
                    <SelectItem key="expired">Expired</SelectItem>
                  </Select>
                  <Select
                    placeholder="Date range"
                    selectedKeys={[dateRange]}
                    onSelectionChange={(keys) => setDateRange(Array.from(keys)[0])}
                    className="max-w-xs"
                  >
                    <SelectItem key="last7days">Last 7 days</SelectItem>
                    <SelectItem key="last30days">Last 30 days</SelectItem>
                    <SelectItem key="last3months">Last 3 months</SelectItem>
                    <SelectItem key="lastyear">Last year</SelectItem>
                  </Select>
                </div>

                {/* Certificates Table */}
                <Card>
                  <CardBody className="p-0">
                    <Table aria-label="Certificates table">
                      <TableHeader>
                        <TableColumn>CERTIFICATE ID</TableColumn>
                        <TableColumn>GEMSTONE</TableColumn>
                        <TableColumn>WEIGHT</TableColumn>
                        <TableColumn>LAB</TableColumn>
                        <TableColumn>GRADE</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                        <TableColumn>EXPIRY</TableColumn>
                        <TableColumn>VALUE</TableColumn>
                        <TableColumn>ACTIONS</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {filteredCertificates.map((cert) => (
                          <TableRow key={cert.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{cert.id}</p>
                                <p className="text-xs text-gray-500">{cert.owner}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-purple-600" />
                                {cert.gemstone}
                              </div>
                            </TableCell>
                            <TableCell>{cert.weight}</TableCell>
                            <TableCell>
                              <Chip size="sm" variant="flat" color="primary">
                                {cert.lab}
                              </Chip>
                            </TableCell>
                            <TableCell>
                              <Chip size="sm" variant="flat" color={getGradeColor(cert.grade)}>
                                {cert.grade}
                              </Chip>
                            </TableCell>
                            <TableCell>
                              <Chip size="sm" color={getStatusColor(cert.status)} variant="flat">
                                {cert.status}
                              </Chip>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="text-sm">{cert.expiryDate}</p>
                                {cert.status === 'expiring' && (
                                  <p className="text-xs text-red-500">Expires soon</p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="font-semibold">{cert.value}</TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="flat"
                                color="primary"
                                startContent={<Eye className="w-3 h-3" />}
                                onPress={() => handleViewCertificate(cert)}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardBody>
                </Card>
              </div>
            </Tab>

            <Tab key="analytics" title="Analytics">
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Certification Trends</h3>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Monthly Certificates</span>
                          <span className="font-semibold text-green-600">+18.5%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Premium Gems</span>
                          <span className="font-semibold text-blue-600">+24.2%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Verification Speed</span>
                          <span className="font-semibold text-purple-600">3.2 days avg</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Lab Partnerships</span>
                          <span className="font-semibold text-indigo-600">12 active</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Value Analysis</h3>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Certified Value</span>
                          <span className="font-semibold">$2.4M</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Average Gem Value</span>
                          <span className="font-semibold">$1,247</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Premium Segment</span>
                          <span className="font-semibold text-green-600">67%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Insurance Coverage</span>
                          <span className="font-semibold text-blue-600">98.5%</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      {/* Certificate Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Certificate Details</h2>
            {selectedCertificate && (
              <p className="text-sm text-gray-600">{selectedCertificate.id}</p>
            )}
          </ModalHeader>
          <ModalBody>
            {selectedCertificate && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Gemstone</label>
                    <p className="text-sm">{selectedCertificate.gemstone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Weight</label>
                    <p className="text-sm">{selectedCertificate.weight}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Laboratory</label>
                    <p className="text-sm">{selectedCertificate.lab}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Grade</label>
                    <Chip size="sm" color={getGradeColor(selectedCertificate.grade)} variant="flat">
                      {selectedCertificate.grade}
                    </Chip>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Issue Date</label>
                    <p className="text-sm">{selectedCertificate.issueDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                    <p className="text-sm">{selectedCertificate.expiryDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Estimated Value</label>
                    <p className="text-sm font-semibold">{selectedCertificate.value}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Current Owner</label>
                    <p className="text-sm">{selectedCertificate.owner}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Certificate Status</h4>
                  <Chip color={getStatusColor(selectedCertificate.status)} variant="flat">
                    {selectedCertificate.status.charAt(0).toUpperCase() + selectedCertificate.status.slice(1)}
                  </Chip>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Download PDF
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
