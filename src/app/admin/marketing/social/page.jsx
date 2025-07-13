// src/app/admin/marketing/social/page.jsx
'use client'
import { useState } from 'react'
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Tabs, 
  Tab,
  Chip,
  Progress,
  Input,
  Textarea,
  Select,
  SelectItem
} from '@nextui-org/react'
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  TrendingUp, 
  Users, 
  Heart, 
  MessageCircle, 
  Share, 
  Eye,
  Calendar,
  Image as ImageIcon,
  Video,
  Plus
} from 'lucide-react'

export default function SocialMediaPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('instagram')

  const socialMetrics = {
    instagram: {
      followers: 25400,
      engagement: 4.8,
      posts: 156,
      reach: 125000,
      growth: 12.5
    },
    facebook: {
      followers: 18200,
      engagement: 3.2,
      posts: 89,
      reach: 98000,
      growth: 8.7
    },
    twitter: {
      followers: 12800,
      engagement: 2.9,
      posts: 234,
      reach: 67000,
      growth: 15.2
    },
    youtube: {
      followers: 8900,
      engagement: 6.4,
      posts: 23,
      reach: 145000,
      growth: 28.3
    }
  }

  const recentPosts = [
    {
      id: 1,
      platform: 'instagram',
      content: 'Stunning emerald collection just arrived! ✨ Each piece certified and ethically sourced.',
      image: '/api/placeholder/300/300',
      likes: 234,
      comments: 18,
      shares: 12,
      reach: 4500,
      date: '2024-06-15',
      status: 'published'
    },
    {
      id: 2,
      platform: 'facebook',
      content: 'Educational post: The fascinating world of sapphires and their different colors.',
      image: '/api/placeholder/300/300',
      likes: 156,
      comments: 24,
      shares: 31,
      reach: 6200,
      date: '2024-06-14',
      status: 'published'
    },
    {
      id: 3,
      platform: 'youtube',
      content: 'How to identify authentic gemstones - Expert tips',
      image: '/api/placeholder/300/300',
      likes: 89,
      comments: 15,
      shares: 7,
      reach: 2100,
      date: '2024-06-13',
      status: 'scheduled'
    },
    {
      id: 4,
      platform: 'twitter',
      content: 'Quick tip: Always ask for certification when buying precious gemstones! #GemEducation',
      image: null,
      likes: 67,
      comments: 8,
      shares: 23,
      reach: 1800,
      date: '2024-06-12',
      status: 'published'
    }
  ]

  const contentCalendar = [
    { date: '2024-06-16', platform: 'instagram', type: 'photo', content: 'Ruby spotlight series' },
    { date: '2024-06-17', platform: 'facebook', type: 'article', content: 'Gemstone care guide' },
    { date: '2024-06-18', platform: 'youtube', type: 'video', content: 'Behind the scenes at SHUKRA' },
    { date: '2024-06-19', platform: 'instagram', type: 'story', content: 'Customer testimonial' },
    { date: '2024-06-20', platform: 'twitter', type: 'thread', content: 'Birthstone facts series' }
  ]

  const topHashtags = [
    { tag: '#ShukraGems', posts: 156, engagement: 4.2 },
    { tag: '#AuthenticGemstones', posts: 89, engagement: 3.8 },
    { tag: '#LuxuryJewelry', posts: 67, engagement: 5.1 },
    { tag: '#GemEducation', posts: 45, engagement: 3.5 },
    { tag: '#EthicalSourcing', posts: 34, engagement: 4.7 }
  ]

  const influencerCollaborations = [
    { name: 'Sarah Jewelry', platform: 'Instagram', followers: '245K', engagement: '4.2%', status: 'active' },
    { name: 'Gem Guru Mike', platform: 'YouTube', followers: '156K', engagement: '6.1%', status: 'negotiating' },
    { name: 'Crystal Healer Lisa', platform: 'TikTok', followers: '89K', engagement: '8.3%', status: 'completed' },
    { name: 'Luxury Lifestyle', platform: 'Instagram', followers: '567K', engagement: '3.4%', status: 'pending' }
  ]

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-5 h-5" />
      case 'facebook': return <Facebook className="w-5 h-5" />
      case 'twitter': return <Twitter className="w-5 h-5" />
      case 'youtube': return <Youtube className="w-5 h-5" />
      default: return null
    }
  }

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'instagram': return 'secondary'
      case 'facebook': return 'primary'
      case 'twitter': return 'default'
      case 'youtube': return 'danger'
      default: return 'default'
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Social Media Management</h1>
          <p className="text-gray-600">Manage your social media presence and engagement</p>
        </div>
        <Button color="primary" startContent={<Plus className="w-4 h-4" />}>
          Create Post
        </Button>
      </div>

      <Tabs aria-label="Social Media Management" className="mb-6">
        <Tab key="overview" title="Overview">
          {/* Platform Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {Object.entries(socialMetrics).map(([platform, metrics]) => (
              <Card key={platform} className="hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(platform)}
                      <span className="font-medium capitalize">{platform}</span>
                    </div>
                    <Chip color={getPlatformColor(platform)} size="sm" variant="flat">
                      {metrics.growth > 0 ? '+' : ''}{metrics.growth}%
                    </Chip>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Followers</span>
                      <span className="font-medium">{metrics.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Engagement</span>
                      <span className="font-medium">{metrics.engagement}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Monthly Reach</span>
                      <span className="font-medium">{(metrics.reach / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Recent Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Top Performing Hashtags</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {topHashtags.map((hashtag, index) => (
                    <div key={hashtag.tag} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-blue-600">{hashtag.tag}</div>
                        <div className="text-sm text-gray-600">{hashtag.posts} posts</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{hashtag.engagement}%</div>
                        <div className="text-sm text-gray-600">engagement</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Influencer Collaborations</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {influencerCollaborations.map((influencer, index) => (
                    <div key={influencer.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{influencer.name}</div>
                        <div className="text-sm text-gray-600">{influencer.platform} • {influencer.followers}</div>
                      </div>
                      <Chip 
                        color={
                          influencer.status === 'active' ? 'success' :
                          influencer.status === 'negotiating' ? 'warning' :
                          influencer.status === 'completed' ? 'primary' : 'default'
                        } 
                        size="sm"
                      >
                        {influencer.status}
                      </Chip>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="posts" title="Content Management">
          {/* Recent Posts */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Recent Posts</h3>
                <Select className="w-48" defaultSelectedKeys={['all']}>
                  <SelectItem key="all" value="all">All Platforms</SelectItem>
                  <SelectItem key="instagram" value="instagram">Instagram</SelectItem>
                  <SelectItem key="facebook" value="facebook">Facebook</SelectItem>
                  <SelectItem key="twitter" value="twitter">Twitter</SelectItem>
                  <SelectItem key="youtube" value="youtube">YouTube</SelectItem>
                </Select>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      {post.image && (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getPlatformIcon(post.platform)}
                          <span className="capitalize font-medium">{post.platform}</span>
                          <Chip 
                            color={post.status === 'published' ? 'success' : 'warning'} 
                            size="sm" 
                            variant="flat"
                          >
                            {post.status}
                          </Chip>
                          <span className="text-sm text-gray-600">{post.date}</span>
                        </div>
                        <p className="text-gray-700 mb-3">{post.content}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share className="w-4 h-4" />
                            <span>{post.shares}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.reach}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="calendar" title="Content Calendar">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Upcoming Content</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {contentCalendar.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">
                          {new Date(item.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        <div className="text-lg font-bold">
                          {new Date(item.date).getDate()}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getPlatformIcon(item.platform)}
                          <span className="font-medium capitalize">{item.platform}</span>
                          <Chip size="sm" variant="flat">
                            {item.type}
                          </Chip>
                        </div>
                        <div className="text-gray-600">{item.content}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="light">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="analytics" title="Analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardBody className="text-center">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">65.2K</div>
                <div className="text-sm text-gray-600">Total Followers</div>
                <div className="text-xs text-green-500 mt-1">+12% this month</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">4.3%</div>
                <div className="text-sm text-gray-600">Avg. Engagement</div>
                <div className="text-xs text-green-500 mt-1">+0.8% this month</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <Eye className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">435K</div>
                <div className="text-sm text-gray-600">Monthly Reach</div>
                <div className="text-xs text-green-500 mt-1">+18% this month</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <MessageCircle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">2.8K</div>
                <div className="text-sm text-gray-600">Total Interactions</div>
                <div className="text-xs text-green-500 mt-1">+25% this month</div>
              </CardBody>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Platform Performance</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {Object.entries(socialMetrics).map(([platform, metrics]) => (
                    <div key={platform}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(platform)}
                          <span className="capitalize font-medium">{platform}</span>
                        </div>
                        <span className="text-sm font-medium">{metrics.engagement}%</span>
                      </div>
                      <Progress value={metrics.engagement * 10} color="primary" className="max-w-full" />
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
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Photo Posts</span>
                    <div className="text-right">
                      <div className="font-medium">156 posts</div>
                      <div className="text-sm text-gray-600">4.2% avg engagement</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Video Content</span>
                    <div className="text-right">
                      <div className="font-medium">23 videos</div>
                      <div className="text-sm text-gray-600">6.8% avg engagement</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Educational Posts</span>
                    <div className="text-right">
                      <div className="font-medium">45 posts</div>
                      <div className="text-sm text-gray-600">5.1% avg engagement</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Product Showcases</span>
                    <div className="text-right">
                      <div className="font-medium">89 posts</div>
                      <div className="text-sm text-gray-600">3.7% avg engagement</div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}
