// src/app/admin/customers/loyalty/page.jsx
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
  Progress,
  Avatar
} from '@nextui-org/react'
import { 
  Award,
  Gift,
  TrendingUp,
  Users,
  Star,
  Crown,
  Gem,
  Plus,
  Eye,
  Edit,
  Send,
  Calendar,
  Target
} from 'lucide-react'

const loyaltyPrograms = [
  {
    id: 'LP-001',
    name: 'Gemstone Collector',
    tier: 'Gold',
    minSpend: 5000,
    benefits: ['5% cashback', 'Free shipping', 'Birthday bonus'],
    activeMembers: 245,
    avgSpend: 7500,
    status: 'active'
  },
  {
    id: 'LP-002',
    name: 'Platinum Elite',
    tier: 'Platinum',
    minSpend: 15000,
    benefits: ['10% cashback', 'Priority support', 'Exclusive previews'],
    activeMembers: 89,
    avgSpend: 22000,
    status: 'active'
  },
  {
    id: 'LP-003',
    name: 'Diamond Legacy',
    tier: 'Diamond',
    minSpend: 50000,
    benefits: ['15% cashback', 'Personal consultant', 'White glove service'],
    activeMembers: 23,
    avgSpend: 85000,
    status: 'active'
  }
]

const loyaltyMembers = [
  {
    id: 'LM-001',
    name: 'Victoria Sterling',
    email: 'victoria@sterling.com',
    tier: 'Diamond',
    points: 12450,
    totalSpent: 125000,
    joinDate: '2023-03-15',
    lastActivity: '2025-07-10',
    status: 'active',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'LM-002',
    name: 'Alexander Chen',
    email: 'alex.chen@techcorp.com',
    tier: 'Platinum',
    points: 8750,
    totalSpent: 87500,
    joinDate: '2023-08-20',
    lastActivity: '2025-07-08',
    status: 'active',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'LM-003',
    name: 'Sarah Johnson',
    email: 'sarah.j@luxury.com',
    tier: 'Gold',
    points: 3250,
    totalSpent: 32500,
    joinDate: '2024-01-10',
    lastActivity: '2025-07-05',
    status: 'active',
    avatar: '/api/placeholder/40/40'
  }
]

const rewardRedemptions = [
  {
    id: 'RR-001',
    member: 'Victoria Sterling',
    reward: '$500 Gemstone Credit',
    points: 5000,
    date: '2025-07-10',
    status: 'completed'
  },
  {
    id: 'RR-002',
    member: 'Alexander Chen',
    reward: 'Free Certification',
    points: 2000,
    date: '2025-07-08',
    status: 'pending'
  }
]

