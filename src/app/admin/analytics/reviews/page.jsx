// src/app/admin/analytics/reviews/page.jsx
'use client'
import { useState, useMemo } from 'react'
import { 
  Card, 
  CardBody, 
  CardHeader,
  Button, 
  Chip, 
  Select,
  SelectItem,
  Tabs,
  Tab,
  Progress
} from '@nextui-org/react'
import { 
  Star, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageCircle, 
  BarChart3, 
  Award,
  AlertTriangle,
  Camera,
  Download,
  Calendar,
  Target
} from 'lucide-react'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock data - replace with real API calls
const mockReviewsData = [
  { date: '2024-01-01', reviews: 15, rating: 4.2, verified: 12 },
  { date: '2024-01-02', reviews: 23, rating: 4.5, verified: 20 },
  { date: '2024-01-03', reviews: 18, rating: 4.3, verified: 15 },
  { date: '2024-01-04', reviews: 31, rating: 4.6, verified: 28 },
  { date: '2024-01-05', reviews: 27, rating: 4.4, verified: 24 },
  { date: '2024-01-06', reviews: 35, rating: 4.7, verified: 33 },
  { date: '2024-01-07', reviews: 29, rating: 4.5, verified: 26 }
]

const productReviews = [
  { productName: 'Natural Ruby Pendant', reviews: 47, rating: 4.9, sales: 123 },
  { productName: 'Classic Ruby Stud Earrings', reviews: 92, rating: 4.7, sales: 234 },
  { productName: 'Royal Sapphire Ring', reviews: 23, rating: 5.0, sales: 67 },
  { productName: 'Colombian Emerald Necklace', reviews: 15, rating: 4.9, sales: 45 },
  { productName: 'Diamond Tennis Bracelet', reviews: 67, rating: 4.8, sales: 156 }
]

const reviewerSegments = [
  { segment: 'Verified Buyers', count: 234, percentage: 78 },
  { segment: 'Repeat Customers', count: 89, percentage: 30 },
  { segment: 'First-time Buyers', count: 167, percentage: 56 },
  { segment: 'High-value Customers', count: 45, percentage: 15 }
]

