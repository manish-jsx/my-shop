// src/app/admin/reports/inventory/page.jsx
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
  Chip,
  Progress,
  Input
} from '@nextui-org/react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Download, Search, AlertTriangle, Package, TrendingDown, Eye } from 'lucide-react'

export default function InventoryReportsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const inventoryOverview = [
    { category: 'Precious Stones', totalItems: 145, lowStock: 8, outOfStock: 2, value: 850000 },
    { category: 'Semi-Precious', totalItems: 234, lowStock: 12, outOfStock: 3, value: 420000 },
    { category: 'Healing Crystals', totalItems: 189, lowStock: 15, outOfStock: 5, value: 285000 },
    { category: 'Rare Gemstones', totalItems: 67, lowStock: 3, outOfStock: 1, value: 1200000 },
    { category: 'Birthstones', totalItems: 156, lowStock: 9, outOfStock: 2, value: 320000 }
  ]

  const stockAlerts = [
    { name: 'Blue Sapphire 2ct', sku: 'SAP-2CT-001', current: 2, threshold: 5, category: 'Precious Stones', value: 8500 },
    { name: 'Rose Quartz Tumbled', sku: 'RQ-TUM-002', current: 0, threshold: 10, category: 'Healing Crystals', value: 25 },
    { name: 'Emerald Cut Diamond 1.5ct', sku: 'DIA-EC-003', current: 1, threshold: 3, category: 'Precious Stones', value: 12000 },
    { name: 'Amethyst Cluster Large', sku: 'AME-CL-004', current: 3, threshold: 8, category: 'Healing Crystals', value: 145 },
    { name: 'Padparadscha Sapphire', sku: 'SAP-PAD-005', current: 0, threshold: 2, category: 'Rare Gemstones', value: 25000 }
  ]

  const topMovers = [
    { name: 'Ruby 1.8ct Oval', sales: 23, revenue: 115000, velocity: 'fast', stock: 12 },
    { name: 'Emerald 2.1ct', sales: 18, revenue: 108000, velocity: 'fast', stock: 8 },
    { name: 'Clear Quartz Points', sales: 89, revenue: 2670, velocity: 'medium', stock: 145 },
    { name: 'Tanzanite 1.2ct', sales: 5, revenue: 35000, velocity: 'slow', stock: 23 },
    { name: 'Moonstone Cabochon', sales: 34, revenue: 6800, velocity: 'medium', stock: 67 }
  ]

  const stockDistribution = [
    { name: 'In Stock', value: 65, color: '#10B981' },
    { name: 'Low Stock', value: 25, color: '#F59E0B' },
    { name: 'Out of Stock', value: 10, color: '#EF4444' }
  ]

  const turnoverAnalysis = [
    { month: 'Jan', turnover: 2.3, inflow: 45, outflow: 67 },
    { month: 'Feb', turnover: 2.8, inflow: 52, outflow: 78 },
    { month: 'Mar', turnover: 3.1, inflow: 48, outflow: 89 },
    { month: 'Apr', turnover: 2.9, inflow: 56, outflow: 82 },
    { month: 'May', turnover: 3.4, inflow: 62, outflow: 95 },
    { month: 'Jun', turnover: 3.2, inflow: 58, outflow: 91 }
  ]

  const getVelocityColor = (velocity) => {
    switch (velocity) {
      case 'fast': return 'success'
      case 'medium': return 'warning'
      case 'slow': return 'danger'
      default: return 'default'
    }
  }

  const getStockStatus = (current, threshold) => {
    if (current === 0) return { status: 'Out of Stock', color: 'danger' }
    if (current <= threshold) return { status: 'Low Stock', color: 'warning' }
    return { status: 'In Stock', color: 'success' }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Inventory Reports</h1>
          <p className="text-gray-600">Monitor stock levels, turnover, and inventory performance</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedCategory} onChange={setSelectedCategory} className="w-48">
            <SelectItem key="all" value="all">All Categories</SelectItem>
            <SelectItem key="precious" value="precious">Precious Stones</SelectItem>
            <SelectItem key="semi-precious" value="semi-precious">Semi-Precious</SelectItem>
            <SelectItem key="healing" value="healing">Healing Crystals</SelectItem>
            <SelectItem key="rare" value="rare">Rare Gemstones</SelectItem>
          </Select>
          <Button color="primary" startContent={<Download className="w-4 h-4" />}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Inventory Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardBody className="text-center">
            <Package className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">791</div>
            <div className="text-sm text-gray-600">Total SKUs</div>
            <div className="text-xs text-green-500 mt-1">+12 this month</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">47</div>
            <div className="text-sm text-gray-600">Low Stock Items</div>
            <div className="text-xs text-red-500 mt-1">+8 this week</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <TrendingDown className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">13</div>
            <div className="text-sm text-gray-600">Out of Stock</div>
            <div className="text-xs text-red-500 mt-1">Needs attention</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <Eye className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">$3.1M</div>
            <div className="text-sm text-gray-600">Total Inventory Value</div>
            <div className="text-xs text-green-500 mt-1">+5% this month</div>
          </CardBody>
        </Card>
      </div>

      <Tabs aria-label="Inventory Reports" className="mb-6">
        <Tab key="overview" title="Overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Inventory by Category</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {inventoryOverview.map((category) => (
                    <div key={category.category} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{category.category}</h4>
                        <span className="text-sm text-gray-600">${category.value.toLocaleString()}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-blue-600">{category.totalItems}</div>
                          <div className="text-xs text-gray-600">Total Items</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-orange-600">{category.lowStock}</div>
                          <div className="text-xs text-gray-600">Low Stock</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-red-600">{category.outOfStock}</div>
                          <div className="text-xs text-gray-600">Out of Stock</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Stock Distribution</h3>
              </CardHeader>
              <CardBody>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stockDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {stockDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {stockDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Inventory Turnover Analysis</h3>
            </CardHeader>
            <CardBody>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={turnoverAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="inflow" fill="#10B981" name="Inflow" />
                    <Bar dataKey="outflow" fill="#8B5CF6" name="Outflow" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="alerts" title="Stock Alerts">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Critical Stock Alerts</h3>
                <Input
                  placeholder="Search products..."
                  startContent={<Search className="w-4 h-4" />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardBody>
              <Table aria-label="Stock alerts table">
                <TableHeader>
                  <TableColumn>PRODUCT</TableColumn>
                  <TableColumn>SKU</TableColumn>
                  <TableColumn>CATEGORY</TableColumn>
                  <TableColumn>CURRENT STOCK</TableColumn>
                  <TableColumn>THRESHOLD</TableColumn>
                  <TableColumn>VALUE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                  {stockAlerts.map((item) => {
                    const stockStatus = getStockStatus(item.current, item.threshold)
                    return (
                      <TableRow key={item.sku}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          <Chip size="sm" variant="flat">{item.sku}</Chip>
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <span className={item.current === 0 ? 'text-red-600 font-bold' : 'font-medium'}>
                            {item.current}
                          </span>
                        </TableCell>
                        <TableCell>{item.threshold}</TableCell>
                        <TableCell>${item.value.toLocaleString()}</TableCell>
                        <TableCell>
                          <Chip color={stockStatus.color} size="sm" variant="flat">
                            {stockStatus.status}
                          </Chip>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="performance" title="Performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Top Moving Items</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {topMovers.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.sales} sales • ${item.revenue.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <Chip color={getVelocityColor(item.velocity)} size="sm" variant="flat">
                          {item.velocity}
                        </Chip>
                        <div className="text-sm text-gray-600 mt-1">Stock: {item.stock}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Monthly Turnover Rates</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {turnoverAnalysis.map((month) => (
                    <div key={month.month}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{month.month} 2024</span>
                        <span className="text-sm font-medium">{month.turnover}x</span>
                      </div>
                      <Progress 
                        value={(month.turnover / 4) * 100} 
                        color={month.turnover > 3 ? "success" : month.turnover > 2 ? "warning" : "danger"}
                        className="max-w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>In: {month.inflow}</span>
                        <span>Out: {month.outflow}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="valuation" title="Valuation">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Inventory Value by Category</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {inventoryOverview.map((category) => (
                    <div key={category.category}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{category.category}</span>
                        <span className="text-sm font-medium">${category.value.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(category.value / 1200000) * 100} 
                        color="primary" 
                        className="max-w-full"
                      />
                      <div className="text-xs text-gray-600 mt-1">
                        {((category.value / 3075000) * 100).toFixed(1)}% of total inventory
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">High-Value Items at Risk</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {stockAlerts
                    .filter(item => item.value > 1000)
                    .sort((a, b) => b.value - a.value)
                    .map((item) => (
                      <div key={item.sku} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-600">{item.category}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">${item.value.toLocaleString()}</div>
                            <Chip 
                              color={item.current === 0 ? "danger" : "warning"} 
                              size="sm" 
                              variant="flat"
                            >
                              {item.current === 0 ? "OUT OF STOCK" : `${item.current} left`}
                            </Chip>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}
