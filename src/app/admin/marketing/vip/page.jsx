// src/app/admin/marketing/vip/page.jsx
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
  Progress
} from '@nextui-org/react'
import { 
  Crown,
  Send,
  Eye,
  Edit,
  Plus,
  Users,
  Mail,
  Calendar,
  Target,
  TrendingUp,
  Gift,
  Star,
  Gem
} from 'lucide-react'

const vipCampaigns = [
  {
    id: 'VIP-001',
    name: 'Diamond Elite Exclusive Preview',
    type: 'Product Launch',
    targetTier: 'Diamond Elite',
    targetCount: 12,
    status: 'active',
    startDate: '2025-07-01',
    endDate: '2025-07-31',
    openRate: 95.8,
    clickRate: 78.3,
    conversionRate: 45.2,
    revenue: 145000,
    description: 'Exclusive preview of new Kashmir sapphire collection'
  },
  {
    id: 'VIP-002',
    name: 'Platinum Birthday Celebration',
    type: 'Birthday Special',
    targetTier: 'Platinum VIP',
    targetCount: 28,
    status: 'scheduled',
    startDate: '2025-07-15',
    endDate: '2025-08-15',
    openRate: 89.2,
    clickRate: 65.7,
    conversionRate: 32.1,
    revenue: 89500,
    description: 'Personal birthday offers with custom gemstone recommendations'
  },
  {
    id: 'VIP-003',
    name: 'Heritage Collection VIP Access',
    type: 'Collection Launch',
    targetTier: 'All VIP',
    targetCount: 85,
    status: 'completed',
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    openRate: 92.1,
    clickRate: 71.4,
    conversionRate: 38.9,
    revenue: 285000,
    description: 'Early access to heritage gemstone collection with certification stories'
  },
  {
    id: 'VIP-004',
    name: 'Gold VIP Summer Selections',
    type: 'Seasonal',
    targetTier: 'Gold VIP',
    targetCount: 45,
    status: 'draft',
    startDate: '2025-08-01',
    endDate: '2025-08-31',
    openRate: 0,
    clickRate: 0,
    conversionRate: 0,
    revenue: 0,
    description: 'Summer-themed gemstone collection with travel-safe jewelry options'
  }
]

const campaignTemplates = [
  {
    id: 1,
    name: 'New Collection Launch',
    description: 'Announce exclusive new gemstone collections',
    estimatedEngagement: '85-95%'
  },
  {
    id: 2,
    name: 'Personal Milestone',
    description: 'Birthday, anniversary, and special occasions',
    estimatedEngagement: '90-98%'
  },
  {
    id: 3,
    name: 'Investment Opportunity',
    description: 'Rare gemstone investment opportunities',
    estimatedEngagement: '70-85%'
  },
  {
    id: 4,
    name: 'Educational Series',
    description: 'Gemstone knowledge and certification education',
    estimatedEngagement: '60-75%'
  }
]

