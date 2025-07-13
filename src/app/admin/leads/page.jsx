// src/app/admin/leads/page.jsx
'use client'
import { useState, useEffect } from 'react'
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
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
  Tabs,
  Tab,
  Progress,
  Divider
} from '@nextui-org/react'
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  TrendingUp, 
  Filter,
  Download,
  Eye,
  MessageCircle,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  UserPlus,
  MousePointer,
  Globe,
  Quote,
  Share2,
  BarChart3
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function LeadsPage() {
  const [leads, setLeads] = useState([])
  const [filteredLeads, setFilteredLeads] = useState([])
  const [selectedLead, setSelectedLead] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [followUpNote, setFollowUpNote] = useState('')
  const [selectedTab, setSelectedTab] = useState('overview')
  const leadsPerPage = 10
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Load leads from localStorage
  useEffect(() => {
    const storedLeads = JSON.parse(localStorage.getItem('leads') || '[]')
    setLeads(storedLeads)
    setFilteredLeads(storedLeads)
  }, [])

  // Filter leads based on search and filters
  useEffect(() => {
    let filtered = leads

    if (searchQuery) {
      filtered = filtered.filter(lead =>
        lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone?.includes(searchQuery) ||
        lead.subject?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter)
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(lead => lead.type === typeFilter || lead.source === typeFilter)
    }

    setFilteredLeads(filtered)
    setCurrentPage(1)
  }, [leads, searchQuery, statusFilter, typeFilter])

  const updateLeadStatus = (leadId, newStatus) => {
    const updatedLeads = leads.map(lead =>
      lead.id === leadId ? { ...lead, status: newStatus, lastUpdated: new Date().toISOString() } : lead
    )
    setLeads(updatedLeads)
    localStorage.setItem('leads', JSON.stringify(updatedLeads))
  }

  const addFollowUp = (leadId) => {
    if (!followUpNote.trim()) return

    const updatedLeads = leads.map(lead =>
      lead.id === leadId 
        ? { 
            ...lead, 
            followUps: [
              ...(lead.followUps || []),
              {
                note: followUpNote,
                timestamp: new Date().toISOString(),
                id: Date.now()
              }
            ],
            lastUpdated: new Date().toISOString()
          } 
        : lead
    )
    setLeads(updatedLeads)
    localStorage.setItem('leads', JSON.stringify(updatedLeads))
    setFollowUpNote('')
    onClose()
  }

  const getStatusColor = (status) => {
    const colors = {
      new: 'primary',
      contacted: 'warning',
      qualified: 'success',
      converted: 'success',
      lost: 'danger',
      subscribed: 'secondary',
      quote_requested: 'warning'
    }
    return colors[status] || 'default'
  }

  const getTypeColor = (type) => {
    const colors = {
      contact_form: 'primary',
      newsletter: 'secondary',
      quote_request: 'warning',
      social_engagement: 'success'
    }
    return colors[type] || 'default'
  }

  // Enhanced analytics calculations
  const getLeadStats = () => {
    const total = leads.length
    const newLeads = leads.filter(lead => lead.status === 'new').length
    const contacted = leads.filter(lead => lead.status === 'contacted').length
    const qualified = leads.filter(lead => lead.status === 'qualified').length
    const converted = leads.filter(lead => lead.status === 'converted').length
    
    const bySource = leads.reduce((acc, lead) => {
      const source = lead.source || 'unknown'
      acc[source] = (acc[source] || 0) + 1
      return acc
    }, {})

    const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : 0
    
    const todayLeads = leads.filter(lead => {
      const today = new Date().toISOString().split('T')[0]
      const leadDate = lead.timestamp?.split('T')[0]
      return leadDate === today
    }).length

    return {
      total,
      newLeads,
      contacted,
      qualified,
      converted,
      conversionRate,
      todayLeads,
      bySource
    }
  }

  const getLeadIcon = (source) => {
    const icons = {
      'contact_form': MessageCircle,
      'newsletter': Mail,
      'quote_request': Quote,
      'popup_form': MousePointer,
      'social_click': Share2,
      'product_share': Share2,
      'social_engagement': Globe
    }
    return icons[source] || UserPlus
  }

  const getSourceColor = (source) => {
    const colors = {
      'contact_form': 'primary',
      'newsletter': 'success',
      'quote_request': 'warning',
      'popup_form': 'secondary',
      'social_click': 'primary',
      'product_share': 'success',
      'social_engagement': 'secondary'
    }
    return colors[source] || 'default'
  }

  const exportLeads = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Source', 'Status', 'Date', 'Interest'],
      ...filteredLeads.map(lead => [
        lead.name || '',
        lead.email || '',
        lead.phone || '',
        lead.source || '',
        lead.status || '',
        lead.timestamp || '',
        lead.interest || lead.subject || ''
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const stats = getLeadStats()

  // Get paginated leads
  const startIndex = (currentPage - 1) * leadsPerPage
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + leadsPerPage)
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage)

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', value: stats.total, icon: Users, color: 'primary' },
          { label: 'New Today', value: stats.todayLeads, icon: TrendingUp, color: 'success' },
          { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: BarChart3, color: 'warning' },
          { label: 'Qualified', value: stats.qualified, icon: CheckCircle, color: 'secondary' }
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardBody className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-sm text-gray-600">{metric.label}</p>
                  </div>
                  <div className={`p-2 rounded-lg bg-${metric.color}-100`}>
                    <metric.icon className={`w-5 h-5 text-${metric.color}-600`} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Lead Sources */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Lead Sources</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {Object.entries(stats.bySource).map(([source, count]) => {
              const percentage = ((count / stats.total) * 100).toFixed(1)
              const Icon = getLeadIcon(source)
              return (
                <div key={source} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span className="capitalize">{source.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{count}</span>
                    <div className="w-24">
                      <Progress value={parseFloat(percentage)} size="sm" />
                    </div>
                    <span className="text-xs text-gray-500 w-10">{percentage}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardBody>
      </Card>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Lead Conversion Funnel</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {[
              { stage: 'New Leads', count: stats.newLeads, color: 'primary' },
              { stage: 'Contacted', count: stats.contacted, color: 'warning' },
              { stage: 'Qualified', count: stats.qualified, color: 'secondary' },
              { stage: 'Converted', count: stats.converted, color: 'success' }
            ].map((stage, index) => {
              const percentage = stats.total > 0 ? ((stage.count / stats.total) * 100).toFixed(1) : 0
              return (
                <div key={stage.stage} className="flex items-center justify-between">
                  <span className="font-medium">{stage.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{stage.count}</span>
                    <div className="w-32">
                      <Progress value={parseFloat(percentage)} color={stage.color} size="sm" />
                    </div>
                    <span className="text-xs text-gray-500 w-12">{percentage}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  )

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <UserPlus className="w-6 h-6" />
              Lead Management
            </h1>
            <p className="text-gray-600 mt-1">Track and manage customer inquiries and leads</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="bordered"
              startContent={<Download className="w-4 h-4" />}
              onPress={exportLeads}
            >
              Export CSV
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab} color="primary">
          <Tab key="overview" title="Overview">
            {renderOverviewTab()}
          </Tab>
          <Tab key="leads" title="All Leads">
            {/* Existing leads table content */}
            <Card>
              <CardBody>
                <Table aria-label="Leads table">
                  <TableHeader>
                    <TableColumn>CONTACT</TableColumn>
                    <TableColumn>TYPE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {paginatedLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{lead.name || lead.email}</p>
                            {lead.email && <p className="text-sm text-gray-600">{lead.email}</p>}
                            {lead.phone && <p className="text-sm text-gray-600">{lead.phone}</p>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            size="sm" 
                            color={getTypeColor(lead.type || lead.source)}
                            variant="flat"
                          >
                            {lead.type || lead.source}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            size="sm" 
                            color={getStatusColor(lead.status)}
                            variant="flat"
                          >
                            {lead.status}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(lead.timestamp).toLocaleDateString()}
                            <p className="text-xs text-gray-500">
                              {new Date(lead.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="flat"
                              onPress={() => {
                                setSelectedLead(lead)
                                onOpen()
                              }}
                              startContent={<Eye className="w-3 h-3" />}
                            >
                              View
                            </Button>
                            <Select
                              size="sm"
                              placeholder="Status"
                              selectedKeys={[lead.status]}
                              onSelectionChange={(keys) => updateLeadStatus(lead.id, Array.from(keys)[0])}
                              className="w-32"
                            >
                              <SelectItem key="new">New</SelectItem>
                              <SelectItem key="contacted">Contacted</SelectItem>
                              <SelectItem key="qualified">Qualified</SelectItem>
                              <SelectItem key="converted">Converted</SelectItem>
                              <SelectItem key="lost">Lost</SelectItem>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {totalPages > 1 && (
                  <div className="flex justify-center mt-4">
                    <Pagination
                      total={totalPages}
                      page={currentPage}
                      onChange={setCurrentPage}
                    />
                  </div>
                )}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>

        {/* Lead Detail Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalContent>
            <ModalHeader>
              Lead Details
            </ModalHeader>
            <ModalBody>
              {selectedLead && (
                <Tabs>
                  <Tab key="details" title="Details">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Name</p>
                          <p>{selectedLead.name || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Email</p>
                          <p>{selectedLead.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Phone</p>
                          <p>{selectedLead.phone || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Status</p>
                          <Chip size="sm" color={getStatusColor(selectedLead.status)}>
                            {selectedLead.status}
                          </Chip>
                        </div>
                      </div>
                      
                      {selectedLead.message && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Message</p>
                          <p className="text-sm bg-gray-50 p-3 rounded">{selectedLead.message}</p>
                        </div>
                      )}
                      
                      {selectedLead.interest && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Interest</p>
                          <p>{selectedLead.interest}</p>
                        </div>
                      )}
                    </div>
                  </Tab>
                  
                  <Tab key="followup" title="Follow-up">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Add Follow-up Note</h4>
                        <Textarea
                          placeholder="Add notes about your interaction with this lead..."
                          value={followUpNote}
                          onChange={(e) => setFollowUpNote(e.target.value)}
                          minRows={3}
                        />
                        <Button
                          color="primary"
                          size="sm"
                          className="mt-2"
                          onPress={() => addFollowUp(selectedLead.id)}
                          isDisabled={!followUpNote.trim()}
                        >
                          Add Note
                        </Button>
                      </div>
                      
                      {selectedLead.followUps && selectedLead.followUps.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Follow-up History</h4>
                          <div className="space-y-2">
                            {selectedLead.followUps.map((followUp) => (
                              <div key={followUp.id} className="bg-gray-50 p-3 rounded">
                                <p className="text-sm">{followUp.note}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(followUp.timestamp).toLocaleString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Tab>
                </Tabs>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </PageTransition>
  )
}
