// src/app/admin/analytics/trends/page.jsx
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
  Chip,
  Progress
} from '@nextui-org/react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts'
import { TrendingUp, TrendingDown, Eye, Search, ShoppingCart, Star } from 'lucide-react'

export default function MarketTrendsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('quarter')

  const trendingGemstones = [
    { name: 'Emerald', trend: 'up', change: 23, searches: 1240, sales: 89 },
    { name: 'Ruby', trend: 'up', change: 18, searches: 1120, sales: 76 },
    { name: 'Sapphire', trend: 'up', change: 15, searches: 980, sales: 65 },
    { name: 'Tanzanite', trend: 'up', change: 32, searches: 756, sales: 34 },
    { name: 'Aquamarine', trend: 'down', change: -8, searches: 623, sales: 28 },
    { name: 'Peridot', trend: 'up', change: 12, searches: 534, sales: 23 }
  ]

  const seasonalTrends = [
    { month: 'Jan', engagementRings: 45, birthstones: 23, healingCrystals: 34, collectibles: 12 },
    { month: 'Feb', engagementRings: 78, birthstones: 19, healingCrystals: 28, collectibles: 15 },
    { month: 'Mar', engagementRings: 34, birthstones: 67, healingCrystals: 45, collectibles: 18 },
    { month: 'Apr', engagementRings: 42, birthstones: 89, healingCrystals: 52, collectibles: 21 },
    { month: 'May', engagementRings: 67, birthstones: 78, healingCrystals: 39, collectibles: 24 },
    { month: 'Jun', engagementRings: 123, birthstones: 45, healingCrystals: 41, collectibles: 19 }
  ]

  const priceMovements = [
    { gemstone: 'Diamond (1ct)', jan: 5200, feb: 5350, mar: 5280, apr: 5420, may: 5580, jun: 5640 },
    { gemstone: 'Ruby (1ct)', jan: 3800, feb: 3950, mar: 4100, apr: 4280, may: 4350, jun: 4420 },
    { gemstone: 'Emerald (1ct)', jan: 2900, feb: 3100, mar: 3250, apr: 3400, may: 3520, jun: 3680 },
    { gemstone: 'Sapphire (1ct)', jan: 2200, feb: 2350, mar: 2400, apr: 2520, may: 2580, jun: 2640 }
  ]

  const marketDrivers = [
    { factor: 'Celebrity Endorsements', impact: 85, trend: 'up' },
    { factor: 'Social Media Influence', impact: 78, trend: 'up' },
    { factor: 'Economic Conditions', impact: 65, trend: 'stable' },
    { factor: 'Seasonal Demand', impact: 72, trend: 'up' },
    { factor: 'Supply Chain', impact: 58, trend: 'down' },
    { factor: 'Investment Interest', impact: 89, trend: 'up' }
  ]

  const demandForecast = [
    { category: 'Precious Stones', q1: 100, q2: 115, q3: 108, q4: 125 },
    { category: 'Healing Crystals', q1: 100, q2: 125, q3: 135, q4: 118 },
    { category: 'Rare Gemstones', q1: 100, q2: 110, q3: 122, q4: 140 },
    { category: 'Birthstones', q1: 100, q2: 105, q3: 95, q4: 130 }
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Market Trends</h1>
          <p className="text-gray-600">Monitor gemstone market trends and demand patterns</p>
        </div>
        <Select
          value={selectedPeriod}
          onChange={setSelectedPeriod}
          className="w-48"
          label="Time Period"
        >
          <SelectItem key="month" value="month">Last Month</SelectItem>
          <SelectItem key="quarter" value="quarter">Last Quarter</SelectItem>
          <SelectItem key="year" value="year">Last Year</SelectItem>
        </Select>
      </div>

      <Tabs aria-label="Market Trends" className="mb-6">
        <Tab key="trending" title="Trending Gemstones">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Hot Gemstones This Quarter</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {trendingGemstones.map((gem) => (
                    <div key={gem.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <div>
                          <div className="font-medium">{gem.name}</div>
                          <div className="text-sm text-gray-600">{gem.sales} sales this month</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center gap-1 ${gem.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {gem.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="font-medium">{Math.abs(gem.change)}%</span>
                        </div>
                        <div className="text-sm text-gray-600">{gem.searches} searches</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Seasonal Demand Patterns</h3>
              </CardHeader>
              <CardBody>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={seasonalTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="engagementRings" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" />
                      <Area type="monotone" dataKey="birthstones" stackId="1" stroke="#06B6D4" fill="#06B6D4" />
                      <Area type="monotone" dataKey="healingCrystals" stackId="1" stroke="#10B981" fill="#10B981" />
                      <Area type="monotone" dataKey="collectibles" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Market Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardBody className="text-center">
                <Eye className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">24.5K</div>
                <div className="text-sm text-gray-600">Monthly Views</div>
                <div className="text-xs text-green-500 mt-1">+18% vs last month</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <Search className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">8.2K</div>
                <div className="text-sm text-gray-600">Search Volume</div>
                <div className="text-xs text-green-500 mt-1">+12% vs last month</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <ShoppingCart className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">3.8%</div>
                <div className="text-sm text-gray-600">Conversion Rate</div>
                <div className="text-xs text-green-500 mt-1">+0.5% vs last month</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <Star className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-gray-600">Avg. Rating</div>
                <div className="text-xs text-green-500 mt-1">+0.2 vs last month</div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="pricing" title="Price Movements">
          <Card className="mb-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Price Trends (Per Carat)</h3>
            </CardHeader>
            <CardBody>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { month: 'Jan', Diamond: 5200, Ruby: 3800, Emerald: 2900, Sapphire: 2200 },
                    { month: 'Feb', Diamond: 5350, Ruby: 3950, Emerald: 3100, Sapphire: 2350 },
                    { month: 'Mar', Diamond: 5280, Ruby: 4100, Emerald: 3250, Sapphire: 2400 },
                    { month: 'Apr', Diamond: 5420, Ruby: 4280, Emerald: 3400, Sapphire: 2520 },
                    { month: 'May', Diamond: 5580, Ruby: 4350, Emerald: 3520, Sapphire: 2580 },
                    { month: 'Jun', Diamond: 5640, Ruby: 4420, Emerald: 3680, Sapphire: 2640 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, '']} />
                    <Line type="monotone" dataKey="Diamond" stroke="#8B5CF6" strokeWidth={2} />
                    <Line type="monotone" dataKey="Ruby" stroke="#EF4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="Emerald" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="Sapphire" stroke="#06B6D4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Market Drivers</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {marketDrivers.map((driver) => (
                  <div key={driver.factor} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{driver.factor}</span>
                      <div className={`flex items-center gap-1 ${
                        driver.trend === 'up' ? 'text-green-500' : 
                        driver.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                      }`}>
                        {driver.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                        {driver.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                        <span className="text-sm capitalize">{driver.trend}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={driver.impact} className="w-24" color="primary" />
                      <span className="text-sm font-medium w-12">{driver.impact}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="forecast" title="Demand Forecast">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Quarterly Demand Forecast (Indexed to Q1)</h3>
            </CardHeader>
            <CardBody>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { quarter: 'Q1 2024', 'Precious Stones': 100, 'Healing Crystals': 100, 'Rare Gemstones': 100, 'Birthstones': 100 },
                    { quarter: 'Q2 2024', 'Precious Stones': 115, 'Healing Crystals': 125, 'Rare Gemstones': 110, 'Birthstones': 105 },
                    { quarter: 'Q3 2024', 'Precious Stones': 108, 'Healing Crystals': 135, 'Rare Gemstones': 122, 'Birthstones': 95 },
                    { quarter: 'Q4 2024', 'Precious Stones': 125, 'Healing Crystals': 118, 'Rare Gemstones': 140, 'Birthstones': 130 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Precious Stones" fill="#8B5CF6" />
                    <Bar dataKey="Healing Crystals" fill="#10B981" />
                    <Bar dataKey="Rare Gemstones" fill="#F59E0B" />
                    <Bar dataKey="Birthstones" fill="#06B6D4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {demandForecast.map((item) => (
                  <Card key={item.category} className="p-4">
                    <div className="text-center">
                      <h4 className="font-medium mb-2">{item.category}</h4>
                      <div className="text-2xl font-bold text-green-500">+{item.q4 - 100}%</div>
                      <div className="text-sm text-gray-600">Expected Q4 growth</div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}