export default function ReviewAnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d')
  const [selectedTab, setSelectedTab] = useState('overview')

  const stats = useMemo(() => {
    const totalReviews = mockReviewsData.reduce((sum, day) => sum + day.reviews, 0)
    const totalVerified = mockReviewsData.reduce((sum, day) => sum + day.verified, 0)
    const avgRating = mockReviewsData.reduce((sum, day) => sum + day.rating, 0) / mockReviewsData.length
    const verificationRate = (totalVerified / totalReviews) * 100

    return {
      totalReviews,
      avgRating,
      verificationRate,
      totalVerified,
      responseRate: 85,
      avgResponseTime: 2.3
    }
  }, [])

  // Chart data for recharts
  const reviewsTrendData = mockReviewsData.map(d => ({
    date: new Date(d.date).toLocaleDateString(),
    reviews: d.reviews,
    rating: d.rating,
    verified: d.verified
  }))

  const ratingDistributionData = [
    { name: '5 Stars', value: 156, color: '#22c55e' },
    { name: '4 Stars', value: 89, color: '#84cc16' },
    { name: '3 Stars', value: 34, color: '#eab308' },
    { name: '2 Stars', value: 12, color: '#f97316' },
    { name: '1 Star', value: 9, color: '#ef4444' }
  ]

  const productPerformanceData = productReviews.map(p => ({
    product: p.productName.split(' ').slice(0, 2).join(' '),
    rating: p.rating,
    reviews: p.reviews,
    sales: p.sales
  }))

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Review Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor review performance and customer satisfaction
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select
            size="sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-32"
          >
            <SelectItem key="7d" value="7d">Last 7 days</SelectItem>
            <SelectItem key="30d" value="30d">Last 30 days</SelectItem>
            <SelectItem key="90d" value="90d">Last 90 days</SelectItem>
            <SelectItem key="1y" value="1y">Last year</SelectItem>
          </Select>
          <Button
            color="primary"
            variant="flat"
            startContent={<Download className="w-4 h-4" />}
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            title: 'Total Reviews',
            value: stats.totalReviews.toLocaleString(),
            change: '+12%',
            trend: 'up',
            icon: MessageCircle,
            color: 'primary'
          },
          {
            title: 'Average Rating',
            value: stats.avgRating.toFixed(1),
            change: '+0.2',
            trend: 'up',
            icon: Star,
            color: 'warning'
          },
          {
            title: 'Verified Reviews',
            value: `${stats.verificationRate.toFixed(0)}%`,
            change: '+5%',
            trend: 'up',
            icon: Award,
            color: 'success'
          },
          {
            title: 'Response Rate',
            value: `${stats.responseRate}%`,
            change: '+3%',
            trend: 'up',
            icon: Target,
            color: 'secondary'
          },
          {
            title: 'Avg Response Time',
            value: `${stats.avgResponseTime}h`,
            change: '-15%',
            trend: 'down',
            icon: Calendar,
            color: 'primary'
          },
          {
            title: 'With Photos',
            value: '67%',
            change: '+8%',
            trend: 'up',
            icon: Camera,
            color: 'success'
          }
        ].map((stat) => {
          const IconComponent = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardBody className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className={`w-5 h-5 text-${stat.color}`} />
                    <Chip
                      size="sm"
                      color={stat.trend === 'up' ? 'success' : 'danger'}
                      variant="flat"
                      startContent={stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    >
                      {stat.change}
                    </Chip>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </CardBody>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Detailed Analytics */}
      <Tabs value={selectedTab} onSelectionChange={setSelectedTab} className="w-full">
        <Tab key="overview" title="Overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Reviews Over Time */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Reviews & Ratings Trend</h3>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={reviewsTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="reviews" fill="#6366f1" name="Daily Reviews" />
                    <Line yAxisId="right" type="monotone" dataKey="rating" stroke="#22c55e" strokeWidth={2} name="Average Rating" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>

            {/* Rating Distribution */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Rating Distribution</h3>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ratingDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {ratingDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="products" title="Product Performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Product Ratings Chart */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Product Rating Performance</h3>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="product" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="rating" fill="#6366f1" name="Average Rating" />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>

            {/* Top Reviewed Products */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Most Reviewed Products</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {productReviews.map((product, index) => (
                    <div key={product.productName} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{product.productName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < Math.floor(product.rating) 
                                  ? "fill-yellow-400 text-yellow-400" 
                                  : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {product.rating.toFixed(1)} ({product.reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{product.sales} sales</p>
                        <p className="text-xs text-gray-500">
                          {((product.reviews / product.sales) * 100).toFixed(0)}% review rate
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="customers" title="Customer Insights">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Reviewer Segments */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Reviewer Segments</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {reviewerSegments.map((segment) => (
                    <div key={segment.segment} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{segment.segment}</span>
                        <span className="text-sm text-gray-600">
                          {segment.count} ({segment.percentage}%)
                        </span>
                      </div>
                      <Progress value={segment.percentage} color="primary" size="sm" />
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Review Quality Metrics */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Review Quality</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Review Length</span>
                    <span className="font-semibold">127 words</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Reviews with Photos</span>
                    <span className="font-semibold">67%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Helpful Vote Rate</span>
                    <span className="font-semibold">84%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Response Rate</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Flagged Reviews</span>
                    <span className="font-semibold text-warning">3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Review Authenticity Score</span>
                    <span className="font-semibold text-success">96%</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>

      {/* Action Items */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold">Action Items</h3>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Needs Attention</h4>
              <ul className="space-y-1 text-sm">
                <li>• 3 reviews pending response (&gt;48h)</li>
                <li>• 2 negative reviews need follow-up</li>
                <li>• 1 review flagged for authenticity</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Opportunities</h4>
              <ul className="space-y-1 text-sm">
                <li>• Encourage photo uploads (+25% helpfulness)</li>
                <li>• Follow up with recent buyers for reviews</li>
                <li>• Highlight top reviews in marketing</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
