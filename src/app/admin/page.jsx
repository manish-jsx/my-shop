// src/app/admin/page.jsx
'use client'
import { useState } from 'react'
import { Card, CardBody, Button, Progress } from '@nextui-org/react'
import { 
  LineChart, 
  BarChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts'
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign,
  Package,
  AlertTriangle
} from 'lucide-react'

// Sample data - replace with real data
const salesData = [
  { name: 'Jan', sales: 4000, orders: 240 },
  { name: 'Feb', sales: 3000, orders: 198 },
  { name: 'Mar', sales: 2000, orders: 167 },
  // Add more months
]

const revenueData = [
  { name: 'Mon', revenue: 2400 },
  { name: 'Tue', revenue: 1398 },
  { name: 'Wed', revenue: 9800 },
  { name: 'Thu', revenue: 3908 },
  { name: 'Fri', revenue: 4800 },
  { name: 'Sat', revenue: 3800 },
  { name: 'Sun', revenue: 4300 }
]

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState('week')

  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,345',
      change: '+12.3%',
      icon: DollarSign,
      color: 'primary'
    },
    {
      title: 'Orders',
      value: '156',
      change: '+8.2%',
      icon: ShoppingBag,
      color: 'success'
    },
    {
      title: 'Customers',
      value: '2,345',
      change: '+5.7%',
      icon: Users,
      color: 'secondary'
    },
    {
      title: 'Avg. Order Value',
      value: '$79.23',
      change: '-2.1%',
      icon: TrendingUp,
      color: 'warning'
    }
  ]

  const lowStockItems = [
    { id: 1, name: 'Crystal Heart Charm', stock: 3, threshold: 10 },
    { id: 2, name: 'Pearl Necklace', stock: 5, threshold: 15 },
    // Add more items
  ]

  const recentOrders = [
    { 
      id: '#1234',
      customer: 'John Doe',
      date: '2024-01-15',
      status: 'pending',
      amount: 129.99
    },
    // Add more orders
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={timeframe === 'week' ? 'solid' : 'flat'}
            onClick={() => setTimeframe('week')}
          >
            Week
          </Button>
          <Button
            size="sm"
            variant={timeframe === 'month' ? 'solid' : 'flat'}
            onClick={() => setTimeframe('month')}
          >
            Month
          </Button>
          <Button
            size="sm"
            variant={timeframe === 'year' ? 'solid' : 'flat'}
            onClick={() => setTimeframe('year')}
          >
            Year
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white">
            <CardBody className="flex flex-row items-center gap-4">
              <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-success' : 'text-danger'
                }`}>
                  {stat.change} vs last period
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="bg-white">
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#0070F3" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#00CC88" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Revenue Chart */}
        <Card className="bg-white">
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">Revenue Analysis</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#0070F3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <Card className="bg-white">
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Low Stock Alerts</h3>
              <AlertTriangle className="text-warning" />
            </div>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="text-warning">
                      {item.stock} / {item.threshold}
                    </span>
                  </div>
                  <Progress 
                    value={(item.stock / item.threshold) * 100}
                    color="warning"
                    size="sm"
                  />
                </div>
              ))}
            </div>
            <Button
              color="primary"
              variant="light"
              className="mt-4 w-full"
            >
              View All Inventory
            </Button>
          </CardBody>
        </Card>

        {/* Recent Orders */}
        <Card className="bg-white">
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div 
                  key={order.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.amount}</p>
                    <p className={`text-sm ${
                      order.status === 'completed' ? 'text-success' : 'text-warning'
                    }`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              color="primary"
              variant="light"
              className="mt-4 w-full"
            >
              View All Orders
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}