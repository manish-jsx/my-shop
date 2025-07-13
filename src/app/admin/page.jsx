// src/app/admin/page.jsx
'use client'
import { useState } from 'react'
import { Card, CardBody, CardHeader, Button, Chip, Avatar } from '@nextui-org/react'
import { 
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
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign,
  Gem,
  Award,
  Shield
} from 'lucide-react'


// Enhanced data for gemstone business
const salesData = [
  { name: 'Jan', sales: 45000 },
  { name: 'Feb', sales: 52000 },
  { name: 'Mar', sales: 38000 },
  { name: 'Apr', sales: 67000 },
  { name: 'May', sales: 74000 },
  { name: 'Jun', sales: 89000 },
]

const gemstonePerformance = [
  { name: 'Ruby', value: 28, color: '#ef4444' },
  { name: 'Sapphire', value: 22, color: '#3b82f6' },
  { name: 'Emerald', value: 18, color: '#10b981' },
  { name: 'Diamond', value: 15, color: '#f3f4f6' },
  { name: 'Others', value: 17, color: '#8b5cf6' },
]

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState('month')

  const stats = [
    {
      title: 'Total Revenue',
      value: '$456,789',
      change: '+18.5%',
      icon: DollarSign,
      description: 'vs last month'
    },
    {
      title: 'Orders',
      value: '234',
      change: '+12.3%',
      icon: ShoppingBag,
      description: 'pending: 8 orders'
    },
    {
      title: 'Customers',
      value: '1,456',
      change: '+8.7%',
      icon: Users,
      description: 'new: 45 this month'
    },
    {
      title: 'Avg. Order Value',
      value: '$1,234',
      change: '+5.2%',
      icon: TrendingUp,
      description: 'luxury segment high'
    }
  ]

  const certifiedGems = [
    { name: 'GIA Certified Ruby', stock: 12, value: '$45,000', status: 'high' },
    { name: 'Ceylon Sapphire', stock: 8, value: '$32,000', status: 'medium' },
    { name: 'Colombian Emerald', stock: 3, value: '$67,000', status: 'low' },
    { name: 'Vintage Diamond', stock: 15, value: '$89,000', status: 'high' },
  ]

  const recentHighValueOrders = [
    { 
      id: '#GEM-2025-001',
      customer: 'Sarah Johnson',
      item: '5ct Kashmir Sapphire Ring',
      status: 'pending_verification',
      amount: 45999.99,
      priority: 'high'
    },
    { 
      id: '#GEM-2025-002',
      customer: 'Michael Chen',
      item: 'Diamond Tennis Bracelet',
      status: 'processing',
      amount: 12999.99,
      priority: 'medium'
    },
    { 
      id: '#GEM-2025-003',
      customer: 'Emma Rodriguez',
      item: 'Healing Crystal Set',
      status: 'shipped',
      amount: 299.99,
      priority: 'low'
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_verification': return 'warning'
      case 'processing': return 'primary'
      case 'shipped': return 'success'
      default: return 'default'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger'
      case 'medium': return 'warning'
      case 'low': return 'success'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Gem className="w-8 h-8 text-purple-600" />
              SHUKRA Gems Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Luxury gemstone and jewelry management</p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={timeframe === 'week' ? 'solid' : 'flat'}
              onPress={() => setTimeframe('week')}
              color="primary"
            >
              Week
            </Button>
            <Button
              size="sm"
              variant={timeframe === 'month' ? 'solid' : 'flat'}
              onPress={() => setTimeframe('month')}
              color="primary"
            >
              Month
            </Button>
            <Button
              size="sm"
              variant={timeframe === 'year' ? 'solid' : 'flat'}
              onPress={() => setTimeframe('year')}
              color="primary"
            >
              Year
            </Button>
          </div>
        </div>
        
       
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-lg">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-lg font-semibold">Revenue Trends</h3>
              <Chip size="sm" color="success" variant="flat">
                +18.5% growth
              </Chip>
            </div>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6' }}
                  name="Sales ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Gemstone Performance */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-0">
            <h3 className="text-lg font-semibold">Gemstone Performance</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gemstonePerformance}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {gemstonePerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Bottom Grid - Orders and Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High-Value Orders */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-lg font-semibold">High-Value Orders</h3>
              <Button size="sm" variant="flat" color="primary">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {recentHighValueOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar 
                      name={order.customer.split(' ').map(n => n[0]).join('')}
                      size="sm"
                      className="bg-purple-100 text-purple-700"
                    />
                    <div>
                      <p className="font-medium text-sm">{order.customer}</p>
                      <p className="text-xs text-gray-600">{order.item}</p>
                      <p className="text-xs text-gray-500">{order.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">${order.amount.toLocaleString()}</p>
                    <div className="flex gap-1 mt-1">
                      <Chip 
                        size="tiny" 
                        color={getStatusColor(order.status)}
                        variant="flat"
                      >
                        {order.status.replace('_', ' ')}
                      </Chip>
                      <Chip 
                        size="tiny" 
                        color={getPriorityColor(order.priority)}
                        variant="dot"
                      >
                        {order.priority}
                      </Chip>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Certified Gems Inventory */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-lg font-semibold">Certified Gems Inventory</h3>
              <Button size="sm" variant="flat" color="primary">
                Manage Stock
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {certifiedGems.map((gem, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Award className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{gem.name}</p>
                      <p className="text-xs text-gray-600">Total Value: {gem.value}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{gem.stock} units</p>
                    <Chip 
                      size="tiny" 
                      color={gem.status === 'high' ? 'success' : gem.status === 'medium' ? 'warning' : 'danger'}
                      variant="flat"
                    >
                      {gem.status} stock
                    </Chip>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Add New Gemstone</h4>
                <p className="text-sm opacity-90 mt-1">Add certified gemstone to inventory</p>
              </div>
              <Button 
                size="sm" 
                variant="flat" 
                className="bg-white/20 text-white hover:bg-white/30"
              >
                Add
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Process Orders</h4>
                <p className="text-sm opacity-90 mt-1">8 orders pending verification</p>
              </div>
              <Button 
                size="sm" 
                variant="flat" 
                className="bg-white/20 text-white hover:bg-white/30"
              >
                Process
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Generate Reports</h4>
                <p className="text-sm opacity-90 mt-1">Monthly certification reports</p>
              </div>
              <Button 
                size="sm" 
                variant="flat" 
                className="bg-white/20 text-white hover:bg-white/30"
              >
                Generate
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Additional Business Intelligence Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Certificate Expiry Tracking */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-yellow-600" />
                Certificate Management
              </h3>
              <Button size="sm" variant="flat" color="warning">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Expiring Soon</p>
                  <p className="text-xs text-gray-600">8 certificates expire within 30 days</p>
                </div>
                <Chip size="sm" color="warning" variant="flat">Urgent</Chip>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Recently Verified</p>
                  <p className="text-xs text-gray-600">12 new certificates this week</p>
                </div>
                <Chip size="sm" color="success" variant="flat">Updated</Chip>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Pending Authentication</p>
                  <p className="text-xs text-gray-600">5 items awaiting lab verification</p>
                </div>
                <Chip size="sm" color="primary" variant="flat">In Progress</Chip>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Market Intelligence */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Market Intelligence
              </h3>
              <Button size="sm" variant="flat" color="success">
                Full Report
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Ruby Market Trend</span>
                <span className="text-green-600 font-semibold">+15.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Sapphire Demand</span>
                <span className="text-blue-600 font-semibold">+23.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Emerald Rarity Index</span>
                <span className="text-purple-600 font-semibold">High</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Diamond Price Stability</span>
                <span className="text-yellow-600 font-semibold">Stable</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg mt-3">
                <p className="text-xs text-gray-600">
                  <strong>Market Insight:</strong> Colored gemstones showing strong growth. 
                  Consider increasing Kashmir sapphire and Padparadscha inventory.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Enhanced Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Add Certified Gem</h4>
                <p className="text-sm opacity-90 mt-1">Register new authenticated gemstone</p>
              </div>
              <Button 
                size="sm" 
                variant="flat" 
                className="bg-white/20 text-white hover:bg-white/30"
              >
                Add
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Verify Orders</h4>
                <p className="text-sm opacity-90 mt-1">8 high-value orders pending</p>
              </div>
              <Button 
                size="sm" 
                variant="flat" 
                className="bg-white/20 text-white hover:bg-white/30"
              >
                Process
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">VIP Management</h4>
                <p className="text-sm opacity-90 mt-1">Manage premium customers</p>
              </div>
              <Button 
                size="sm" 
                variant="flat" 
                className="bg-white/20 text-white hover:bg-white/30"
              >
                Manage
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Monthly Reports</h4>
                <p className="text-sm opacity-90 mt-1">Generate certification reports</p>
              </div>
              <Button 
                size="sm" 
                variant="flat" 
                className="bg-white/20 text-white hover:bg-white/30"
              >
                Generate
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
