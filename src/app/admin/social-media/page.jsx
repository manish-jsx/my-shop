// src/app/admin/social-media/page.jsx
'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  Card, 
  CardBody, 
  CardHeader,
  Button, 
  Chip, 
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Avatar,
  Badge,
  Progress,
  Divider
} from '@nextui-org/react'
import { 
  Calendar,
  Plus,
  BarChart3,
  Settings,
  Image as ImageIcon,
  Video,
  FileText,
  Clock,
  Users,
  Heart,
  MessageCircle,
  Share,
  TrendingUp,
  Zap,
  Eye,
  ArrowRight,
  Activity,
  Target,
  Layers
} from 'lucide-react'
import { motion } from 'framer-motion'
import { socialLinks } from '@/components/ui/SocialMediaLinks'
import PostScheduler from '@/components/admin/social-media/PostScheduler'
import ContentCalendar from '@/components/admin/social-media/ContentCalendar'
import ContentLibrary from '@/components/admin/social-media/ContentLibrary'
import SocialAnalytics from '@/components/admin/social-media/SocialAnalytics'
import PostComposer from '@/components/admin/social-media/PostComposer'

// Quick action cards data
const quickActions = [
  {
    title: 'Content Calendar',
    description: 'Plan and schedule your content',
    icon: Calendar,
    color: 'primary',
    href: '/admin/social-media/calendar',
    stats: 'Next 7 days: 12 posts'
  },
  {
    title: 'Content Library',
    description: 'Manage your media assets',
    icon: ImageIcon,
    color: 'secondary',
    href: '/admin/social-media/library',
    stats: '143 assets stored'
  },
  {
    title: 'Post Scheduler',
    description: 'Schedule posts for optimal timing',
    icon: Clock,
    color: 'success',
    href: '/admin/social-media/scheduler',
    stats: '8 posts queued'
  },
  {
    title: 'Analytics',
    description: 'Track performance and insights',
    icon: BarChart3,
    color: 'warning',
    href: '/admin/social-media/analytics',
    stats: '+12% engagement'
  }
]

// Social media performance overview
const platformOverview = [
  {
    name: 'Instagram',
    followers: '12.5K',
    engagement: '4.2%',
    growth: '+8.3%',
    color: '#E4405F',
    posts: 23
  },
  {
    name: 'Facebook',
    followers: '8.7K',
    engagement: '3.1%',
    growth: '+5.2%',
    color: '#1877F2',
    posts: 18
  },
  {
    name: 'Twitter',
    followers: '6.2K',
    engagement: '2.8%',
    growth: '+12.1%',
    color: '#1DA1F2',
    posts: 31
  },
  {
    name: 'LinkedIn',
    followers: '4.1K',
    engagement: '5.7%',
    growth: '+15.4%',
    color: '#0A66C2',
    posts: 12
  }
]

// Mock data for social media accounts
const mockSocialAccounts = socialLinks.map((platform, index) => ({
  ...platform,
  id: index + 1,
  connected: true,
  followers: Math.floor(Math.random() * 50000) + 5000,
  engagement: Math.floor(Math.random() * 10) + 1,
  lastPost: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  postsThisWeek: Math.floor(Math.random() * 15) + 3,
  status: Math.random() > 0.1 ? 'active' : 'needs_attention'
}))

