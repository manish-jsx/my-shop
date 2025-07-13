// src/app/admin/newsletter/page.jsx
'use client'
import { useState, useEffect } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
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
  Textarea,
  Select,
  SelectItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Checkbox,
  Divider
} from '@nextui-org/react'
import {
  Mail,
  Send,
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Edit2,
  Trash2,
  MoreVertical,
  Calendar,
  TrendingUp,
  Eye,
  MousePointer
} from 'lucide-react'
import { motion } from 'framer-motion'

const initialSubscribers = [
  {
    id: 1,
    email: 'sarah.johnson@email.com',
    name: 'Sarah Johnson',
    subscribeDate: '2025-01-10',
    status: 'active',
    source: 'newsletter_form',
    interests: ['healing-stones', 'luxury-jewelry'],
    engagement: 'high'
  },
  {
    id: 2,
    email: 'mike.chen@email.com',
    name: 'Mike Chen',
    subscribeDate: '2025-01-08',
    status: 'active',
    source: 'popup_form',
    interests: ['investment-gems'],
    engagement: 'medium'
  },
  {
    id: 3,
    email: 'user@example.com',
    name: '',
    subscribeDate: '2025-01-05',
    status: 'unsubscribed',
    source: 'contact_form',
    interests: [],
    engagement: 'low'
  }
]