export default function LoyaltyPage() {
  const [selectedMember, setSelectedMember] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Diamond': return 'secondary'
      case 'Platinum': return 'default'
      case 'Gold': return 'warning'
      default: return 'primary'
    }
  }

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'Diamond': return <Crown className="w-4 h-4" />
      case 'Platinum': return <Star className="w-4 h-4" />
      case 'Gold': return <Gem className="w-4 h-4" />
      default: return <Award className="w-4 h-4" />
    }
  }

  const handleViewMember = (member) => {
    setSelectedMember(member)
    onOpen()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Award className="w-8 h-8 text-purple-600" />
            Loyalty Program Management
          </h1>
          <p className="text-gray-600 mt-1">Manage customer loyalty programs and rewards</p>
        </div>
        <div className="flex gap-3">
          <Button color="secondary" variant="flat">
            Export Members
          </Button>
          <Button
            onPress={onCreateOpen}
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
          >
            Create Program
          </Button>
        </div>
      </div>

      {/* Program Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-purple-600">357</p>
                <p className="text-xs text-green-600">+15% this month</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Points Issued</p>
                <p className="text-2xl font-bold text-blue-600">245K</p>
                <p className="text-xs text-gray-500">This quarter</p>
              </div>
              <Gift className="w-8 h-8 text-blue-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Redemption Rate</p>
                <p className="text-2xl font-bold text-green-600">68%</p>
                <p className="text-xs text-green-600">+5% vs last quarter</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Member Value</p>
                <p className="text-2xl font-bold text-yellow-600">$12.5K</p>
                <p className="text-xs text-gray-500">Annual spend</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Loyalty Programs */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Loyalty Program Tiers</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {loyaltyPrograms.map((program) => (
              <Card key={program.id} className="border">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getTierIcon(program.tier)}
                      <h4 className="font-semibold">{program.name}</h4>
                    </div>
                    <Chip 
                      color={getTierColor(program.tier)} 
                      variant="flat"
                      size="sm"
                    >
                      {program.tier}
                    </Chip>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Minimum Spend</p>
                      <p className="font-bold text-green-600">${program.minSpend.toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Active Members</p>
                      <p className="font-bold">{program.activeMembers}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Avg. Spend</p>
                      <p className="font-bold">${program.avgSpend.toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Benefits</p>
                      <div className="flex flex-wrap gap-1">
                        {program.benefits.map((benefit, index) => (
                          <Chip key={index} size="tiny" variant="flat">
                            {benefit}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    
                    <Button size="sm" variant="flat" className="w-full">
                      Edit Program
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Top Loyalty Members */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Top Loyalty Members</h3>
        </CardHeader>
        <CardBody>
          <Table aria-label="Loyalty members table">
            <TableHeader>
              <TableColumn>MEMBER</TableColumn>
              <TableColumn>TIER</TableColumn>
              <TableColumn>POINTS</TableColumn>
              <TableColumn>TOTAL SPENT</TableColumn>
              <TableColumn>LAST ACTIVITY</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {loyaltyMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar src={member.avatar} size="sm" />
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Chip 
                        color={getTierColor(member.tier)} 
                        variant="flat"
                        startContent={getTierIcon(member.tier)}
                        size="sm"
                      >
                        {member.tier}
                      </Chip>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <p className="font-bold text-purple-600">{member.points.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-green-600">${member.totalSpent.toLocaleString()}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{member.lastActivity}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => handleViewMember(member)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        color="primary"
                        variant="flat"
                      >
                        <Gift className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Recent Redemptions */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Recent Reward Redemptions</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {rewardRedemptions.map((redemption) => (
              <div key={redemption.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{redemption.member}</p>
                  <p className="text-sm text-gray-600">{redemption.reward}</p>
                  <p className="text-xs text-gray-500">{redemption.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">{redemption.points} pts</p>
                  <Chip 
                    size="sm" 
                    color={redemption.status === 'completed' ? 'success' : 'warning'}
                    variant="flat"
                  >
                    {redemption.status}
                  </Chip>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Member Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>Loyalty Member Profile</ModalHeader>
          <ModalBody>
            {selectedMember && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar src={selectedMember.avatar} size="lg" />
                  <div>
                    <h3 className="text-xl font-bold">{selectedMember.name}</h3>
                    <p className="text-gray-600">{selectedMember.email}</p>
                    <Chip 
                      color={getTierColor(selectedMember.tier)} 
                      variant="flat"
                      startContent={getTierIcon(selectedMember.tier)}
                    >
                      {selectedMember.tier} Member
                    </Chip>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardBody className="text-center p-4">
                      <Gift className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Points Balance</p>
                      <p className="text-lg font-bold text-purple-600">{selectedMember.points.toLocaleString()}</p>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="text-center p-4">
                      <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Total Spent</p>
                      <p className="text-lg font-bold text-green-600">${selectedMember.totalSpent.toLocaleString()}</p>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody className="text-center p-4">
                      <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="text-lg font-bold">{selectedMember.joinDate}</p>
                    </CardBody>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Tier Progress</h4>
                  <Progress value={75} color="purple" className="mb-2" />
                  <p className="text-sm text-gray-600">75% to next tier</p>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button color="secondary" variant="flat">
              Award Points
            </Button>
            <Button color="primary">
              Send Reward
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Create Program Modal */}
      <Modal isOpen={isCreateOpen} onClose={onCreateClose} size="2xl">
        <ModalContent>
          <ModalHeader>Create New Loyalty Program</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Program Name" placeholder="e.g., Ruby Collectors" />
              <Select label="Tier Level">
                <SelectItem key="bronze" value="bronze">Bronze</SelectItem>
                <SelectItem key="silver" value="silver">Silver</SelectItem>
                <SelectItem key="gold" value="gold">Gold</SelectItem>
                <SelectItem key="platinum" value="platinum">Platinum</SelectItem>
                <SelectItem key="diamond" value="diamond">Diamond</SelectItem>
              </Select>
              <Input label="Minimum Spend ($)" placeholder="5000" />
              <Input label="Points per Dollar" placeholder="1" />
              <Input label="Cashback %" placeholder="5" />
              <Select label="Special Benefits">
                <SelectItem key="free_shipping" value="free_shipping">Free Shipping</SelectItem>
                <SelectItem key="priority_support" value="priority_support">Priority Support</SelectItem>
                <SelectItem key="exclusive_previews" value="exclusive_previews">Exclusive Previews</SelectItem>
                <SelectItem key="birthday_bonus" value="birthday_bonus">Birthday Bonus</SelectItem>
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onCreateClose}>
              Cancel
            </Button>
            <Button color="primary">
              Create Program
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
