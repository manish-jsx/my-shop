
// src/components/admin/analytics/AnalyticsOverview.jsx
'use client'
import { useState } from 'react'
import {
  Card,
  CardBody,
  Button,
  ButtonGroup,
  Progress
} from '@nextui-org/react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { motion } from 'framer-motion'

// Sample data
const revenueData = [
  { month: 'Jan', revenue: 4500, orders: 150, target: 5000 },
  { month: 'Feb', revenue: 5200, orders: 180, target: 5000 },
  { month: 'Mar', revenue: 4800, orders: 160, target: 5000 },
  { month: 'Apr', revenue: 6000, orders: 200, target: 5000 },
  { month: 'May', revenue: 5500, orders: 190, target: 5000 },
  { month: 'Jun', revenue: 7000, orders: 230, target: 5000 }
]

const categoryData = [
  { name: 'Charms', value: 35 },
  { name: 'Jewelry', value: 45 },
  { name: 'Lights', value: 20 }
]

export default function AnalyticsOverview() {
  const [timeframe, setTimeframe] = useState('month')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Overview</h1>
        <ButtonGroup>
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
        </ButtonGroup>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Revenue', value: '$28,000', growth: '+12.5%' },
          { title: 'Total Orders', value: '1,110', growth: '+8.2%' },
          { title: 'Average Order', value: '$145', growth: '+3.1%' },
          { title: 'Conversion Rate', value: '3.2%', growth: '+0.8%' }
        ].map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardBody className="p-4">
                <p className="text-sm text-gray-500">{kpi.title}</p>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className="text-sm text-success">{kpi.growth} vs last period</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#0070F3" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#FF0080" 
                    strokeDasharray="5 5" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#0070F3"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Goals Progress */}
      <Card>
        <CardBody className="p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Goals</h3>
          <div className="space-y-6">
            {[
              { label: 'Revenue Target', progress: 85 },
              { label: 'Orders Target', progress: 92 },
              { label: 'Customer Satisfaction', progress: 78 }
            ].map((goal) => (
              <div key={goal.label}>
                <div className="flex justify-between mb-2">
                  <span>{goal.label}</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress 
                  value={goal.progress}
                  color="primary"
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
