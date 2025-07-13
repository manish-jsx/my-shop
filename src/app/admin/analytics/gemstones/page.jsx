// src/app/admin/analytics/gemstones/page.jsx
'use client'
import { useState } from 'react'
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button,
  Chip,
  Select,
  SelectItem
} from '@nextui-org/react'
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
  Cell,
  BarChart,
  Bar,
  Area,
  AreaChart
} from 'recharts'
import { 
  Gem,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Star,
  Award
} from 'lucide-react'

// Sample data for gemstone analytics
const gemstonePerformance = [
  { name: 'Ruby', sales: 450000, orders: 45, avgPrice: 10000, growth: 15.2, color: '#ef4444' },
  { name: 'Sapphire', sales: 380000, orders: 52, avgPrice: 7300, growth: 8.7, color: '#3b82f6' },
  { name: 'Emerald', sales: 320000, orders: 28, avgPrice: 11400, growth: 22.1, color: '#10b981' },
  { name: 'Diamond', sales: 280000, orders: 35, avgPrice: 8000, growth: -3.2, color: '#f3f4f6' },
  { name: 'Topaz', sales: 125000, orders: 78, avgPrice: 1600, growth: 45.8, color: '#f59e0b' },
  { name: 'Amethyst', sales: 95000, orders: 125, avgPrice: 760, growth: 18.3, color: '#8b5cf6' }
]

const monthlyTrends = [
  { month: 'Jan', ruby: 35000, sapphire: 28000, emerald: 22000, diamond: 30000 },
  { month: 'Feb', ruby: 42000, sapphire: 31000, emerald: 25000, diamond: 28000 },
  { month: 'Mar', ruby: 38000, sapphire: 35000, emerald: 28000, diamond: 32000 },
  { month: 'Apr', ruby: 48000, sapphire: 42000, emerald: 31000, diamond: 25000 },
  { month: 'May', ruby: 52000, sapphire: 38000, emerald: 35000, diamond: 29000 },
  { month: 'Jun', ruby: 58000, sapphire: 45000, emerald: 42000, diamond: 31000 }
]

const priceAnalysis = [
  { category: 'Under $1K', ruby: 15, sapphire: 28, emerald: 8, diamond: 22 },
  { category: '$1K-$5K', ruby: 35, sapphire: 42, emerald: 28, diamond: 38 },
  { category: '$5K-$10K', ruby: 28, sapphire: 18, emerald: 32, diamond: 25 },
  { category: '$10K-$25K', ruby: 15, sapphire: 8, emerald: 22, diamond: 12 },
  { category: '$25K+', ruby: 7, sapphire: 4, emerald: 10, diamond: 3 }
]

const customerPreferences = [
  { name: 'Natural vs Treated', natural: 78, treated: 22 },
  { name: 'Certified vs Uncertified', certified: 85, uncertified: 15 },
  { name: 'Vintage vs Modern', vintage: 35, modern: 65 },
  { name: 'Investment vs Personal', investment: 42, personal: 58 }
]

