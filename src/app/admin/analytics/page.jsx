// src/app/admin/analytics/page.jsx
'use client'
import { useState } from 'react'
import { Card, CardBody, CardHeader, Button, Tabs, Tab, Chip, Select, SelectItem } from '@nextui-org/react'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'

import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Gem, 
  Award, 
  Calendar,
  Download
} from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('month')
  const [selectedTab, setSelectedTab] = useState('overview')

  // Enhanced analytics data for gemstone business
  const gemstoneRevenueData = [
    { month: 'Jan', ruby: 45000, sapphire: 38000, emerald: 22000, diamond: 67000 },
    { month: 'Feb', ruby: 52000, sapphire: 44000, emerald: 28000, diamond: 78000 },
    { month: 'Mar', ruby: 38000, sapphire: 35000, emerald: 25000, diamond: 65000 },
    { month: 'Apr', ruby: 67000, sapphire: 58000, emerald: 35000, diamond: 89000 },
    { month: 'May', ruby: 74000, sapphire: 62000, emerald: 42000, diamond: 95000 },
    { month: 'Jun', ruby: 89000, sapphire: 71000, emerald: 48000, diamond: 112000 }
  ]

  const certificationData = [
    { name: 'GIA Certified', value: 45, color: '#8b5cf6' },
    { name: 'AGS Certified', value: 23, color: '#3b82f6' },
    { name: 'Gübelin Certified', value: 18, color: '#10b981' },
    { name: 'SSEF Certified', value: 14, color: '#f59e0b' }
  ]

  const customerSegmentData = [
    { segment: 'VIP ($50K+)', customers: 23, revenue: 1150000, avgOrder: 50000 },
    { segment: 'Premium ($10K-$50K)', customers: 89, revenue: 2670000, avgOrder: 30000 },
    { segment: 'Standard ($1K-$10K)', customers: 342, revenue: 1710000, avgOrder: 5000 },
    { segment: 'Regular (<$1K)', customers: 1256, revenue: 376800, avgOrder: 300 }
  ]

  const topGemstones = [
    { name: 'Kashmir Sapphire', sales: 234000, growth: 18.5, category: 'Rare' },
    { name: 'Pigeon Blood Ruby', sales: 198000, growth: 23.2, category: 'Rare' },
    { name: 'Colombian Emerald', sales: 145000, growth: 15.8, category: 'Premium' },
    { name: 'Pink Diamond', sales: 567000, growth: 45.6, category: 'Ultra Rare' },
    { name: 'Padparadscha Sapphire', sales: 123000, growth: 12.3, category: 'Rare' }
  ]

  const analyticsStats = [
    {
      title: 'Total Revenue',
      value: '$2.4M',
      change: '+18.5%',
      icon: DollarSign,
      description: 'vs last period'
    },
    {
      title: 'Avg Order Value',
      value: '$12,340',
      change: '+12.3%',
      icon: TrendingUp,
      description: 'luxury segment boost'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      icon: Users,
      description: 'high-value customers'
    },
    {
      title: 'Certification Rate',
      value: '94%',
      change: '+2.1%',
      icon: Award,
      description: 'authenticity guarantee'
    }
  ]

  const timeframeOptions = [
    { key: 'week', label: 'Last Week' },
    { key: 'month', label: 'Last Month' },
    { key: 'quarter', label: 'Last Quarter' },
    { key: 'year', label: 'Last Year' }
  ]

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart className="w-6 h-6 text-purple-600" />
                Analytics & Insights
              </h1>
              <p className="text-gray-600 mt-1">Comprehensive business intelligence for luxury gemstone sales</p>
            </div>
            <div className="flex gap-2">
              <Select
                selectedKeys={[timeframe]}
                onSelectionChange={(keys) => setTimeframe(Array.from(keys)[0])}
                className="w-40"
                size="sm"
              >
                {timeframeOptions.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
              <Button
                startContent={<Download className="w-4 h-4" />}
                color="primary"
                variant="flat"
              >
                Export Report
              </Button>
            </div>
          </div>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsStats.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-md">
              <CardBody className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Chip 
                        size="sm" 
                        color={stat.change.startsWith('+') ? 'success' : 'danger'}
                        variant="flat"
                      >
                        {stat.change}
                      </Chip>
                      <span className="text-xs text-gray-500">{stat.description}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-100">
                    <stat.icon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Analytics Tabs */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-0">
            <Tabs
              selectedKey={selectedTab}
              onSelectionChange={setSelectedTab}
              variant="underlined"
              color="primary"
            >
              <Tab key="overview" title="Overview" />
              <Tab key="gemstones" title="Gemstone Performance" />
              <Tab key="customers" title="Customer Segments" />
              <Tab key="certificates" title="Certifications" />
            </Tabs>
          </CardHeader>
          <CardBody>
            {selectedTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Trends */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Revenue by Gemstone Type</h3>
                  </CardHeader>
                  <CardBody>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={gemstoneRevenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="diamond" stackId="1" stroke="#6366f1" fill="#6366f1" />
                        <Area type="monotone" dataKey="ruby" stackId="1" stroke="#ef4444" fill="#ef4444" />
                        <Area type="monotone" dataKey="sapphire" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                        <Area type="monotone" dataKey="emerald" stackId="1" stroke="#10b981" fill="#10b981" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardBody>
                </Card>

                {/* Top Performers */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Top Performing Gemstones</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      {topGemstones.map((gem, index) => (
                        <div key={gem.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full">
                              <span className="text-sm font-bold text-purple-600">#{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{gem.name}</p>
                              <Chip size="sm" color="secondary" variant="flat">
                                {gem.category}
                              </Chip>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${gem.sales.toLocaleString()}</p>
                            <p className="text-sm text-green-600">+{gem.growth}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}

            {selectedTab === 'customers' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Segments */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Customer Segments Performance</h3>
                  </CardHeader>
                  <CardBody>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={customerSegmentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="segment" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue ($)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardBody>
                </Card>

                {/* Segment Details */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Segment Details</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      {customerSegmentData.map((segment) => (
                        <div key={segment.segment} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{segment.segment}</h4>
                            <Chip size="sm" color="primary" variant="flat">
                              {segment.customers} customers
                            </Chip>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Total Revenue:</span>
                              <p className="font-semibold">${segment.revenue.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Avg Order:</span>
                              <p className="font-semibold">${segment.avgOrder.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}

            {selectedTab === 'certificates' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Certification Distribution */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Certification Distribution</h3>
                  </CardHeader>
                  <CardBody>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={certificationData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {certificationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardBody>
                </Card>

                {/* Certification Insights */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Certification Insights</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold text-green-900">Premium Certificates</h4>
                        </div>
                        <p className="text-sm text-green-700">
                          94% of our gemstones carry prestigious certifications from leading labs
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 border rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">GIA</p>
                          <p className="text-sm text-gray-600">Leading authority</p>
                        </div>
                        <div className="text-center p-3 border rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">AGS</p>
                          <p className="text-sm text-gray-600">Diamond specialists</p>
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold text-yellow-900 mb-2">Recommendation</h4>
                        <p className="text-sm text-yellow-700">
                          Consider expanding Gübelin certified colored stones for increased premium positioning
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </PageTransition>
  )
}
