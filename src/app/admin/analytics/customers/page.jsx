// src/app/admin/analytics/customers/page.jsx
'use client'
import { useState } from 'react'
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Tabs, 
  Tab, 
  Select, 
  SelectItem,
  Progress,
  Chip
} from '@nextui-org/react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { Users, Crown, TrendingUp, ShoppingBag, Star, Heart } from 'lucide-react'

export default function CustomerInsightsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const customerSegments = [
    { name: 'VIP Collectors', value: 15, color: '#8B5CF6', count: 45 },
    { name: 'Regular Buyers', value: 35, color: '#06B6D4', count: 124 },
    { name: 'Occasional Shoppers', value: 30, color: '#10B981', count: 89 },
    { name: 'New Customers', value: 20, color: '#F59E0B', count: 67 }
  ]

  const customerLifetime = [
    { month: 'Jan', newCustomers: 23, returningCustomers: 45, vipCustomers: 12 },
    { month: 'Feb', newCustomers: 31, returningCustomers: 52, vipCustomers: 14 },
    { month: 'Mar', newCustomers: 28, returningCustomers: 48, vipCustomers: 16 },
    { month: 'Apr', newCustomers: 34, returningCustomers: 61, vipCustomers: 18 },
    { month: 'May', newCustomers: 42, returningCustomers: 67, vipCustomers: 21 },
    { month: 'Jun', newCustomers: 38, returningCustomers: 73, vipCustomers: 23 }
  ]

  const customerBehavior = [
    { category: 'Precious Stones', purchases: 145, avgValue: 2500 },
    { category: 'Healing Crystals', purchases: 89, avgValue: 450 },
    { category: 'Rare Gemstones', purchases: 34, avgValue: 8500 },
    { category: 'Birthstones', purchases: 178, avgValue: 850 },
    { category: 'Semi-Precious', purchases: 156, avgValue: 680 }
  ]

  const topCustomers = [
    { name: 'Sarah Chen', totalSpent: 45000, orders: 23, tier: 'Diamond VIP', joinDate: '2022-03-15' },
    { name: 'Michael Rodriguez', totalSpent: 38500, orders: 19, tier: 'Platinum VIP', joinDate: '2021-11-08' },
    { name: 'Emma Thompson', totalSpent: 29800, orders: 15, tier: 'Gold VIP', joinDate: '2023-01-22' },
    { name: 'David Kim', totalSpent: 25600, orders: 12, tier: 'Gold VIP', joinDate: '2022-07-10' },
    { name: 'Lisa Johnson', totalSpent: 21200, orders: 18, tier: 'Silver VIP', joinDate: '2022-09-03' }
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Customer Insights</h1>
          <p className="text-gray-600">Understand your customer behavior and preferences</p>
        </div>
        <Select
          value={selectedPeriod}
          onChange={setSelectedPeriod}
          className="w-48"
          label="Time Period"
        >
          <SelectItem key="week" value="week">Last Week</SelectItem>
          <SelectItem key="month" value="month">Last Month</SelectItem>
          <SelectItem key="quarter" value="quarter">Last Quarter</SelectItem>
          <SelectItem key="year" value="year">Last Year</SelectItem>
        </Select>
      </div>

      <Tabs aria-label="Customer Analytics" className="mb-6">
        <Tab key="overview" title="Overview">
          {/* Customer Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardBody className="text-center">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">325</div>
                <div className="text-sm text-gray-600">Total Customers</div>
                <div className="text-xs text-green-500 mt-1">+12% this month</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <Crown className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">67</div>
                <div className="text-sm text-gray-600">VIP Members</div>
                <div className="text-xs text-green-500 mt-1">+8% this month</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">$3,250</div>
                <div className="text-sm text-gray-600">Avg. Lifetime Value</div>
                <div className="text-xs text-green-500 mt-1">+15% this month</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <ShoppingBag className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">4.2</div>
                <div className="text-sm text-gray-600">Avg. Orders/Customer</div>
                <div className="text-xs text-green-500 mt-1">+5% this month</div>
              </CardBody>
            </Card>
          </div>

          {/* Customer Segments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Customer Segments</h3>
              </CardHeader>
              <CardBody>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerSegments}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {customerSegments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {customerSegments.map((segment) => (
                    <div key={segment.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: segment.color }}
                        />
                        <span className="text-sm">{segment.name}</span>
                      </div>
                      <span className="text-sm font-medium">{segment.count} customers</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Customer Acquisition</h3>
              </CardHeader>
              <CardBody>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={customerLifetime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="newCustomers" stroke="#06B6D4" strokeWidth={2} />
                      <Line type="monotone" dataKey="returningCustomers" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="vipCustomers" stroke="#8B5CF6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="behavior" title="Behavior">
          {/* Purchase Behavior */}
          <Card className="mb-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Purchase Behavior by Category</h3>
            </CardHeader>
            <CardBody>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerBehavior}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="purchases" fill="#06B6D4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>

          {/* Customer Preferences */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Preferred Categories</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {customerBehavior.map((item, index) => (
                    <div key={item.category}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm text-gray-600">{item.purchases} purchases</span>
                      </div>
                      <Progress 
                        value={(item.purchases / 178) * 100} 
                        color="primary" 
                        className="max-w-full"
                      />
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Average Order Values</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {customerBehavior.map((item, index) => (
                    <div key={item.category} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.category}</span>
                      <Chip color="primary" variant="flat">
                        ${item.avgValue.toLocaleString()}
                      </Chip>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="top-customers" title="Top Customers">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Highest Value Customers</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div key={customer.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-600">Member since {customer.joinDate}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">${customer.totalSpent.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{customer.orders} orders</div>
                      <Chip 
                        color={customer.tier.includes('Diamond') ? 'secondary' : 
                               customer.tier.includes('Platinum') ? 'primary' : 
                               customer.tier.includes('Gold') ? 'warning' : 'default'} 
                        size="sm" 
                        variant="flat"
                      >
                        {customer.tier}
                      </Chip>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}
