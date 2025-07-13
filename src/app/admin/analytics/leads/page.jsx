// src/app/admin/analytics/leads/page.jsx
'use client'
import { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, Tabs, Tab, Chip, Select, SelectItem, Button } from '@nextui-org/react'
import { 
  TrendingUp, 
  Users, 
  MousePointer, 
  Mail, 
  MessageCircle, 
  Globe,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function LeadAnalyticsPage() {
  const [leads, setLeads] = useState([])
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('all')

  useEffect(() => {
    const storedLeads = JSON.parse(localStorage.getItem('leads') || '[]')
    setLeads(storedLeads)
  }, [])

  const getDateRange = (range) => {
    const now = new Date()
    const past = new Date()
    
    switch (range) {
      case '24h':
        past.setHours(past.getHours() - 24)
        break
      case '7d':
        past.setDate(past.getDate() - 7)
        break
      case '30d':
        past.setDate(past.getDate() - 30)
        break
      case '90d':
        past.setDate(past.getDate() - 90)
        break
      default:
        past.setDate(past.getDate() - 7)
    }
    
    return past
  }

  const filterLeadsByTimeRange = (leads, range) => {
    const cutoffDate = getDateRange(range)
    return leads.filter(lead => {
      const leadDate = new Date(lead.timestamp)
      return leadDate >= cutoffDate
    })
  }

  const filteredLeads = filterLeadsByTimeRange(leads, timeRange)

  const getAnalytics = () => {
    const total = filteredLeads.length
    
    // Source breakdown
    const sourceBreakdown = filteredLeads.reduce((acc, lead) => {
      const source = lead.source || 'unknown'
      acc[source] = (acc[source] || 0) + 1
      return acc
    }, {})

    // Daily trends
    const dailyTrends = filteredLeads.reduce((acc, lead) => {
      const date = lead.timestamp?.split('T')[0]
      if (date) {
        acc[date] = (acc[date] || 0) + 1
      }
      return acc
    }, {})

    // Conversion funnel
    const statusBreakdown = filteredLeads.reduce((acc, lead) => {
      const status = lead.status || 'new'
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {})

    // Lead quality scoring
    const qualityScores = filteredLeads.map(lead => {
      let score = 0
      if (lead.name) score += 20
      if (lead.email) score += 20
      if (lead.phone) score += 15
      if (lead.interest || lead.subject) score += 15
      if (lead.message && lead.message.length > 50) score += 15
      if (lead.budget) score += 15
      return { ...lead, qualityScore: score }
    })

    const averageQuality = qualityScores.length > 0 
      ? qualityScores.reduce((sum, lead) => sum + lead.qualityScore, 0) / qualityScores.length 
      : 0

    // Engagement metrics
    const socialEngagement = filteredLeads.filter(lead => 
      lead.source === 'social_click' || lead.source === 'social_engagement'
    ).length

    const formSubmissions = filteredLeads.filter(lead => 
      lead.source === 'contact_form' || lead.source === 'quote_request'
    ).length

    const newsletterSignups = filteredLeads.filter(lead => 
      lead.source === 'newsletter'
    ).length

    return {
      total,
      sourceBreakdown,
      dailyTrends,
      statusBreakdown,
      averageQuality: averageQuality.toFixed(1),
      socialEngagement,
      formSubmissions,
      newsletterSignups,
      highQualityLeads: qualityScores.filter(lead => lead.qualityScore >= 70).length
    }
  }

  const analytics = getAnalytics()

  const renderSourceAnalysis = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Source Performance */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Lead Sources Performance</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {Object.entries(analytics.sourceBreakdown)
              .sort(([,a], [,b]) => b - a)
              .map(([source, count]) => {
                const percentage = ((count / analytics.total) * 100).toFixed(1)
                const getSourceIcon = (source) => {
                  const icons = {
                    'contact_form': MessageCircle,
                    'newsletter': Mail,
                    'quote_request': BarChart3,
                    'popup_form': MousePointer,
                    'social_click': Globe,
                    'social_engagement': Activity
                  }
                  return icons[source] || Users
                }
                const Icon = getSourceIcon(source)
                
                return (
                  <div key={source} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium capitalize">{source.replace('_', ' ')}</p>
                        <p className="text-sm text-gray-500">{percentage}% of total leads</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">{count}</p>
                      <p className="text-sm text-gray-500">leads</p>
                    </div>
                  </div>
                )
              })}
          </div>
        </CardBody>
      </Card>

      {/* Lead Quality Distribution */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Lead Quality Analysis</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">{analytics.averageQuality}%</p>
              <p className="text-sm text-gray-600">Average Lead Quality Score</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <p className="text-xl font-bold text-blue-600">{analytics.highQualityLeads}</p>
                <p className="text-sm text-gray-600">High Quality Leads</p>
                <p className="text-xs text-gray-500">(Score ≥ 70%)</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <p className="text-xl font-bold text-orange-600">
                  {analytics.total - analytics.highQualityLeads}
                </p>
                <p className="text-sm text-gray-600">Need Follow-up</p>
                <p className="text-xs text-gray-500">(Score &lt; 70%)</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Quality Factors:</p>
              <div className="text-xs text-gray-600 space-y-1">
                <p>• Complete contact info: +40 points</p>
                <p>• Detailed message: +15 points</p>
                <p>• Budget information: +15 points</p>
                <p>• Specific interest: +15 points</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )

  const renderEngagementMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          title: 'Form Submissions',
          value: analytics.formSubmissions,
          icon: MessageCircle,
          color: 'blue',
          description: 'Contact & quote forms'
        },
        {
          title: 'Newsletter Signups',
          value: analytics.newsletterSignups,
          icon: Mail,
          color: 'green',
          description: 'Email subscribers'
        },
        {
          title: 'Social Engagement',
          value: analytics.socialEngagement,
          icon: Globe,
          color: 'purple',
          description: 'Social media clicks'
        }
      ].map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardBody className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-${metric.color}-100`}>
                  <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="font-medium">{metric.title}</p>
                  <p className="text-sm text-gray-500">{metric.description}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>
  )

  const renderConversionFunnel = () => (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Conversion Funnel</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {Object.entries(analytics.statusBreakdown)
            .sort(([,a], [,b]) => b - a)
            .map(([status, count]) => {
              const percentage = ((count / analytics.total) * 100).toFixed(1)
              const getStatusColor = (status) => {
                const colors = {
                  'new': 'primary',
                  'contacted': 'warning',
                  'qualified': 'secondary',
                  'converted': 'success',
                  'closed': 'danger'
                }
                return colors[status] || 'default'
              }
              
              return (
                <div key={status} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Chip size="sm" color={getStatusColor(status)} variant="flat">
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Chip>
                    <span className="font-medium">{count} leads</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">{percentage}%</span>
                  </div>
                </div>
              )
            })}
        </div>
      </CardBody>
    </Card>
  )

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Lead Analytics
            </h1>
            <p className="text-gray-600 mt-1">Comprehensive analysis of lead generation and conversion</p>
          </div>
          
          <div className="flex gap-4">
            <Select
              placeholder="Time Range"
              selectedKeys={[timeRange]}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-32"
              size="sm"
            >
              <SelectItem key="24h">Last 24h</SelectItem>
              <SelectItem key="7d">Last 7 days</SelectItem>
              <SelectItem key="30d">Last 30 days</SelectItem>
              <SelectItem key="90d">Last 90 days</SelectItem>
            </Select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Leads', value: analytics.total, icon: Users, trend: '+12%' },
            { label: 'Avg. Quality', value: `${analytics.averageQuality}%`, icon: TrendingUp, trend: '+5%' },
            { label: 'High Quality', value: analytics.highQualityLeads, icon: BarChart3, trend: '+8%' },
            { label: 'Conversion', value: `${((analytics.statusBreakdown.converted || 0) / analytics.total * 100).toFixed(1)}%`, icon: PieChart, trend: '+3%' }
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
                      <p className="text-xs text-green-600">{metric.trend}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-primary-100">
                      <metric.icon className="w-5 h-5 text-primary-600" />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs color="primary" variant="underlined">
          <Tab key="sources" title="Source Analysis">
            {renderSourceAnalysis()}
          </Tab>
          <Tab key="engagement" title="Engagement">
            {renderEngagementMetrics()}
          </Tab>
          <Tab key="conversion" title="Conversion">
            {renderConversionFunnel()}
          </Tab>
          <Tab key="testing" title="Testing Tools">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Popup Testing Controls</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <p className="text-sm text-gray-600">
                  Use these controls to test popup behavior and reset user interaction data.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    color="warning"
                    variant="flat"
                    onClick={() => {
                      localStorage.removeItem('popupDismissed')
                      localStorage.removeItem('lastPopupDismissed')
                      localStorage.removeItem('popupDismissCount')
                      localStorage.removeItem('userSubscribed')
                      alert('Popup settings reset! Refresh the page to test popup again.')
                    }}
                  >
                    Reset Popup Settings
                  </Button>
                  <Button
                    color="primary"
                    variant="flat"
                    onClick={() => {
                      const settings = {
                        popupDismissed: localStorage.getItem('popupDismissed'),
                        lastPopupDismissed: localStorage.getItem('lastPopupDismissed'),
                        popupDismissCount: localStorage.getItem('popupDismissCount'),
                        userSubscribed: localStorage.getItem('userSubscribed')
                      }
                      alert(`Current Settings:\n${JSON.stringify(settings, null, 2)}`)
                    }}
                  >
                    View Current Settings
                  </Button>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Popup appears after 60 seconds OR 70% scroll OR exit intent</p>
                  <p>• After dismissal: 24 hours wait, then 7 days, then 30 days</p>
                  <p>• After subscription: Never shows again</p>
                  <p>• Exit intent only works on desktop (mouse leaving window)</p>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </PageTransition>
  )
}
