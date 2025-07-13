// src/components/admin/social-media/ContentCalendar.jsx
'use client'
import { useState, useMemo } from 'react'
import { 
  Card, 
  CardBody, 
  CardHeader,
  Button, 
  Chip, 
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Avatar,
  Badge,
  Select,
  SelectItem,
  Input,
  Tabs,
  Tab,
  Switch,
  Textarea,
  DatePicker,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Progress,
  Divider,
  Tooltip,
  CheckboxGroup,
  Checkbox,
  Slider,
  Image,
  Spacer,
  ScrollShadow,
  Spinner,
  ButtonGroup
} from '@nextui-org/react'
import { 
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Eye,
  Clock,
  Image as ImageIcon,
  Video,
  FileText,
  Filter,
  Search,
  Download,
  Copy,
  MoreHorizontal,
  Hash,
  AtSign,
  MapPin,
  Users,
  Target,
  Bell,
  Star,
  Send,
  Save,
  Upload,
  X,
  Camera,
  Mic,
  Link,
  Globe,
  Repeat,
  CheckCircle,
  AlertCircle,
  Info,
  XCircle,
  TrendingUp,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'

const POST_STATUS_COLORS = {
  'scheduled': 'primary',
  'published': 'success',
  'failed': 'danger',
  'draft': 'warning',
  'pending': 'secondary'
}

const RECURRING_OPTIONS = [
  { key: 'none', label: 'No Repeat' },
  { key: 'daily', label: 'Daily' },
  { key: 'weekly', label: 'Weekly' },
  { key: 'biweekly', label: 'Bi-weekly' },
  { key: 'monthly', label: 'Monthly' }
]

const FILTER_OPTIONS = [
  { key: 'all', label: 'All Posts' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'published', label: 'Published' },
  { key: 'failed', label: 'Failed' },
  { key: 'draft', label: 'Drafts' }
]

const SOCIAL_PLATFORMS = [
  { 
    key: 'facebook', 
    label: 'Facebook', 
    icon: '📘', 
    color: 'primary',
    characterLimit: 63206,
    features: ['images', 'videos', 'links', 'events']
  },
  { 
    key: 'twitter', 
    label: 'Twitter', 
    icon: '🐦', 
    color: 'secondary',
    characterLimit: 280,
    features: ['images', 'videos', 'threads']
  },
  { 
    key: 'instagram', 
    label: 'Instagram', 
    icon: '📷', 
    color: 'warning',
    characterLimit: 2200,
    features: ['images', 'videos', 'stories', 'reels']
  },
  { 
    key: 'linkedin', 
    label: 'LinkedIn', 
    icon: '💼', 
    color: 'success',
    characterLimit: 3000,
    features: ['images', 'videos', 'articles', 'polls']
  },
  { 
    key: 'youtube', 
    label: 'YouTube', 
    icon: '📺', 
    color: 'danger',
    characterLimit: 5000,
    features: ['videos', 'thumbnails', 'shorts']
  },
  { 
    key: 'tiktok', 
    label: 'TikTok', 
    icon: '🎵', 
    color: 'default',
    characterLimit: 2200,
    features: ['videos', 'effects', 'sounds']
  }
]

const CONTENT_CATEGORIES = [
  { key: 'announcement', label: 'Announcement', icon: '📢' },
  { key: 'product', label: 'Product', icon: '🛍️' },
  { key: 'educational', label: 'Educational', icon: '📚' },
  { key: 'entertainment', label: 'Entertainment', icon: '🎭' },
  { key: 'promotional', label: 'Promotional', icon: '🎯' },
  { key: 'news', label: 'News', icon: '📰' },
  { key: 'event', label: 'Event', icon: '📅' },
  { key: 'behind-scenes', label: 'Behind the Scenes', icon: '🎬' }
]

const AUDIENCE_SEGMENTS = [
  { key: 'all', label: 'All Followers' },
  { key: 'age-18-24', label: 'Age 18-24' },
  { key: 'age-25-34', label: 'Age 25-34' },
  { key: 'age-35-44', label: 'Age 35-44' },
  { key: 'age-45-54', label: 'Age 45-54' },
  { key: 'age-55+', label: 'Age 55+' },
  { key: 'interests-tech', label: 'Tech Enthusiasts' },
  { key: 'interests-fashion', label: 'Fashion' },
  { key: 'interests-travel', label: 'Travel' },
  { key: 'interests-food', label: 'Food & Dining' }
]

export default function ContentCalendar({ scheduledPosts = [], socialAccounts = [], onPostUpdate, onPostDelete, onPostCreate }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedPost, setSelectedPost] = useState(null)
  const [viewMode, setViewMode] = useState('month')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editFormData, setEditFormData] = useState({})
  const [isDragging, setIsDragging] = useState(false)
  const [draggedPost, setDraggedPost] = useState(null)
  const [bulkActionMode, setBulkActionMode] = useState(false)
  const [selectedPosts, setSelectedPosts] = useState([])
  
  // Post creation form state
  const [newPostForm, setNewPostForm] = useState({
    content: '',
    platforms: [],
    scheduledDate: null,
    scheduledTime: '',
    status: 'draft',
    mediaFiles: [],
    hashtags: [],
    mentions: [],
    location: '',
    category: '',
    priority: 'medium',
    notes: '',
    isRecurring: false,
    recurringPattern: 'daily',
    recurringEndDate: null,
    targetAudience: [],
    campaignId: '',
    approvalRequired: false
  })
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isRecurringOpen, onOpen: onRecurringOpen, onClose: onRecurringClose } = useDisclosure()
  const { isOpen: isCreatePostOpen, onOpen: onCreatePostOpen, onClose: onCreatePostClose } = useDisclosure()

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  // Filter posts based on status and search
  const filteredPosts = useMemo(() => {
    return scheduledPosts.filter(post => {
      const matchesStatus = filterStatus === 'all' || post.status === filterStatus
      const matchesSearch = searchQuery === '' || 
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.platforms.some(platform => platform.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesStatus && matchesSearch
    })
  }, [scheduledPosts, filterStatus, searchQuery])

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days = []
    
    // Previous month's trailing days
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate()
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(currentYear, currentMonth - 1, prevMonthDays - i),
        isCurrentMonth: false,
        posts: []
      })
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const postsForDay = filteredPosts.filter(post => {
        const postDate = new Date(post.scheduledDate)
        return postDate.toDateString() === date.toDateString()
      })
      
      days.push({
        date,
        isCurrentMonth: true,
        posts: postsForDay
      })
    }
    
    // Next month's leading days
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(currentYear, currentMonth + 1, day),
        isCurrentMonth: false,
        posts: []
      })
    }
    
    return days
  }, [currentDate, filteredPosts, currentMonth, currentYear, daysInMonth, firstDayOfMonth])

  // Calculate calendar stats
  const calendarStats = useMemo(() => {
    const totalPosts = filteredPosts.length
    const publishedPosts = filteredPosts.filter(p => p.status === 'published').length
    const scheduledPostsCount = filteredPosts.filter(p => p.status === 'scheduled').length
    const failedPosts = filteredPosts.filter(p => p.status === 'failed').length
    
    return {
      totalPosts,
      publishedPosts,
      scheduledPostsCount,
      failedPosts,
      avgPostsPerDay: totalPosts / daysInMonth
    }
  }, [filteredPosts, daysInMonth])

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + direction)
      return newDate
    })
  }

  const navigateToToday = () => {
    setCurrentDate(new Date())
  }

  const getPostTypeIcon = (postType) => {
    switch (postType) {
      case 'image':
        return ImageIcon
      case 'video':
        return Video
      default:
        return FileText
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return CheckCircle
      case 'failed':
        return XCircle
      case 'scheduled':
        return Clock
      default:
        return AlertCircle
    }
  }

  const handlePostClick = (post) => {
    setSelectedPost(post)
    setEditFormData(post)
    setIsEditing(false)
    onOpen()
  }

  const handleEditPost = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = async () => {
    try {
      if (onPostUpdate) {
        await onPostUpdate(editFormData)
      }
      setIsEditing(false)
      onClose()
    } catch (error) {
      console.error('Failed to update post:', error)
    }
  }

  const handleDeletePost = async (postId) => {
    try {
      if (onPostDelete) {
        await onPostDelete(postId)
      }
      onClose()
    } catch (error) {
      console.error('Failed to delete post:', error)
    }
  }

  const handleDuplicatePost = async (post) => {
    try {
      const duplicatedPost = {
        ...post,
        id: Date.now(),
        content: post.content + ' (Copy)',
        scheduledDate: null,
        status: 'draft'
      }
      
      if (onPostCreate) {
        await onPostCreate(duplicatedPost)
      }
    } catch (error) {
      console.error('Failed to duplicate post:', error)
    }
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  // Post creation functions
  const handleCreatePost = async () => {
    try {
      if (onPostCreate) {
        const newPost = {
          ...newPostForm,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        await onPostCreate(newPost)
        resetNewPostForm()
        onCreatePostClose()
      }
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }

  const resetNewPostForm = () => {
    setNewPostForm({
      content: '',
      platforms: [],
      scheduledDate: null,
      scheduledTime: '',
      status: 'draft',
      mediaFiles: [],
      hashtags: [],
      mentions: [],
      location: '',
      category: '',
      priority: 'medium',
      notes: '',
      isRecurring: false,
      recurringPattern: 'daily',
      recurringEndDate: null,
      targetAudience: [],
      campaignId: '',
      approvalRequired: false
    })
  }

  const handleMediaUpload = (files) => {
    const newMediaFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      alt: '',
      caption: ''
    }))
    
    setNewPostForm(prev => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...newMediaFiles]
    }))
  }

  const removeMediaFile = (fileId) => {
    setNewPostForm(prev => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter(file => file.id !== fileId)
    }))
  }

  const addHashtag = (hashtag) => {
    if (hashtag && !newPostForm.hashtags.includes(hashtag)) {
      setNewPostForm(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, hashtag]
      }))
    }
  }

  const removeHashtag = (hashtag) => {
    setNewPostForm(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(tag => tag !== hashtag)
    }))
  }

  const addMention = (mention) => {
    if (mention && !newPostForm.mentions.includes(mention)) {
      setNewPostForm(prev => ({
        ...prev,
        mentions: [...prev.mentions, mention]
      }))
    }
  }

  const removeMention = (mention) => {
    setNewPostForm(prev => ({
      ...prev,
      mentions: prev.mentions.filter(m => m !== mention)
    }))
  }

  const updateNewPostForm = (field, value) => {
    setNewPostForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getCharacterCount = () => {
    return newPostForm.content.length
  }

  const getCharacterLimit = () => {
    if (newPostForm.platforms.length === 0) return 280
    
    const selectedPlatforms = SOCIAL_PLATFORMS.filter(platform => 
      newPostForm.platforms.includes(platform.key)
    )
    
    return Math.min(...selectedPlatforms.map(platform => platform.characterLimit))
  }

  const isFormValid = () => {
    return newPostForm.content.trim().length > 0 && 
           newPostForm.platforms.length > 0 &&
           (newPostForm.status === 'draft' || newPostForm.scheduledDate)
  }

  const isPast = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  return (
    <div className="space-y-6">
      {/* Calendar Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{calendarStats.totalPosts}</p>
                <p className="text-sm text-gray-600">Total Posts</p>
              </div>
              <Calendar className="w-6 h-6 text-primary" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{calendarStats.publishedPosts}</p>
                <p className="text-sm text-gray-600">Published</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{calendarStats.scheduledPostsCount}</p>
                <p className="text-sm text-gray-600">Scheduled</p>
              </div>
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">{calendarStats.failedPosts}</p>
                <p className="text-sm text-gray-600">Failed</p>
              </div>
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">{calendarStats.avgPostsPerDay.toFixed(1)}</p>
                <p className="text-sm text-gray-600">Avg/Day</p>
              </div>
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold">Content Calendar</h3>
              <Select
                label="View"
                selectedKeys={[viewMode]}
                onSelectionChange={(keys) => setViewMode(Array.from(keys)[0])}
                className="w-32"
              >
                <SelectItem key="day">Day</SelectItem>
                <SelectItem key="week">Week</SelectItem>
                <SelectItem key="month">Month</SelectItem>
                <SelectItem key="agenda">Agenda</SelectItem>
              </Select>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                startContent={<Search className="w-4 h-4" />}
                className="w-48"
                size="sm"
              />
              
              <Select
                placeholder="Filter"
                selectedKeys={[filterStatus]}
                onSelectionChange={(keys) => setFilterStatus(Array.from(keys)[0])}
                className="w-32"
                size="sm"
              >
                {FILTER_OPTIONS.map((option) => (
                  <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
              </Select>
              
              <Button
                size="sm"
                variant="flat"
                startContent={<Download className="w-4 h-4" />}
              >
                Export
              </Button>
              
              <Switch
                size="sm"
                isSelected={bulkActionMode}
                onValueChange={setBulkActionMode}
              >
                <span className="text-sm">Bulk Actions</span>
              </Switch>
            </div>
          </div>
          
          <div className="flex items-center justify-between w-full mt-4">
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                variant="flat"
                onPress={() => navigateMonth(-1)}
                size="sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Button
                variant="flat"
                onPress={navigateToToday}
                size="sm"
              >
                Today
              </Button>
              
              <Button
                isIconOnly
                variant="flat"
                onPress={() => navigateMonth(1)}
                size="sm"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              
              <div className="min-w-48 text-center">
                <h4 className="text-lg font-semibold">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h4>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Tooltip content="Create and schedule posts across multiple platforms">
                <Button
                  color="primary"
                  startContent={<Plus className="w-4 h-4" />}
                  size="sm"
                  onPress={onCreatePostOpen}
                  className="font-semibold"
                >
                  New Post
                </Button>
              </Tooltip>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Calendar Grid */}
      <Card>
        <CardBody className="p-0">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 border-b">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-4 text-center font-semibold border-r last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => (
              <motion.div
                key={index}
                className={`min-h-32 p-2 border-r border-b last:border-r-0 ${
                  !day.isCurrentMonth 
                    ? 'bg-gray-50 text-gray-400' 
                    : isToday(day.date)
                    ? 'bg-blue-50'
                    : isPast(day.date)
                    ? 'bg-gray-25'
                    : 'bg-white'
                } ${isDragging ? 'transition-colors hover:bg-blue-100' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.01 }}
              >
                {/* Date */}
                <div className={`text-sm font-medium mb-2 flex items-center justify-between ${
                  isToday(day.date) ? 'text-blue-600' : ''
                }`}>
                  <span>{day.date.getDate()}</span>
                  {day.posts.length > 0 && (
                    <Badge content={day.posts.length} color="primary" size="sm" />
                  )}
                </div>
                
                {/* Posts */}
                <div className="space-y-1">
                  {day.posts.slice(0, 3).map((post) => {
                    const PostIcon = getPostTypeIcon(post.postType)
                    const StatusIcon = getStatusIcon(post.status)
                    
                    return (
                      <motion.div
                        key={post.id}
                        className={`p-2 rounded text-xs cursor-pointer transition-colors relative ${
                          post.status === 'published' ? 'bg-green-50 hover:bg-green-100' :
                          post.status === 'failed' ? 'bg-red-50 hover:bg-red-100' :
                          post.status === 'scheduled' ? 'bg-blue-50 hover:bg-blue-100' :
                          'bg-gray-50 hover:bg-gray-100'
                        } ${selectedPosts.includes(post.id) ? 'ring-2 ring-primary' : ''}`}
                        onClick={(e) => {
                          if (bulkActionMode) {
                            e.stopPropagation()
                            setSelectedPosts(prev => 
                              prev.includes(post.id) 
                                ? prev.filter(id => id !== post.id)
                                : [...prev, post.id]
                            )
                          } else {
                            handlePostClick(post)
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <PostIcon className="w-3 h-3" />
                          <span className="font-medium">{formatTime(post.scheduledDate)}</span>
                          <StatusIcon className={`w-3 h-3 ml-auto ${
                            post.status === 'published' ? 'text-green-600' :
                            post.status === 'failed' ? 'text-red-600' :
                            post.status === 'scheduled' ? 'text-blue-600' :
                            'text-gray-600'
                          }`} />
                        </div>
                        
                        <p className="line-clamp-2 text-gray-700">
                          {post.content.slice(0, 50)}...
                        </p>
                        
                        <div className="flex gap-1 mt-1">
                          {post.platforms.slice(0, 3).map((platformName) => {
                            const platform = socialAccounts.find(acc => acc.name === platformName)
                            return platform ? (
                              <Avatar
                                key={platformName}
                                size="sm"
                                icon={<platform.icon className="w-2 h-2" />}
                                className={`bg-gradient-to-r ${platform.color} text-white w-4 h-4`}
                              />
                            ) : null
                          })}
                          {post.platforms.length > 3 && (
                            <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                              +{post.platforms.length - 3}
                            </div>
                          )}
                        </div>
                        
                        {bulkActionMode && (
                          <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded border-2 border-gray-300 flex items-center justify-center">
                            {selectedPosts.includes(post.id) && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                  
                  {day.posts.length > 3 && (
                    <div className="text-xs text-gray-500 text-center py-1">
                      +{day.posts.length - 3} more
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Post Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
        <ModalContent>
          {selectedPost && (
            <>
              <ModalHeader>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {selectedPost.platforms.map((platformName) => {
                        const platform = socialAccounts.find(acc => acc.name === platformName)
                        return platform ? (
                          <Avatar
                            key={platformName}
                            size="sm"
                            icon={<platform.icon className="w-4 h-4" />}
                            className={`bg-gradient-to-r ${platform.color} text-white`}
                          />
                        ) : null
                      })}
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        {isEditing ? 'Edit Post' : 'Scheduled Post'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {new Date(selectedPost.scheduledDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <Chip 
                    color={POST_STATUS_COLORS[selectedPost.status] || 'default'} 
                    variant="flat"
                  >
                    {selectedPost.status}
                  </Chip>
                </div>
              </ModalHeader>
              
              <ModalBody>
                {isEditing ? (
                  <div className="space-y-4">
                    <Textarea
                      label="Post Content"
                      value={editFormData.content}
                      onValueChange={(value) => 
                        setEditFormData(prev => ({ ...prev, content: value }))
                      }
                      minRows={6}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Target Audience"
                        value={editFormData.targetAudience || ''}
                        onValueChange={(value) =>
                          setEditFormData(prev => ({ ...prev, targetAudience: value }))
                        }
                      />
                      
                      <Select
                        label="Priority"
                        selectedKeys={[editFormData.priority || 'normal']}
                        onSelectionChange={(keys) =>
                          setEditFormData(prev => ({
                            ...prev,
                            priority: Array.from(keys)[0]
                          }))
                        }
                      >
                        <SelectItem key="low">Low Priority</SelectItem>
                        <SelectItem key="normal">Normal Priority</SelectItem>
                        <SelectItem key="high">High Priority</SelectItem>
                        <SelectItem key="urgent">Urgent</SelectItem>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium mb-2">Content</h5>
                      <p className="text-sm bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
                        {selectedPost.content}
                      </p>
                    </div>
                    
                    {selectedPost.mediaUrls && selectedPost.mediaUrls.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-2">Media</h5>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedPost.mediaUrls.slice(0, 6).map((url, index) => (
                            <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Divider />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Target Audience</p>
                        <p className="text-gray-600">{selectedPost.targetAudience || 'All followers'}</p>
                      </div>
                      <div>
                        <p className="font-medium">Post Type</p>
                        <p className="text-gray-600 capitalize">{selectedPost.postType || 'text'}</p>
                      </div>
                      <div>
                        <p className="font-medium">Priority</p>
                        <p className="text-gray-600 capitalize">{selectedPost.priority || 'normal'}</p>
                      </div>
                      <div>
                        <p className="font-medium">Status</p>
                        <Chip size="sm" color={POST_STATUS_COLORS[selectedPost.status] || 'default'} variant="flat">
                          {selectedPost.status}
                        </Chip>
                      </div>
                    </div>
                    
                    {selectedPost.engagement && (
                      <div>
                        <h5 className="font-medium mb-2">Performance</h5>
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div>
                            <p className="text-lg font-bold">{selectedPost.engagement.likes}</p>
                            <p className="text-xs text-gray-600">Likes</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold">{selectedPost.engagement.comments}</p>
                            <p className="text-xs text-gray-600">Comments</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold">{selectedPost.engagement.shares}</p>
                            <p className="text-xs text-gray-600">Shares</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold">{selectedPost.engagement.views || 0}</p>
                            <p className="text-xs text-gray-600">Views</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ModalBody>
              
              <ModalFooter>
                <div className="flex justify-between w-full">
                  <div className="flex gap-2">
                    {!isEditing && (
                      <Button 
                        variant="flat" 
                        startContent={<Copy className="w-4 h-4" />}
                        onPress={() => handleDuplicatePost(selectedPost)}
                      >
                        Duplicate
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button variant="flat" onPress={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button color="primary" onPress={handleSaveEdit}>
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="flat" onPress={onClose}>
                          Close
                        </Button>
                        <Button variant="flat" startContent={<Edit className="w-4 h-4" />} onPress={handleEditPost}>
                          Edit
                        </Button>
                        <Button variant="flat" startContent={<Eye className="w-4 h-4" />}>
                          Preview
                        </Button>
                        <Button 
                          color="danger" 
                          variant="flat" 
                          startContent={<Trash2 className="w-4 h-4" />}
                          onPress={() => handleDeletePost(selectedPost.id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Recurring Post Modal */}
      <Modal isOpen={isRecurringOpen} onClose={onRecurringClose} size="md">
        <ModalContent>
          <ModalHeader>Set Recurring Schedule</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Select label="Frequency">
                {RECURRING_OPTIONS.filter(option => option.key !== 'none').map((option) => (
                  <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
              </Select>
              
              <Input
                type="number"
                label="Number of posts"
                placeholder="How many posts to create?"
                min="1"
                max="50"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onRecurringClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={onRecurringClose}>
              Create Recurring Posts
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Create Post Modal */}
      <Modal 
        isOpen={isCreatePostOpen} 
        onClose={onCreatePostClose} 
        size="5xl" 
        scrollBehavior="inside"
        classNames={{
          base: "max-h-[90vh]",
          body: "p-0"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-between border-b">
                <div className="flex items-center gap-3">
                  <Send className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Create New Post</h3>
                    <p className="text-sm text-default-500">
                      Schedule and publish content across multiple platforms
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Chip
                    size="sm"
                    variant="flat"
                    color={isFormValid() ? "success" : "warning"}
                    startContent={isFormValid() ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  >
                    {isFormValid() ? "Ready to Post" : "Incomplete"}
                  </Chip>
                </div>
              </ModalHeader>
              
              <ModalBody>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                  {/* Main Content Area */}
                  <div className="lg:col-span-2 space-y-6">
                    
                    {/* Platform Selection */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <h4 className="font-semibold">Select Platforms</h4>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <CheckboxGroup
                          value={newPostForm.platforms}
                          onValueChange={(value) => updateNewPostForm('platforms', value)}
                          orientation="horizontal"
                          className="gap-4"
                        >
                          {SOCIAL_PLATFORMS.map((platform) => (
                            <Checkbox key={platform.key} value={platform.key}>
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{platform.icon}</span>
                                <span className="text-sm font-medium">{platform.label}</span>
                              </div>
                            </Checkbox>
                          ))}
                        </CheckboxGroup>
                      </CardBody>
                    </Card>

                    {/* Content Composer */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <h4 className="font-semibold">Content</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-default-500">
                              {getCharacterCount()}/{getCharacterLimit()}
                            </span>
                            <Progress
                              size="sm"
                              value={(getCharacterCount() / getCharacterLimit()) * 100}
                              color={getCharacterCount() > getCharacterLimit() ? "danger" : "primary"}
                              className="w-16"
                            />
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <Textarea
                          placeholder="What's on your mind? Share your thoughts..."
                          value={newPostForm.content}
                          onValueChange={(value) => updateNewPostForm('content', value)}
                          minRows={6}
                          maxRows={12}
                          className="w-full"
                        />
                        
                        {/* Content Tools */}
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                          <Button
                            size="sm"
                            variant="flat"
                            startContent={<Hash className="w-3 h-3" />}
                            onPress={() => {
                              const hashtag = prompt("Enter hashtag (without #):")
                              if (hashtag) addHashtag(hashtag)
                            }}
                          >
                            Add Hashtag
                          </Button>
                          <Button
                            size="sm"
                            variant="flat"
                            startContent={<AtSign className="w-3 h-3" />}
                            onPress={() => {
                              const mention = prompt("Enter username to mention:")
                              if (mention) addMention(mention)
                            }}
                          >
                            Add Mention
                          </Button>
                          <Button
                            size="sm"
                            variant="flat"
                            startContent={<MapPin className="w-3 h-3" />}
                            onPress={() => {
                              const location = prompt("Enter location:")
                              if (location) updateNewPostForm('location', location)
                            }}
                          >
                            Add Location
                          </Button>
                        </div>

                        {/* Hashtags and Mentions Display */}
                        {(newPostForm.hashtags.length > 0 || newPostForm.mentions.length > 0) && (
                          <div className="mt-4 space-y-2">
                            {newPostForm.hashtags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {newPostForm.hashtags.map((hashtag, index) => (
                                  <Chip
                                    key={index}
                                    size="sm"
                                    variant="flat"
                                    color="primary"
                                    onClose={() => removeHashtag(hashtag)}
                                  >
                                    #{hashtag}
                                  </Chip>
                                ))}
                              </div>
                            )}
                            {newPostForm.mentions.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {newPostForm.mentions.map((mention, index) => (
                                  <Chip
                                    key={index}
                                    size="sm"
                                    variant="flat"
                                    color="secondary"
                                    onClose={() => removeMention(mention)}
                                  >
                                    @{mention}
                                  </Chip>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </CardBody>
                    </Card>

                    {/* Media Upload */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          <h4 className="font-semibold">Media</h4>
                        </div>
                      </CardHeader>
                      <CardBody>
                        {/* Upload Area */}
                        <div className="border-2 border-dashed border-default-200 rounded-lg p-6 text-center">
                          <input
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            onChange={(e) => handleMediaUpload(e.target.files)}
                            className="hidden"
                            id="media-upload"
                          />
                          <label htmlFor="media-upload" className="cursor-pointer">
                            <Upload className="w-8 h-8 text-default-400 mx-auto mb-2" />
                            <p className="text-sm text-default-600">
                              Drop files here or click to upload
                            </p>
                            <p className="text-xs text-default-400 mt-1">
                              Supports images and videos up to 100MB
                            </p>
                          </label>
                        </div>

                        {/* Media Preview */}
                        {newPostForm.mediaFiles.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                            {newPostForm.mediaFiles.map((file) => (
                              <div key={file.id} className="relative group">
                                <div className="aspect-square rounded-lg overflow-hidden bg-default-100">
                                  {file.type.startsWith('image/') ? (
                                    <Image
                                      src={file.url}
                                      alt={file.alt || file.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <Video className="w-8 h-8 text-default-400" />
                                    </div>
                                  )}
                                </div>
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="solid"
                                  color="danger"
                                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onPress={() => removeMediaFile(file.id)}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardBody>
                    </Card>

                    {/* Advanced Options */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          <h4 className="font-semibold">Advanced Options</h4>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <Tabs aria-label="Advanced Options">
                          <Tab key="targeting" title="Targeting">
                            <div className="space-y-4 pt-4">
                              <Select
                                label="Target Audience"
                                placeholder="Select audience segments"
                                selectionMode="multiple"
                                selectedKeys={newPostForm.targetAudience}
                                onSelectionChange={(value) => updateNewPostForm('targetAudience', Array.from(value))}
                              >
                                {AUDIENCE_SEGMENTS.map((segment) => (
                                  <SelectItem key={segment.key}>{segment.label}</SelectItem>
                                ))}
                              </Select>
                            </div>
                          </Tab>
                          <Tab key="campaign" title="Campaign">
                            <div className="space-y-4 pt-4">
                              <Input
                                label="Campaign ID"
                                placeholder="Link to a marketing campaign"
                                value={newPostForm.campaignId}
                                onValueChange={(value) => updateNewPostForm('campaignId', value)}
                              />
                              <Select
                                label="Category"
                                placeholder="Content category"
                                selectedKeys={newPostForm.category ? [newPostForm.category] : []}
                                onSelectionChange={(value) => updateNewPostForm('category', Array.from(value)[0] || '')}
                              >
                                {CONTENT_CATEGORIES.map((category) => (
                                  <SelectItem key={category.key} startContent={<span>{category.icon}</span>}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          </Tab>
                          <Tab key="notes" title="Notes">
                            <div className="pt-4">
                              <Textarea
                                label="Internal Notes"
                                placeholder="Add notes for your team (not visible to audience)"
                                value={newPostForm.notes}
                                onValueChange={(value) => updateNewPostForm('notes', value)}
                                minRows={3}
                              />
                            </div>
                          </Tab>
                        </Tabs>
                      </CardBody>
                    </Card>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    
                    {/* Post Status & Priority */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <h4 className="font-semibold">Status & Priority</h4>
                        </div>
                      </CardHeader>
                      <CardBody className="space-y-4">
                        <Select
                          label="Status"
                          selectedKeys={[newPostForm.status]}
                          onSelectionChange={(value) => updateNewPostForm('status', Array.from(value)[0])}
                        >
                          <SelectItem key="draft">Draft</SelectItem>
                          <SelectItem key="scheduled">Scheduled</SelectItem>
                          <SelectItem key="published">Publish Now</SelectItem>
                        </Select>

                        <Select
                          label="Priority"
                          selectedKeys={[newPostForm.priority]}
                          onSelectionChange={(value) => updateNewPostForm('priority', Array.from(value)[0])}
                        >
                          <SelectItem key="low">Low</SelectItem>
                          <SelectItem key="medium">Medium</SelectItem>
                          <SelectItem key="high">High</SelectItem>
                          <SelectItem key="urgent">Urgent</SelectItem>
                        </Select>

                        <div className="flex items-center justify-between">
                          <span className="text-sm">Approval Required</span>
                          <Switch
                            size="sm"
                            isSelected={newPostForm.approvalRequired}
                            onValueChange={(value) => updateNewPostForm('approvalRequired', value)}
                          />
                        </div>
                      </CardBody>
                    </Card>

                    {/* Scheduling */}
                    {newPostForm.status === 'scheduled' && (
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <h4 className="font-semibold">Schedule</h4>
                          </div>
                        </CardHeader>
                        <CardBody className="space-y-4">
                          <DatePicker
                            label="Publish Date"
                            value={newPostForm.scheduledDate}
                            onChange={(value) => updateNewPostForm('scheduledDate', value)}
                          />
                          
                          <Input
                            type="time"
                            label="Publish Time"
                            value={newPostForm.scheduledTime}
                            onValueChange={(value) => updateNewPostForm('scheduledTime', value)}
                          />

                          <div className="flex items-center justify-between">
                            <span className="text-sm">Recurring Post</span>
                            <Switch
                              size="sm"
                              isSelected={newPostForm.isRecurring}
                              onValueChange={(value) => updateNewPostForm('isRecurring', value)}
                            />
                          </div>

                          {newPostForm.isRecurring && (
                            <div className="space-y-3">
                              <Select
                                label="Repeat"
                                selectedKeys={[newPostForm.recurringPattern]}
                                onSelectionChange={(value) => updateNewPostForm('recurringPattern', Array.from(value)[0])}
                              >
                                <SelectItem key="daily">Daily</SelectItem>
                                <SelectItem key="weekly">Weekly</SelectItem>
                                <SelectItem key="monthly">Monthly</SelectItem>
                                <SelectItem key="custom">Custom</SelectItem>
                              </Select>
                              
                              <DatePicker
                                label="End Date"
                                value={newPostForm.recurringEndDate}
                                onChange={(value) => updateNewPostForm('recurringEndDate', value)}
                              />
                            </div>
                          )}
                        </CardBody>
                      </Card>
                    )}

                    {/* Preview */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <h4 className="font-semibold">Preview</h4>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <div className="space-y-3">
                          <div className="text-sm text-default-600">
                            Preview how your post will appear:
                          </div>
                          
                          {/* Mock Post Preview */}
                          <div className="border rounded-lg p-3 bg-default-50">
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar size="sm" name="Your Brand" />
                              <div>
                                <p className="text-sm font-medium">Your Brand</p>
                                <p className="text-xs text-default-500">Just now</p>
                              </div>
                            </div>
                            
                            {newPostForm.content && (
                              <p className="text-sm mb-2">{newPostForm.content}</p>
                            )}
                            
                            {newPostForm.mediaFiles.length > 0 && (
                              <div className="grid grid-cols-2 gap-1 mb-2">
                                {newPostForm.mediaFiles.slice(0, 4).map((file) => (
                                  <div key={file.id} className="aspect-square bg-default-200 rounded">
                                    {file.type.startsWith('image/') && (
                                      <Image
                                        src={file.url}
                                        className="w-full h-full object-cover rounded"
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex items-center gap-4 text-xs text-default-500">
                              <span>👍 Like</span>
                              <span>💬 Comment</span>
                              <span>📤 Share</span>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          <h4 className="font-semibold">Quick Stats</h4>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-default-600">Characters:</span>
                            <span className={getCharacterCount() > getCharacterLimit() ? "text-danger" : "text-success"}>
                              {getCharacterCount()}/{getCharacterLimit()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-default-600">Platforms:</span>
                            <span>{newPostForm.platforms.length} selected</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-default-600">Media Files:</span>
                            <span>{newPostForm.mediaFiles.length} uploaded</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-default-600">Hashtags:</span>
                            <span>{newPostForm.hashtags.length} added</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-default-600">Best Time:</span>
                            <span className="text-success">3:00 PM</span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </ModalBody>
              
              <ModalFooter className="border-t">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="flat"
                      startContent={<Save className="w-4 h-4" />}
                      onPress={() => updateNewPostForm('status', 'draft')}
                    >
                      Save Draft
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="flat" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      startContent={newPostForm.status === 'published' ? <Send className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      onPress={handleCreatePost}
                      isDisabled={!isFormValid()}
                    >
                      {newPostForm.status === 'published' ? 'Publish Now' : 
                       newPostForm.status === 'scheduled' ? 'Schedule Post' : 'Save Draft'}
                    </Button>
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
