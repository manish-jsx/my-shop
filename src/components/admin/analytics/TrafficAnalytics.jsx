
// src/components/admin/analytics/TrafficAnalytics.jsx
'use client'
import { useState } from 'react'
import {
  Card,
  CardBody,
  Button,
  ButtonGroup,
  Progress,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import {
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

// Sample data
const trafficData = [
  {
    date: '2024-01-01',
    visitors: 1200,
    pageViews: 3600,
    bounceRate: 45,
    mobile: 720,
    desktop: 360,
    tablet: 120
  },
  {
    date: '2024-01-02',
    visitors: 1300,
    pageViews: 3900,
    bounceRate: 42,
    mobile: 780,
    desktop: 390,
    tablet: 130
  },
  // Add more dates...
]

const sourceData = [
  { name: 'Direct', value: 35, color: '#0070F3' },
  { name: 'Social', value: 25, color: '#FF0080' },
  { name: 'Search', value: 20, color: '#7928CA' },
  { name: 'Referral', value: 15, color: '#00B8D9' },
  { name: 'Other', value: 5, color: '#79FFE1' }
]

const topPages = [
  {
    path: '/',
    views: 12500,
    change: '+15.2%',
    bounceRate: 42
  },
  {
    path: '/products',
    views: 8300,
    change: '+8.7%',
    bounceRate: 38
  },
  // Add more pages...
]

export default function TrafficAnalytics() {
  const [timeframe, setTimeframe] = useState('week')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Traffic Analytics</h1>
        <ButtonGroup>
          <Button
            size="sm"
            variant={timeframe === 'day' ? 'solid' : 'flat'}
            onClick={() => setTimeframe('day')}
          >
            Day
          </Button>
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
        </ButtonGroup>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: 'Total Visitors',
            value: '24.5K',
            change: '+12.3%',
            icon: Globe,
            color: 'primary'
          },
          {
            title: 'Page Views',
            value: '78.2K',
            change: '+8.1%',
            icon: Monitor,
            color: 'success'
          },
          {
            title: 'Bounce Rate',
            value: '42.5%',
            change: '-2.4%',
            icon: ArrowDown,
            color: 'danger'
          },
          {
            title: 'Avg. Session',
            value: '3m 45s',
            change: '+0.8%',
            icon: ArrowUp,
            color: 'warning'
          }
        ].map((stat) => (
          <Card key={stat.title}>
            <CardBody className="flex flex-row items-center gap-4">
              <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
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

      {/* Traffic Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Chart */}
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">Visitor Traffic</h3>
            <div className="h-80">
              <ResponsiveContainer>
                <AreaChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="mobile"
                    stackId="1"
                    stroke="#0070F3"
                    fill="#0070F3"
                  />
                  <Area
                    type="monotone"
                    dataKey="desktop"
                    stackId="1"
                    stroke="#7928CA"
                    fill="#7928CA"
                  />
                  <Area
                    type="monotone"
                    dataKey="tablet"
                    stackId="1"
                    stroke="#FF0080"
                    fill="#FF0080"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
            <div className="h-80">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
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

      {/* Top Pages */}
      <Card>
        <CardBody>
          <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
          <Table>
            <TableHeader>
              <TableColumn>PAGE</TableColumn>
              <TableColumn>VIEWS</TableColumn>
              <TableColumn>CHANGE</TableColumn>
              <TableColumn>BOUNCE RATE</TableColumn>
            </TableHeader>
            <TableBody>
              {topPages.map((page) => (
                <TableRow key={page.path}>
                  <TableCell>{page.path}</TableCell>
                  <TableCell>{page.views.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={page.change.startsWith('+') ? 'text-success' : 'text-danger'}>
                      {page.change}
                    </span>
                  </TableCell>
                  <TableCell>{page.bounceRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  )
}
