// src/app/admin/reports/sales/page.jsx
'use client'
import { useState } from 'react'
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Select, 
  SelectItem,
  Button,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip
} from '@nextui-org/react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { Download, Calendar, TrendingUp, DollarSign, ShoppingBag, Users } from 'lucide-react'

export default function SalesReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const salesData = [
    { month: 'Jan', revenue: 145000, orders: 89, avgOrder: 1629 },
    { month: 'Feb', revenue: 178000, orders: 112, avgOrder: 1589 },
    { month: 'Mar', revenue: 203000, orders: 134, avgOrder: 1515 },
    { month: 'Apr', revenue: 189000, orders: 125, avgOrder: 1512 },
    { month: 'May', revenue: 235000, orders: 156, avgOrder: 1506 },
    { month: 'Jun', revenue: 267000, orders: 178, avgOrder: 1500 }
  ]

  const categoryBreakdown = [
    { name: 'Precious Stones', value: 45, revenue: 450000, color: '#8B5CF6' },
    { name: 'Rare Gemstones', value: 25, revenue: 250000, color: '#06B6D4' },
    { name: 'Healing Crystals', value: 15, revenue: 150000, color: '#10B981' },
    { name: 'Semi-Precious', value: 10, revenue: 100000, color: '#F59E0B' },
    { name: 'Birthstones', value: 5, revenue: 50000, color: '#EF4444' }
  ]

  const topProducts = [
    { name: 'Royal Blue Sapphire 2.5ct', sales: 23, revenue: 115000, category: 'Precious Stones' },
    { name: 'Emerald Cut Diamond 1.8ct', sales: 18, revenue: 108000, category: 'Precious Stones' },
    { name: 'Burmese Ruby 2.1ct', sales: 15, revenue: 95000, category: 'Precious Stones' },
    { name: 'Colombian Emerald 1.9ct', sales: 12, revenue: 78000, category: 'Precious Stones' },
    { name: 'Pink Tourmaline 3.2ct', sales: 34, revenue: 68000, category: 'Semi-Precious' }
  ]

  const salesMetrics = [
    { title: 'Total Revenue', value: '$1,217,000', change: '+18%', icon: DollarSign, color: 'text-green-500' },
    { title: 'Total Orders', value: '794', change: '+12%', icon: ShoppingBag, color: 'text-blue-500' },
    { title: 'Average Order Value', value: '$1,532', change: '+3%', icon: TrendingUp, color: 'text-purple-500' },
    { title: 'Unique Customers', value: '456', change: '+25%', icon: Users, color: 'text-orange-500' }
  ]

  const regionalSales = [
    { region: 'North America', revenue: 485000, orders: 298, percentage: 40 },
    { region: 'Europe', revenue: 365000, orders: 234, percentage: 30 },
    { region: 'Asia Pacific', revenue: 243000, orders: 156, percentage: 20 },
    { region: 'Middle East', revenue: 124000, orders: 106, percentage: 10 }
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Sales Reports</h1>
          <p className="text-gray-600">Comprehensive sales analytics and performance metrics</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPeriod} onChange={setSelectedPeriod} className="w-40">
            <SelectItem key="week" value="week">Last Week</SelectItem>
            <SelectItem key="month" value="month">Last Month</SelectItem>
            <SelectItem key="quarter" value="quarter">Last Quarter</SelectItem>
            <SelectItem key="year" value="year">Last Year</SelectItem>
          </Select>
          <Button color="primary" startContent={<Download className="w-4 h-4" />}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {salesMetrics.map((metric, index) => (
          <Card key={index}>
            <CardBody className="text-center">
              <metric.icon className={`w-8 h-8 mx-auto mb-2 ${metric.color}`} />
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.title}</div>
              <div className="text-xs text-green-500 mt-1">{metric.change} vs last period</div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Tabs aria-label="Sales Reports" className="mb-6">
        <Tab key="overview" title="Overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Revenue Trend</h3>
              </CardHeader>
              <CardBody>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                      <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Sales by Category</h3>
              </CardHeader>
              <CardBody>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {categoryBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {categoryBreakdown.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <span className="text-sm font-medium">${category.revenue.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Top Performing Products</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {topProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-600">{product.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${product.revenue.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{product.sales} sales</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Regional Performance</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {regionalSales.map((region) => (
                    <div key={region.region}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{region.region}</span>
                        <span className="text-sm text-gray-600">${region.revenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${region.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{region.orders} orders</div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="detailed" title="Detailed Analysis">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Monthly Sales Breakdown</h3>
            </CardHeader>
            <CardBody>
              <Table aria-label="Monthly sales table">
                <TableHeader>
                  <TableColumn>MONTH</TableColumn>
                  <TableColumn>REVENUE</TableColumn>
                  <TableColumn>ORDERS</TableColumn>
                  <TableColumn>AVG ORDER VALUE</TableColumn>
                  <TableColumn>GROWTH</TableColumn>
                </TableHeader>
                <TableBody>
                  {salesData.map((data, index) => (
                    <TableRow key={data.month}>
                      <TableCell className="font-medium">{data.month} 2024</TableCell>
                      <TableCell>${data.revenue.toLocaleString()}</TableCell>
                      <TableCell>{data.orders}</TableCell>
                      <TableCell>${data.avgOrder}</TableCell>
                      <TableCell>
                        <Chip 
                          color={index > 0 && data.revenue > salesData[index-1].revenue ? "success" : "default"} 
                          size="sm" 
                          variant="flat"
                        >
                          {index > 0 ? 
                            `${((data.revenue - salesData[index-1].revenue) / salesData[index-1].revenue * 100).toFixed(1)}%` : 
                            'N/A'
                          }
                        </Chip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="forecasting" title="Forecasting">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Sales Forecast - Next 6 Months</h3>
            </CardHeader>
            <CardBody>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { month: 'Jul', actual: 267000, forecast: 285000 },
                    { month: 'Aug', actual: null, forecast: 295000 },
                    { month: 'Sep', actual: null, forecast: 310000 },
                    { month: 'Oct', actual: null, forecast: 325000 },
                    { month: 'Nov', actual: null, forecast: 340000 },
                    { month: 'Dec', actual: null, forecast: 380000 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, '']} />
                    <Bar dataKey="actual" fill="#8B5CF6" name="Actual" />
                    <Bar dataKey="forecast" fill="#06B6D4" name="Forecast" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Forecast Insights</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Expected 42% growth during holiday season (Nov-Dec)</li>
                  <li>• Summer months show steady 6-8% month-over-month growth</li>
                  <li>• VIP customer segment expected to drive 35% of Q4 revenue</li>
                  <li>• New product launches could boost forecast by additional 15%</li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}
