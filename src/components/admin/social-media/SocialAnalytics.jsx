// src/components/admin/social-media/SocialAnalytics.jsx
'use client'
import { useState, useMemo } from 'react'
import { 
  Card,
  CardBody,
  CardHeader,
  Button,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Chip,
  Progress,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar
} from '@nextui-org/react'
import { 
  TrendingUp,
  TrendingDown,
  Users,
  Heart,
  MessageCircle,
  Share,
  Eye,
  Clock,
  Calendar,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Star,
  Award,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

// Mock analytics data
const mockAnalyticsData = {
  overview: {
    totalFollowers: 127543,
    totalEngagement: 8.7,
    totalReach: 1250000,
    totalImpressions: 2890000,
    growthRate: 12.5,
    avgEngagementRate: 8.7,
    topPerformingPlatform: 'Instagram',
    worstPerformingPlatform: 'LinkedIn'
  },
  
  timeSeriesData: [
    { date: '2024-12-01', followers: 125000, engagement: 8200, reach: 45000, impressions: 89000 },
    { date: '2024-12-02', followers: 125120, engagement: 9100, reach: 52000, impressions: 95000 },
    { date: '2024-12-03', followers: 125250, engagement: 7800, reach: 48000, impressions: 87000 },
    { date: '2024-12-04', followers: 125380, engagement: 10200, reach: 58000, impressions: 102000 },
    { date: '2024-12-05', followers: 125500, engagement: 11500, reach: 62000, impressions: 115000 },
    { date: '2024-12-06', followers: 125650, engagement: 9800, reach: 55000, impressions: 98000 },
    { date: '2024-12-07', followers: 125780, engagement: 12200, reach: 68000, impressions: 125000 },
    { date: '2024-12-08', followers: 125900, engagement: 8900, reach: 51000, impressions: 92000 },
    { date: '2024-12-09', followers: 126050, engagement: 13100, reach: 71000, impressions: 135000 },
    { date: '2024-12-10', followers: 126200, engagement: 10800, reach: 59000, impressions: 108000 },
    { date: '2024-12-11', followers: 126350, engagement: 14200, reach: 76000, impressions: 145000 },
    { date: '2024-12-12', followers: 126500, engagement: 11900, reach: 64000, impressions: 118000 },
    { date: '2024-12-13', followers: 126680, engagement: 15800, reach: 82000, impressions: 158000 },
    { date: '2024-12-14', followers: 126850, engagement: 12600, reach: 67000, impressions: 128000 },
    { date: '2024-12-15', followers: 127000, engagement: 16500, reach: 85000, impressions: 165000 }
  ],

  platformPerformance: [
    { platform: 'Instagram', followers: 45000, engagement: 9.2, reach: 380000, color: '#E4405F' },
    { platform: 'Facebook', followers: 32000, engagement: 6.8, reach: 290000, color: '#1877F2' },
    { platform: 'YouTube', followers: 28000, engagement: 11.5, reach: 250000, color: '#FF0000' },
    { platform: 'Twitter', followers: 15000, engagement: 7.3, reach: 180000, color: '#1DA1F2' },
    { platform: 'TikTok', followers: 7543, engagement: 14.2, reach: 150000, color: '#000000' }
  ],

  contentPerformance: [
    { type: 'Product Showcase', posts: 45, avgEngagement: 12.5, totalReach: 450000 },
    { type: 'Educational', posts: 32, avgEngagement: 8.7, totalReach: 320000 },
    { type: 'Behind the Scenes', posts: 28, avgEngagement: 15.2, totalReach: 280000 },
    { type: 'Customer Stories', posts: 22, avgEngagement: 18.9, totalReach: 220000 },
    { type: 'Trends', posts: 18, avgEngagement: 11.3, totalReach: 180000 }
  ],

  audienceInsights: {
    demographics: {
      ageGroups: [
        { range: '18-24', percentage: 15, color: '#8884d8' },
        { range: '25-34', percentage: 35, color: '#82ca9d' },
        { range: '35-44', percentage: 28, color: '#ffc658' },
        { range: '45-54', percentage: 15, color: '#ff7300' },
        { range: '55+', percentage: 7, color: '#0088fe' }
      ],
      gender: [
        { type: 'Female', percentage: 68, color: '#ff69b4' },
        { type: 'Male', percentage: 30, color: '#4169e1' },
        { type: 'Other', percentage: 2, color: '#32cd32' }
      ],
      topLocations: [
        { country: 'United States', percentage: 45 },
        { country: 'Canada', percentage: 18 },
        { country: 'United Kingdom', percentage: 12 },
        { country: 'Australia', percentage: 8 },
        { country: 'Germany', percentage: 7 },
        { country: 'Other', percentage: 10 }
      ]
    },
    interests: [
      { interest: 'Luxury Jewelry', score: 95 },
      { interest: 'Gemstones', score: 92 },
      { interest: 'Fashion', score: 78 },
      { interest: 'Lifestyle', score: 65 },
      { interest: 'Art & Design', score: 58 }
    ]
  },

  bestTimes: {
    weekdays: [
      { day: 'Monday', optimal: '2:00 PM - 4:00 PM', engagement: 8.5 },
      { day: 'Tuesday', optimal: '10:00 AM - 12:00 PM', engagement: 9.2 },
      { day: 'Wednesday', optimal: '1:00 PM - 3:00 PM', engagement: 8.8 },
      { day: 'Thursday', optimal: '11:00 AM - 1:00 PM', engagement: 9.5 },
      { day: 'Friday', optimal: '3:00 PM - 5:00 PM', engagement: 7.8 },
      { day: 'Saturday', optimal: '12:00 PM - 2:00 PM', engagement: 6.5 },
      { day: 'Sunday', optimal: '1:00 PM - 3:00 PM', engagement: 7.2 }
    ]
  },

  competitorAnalysis: [
    { competitor: 'Tiffany & Co', followers: 2500000, engagement: 3.2, growth: 5.8 },
    { competitor: 'Cartier', followers: 8900000, engagement: 4.1, growth: 7.2 },
    { competitor: 'Bulgari', followers: 6200000, engagement: 5.8, growth: 9.1 },
    { competitor: 'Van Cleef & Arpels', followers: 3100000, engagement: 6.2, growth: 8.5 }
  ]
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00C49F', '#FFBB28', '#FF8042']

export default function SocialAnalytics({ socialAccounts = [] }) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')

  const filteredData = useMemo(() => {
    // Filter data based on selected time range and platform
    const days = parseInt(selectedTimeRange)
    const filtered = mockAnalyticsData.timeSeriesData.slice(-days)
    
    return filtered
  }, [selectedTimeRange])

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getTrendIcon = (value) => {
    return value > 0 ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />
  }

  const MetricCard = ({ title, value, change, icon: Icon, color = "primary" }) => (
    <Card>
      <CardBody className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Icon className={`w-5 h-5 text-${color}`} />
          <div className="flex items-center gap-1">
            {getTrendIcon(change)}
            <span className={`text-xs ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {Math.abs(change)}%
            </span>
          </div>
        </div>
        <p className="text-2xl font-bold">{formatNumber(value)}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </CardBody>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Social Media Analytics</h2>
          <p className="text-gray-600">Track your social media performance across all platforms</p>
        </div>
        
        <div className="flex gap-2">
          <Select
            label="Time Range"
            selectedKeys={[selectedTimeRange]}
            onSelectionChange={(keys) => setSelectedTimeRange(Array.from(keys)[0])}
            className="min-w-32"
          >
            <SelectItem key="7">Last 7 days</SelectItem>
            <SelectItem key="30">Last 30 days</SelectItem>
            <SelectItem key="90">Last 90 days</SelectItem>
            <SelectItem key="365">Last year</SelectItem>
          </Select>
          
          <Select
            label="Platform"
            selectedKeys={[selectedPlatform]}
            onSelectionChange={(keys) => setSelectedPlatform(Array.from(keys)[0])}
            className="min-w-32"
          >
            <SelectItem key="all">All Platforms</SelectItem>
            {socialAccounts.map((account) => (
              <SelectItem key={account.name.toLowerCase()}>{account.name}</SelectItem>
            ))}
          </Select>
          
          <Button
            variant="flat"
            startContent={<Download className="w-4 h-4" />}
          >
            Export
          </Button>
          
          <Button
            isIconOnly
            variant="flat"
            startContent={<RefreshCw className="w-4 h-4" />}
          />
        </div>
      </div>

      <Tabs value={activeTab} onSelectionChange={setActiveTab} className="w-full">
        <Tab key="overview" title="Overview">
          <div className="space-y-6 mt-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard
                title="Total Followers"
                value={mockAnalyticsData.overview.totalFollowers}
                change={12.5}
                icon={Users}
                color="primary"
              />
              <MetricCard
                title="Engagement Rate"
                value={`${mockAnalyticsData.overview.totalEngagement}%`}
                change={8.2}
                icon={Heart}
                color="danger"
              />
              <MetricCard
                title="Total Reach"
                value={mockAnalyticsData.overview.totalReach}
                change={15.7}
                icon={Eye}
                color="success"
              />
              <MetricCard
                title="Impressions"
                value={mockAnalyticsData.overview.totalImpressions}
                change={-2.3}
                icon={Activity}
                color="warning"
              />
            </div>

            {/* Growth Chart */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Growth Trends</h3>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="followers" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      name="Followers"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="engagement" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      name="Engagement"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reach" 
                      stroke="#ffc658" 
                      strokeWidth={2}
                      name="Reach"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>

            {/* Platform Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Platform Performance</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    {mockAnalyticsData.platformPerformance.map((platform, index) => (
                      <div key={platform.platform} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: platform.color }}
                            />
                            <span className="font-medium">{platform.platform}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatNumber(platform.followers)}</p>
                            <p className="text-sm text-gray-600">{platform.engagement}% eng.</p>
                          </div>
                        </div>
                        <Progress 
                          value={platform.engagement * 10} 
                          color="primary"
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Content Performance</h3>
                </CardHeader>
                <CardBody>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={mockAnalyticsData.contentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avgEngagement" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            </div>
          </div>
        </Tab>

        <Tab key="audience" title="Audience">
          <div className="space-y-6 mt-6">
            {/* Demographics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Age Distribution</h3>
                </CardHeader>
                <CardBody>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsPieChart>
                      <Pie
                        data={mockAnalyticsData.audienceInsights.demographics.ageGroups}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                        label={({ range, percentage }) => `${range}: ${percentage}%`}
                      >
                        {mockAnalyticsData.audienceInsights.demographics.ageGroups.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Gender Distribution</h3>
                </CardHeader>
                <CardBody>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsPieChart>
                      <Pie
                        data={mockAnalyticsData.audienceInsights.demographics.gender}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                        label={({ type, percentage }) => `${type}: ${percentage}%`}
                      >
                        {mockAnalyticsData.audienceInsights.demographics.gender.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            </div>

            {/* Top Locations */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Top Locations</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {mockAnalyticsData.audienceInsights.demographics.topLocations.map((location, index) => (
                    <div key={location.country} className="flex justify-between items-center">
                      <span className="font-medium">{location.country}</span>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={location.percentage} 
                          color="primary"
                          className="w-24"
                        />
                        <span className="text-sm text-gray-600 w-12">{location.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Interests */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Audience Interests</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {mockAnalyticsData.audienceInsights.interests.map((interest, index) => (
                    <div key={interest.interest} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{interest.interest}</span>
                        <span className="text-sm text-gray-600">{interest.score}/100</span>
                      </div>
                      <Progress 
                        value={interest.score} 
                        color="primary"
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="timing" title="Best Times">
          <div className="space-y-6 mt-6">
            {/* Optimal Posting Times */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Optimal Posting Times</h3>
              </CardHeader>
              <CardBody>
                <Table aria-label="Optimal posting times">
                  <TableHeader>
                    <TableColumn>DAY</TableColumn>
                    <TableColumn>BEST TIME</TableColumn>
                    <TableColumn>AVG ENGAGEMENT</TableColumn>
                    <TableColumn>PERFORMANCE</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {mockAnalyticsData.bestTimes.weekdays.map((day) => (
                      <TableRow key={day.day}>
                        <TableCell className="font-medium">{day.day}</TableCell>
                        <TableCell>{day.optimal}</TableCell>
                        <TableCell>{day.engagement}%</TableCell>
                        <TableCell>
                          <Progress 
                            value={day.engagement * 10} 
                            color={day.engagement > 9 ? "success" : day.engagement > 8 ? "warning" : "danger"}
                            className="w-20"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>

            {/* Heatmap would go here - simplified for now */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Weekly Performance Heatmap</h3>
              </CardHeader>
              <CardBody>
                <div className="text-center py-12 text-gray-600">
                  <Clock className="w-12 h-12 mx-auto mb-4" />
                  <p>Interactive heatmap visualization would be displayed here</p>
                  <p className="text-sm">Showing engagement rates by hour and day of week</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="competitors" title="Competitors">
          <div className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Competitor Analysis</h3>
              </CardHeader>
              <CardBody>
                <Table aria-label="Competitor analysis">
                  <TableHeader>
                    <TableColumn>COMPETITOR</TableColumn>
                    <TableColumn>FOLLOWERS</TableColumn>
                    <TableColumn>ENGAGEMENT</TableColumn>
                    <TableColumn>GROWTH RATE</TableColumn>
                    <TableColumn>PERFORMANCE</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {mockAnalyticsData.competitorAnalysis.map((competitor) => (
                      <TableRow key={competitor.competitor}>
                        <TableCell className="font-medium">{competitor.competitor}</TableCell>
                        <TableCell>{formatNumber(competitor.followers)}</TableCell>
                        <TableCell>{competitor.engagement}%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(competitor.growth)}
                            <span>{competitor.growth}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Chip
                            color={competitor.engagement > 5 ? "success" : competitor.engagement > 3 ? "warning" : "danger"}
                            size="sm"
                            variant="flat"
                          >
                            {competitor.engagement > 5 ? "High" : competitor.engagement > 3 ? "Medium" : "Low"}
                          </Chip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>

            {/* Benchmark Comparison */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Performance vs Competitors</h3>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: 'SHUKRA Gems', followers: 127543, engagement: 8.7, growth: 12.5 },
                    ...mockAnalyticsData.competitorAnalysis
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="engagement" fill="#8884d8" name="Engagement Rate %" />
                    <Bar dataKey="growth" fill="#82ca9d" name="Growth Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}
