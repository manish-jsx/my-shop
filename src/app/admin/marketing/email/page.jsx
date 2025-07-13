// src/app/admin/marketing/email/page.jsx
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
  Progress,
  Tabs,
  Tab
} from '@nextui-org/react'
import { 
  Mail,
  Send,
  Users,
  TrendingUp,
  Eye,
  Edit,
  Copy,
  Plus,
  Calendar,
  Target,
  BarChart3,
  Clock,
  CheckCircle
} from 'lucide-react'

const emailCampaigns = [
  {
    id: 'EC-001',
    name: 'Summer Gemstone Collection Launch',
    subject: '✨ Exclusive Summer Gems - Early Access Inside',
    status: 'sent',
    sentDate: '2025-07-10',
    recipients: 2456,
    openRate: 32.5,
    clickRate: 8.7,
    conversionRate: 2.3,
    revenue: 45600,
    type: 'promotional'
  },
  {
    id: 'EC-002',
    name: 'Gemstone Care Guide Newsletter',
    subject: 'How to Keep Your Gemstones Sparkling Forever',
    status: 'scheduled',
    sentDate: '2025-07-15',
    recipients: 3200,
    openRate: 0,
    clickRate: 0,
    conversionRate: 0,
    revenue: 0,
    type: 'educational'
  },
  {
    id: 'EC-003',
    name: 'VIP Customer Birthday Special',
    subject: '🎉 Happy Birthday! Your Special Gift Awaits',
    status: 'draft',
    sentDate: null,
    recipients: 89,
    openRate: 0,
    clickRate: 0,
    conversionRate: 0,
    revenue: 0,
    type: 'personalized'
  },
  {
    id: 'EC-004',
    name: 'Abandoned Cart Recovery',
    subject: 'Your Beautiful Gems Are Waiting...',
    status: 'active',
    sentDate: '2025-07-12',
    recipients: 145,
    openRate: 45.2,
    clickRate: 15.8,
    conversionRate: 8.9,
    revenue: 12800,
    type: 'automated'
  }
]

const emailTemplates = [
  {
    id: 1,
    name: 'Product Launch',
    description: 'Announce new gemstone collections',
    category: 'promotional',
    usage: 12
  },
  {
    id: 2,
    name: 'Educational Content',
    description: 'Share gemstone knowledge and tips',
    category: 'educational',
    usage: 8
  },
  {
    id: 3,
    name: 'VIP Special Offer',
    description: 'Exclusive offers for VIP customers',
    category: 'vip',
    usage: 15
  },
  {
    id: 4,
    name: 'Cart Abandonment',
    description: 'Recover abandoned shopping carts',
    category: 'automated',
    usage: 25
  }
]

const audienceSegments = [
  { id: 1, name: 'All Subscribers', count: 8945, growth: 12.5 },
  { id: 2, name: 'VIP Customers', count: 234, growth: 8.7 },
  { id: 3, name: 'Recent Buyers', count: 456, growth: 22.1 },
  { id: 4, name: 'Cart Abandoners', count: 189, growth: -5.2 },
  { id: 5, name: 'Newsletter Only', count: 5623, growth: 15.8 }
]