export default function VIPCampaignsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success'
      case 'scheduled': return 'primary'
      case 'completed': return 'secondary'
      case 'draft': return 'warning'
      default: return 'default'
    }
  }

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'Diamond Elite': return <Crown className="w-4 h-4 text-purple-600" />
      case 'Platinum VIP': return <Star className="w-4 h-4 text-gray-600" />
      case 'Gold VIP': return <Gem className="w-4 h-4 text-yellow-600" />
      case 'All VIP': return <Users className="w-4 h-4 text-blue-600" />
      default: return null
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
            <Crown className="w-8 h-8 text-purple-600" />
            VIP Marketing Campaigns
          </h1>
          <p className="text-gray-600 mt-1">Exclusive marketing campaigns for VIP customers</p>
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

      {/* Campaign Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-green-600">3</p>
                <p className="text-xs text-gray-500">2 scheduled</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Open Rate</p>
                <p className="text-2xl font-bold text-blue-600">92.4%</p>
                <p className="text-xs text-green-600">+5.2% vs industry</p>
              </div>
              <Mail className="w-8 h-8 text-blue-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-purple-600">38.7%</p>
                <p className="text-xs text-green-600">+12.8% vs standard</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Campaign Revenue</p>
                <p className="text-2xl font-bold text-green-600">$519K</p>
                <p className="text-xs text-green-600">This quarter</p>
              </div>
              <Gift className="w-8 h-8 text-green-500" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">VIP Campaign Management</h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="VIP campaigns table">
            <TableHeader>
              <TableColumn>CAMPAIGN</TableColumn>
              <TableColumn>TARGET AUDIENCE</TableColumn>
              <TableColumn>TIMELINE</TableColumn>
              <TableColumn>PERFORMANCE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>REVENUE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {vipCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-gray-500">{campaign.type}</p>
                      <p className="text-xs text-gray-400">{campaign.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTierIcon(campaign.targetTier)}
                      <div>
                        <p className="text-sm font-medium">{campaign.targetTier}</p>
                        <p className="text-xs text-gray-500">{campaign.targetCount} customers</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{campaign.startDate}</p>
                      <p className="text-xs text-gray-500">to {campaign.endDate}</p>
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
                      {campaign.status === 'draft' && (
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

      {/* Campaign Templates */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Campaign Templates</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {campaignTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardBody className="p-4">
                  <h4 className="font-semibold mb-2">{template.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="flex justify-between items-center">
                    <Chip size="sm" color="primary" variant="flat">
                      {template.estimatedEngagement}
                    </Chip>
                    <Button size="sm" color="primary" variant="flat">
                      Use Template
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Campaign Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent>
          <ModalHeader>Campaign Details</ModalHeader>
          <ModalBody>
            {selectedCampaign && (
              <div className="space-y-6">
                {/* Campaign Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{selectedCampaign.name}</h3>
                    <p className="text-gray-600">{selectedCampaign.description}</p>
                  </div>
                  <Chip 
                    color={getStatusColor(selectedCampaign.status)} 
                    variant="flat"
                    size="lg"
                  >
                    {selectedCampaign.status}
                  </Chip>
                </div>

                {/* Campaign Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Campaign Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{selectedCampaign.startDate} - {selectedCampaign.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTierIcon(selectedCampaign.targetTier)}
                        <span className="text-sm">{selectedCampaign.targetTier} ({selectedCampaign.targetCount} customers)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{selectedCampaign.type}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Open Rate</span>
                          <span className="text-sm font-medium">{selectedCampaign.openRate}%</span>
                        </div>
                        <Progress value={selectedCampaign.openRate} size="sm" color="primary" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Click Rate</span>
                          <span className="text-sm font-medium">{selectedCampaign.clickRate}%</span>
                        </div>
                        <Progress value={selectedCampaign.clickRate} size="sm" color="secondary" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Conversion Rate</span>
                          <span className="text-sm font-medium">{selectedCampaign.conversionRate}%</span>
                        </div>
                        <Progress value={selectedCampaign.conversionRate} size="sm" color="success" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revenue Impact */}
                <div>
                  <h4 className="font-semibold mb-3">Revenue Impact</h4>
                  <Card>
                    <CardBody className="text-center p-6">
                      <Gift className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <p className="text-2xl font-bold text-green-600">
                        ${selectedCampaign.revenue.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Total campaign revenue</p>
                    </CardBody>
                  </Card>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button color="secondary" variant="flat">
              Download Report
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
          <ModalHeader>Create New VIP Campaign</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Campaign Name" placeholder="e.g., Exclusive Ruby Collection" />
              <Select label="Campaign Type">
                <SelectItem key="product_launch" value="product_launch">Product Launch</SelectItem>
                <SelectItem key="birthday" value="birthday">Birthday Special</SelectItem>
                <SelectItem key="seasonal" value="seasonal">Seasonal</SelectItem>
                <SelectItem key="educational" value="educational">Educational</SelectItem>
              </Select>
              <Select label="Target VIP Tier">
                <SelectItem key="diamond_elite" value="diamond_elite">Diamond Elite</SelectItem>
                <SelectItem key="platinum_vip" value="platinum_vip">Platinum VIP</SelectItem>
                <SelectItem key="gold_vip" value="gold_vip">Gold VIP</SelectItem>
                <SelectItem key="all_vip" value="all_vip">All VIP</SelectItem>
              </Select>
              <Input type="date" label="Start Date" />
              <Input type="date" label="End Date" />
              <Select label="Campaign Template">
                {campaignTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id.toString()}>
                    {template.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Textarea
              label="Campaign Description"
              placeholder="Describe the campaign objectives and key messages..."
              className="col-span-2"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onCreateClose}>
              Cancel
            </Button>
            <Button color="secondary" variant="flat">
              Save as Draft
            </Button>
            <Button color="primary">
              Create & Launch
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