// Mock scheduled posts
const mockScheduledPosts = [
  {
    id: 1,
    content: '✨ Discover the mystical beauty of our Natural Amethyst Collection! Each crystal is hand-selected for its exceptional clarity and healing properties. 💜 #AmethystJewelry #HealingCrystals #SHUKRAGems',
    platforms: ['Instagram', 'Facebook', 'Pinterest'],
    scheduledDate: '2024-12-15T10:00:00Z',
    mediaUrls: ['/images/products/amethyst-1.jpg', '/images/products/amethyst-2.jpg'],
    status: 'scheduled',
    engagement: { likes: 0, comments: 0, shares: 0 }
  },
  {
    id: 2,
    content: 'Behind the scenes: Our master gemologist examining a rare Ceylon sapphire. The precision and expertise required to evaluate these precious stones is truly an art form. 🔍💎 #BehindTheScenes #Sapphire #Gemology',
    platforms: ['Instagram', 'YouTube', 'LinkedIn'],
    scheduledDate: '2024-12-16T14:30:00Z',
    mediaUrls: ['/images/content/gemologist-work.jpg'],
    status: 'scheduled',
    engagement: { likes: 0, comments: 0, shares: 0 }
  },
  {
    id: 3,
    content: `Customer Spotlight: Sarah's engagement story with our Royal Sapphire Ring 💍 "When I saw this ring, I knew it was the one. The craftsmanship is exquisite!" - Sarah M. #CustomerStory #EngagementRing #SapphireJewelry`,
    platforms: ['Facebook', 'Instagram'],
    scheduledDate: '2024-12-17T16:00:00Z',
    mediaUrls: ['/images/testimonials/sarah-ring.jpg'],
    status: 'scheduled',
    engagement: { likes: 0, comments: 0, shares: 0 }
  }
]