const emailTemplates = [
  {
    id: 1,
    name: 'Welcome Series - Day 1',
    subject: 'Welcome to SHUKRA Gems Family!',
    type: 'welcome',
    status: 'active',
    lastSent: '2025-01-10',
    openRate: 85,
    clickRate: 12
  },
  {
    id: 2,
    name: 'Monthly Newsletter',
    subject: 'January Gemstone Discoveries',
    type: 'newsletter',
    status: 'draft',
    lastSent: null,
    openRate: 0,
    clickRate: 0
  },
  {
    id: 3,
    name: 'New Product Launch',
    subject: 'Introducing Our Myanmar Ruby Collection',
    type: 'promotional',
    status: 'scheduled',
    lastSent: null,
    openRate: 0,
    clickRate: 0
  }
]

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState(initialSubscribers)
  const [templates, setTemplates] = useState(emailTemplates)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedTab, setSelectedTab] = useState('subscribers')
  const [selectedSubscribers, setSelectedSubscribers] = useState(new Set())
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isTemplateOpen, onOpen: onTemplateOpen, onClose: onTemplateClose } = useDisclosure()
  
  const [formData, setFormData] = useState({
    subject: '',
    content: '',
    type: 'newsletter',
    scheduledDate: ''
  })

  // Load newsletter data from localStorage
  useEffect(() => {
    const storedLeads = JSON.parse(localStorage.getItem('leads') || '[]')
    const newsletterSubscribers = storedLeads.filter(lead => 
      lead.source === 'newsletter' || lead.type === 'newsletter_signup'
    ).map(lead => ({
      id: lead.id,
      email: lead.email,
      name: lead.name || '',
      subscribeDate: lead.timestamp?.split('T')[0],
      status: 'active',
      source: lead.source,
      interests: lead.interest ? [lead.interest] : [],
      engagement: 'medium'
    }))
    
    // Merge with existing subscribers
    const allSubscribers = [...initialSubscribers, ...newsletterSubscribers]
    const uniqueSubscribers = allSubscribers.filter((subscriber, index, self) =>
      index === self.findIndex(s => s.email === subscriber.email)
    )
    
    setSubscribers(uniqueSubscribers)
  }, [])

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subscriber.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    totalSubscribers: subscribers.length,
    activeSubscribers: subscribers.filter(s => s.status === 'active').length,
    newThisMonth: subscribers.filter(s => {
      const subDate = new Date(s.subscribeDate)
      const thisMonth = new Date()
      return subDate.getMonth() === thisMonth.getMonth() && 
             subDate.getFullYear() === thisMonth.getFullYear()
    }).length,
    averageEngagement: subscribers.length > 0 ? 
      (subscribers.filter(s => s.engagement === 'high').length / subscribers.length * 100).toFixed(1) : 0
  }

  const handleSendNewsletter = () => {
    // In a real app, this would integrate with an email service
    console.log('Sending newsletter to selected subscribers:', selectedSubscribers)
    setSelectedSubscribers(new Set())
    onClose()
  }

  const exportSubscribers = () => {
    const csvContent = [
      ['Email', 'Name', 'Subscribe Date', 'Status', 'Source', 'Engagement'],
      ...filteredSubscribers.map(sub => [
        sub.email,
        sub.name,
        sub.subscribeDate,
        sub.status,
        sub.source,
        sub.engagement
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const renderSubscribersTab = () => (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardBody className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Input
              placeholder="Search subscribers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              className="md:flex-1"
            />
            <Select
              placeholder="Status"
              selectedKeys={[statusFilter]}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="md:w-48"
            >
              <SelectItem key="all">All Status</SelectItem>
              <SelectItem key="active">Active</SelectItem>
              <SelectItem key="unsubscribed">Unsubscribed</SelectItem>
            </Select>
            <Button
              variant="bordered"
              startContent={<Download className="w-4 h-4" />}
              onPress={exportSubscribers}
            >
              Export
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Subscribers Table */}
      <Card>
        <CardHeader className="flex justify-between">
          <h3 className="text-lg font-semibold">Subscribers</h3>
          <div className="flex gap-2">
            {selectedSubscribers.size > 0 && (
              <Button
                color="primary"
                startContent={<Send className="w-4 h-4" />}
                onPress={onOpen}
              >
                Send to Selected ({selectedSubscribers.size})
              </Button>
            )}
          </div>
        </CardHeader>
        <CardBody>
          <Table 
            aria-label="Subscribers table"
            selectionMode="multiple"
            selectedKeys={selectedSubscribers}
            onSelectionChange={setSelectedSubscribers}
          >
            <TableHeader>
              <TableColumn>SUBSCRIBER</TableColumn>
              <TableColumn>SOURCE</TableColumn>
              <TableColumn>INTERESTS</TableColumn>
              <TableColumn>ENGAGEMENT</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>DATE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{subscriber.email}</p>
                      {subscriber.name && (
                        <p className="text-sm text-gray-500">{subscriber.name}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip size="sm" variant="flat" color="primary">
                      {subscriber.source.replace('_', ' ')}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {subscriber.interests.map((interest, index) => (
                        <Chip key={index} size="sm" variant="flat" color="secondary">
                          {interest}
                        </Chip>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      color={
                        subscriber.engagement === 'high' ? 'success' :
                        subscriber.engagement === 'medium' ? 'warning' : 'danger'
                      }
                      variant="flat"
                    >
                      {subscriber.engagement}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      color={subscriber.status === 'active' ? 'success' : 'danger'}
                      variant="flat"
                    >
                      {subscriber.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-3 h-3" />
                      {subscriber.subscribeDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem key="edit">Edit Subscriber</DropdownItem>
                        <DropdownItem key="unsubscribe" className="text-danger">
                          Unsubscribe
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  )

  const renderTemplatesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Email Templates</h3>
        <Button
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
          onPress={onTemplateOpen}
        >
          Create Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardBody className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Chip
                    size="sm"
                    color={
                      template.status === 'active' ? 'success' :
                      template.status === 'scheduled' ? 'warning' : 'default'
                    }
                    variant="flat"
                  >
                    {template.status}
                  </Chip>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key="edit" startContent={<Edit2 className="w-4 h-4" />}>
                        Edit
                      </DropdownItem>
                      <DropdownItem key="preview" startContent={<Eye className="w-4 h-4" />}>
                        Preview
                      </DropdownItem>
                      <DropdownItem key="send" startContent={<Send className="w-4 h-4" />}>
                        Send Now
                      </DropdownItem>
                      <DropdownItem 
                        key="delete" 
                        className="text-danger"
                        startContent={<Trash2 className="w-4 h-4" />}
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <h4 className="font-semibold mb-2">{template.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{template.subject}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="capitalize">{template.type}</span>
                  </div>
                  {template.lastSent && (
                    <div className="flex justify-between">
                      <span>Last Sent:</span>
                      <span>{template.lastSent}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Open Rate:</span>
                    <span>{template.openRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Click Rate:</span>
                    <span>{template.clickRate}%</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Mail className="w-6 h-6" />
            Newsletter Management
          </h1>
          <p className="text-gray-600 mt-1">Manage subscribers and email campaigns</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Subscribers', value: stats.totalSubscribers, icon: Users, color: 'primary' },
          { label: 'Active Subscribers', value: stats.activeSubscribers, icon: TrendingUp, color: 'success' },
          { label: 'New This Month', value: stats.newThisMonth, icon: Calendar, color: 'warning' },
          { label: 'Engagement Rate', value: `${stats.averageEngagement}%`, icon: MousePointer, color: 'secondary' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardBody className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                  <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Card>
        <CardBody>
          <div className="mb-6">
            <div className="flex border-b">
              <button
                className={`px-4 py-2 font-medium ${
                  selectedTab === 'subscribers' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-gray-600'
                }`}
                onClick={() => setSelectedTab('subscribers')}
              >
                Subscribers
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  selectedTab === 'templates' 
                    ? 'border-b-2 border-primary text-primary' 
                    : 'text-gray-600'
                }`}
                onClick={() => setSelectedTab('templates')}
              >
                Email Templates
              </button>
            </div>
          </div>
          
          {selectedTab === 'subscribers' ? renderSubscribersTab() : renderTemplatesTab()}
        </CardBody>
      </Card>

      {/* Send Newsletter Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>Send Newsletter</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Subject Line"
                placeholder="Enter email subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
              <Textarea
                label="Email Content"
                placeholder="Enter your newsletter content..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                minRows={6}
              />
              <Select
                label="Email Type"
                selectedKeys={[formData.type]}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <SelectItem key="newsletter">Newsletter</SelectItem>
                <SelectItem key="promotional">Promotional</SelectItem>
                <SelectItem key="announcement">Announcement</SelectItem>
              </Select>
              <p className="text-sm text-gray-600">
                This email will be sent to {selectedSubscribers.size} selected subscribers.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>Cancel</Button>
            <Button color="primary" onPress={handleSendNewsletter}>
              Send Newsletter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Template Modal */}
      <Modal isOpen={isTemplateOpen} onClose={onTemplateClose} size="2xl">
        <ModalContent>
          <ModalHeader>Create Email Template</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Template Name"
                placeholder="Enter template name"
              />
              <Input
                label="Subject Line"
                placeholder="Enter email subject"
              />
              <Textarea
                label="Email Content"
                placeholder="Enter template content..."
                minRows={8}
              />
              <Select
                label="Template Type"
                placeholder="Select template type"
              >
                <SelectItem key="welcome">Welcome Series</SelectItem>
                <SelectItem key="newsletter">Newsletter</SelectItem>
                <SelectItem key="promotional">Promotional</SelectItem>
                <SelectItem key="announcement">Announcement</SelectItem>
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onTemplateClose}>Cancel</Button>
            <Button color="primary" onPress={onTemplateClose}>
              Create Template
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