export default function EmailMarketingPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [activeTab, setActiveTab] = useState('campaigns')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'success'
      case 'scheduled': return 'primary'
      case 'draft': return 'warning'
      case 'active': return 'secondary'
      default: return 'default'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'promotional': return 'danger'
      case 'educational': return 'primary'
      case 'personalized': return 'secondary'
      case 'automated': return 'success'
      default: return 'default'
    }
  }

  const handleViewCampaign = (campaign) => {
    setSelectedCampaign(campaign)
    onOpen()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="w-8 h-8 text-blue-600" />
            Email Marketing
          </h1>
          <p className="text-gray-600 mt-1">Create and manage email campaigns for your customers</p>
        </div>
        <div className="flex gap-3">
          <Button color="secondary" variant="flat">
            Campaign Analytics
          </Button>
          <Button
            onPress={onCreateOpen}
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
          >
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Email Marketing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Subscribers</p>
                <p className="text-2xl font-bold text-blue-600">8,945</p>
                <p className="text-xs text-green-600">+12.5% this month</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Open Rate</p>
                <p className="text-2xl font-bold text-green-600">38.9%</p>
                <p className="text-xs text-green-600">+2.3% vs industry</p>
              </div>
              <Eye className="w-8 h-8 text-green-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Click Rate</p>
                <p className="text-2xl font-bold text-purple-600">11.2%</p>
                <p className="text-xs text-green-600">+1.8% vs industry</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Email Revenue</p>
                <p className="text-2xl font-bold text-green-600">$58K</p>
                <p className="text-xs text-green-600">This month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs 
        aria-label="Email marketing sections" 
        selectedKey={activeTab}
        onSelectionChange={setActiveTab}
        color="primary"
        variant="underlined"
      >
        <Tab key="campaigns" title="Campaigns">
          {/* Email Campaigns Table */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Email Campaigns</h3>
            </CardHeader>
            <CardBody>
              <Table aria-label="Email campaigns table">
                <TableHeader>
                  <TableColumn>CAMPAIGN</TableColumn>
                  <TableColumn>TYPE</TableColumn>
                  <TableColumn>RECIPIENTS</TableColumn>
                  <TableColumn>PERFORMANCE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>REVENUE</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {emailCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                          <p className="text-sm text-gray-500">{campaign.subject}</p>
                          <p className="text-xs text-gray-400">{campaign.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          color={getTypeColor(campaign.type)} 
                          variant="flat"
                          size="sm"
                        >
                          {campaign.type}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <p className="font-bold">{campaign.recipients.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">recipients</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Open: {campaign.openRate}%</span>
                            <span>Click: {campaign.clickRate}%</span>
                          </div>
                          <Progress 
                            value={campaign.openRate} 
                            size="sm" 
                            color="primary"
                            className="max-w-[100px]"
                          />
                          <p className="text-xs text-gray-500">Conv: {campaign.conversionRate}%</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          color={getStatusColor(campaign.status)} 
                          variant="flat" 
                          size="sm"
                        >
                          {campaign.status}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold text-green-600">
                          ${campaign.revenue.toLocaleString()}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            onPress={() => handleViewCampaign(campaign)}
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
                          {(campaign.status === 'draft' || campaign.status === 'scheduled') && (
                            <Button
                              isIconOnly
                              size="sm"
                              color="success"
                              variant="flat"
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="templates" title="Templates">
          {/* Email Templates */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center w-full">
                <h3 className="text-lg font-semibold">Email Templates</h3>
                <Button color="primary" variant="flat" startContent={<Plus className="w-4 h-4" />}>
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {emailTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardBody className="p-4">
                      <h4 className="font-semibold mb-2">{template.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <div className="flex justify-between items-center mb-3">
                        <Chip size="sm" color="primary" variant="flat">
                          {template.category}
                        </Chip>
                        <span className="text-xs text-gray-500">{template.usage} uses</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="flat" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" color="primary" variant="flat" className="flex-1">
                          <Copy className="w-3 h-3 mr-1" />
                          Use
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="audiences" title="Audiences">
          {/* Audience Segments */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center w-full">
                <h3 className="text-lg font-semibold">Audience Segments</h3>
                <Button color="primary" variant="flat" startContent={<Plus className="w-4 h-4" />}>
                  Create Segment
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {audienceSegments.map((segment) => (
                  <div key={segment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{segment.name}</p>
                        <p className="text-sm text-gray-500">{segment.count.toLocaleString()} subscribers</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`text-sm font-medium ${segment.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {segment.growth > 0 ? '+' : ''}{segment.growth}%
                        </p>
                        <p className="text-xs text-gray-500">growth</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="flat">
                          View
                        </Button>
                        <Button size="sm" color="primary" variant="flat">
                          Send Campaign
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="automation" title="Automation">
          {/* Email Automation */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Automated Email Flows</h3>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <h4 className="font-semibold">Welcome Series</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      3-email welcome sequence for new subscribers
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Active subscribers</span>
                        <span className="font-medium">2,456</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Completion rate</span>
                        <span className="font-medium text-green-600">67%</span>
                      </div>
                    </div>
                    <Button size="sm" variant="flat" className="w-full">
                      Edit Flow
                    </Button>
                  </CardBody>
                </Card>

                <Card className="border">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Clock className="w-5 h-5 text-orange-600" />
                      </div>
                      <h4 className="font-semibold">Cart Abandonment</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Recover abandoned carts with targeted emails
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Recovery rate</span>
                        <span className="font-medium text-green-600">12.5%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Revenue recovered</span>
                        <span className="font-medium">$12,800</span>
                      </div>
                    </div>
                    <Button size="sm" variant="flat" className="w-full">
                      Edit Flow
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      {/* Campaign Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent>
          <ModalHeader>Campaign Details</ModalHeader>
          <ModalBody>
            {selectedCampaign && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{selectedCampaign.name}</h3>
                    <p className="text-gray-600">{selectedCampaign.subject}</p>
                  </div>
                  <Chip 
                    color={getStatusColor(selectedCampaign.status)} 
                    variant="flat"
                    size="lg"
                  >
                    {selectedCampaign.status}
                  </Chip>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <Card>
                    <CardBody className="text-center p-4">
                      <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Recipients</p>
                      <p className="text-lg font-bold">{selectedCampaign.recipients.toLocaleString()}</p>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="text-center p-4">
                      <Eye className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Open Rate</p>
                      <p className="text-lg font-bold text-green-600">{selectedCampaign.openRate}%</p>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="text-center p-4">
                      <Target className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click Rate</p>
                      <p className="text-lg font-bold text-purple-600">{selectedCampaign.clickRate}%</p>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="text-center p-4">
                      <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-lg font-bold text-green-600">${selectedCampaign.revenue.toLocaleString()}</p>
                    </CardBody>
                  </Card>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Performance</h4>
                    <Progress value={selectedCampaign.openRate} label="Open Rate" />
                    <Progress value={selectedCampaign.clickRate} label="Click Rate" className="mt-2" />
                    <Progress value={selectedCampaign.conversionRate} label="Conversion" className="mt-2" />
                  </div>
                  <div className="col-span-2">
                    <h4 className="font-semibold mb-2">Campaign Timeline</h4>
                    <div className="space-y-2">
                      {selectedCampaign.sentDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">Sent: {selectedCampaign.sentDate}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Type: {selectedCampaign.type}</span>
                      </div>
                    </div>
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
              Duplicate
            </Button>
            <Button color="primary">
              Edit Campaign
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Create Campaign Modal */}
      <Modal isOpen={isCreateOpen} onClose={onCreateClose} size="2xl">
        <ModalContent>
          <ModalHeader>Create New Email Campaign</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input label="Campaign Name" placeholder="e.g., Summer Collection Launch" />
              <Input label="Email Subject" placeholder="e.g., ✨ New Arrivals - Limited Time" />
              <Select label="Campaign Type">
                <SelectItem key="promotional" value="promotional">Promotional</SelectItem>
                <SelectItem key="educational" value="educational">Educational</SelectItem>
                <SelectItem key="personalized" value="personalized">Personalized</SelectItem>
                <SelectItem key="newsletter" value="newsletter">Newsletter</SelectItem>
              </Select>
              <Select label="Audience Segment">
                {audienceSegments.map((segment) => (
                  <SelectItem key={segment.id} value={segment.id.toString()}>
                    {segment.name} ({segment.count.toLocaleString()} subscribers)
                  </SelectItem>
                ))}
              </Select>
              <Select label="Email Template">
                {emailTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id.toString()}>
                    {template.name}
                  </SelectItem>
                ))}
              </Select>
              <Textarea
                label="Campaign Notes"
                placeholder="Add notes about campaign objectives..."
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onCreateClose}>
              Cancel
            </Button>
            <Button color="secondary" variant="flat">
              Save as Draft
            </Button>
            <Button color="primary">
              Create & Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