export default function SocialMediaDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [scheduledPosts, setScheduledPosts] = useState(mockScheduledPosts)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [composerMode, setComposerMode] = useState('create') // 'create' or 'schedule'

  // Post management functions
  const handlePostCreate = (newPost) => {
    console.log('Creating new post:', newPost)
    const postWithId = {
      ...newPost,
      id: Date.now(),
      status: newPost.status || 'draft',
      engagement: { likes: 0, comments: 0, shares: 0 }
    }
    setScheduledPosts(prev => [...prev, postWithId])
  }

  const handlePostUpdate = (updatedPost) => {
    console.log('Updating post:', updatedPost)
    setScheduledPosts(prev => 
      prev.map(post => post.id === updatedPost.id ? updatedPost : post)
    )
  }

  const handlePostDelete = (postId) => {
    console.log('Deleting post:', postId)
    setScheduledPosts(prev => prev.filter(post => post.id !== postId))
  }

  // Calculate overview stats
  const overviewStats = useMemo(() => {
    const totalFollowers = platformOverview.reduce((sum, platform) => 
      sum + parseInt(platform.followers.replace('K', '')) * 1000, 0)
    const avgEngagement = platformOverview.reduce((sum, platform) => 
      sum + parseFloat(platform.engagement), 0) / platformOverview.length
    const totalPosts = platformOverview.reduce((sum, platform) => sum + platform.posts, 0)
    const scheduledPostsCount = scheduledPosts.length

    return {
      totalFollowers,
      avgEngagement,
      totalPosts,
      scheduledPosts: scheduledPostsCount,
      activePlatforms: platformOverview.length
    }
  }, [scheduledPosts])

  const handleComposePost = (mode = 'create') => {
    setComposerMode(mode)
    onOpen()
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Share className="w-8 h-8 text-primary" />
            Social Media Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Comprehensive social media management dashboard for all your platforms
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            color="secondary"
            variant="flat"
            startContent={<Calendar className="w-4 h-4" />}
            onPress={() => handleComposePost('schedule')}
          >
            Schedule Post
          </Button>
          <Button
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
            onPress={() => handleComposePost('create')}
          >
            Create Post
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={action.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-${action.color}/10`}>
                        <IconComponent className={`w-6 h-6 text-${action.color}`} />
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{action.description}</p>
                    <p className="text-xs text-gray-500">{action.stats}</p>
                  </CardBody>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Platform Overview */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Platform Performance Overview
          </h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformOverview.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center"
              >
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: platform.color }}
                >
                  {platform.name.charAt(0)}
                </div>
                <h3 className="font-semibold mb-2">{platform.name}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Followers:</span>
                    <span className="font-medium">{platform.followers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Engagement:</span>
                    <span className="font-medium">{platform.engagement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth:</span>
                    <span className={`font-medium ${platform.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {platform.growth}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posts:</span>
                    <span className="font-medium">{platform.posts}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          {
            title: 'Total Followers',
            value: formatNumber(overviewStats.totalFollowers),
            icon: Users,
            color: 'primary'
          },
          {
            title: 'Avg Engagement',
            value: `${overviewStats.avgEngagement.toFixed(1)}%`,
            icon: Heart,
            color: 'danger'
          },
          {
            title: 'Total Posts',
            value: overviewStats.totalPosts,
            icon: FileText,
            color: 'success'
          },
          {
            title: 'Scheduled',
            value: overviewStats.scheduledPosts,
            icon: Clock,
            color: 'warning'
          },
          {
            title: 'Platforms',
            value: overviewStats.activePlatforms,
            icon: Layers,
            color: 'secondary'
          }
        ].map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardBody className="p-4 text-center">
                  <IconComponent className={`w-6 h-6 text-${stat.color} mx-auto mb-2`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </CardBody>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onSelectionChange={setSelectedTab} className="w-full">
        <Tab key="overview" title="Quick Overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Recent Scheduled Posts */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-lg font-semibold">Upcoming Posts</h3>
                  <Link href="/admin/social-media/scheduler">
                    <Button size="sm" variant="flat" endContent={<ArrowRight className="w-4 h-4" />}>
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {scheduledPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-1">
                          {post.platforms.slice(0, 2).map((platform) => (
                            <Chip key={platform} size="sm" variant="flat">
                              {platform}
                            </Chip>
                          ))}
                          {post.platforms.length > 2 && (
                            <Chip size="sm" variant="flat">
                              +{post.platforms.length - 2}
                            </Chip>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(post.scheduledDate).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm line-clamp-2">{post.content}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Quick Actions</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  <Link href="/admin/social-media/calendar">
                    <Button className="w-full justify-start" variant="flat" startContent={<Calendar className="w-4 h-4" />}>
                      Open Content Calendar
                    </Button>
                  </Link>
                  <Link href="/admin/social-media/library">
                    <Button className="w-full justify-start" variant="flat" startContent={<ImageIcon className="w-4 h-4" />}>
                      Browse Content Library
                    </Button>
                  </Link>
                  <Link href="/admin/social-media/analytics">
                    <Button className="w-full justify-start" variant="flat" startContent={<BarChart3 className="w-4 h-4" />}>
                      View Analytics
                    </Button>
                  </Link>
                  <Button 
                    className="w-full justify-start" 
                    color="primary" 
                    startContent={<Plus className="w-4 h-4" />}
                    onPress={() => handleComposePost('create')}
                  >
                    Create New Post
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="calendar" title="Content Calendar">
          <div className="mt-6">
            <ContentCalendar 
              scheduledPosts={scheduledPosts} 
              socialAccounts={socialLinks}
              onPostUpdate={handlePostUpdate}
              onPostDelete={handlePostDelete}
              onPostCreate={handlePostCreate}
            />
          </div>
        </Tab>

        <Tab key="scheduler" title="Post Scheduler">
          <div className="mt-6">
            <PostScheduler 
              scheduledPosts={scheduledPosts} 
              socialAccounts={socialLinks}
              onPostUpdate={handlePostUpdate}
              onPostDelete={handlePostDelete}
              onPostCreate={handlePostCreate}
            />
          </div>
        </Tab>

        <Tab key="library" title="Content Library">
          <div className="mt-6">
            <ContentLibrary />
          </div>
        </Tab>

        <Tab key="analytics" title="Analytics">
          <div className="mt-6">
            <SocialAnalytics socialAccounts={socialLinks} />
          </div>
        </Tab>
      </Tabs>

      {/* Post Composer Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader>
            {composerMode === 'schedule' ? 'Schedule New Post' : 'Create New Post'}
          </ModalHeader>
          <ModalBody>
            <PostComposer 
              mode={composerMode}
              socialAccounts={socialLinks}
              onClose={onClose}
              onPostCreate={handlePostCreate}
              onPostUpdate={handlePostUpdate}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