export default function GemstonePage() {
  const [timeframe, setTimeframe] = useState('6months')
  const [selectedGemstone, setSelectedGemstone] = useState('all')

  const getGrowthIcon = (growth) => {
    return growth > 0 ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    )
  }

  const getGrowthColor = (growth) => {
    return growth > 0 ? 'success' : 'danger'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Gem className="w-8 h-8 text-purple-600" />
            Gemstone Performance Analytics
          </h1>
          <p className="text-gray-600 mt-1">Detailed insights into gemstone sales and market trends</p>
        </div>
        <div className="flex gap-3">
          <Select
            placeholder="Select timeframe"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="w-40"
          >
            <SelectItem key="1month" value="1month">Last Month</SelectItem>
            <SelectItem key="3months" value="3months">Last 3 Months</SelectItem>
            <SelectItem key="6months" value="6months">Last 6 Months</SelectItem>
            <SelectItem key="1year" value="1year">Last Year</SelectItem>
          </Select>
          <Button color="primary" variant="flat">
            Export Report
          </Button>
        </div>
      </div>

      {/* Gemstone Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {gemstonePerformance.map((gem) => (
          <Card key={gem.name} className="hover:shadow-lg transition-shadow">
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">{gem.name}</h4>
                {getGrowthIcon(gem.growth)}
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-green-600">
                  ${gem.sales.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">{gem.orders} orders</p>
                <p className="text-xs text-gray-500">Avg: ${gem.avgPrice.toLocaleString()}</p>
                <Chip 
                  size="tiny" 
                  color={getGrowthColor(gem.growth)}
                  variant="flat"
                >
                  {gem.growth > 0 ? '+' : ''}{gem.growth}%
                </Chip>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-semibold">Monthly Sales Trends</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="ruby" 
                  stackId="1"
                  stroke="#ef4444" 
                  fill="#ef4444"
                  fillOpacity={0.6}
                  name="Ruby"
                />
                <Area 
                  type="monotone" 
                  dataKey="sapphire" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="Sapphire"
                />
                <Area 
                  type="monotone" 
                  dataKey="emerald" 
                  stackId="1"
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="Emerald"
                />
                <Area 
                  type="monotone" 
                  dataKey="diamond" 
                  stackId="1"
                  stroke="#6b7280" 
                  fill="#6b7280"
                  fillOpacity={0.6}
                  name="Diamond"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Price Distribution */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Price Distribution by Category</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="category" 
                  stroke="#666"
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#666" />
                <Tooltip />
                <Legend />
                <Bar dataKey="ruby" fill="#ef4444" name="Ruby" />
                <Bar dataKey="sapphire" fill="#3b82f6" name="Sapphire" />
                <Bar dataKey="emerald" fill="#10b981" name="Emerald" />
                <Bar dataKey="diamond" fill="#6b7280" name="Diamond" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Market Share */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Market Share by Revenue</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gemstonePerformance}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="sales"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  labelLine={false}
                  fontSize={10}
                >
                  {gemstonePerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Customer Preferences & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Preferences */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Customer Preferences</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {customerPreferences.map((pref, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{pref.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-blue-100 rounded-full h-3 relative">
                      <div 
                        className="bg-blue-500 h-3 rounded-full" 
                        style={{ width: `${Object.values(pref)[1]}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {Object.keys(pref)[1]}: {Object.values(pref)[1]}%
                      </span>
                    </div>
                    <div className="flex-1 bg-purple-100 rounded-full h-3 relative">
                      <div 
                        className="bg-purple-500 h-3 rounded-full" 
                        style={{ width: `${Object.values(pref)[2]}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {Object.keys(pref)[2]}: {Object.values(pref)[2]}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Top Performing Gemstones */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Top Performing Gemstones</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {gemstonePerformance
                .sort((a, b) => b.sales - a.sales)
                .slice(0, 5)
                .map((gem, index) => (
                <div key={gem.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                      <span className="text-sm font-bold">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{gem.name}</p>
                      <p className="text-sm text-gray-600">{gem.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">${gem.sales.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                      {getGrowthIcon(gem.growth)}
                      <span className={`text-xs ${gem.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {gem.growth > 0 ? '+' : ''}{gem.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Key Insights & Recommendations</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h4 className="font-semibold text-yellow-600">Top Performer</h4>
              <p className="text-sm text-gray-600 mt-1">
                Ruby shows highest revenue with 15.2% growth. Consider expanding ruby inventory.
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h4 className="font-semibold text-green-600">Growth Opportunity</h4>
              <p className="text-sm text-gray-600 mt-1">
                Topaz shows 45.8% growth in lower price segments. Potential for mass market expansion.
              </p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h4 className="font-semibold text-blue-600">Premium Focus</h4>
              <p className="text-sm text-gray-600 mt-1">
                85% prefer certified stones. Investing in premium certifications will boost sales.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
