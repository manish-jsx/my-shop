// src/components/admin/social-media/ContentLibrary.jsx
'use client'
import { useState, useRef, useCallback } from 'react'
import { 
  Card, 
  CardBody, 
  CardHeader,
  Button, 
  Input,
  Select,
  SelectItem,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
  Textarea,
  Checkbox,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Slider,
  Switch,
  Progress,
  Badge,
  Tooltip,
  DatePicker,
  RadioGroup,
  Radio,
  Divider,
  ScrollShadow,
  User,
  Avatar
} from '@nextui-org/react'
import { 
  Search,
  Filter,
  Upload,
  Image as ImageIcon,
  Video,
  FileText,
  Folder,
  Plus,
  Download,
  Edit,
  Trash2,
  Eye,
  Share,
  Tag,
  Calendar,
  Copy,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Heart,
  Star,
  Clock,
  Users,
  MoreHorizontal,
  FolderPlus,
  Import,
  Archive,
  RefreshCw,
  Settings,
  Bookmark,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Crop,
  Palette,
  Zap,
  Database,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Move,
  Link,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Hash,
  Globe
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Enhanced mock content data with more properties
const mockContent = [
  {
    id: 1,
    type: 'image',
    title: 'Amethyst Collection Showcase',
    description: 'Beautiful amethyst jewelry collection photography',
    url: '/images/content/amethyst-collection.jpg',
    thumbnail: '/images/content/amethyst-collection-thumb.jpg',
    tags: ['amethyst', 'jewelry', 'collection', 'purple', 'luxury'],
    category: 'product',
    folder: 'Product Photos',
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
    usedInPosts: 5,
    size: '2.3 MB',
    sizeBytes: 2411724,
    dimensions: '1920x1080',
    aspectRatio: '16:9',
    colorPalette: ['#6B46C1', '#8B5CF6', '#A78BFA', '#C4B5FD'],
    alt: 'Beautiful amethyst jewelry collection on marble background',
    author: 'Sarah Johnson',
    authorAvatar: '/avatars/sarah.jpg',
    isPrivate: false,
    isFavorite: true,
    downloadCount: 15,
    viewCount: 234,
    rating: 4.8,
    status: 'approved',
    platforms: ['instagram', 'facebook', 'pinterest'],
    exifData: {
      camera: 'Canon EOS R5',
      lens: '24-70mm f/2.8',
      settings: 'f/5.6, 1/125s, ISO 400'
    }
  },
  {
    id: 2,
    type: 'video',
    title: 'Gemstone Cutting Process',
    description: 'Behind-the-scenes video of gemstone cutting and polishing',
    url: '/videos/content/gemstone-cutting.mp4',
    thumbnail: '/images/content/gemstone-cutting-thumb.jpg',
    tags: ['behind-the-scenes', 'process', 'craftsmanship', 'education', 'tutorial'],
    category: 'educational',
    folder: 'Educational Content',
    createdAt: '2024-11-28T14:30:00Z',
    updatedAt: '2024-11-28T14:30:00Z',
    usedInPosts: 3,
    size: '45.2 MB',
    sizeBytes: 47420826,
    duration: '2:45',
    resolution: '1920x1080',
    fps: 30,
    bitrate: '8000 kbps',
    alt: 'Master craftsman cutting and polishing a sapphire',
    author: 'Mike Chen',
    authorAvatar: '/avatars/mike.jpg',
    isPrivate: false,
    isFavorite: false,
    downloadCount: 8,
    viewCount: 567,
    rating: 4.9,
    status: 'approved',
    platforms: ['youtube', 'instagram', 'tiktok'],
    subtitle: true,
    hasAudio: true,
    chapters: [
      { time: '0:00', title: 'Introduction' },
      { time: '0:30', title: 'Initial Cutting' },
      { time: '1:45', title: 'Polishing Process' },
      { time: '2:30', title: 'Final Result' }
    ]
  },
  {
    id: 3,
    type: 'image',
    title: 'Customer Testimonial - Sarah',
    description: 'Happy customer wearing her engagement ring',
    url: '/images/content/testimonial-sarah.jpg',
    thumbnail: '/images/content/testimonial-sarah-thumb.jpg',
    tags: ['testimonial', 'customer', 'engagement', 'happy', 'review'],
    category: 'testimonial',
    folder: 'Customer Stories',
    createdAt: '2024-11-25T09:15:00Z',
    updatedAt: '2024-11-25T09:15:00Z',
    usedInPosts: 7,
    size: '1.8 MB',
    sizeBytes: 1887436,
    dimensions: '1080x1080',
    aspectRatio: '1:1',
    colorPalette: ['#F59E0B', '#EAB308', '#FDE047', '#FEF3C7'],
    alt: 'Sarah smiling and showing her engagement ring',
    author: 'Emma Wilson',
    authorAvatar: '/avatars/emma.jpg',
    isPrivate: false,
    isFavorite: true,
    downloadCount: 22,
    viewCount: 891,
    rating: 5.0,
    status: 'approved',
    platforms: ['instagram', 'facebook', 'twitter'],
    mood: 'happy',
    faces: 1
  },
  {
    id: 4,
    type: 'template',
    title: 'Product Launch Template',
    description: 'Reusable template for new product announcements',
    content: '🌟 NEW ARRIVAL ALERT! 🌟\n\nIntroducing our latest [PRODUCT_NAME] collection! ✨\n\n💎 Features:\n• [FEATURE_1]\n• [FEATURE_2]\n• [FEATURE_3]\n\n🔗 Shop now: [LINK]\n\n#NewArrival #[PRODUCT_CATEGORY] #SHUKRAGems #LuxuryJewelry',
    tags: ['template', 'product-launch', 'announcement', 'social-media'],
    category: 'template',
    folder: 'Templates',
    createdAt: '2024-11-20T16:00:00Z',
    updatedAt: '2024-12-01T12:00:00Z',
    usedInPosts: 12,
    author: 'Marketing Team',
    authorAvatar: '/avatars/team.jpg',
    isPrivate: false,
    isFavorite: true,
    downloadCount: 45,
    viewCount: 234,
    rating: 4.7,
    status: 'approved',
    platforms: ['instagram', 'facebook', 'twitter', 'linkedin'],
    variables: ['PRODUCT_NAME', 'FEATURE_1', 'FEATURE_2', 'FEATURE_3', 'LINK', 'PRODUCT_CATEGORY'],
    wordCount: 45,
    language: 'en'
  },
  {
    id: 5,
    type: 'image',
    title: 'Holiday Collection Banner',
    description: 'Festive holiday jewelry collection banner',
    url: '/images/content/holiday-banner.jpg',
    thumbnail: '/images/content/holiday-banner-thumb.jpg',
    tags: ['holiday', 'collection', 'festive', 'banner', 'christmas'],
    category: 'seasonal',
    folder: 'Seasonal Content',
    createdAt: '2024-11-15T11:30:00Z',
    updatedAt: '2024-11-15T11:30:00Z',
    usedInPosts: 2,
    size: '3.1 MB',
    sizeBytes: 3251200,
    dimensions: '1200x630',
    aspectRatio: '1.91:1',
    colorPalette: ['#DC2626', '#059669', '#D97706', '#FCD34D'],
    alt: 'Holiday jewelry collection with festive decorations',
    author: 'Design Team',
    authorAvatar: '/avatars/design.jpg',
    isPrivate: false,
    isFavorite: false,
    downloadCount: 12,
    viewCount: 456,
    rating: 4.5,
    status: 'approved',
    platforms: ['facebook', 'instagram', 'pinterest'],
    seasonal: true,
    expiryDate: '2025-01-15T00:00:00Z'
  },
  {
    id: 6,
    type: 'video',
    title: 'Ring Sizing Guide',
    description: 'Quick tutorial on how to measure ring size at home',
    url: '/videos/content/ring-sizing.mp4',
    thumbnail: '/images/content/ring-sizing-thumb.jpg',
    tags: ['tutorial', 'guide', 'ring-sizing', 'how-to', 'customer-service'],
    category: 'educational',
    folder: 'How-To Guides',
    createdAt: '2024-11-10T13:45:00Z',
    updatedAt: '2024-11-10T13:45:00Z',
    usedInPosts: 8,
    size: '28.7 MB',
    sizeBytes: 30097612,
    duration: '1:32',
    resolution: '1080x1920',
    aspectRatio: '9:16',
    fps: 30,
    alt: 'Step-by-step ring sizing demonstration',
    author: 'Customer Service',
    authorAvatar: '/avatars/service.jpg',
    isPrivate: false,
    isFavorite: true,
    downloadCount: 34,
    viewCount: 1234,
    rating: 4.9,
    status: 'approved',
    platforms: ['tiktok', 'instagram', 'youtube'],
    hasSubtitles: true,
    isVertical: true
  }
]

// Enhanced categories with metadata
const categories = [
  { key: 'all', label: 'All Content', count: 6, icon: Database },
  { key: 'product', label: 'Product Photos', count: 2, icon: ImageIcon },
  { key: 'educational', label: 'Educational', count: 2, icon: Video },
  { key: 'testimonial', label: 'Testimonials', count: 1, icon: Users },
  { key: 'template', label: 'Templates', count: 1, icon: FileText },
  { key: 'seasonal', label: 'Seasonal', count: 1, icon: Calendar },
  { key: 'behind-the-scenes', label: 'Behind the Scenes', count: 0, icon: Eye }
]

const contentTypes = [
  { key: 'all', label: 'All Types', icon: Database },
  { key: 'image', label: 'Images', icon: ImageIcon },
  { key: 'video', label: 'Videos', icon: Video },
  { key: 'template', label: 'Templates', icon: FileText }
]

const sortOptions = [
  { key: 'created-desc', label: 'Newest First' },
  { key: 'created-asc', label: 'Oldest First' },
  { key: 'title-asc', label: 'Title A-Z' },
  { key: 'title-desc', label: 'Title Z-A' },
  { key: 'size-desc', label: 'Largest First' },
  { key: 'size-asc', label: 'Smallest First' },
  { key: 'usage-desc', label: 'Most Used' },
  { key: 'rating-desc', label: 'Highest Rated' },
  { key: 'views-desc', label: 'Most Viewed' }
]

const platforms = [
  { key: 'instagram', label: 'Instagram', color: 'danger' },
  { key: 'facebook', label: 'Facebook', color: 'primary' },
  { key: 'twitter', label: 'Twitter', color: 'secondary' },
  { key: 'youtube', label: 'YouTube', color: 'danger' },
  { key: 'tiktok', label: 'TikTok', color: 'default' },
  { key: 'pinterest', label: 'Pinterest', color: 'danger' },
  { key: 'linkedin', label: 'LinkedIn', color: 'primary' }
]

export default function ContentLibrary() {
  // State management
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedContent, setSelectedContent] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid', 'list', 'masonry'
  const [selectedItems, setSelectedItems] = useState([])
  const [sortBy, setSortBy] = useState('created-desc')
  const [showFilters, setShowFilters] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [dateRange, setDateRange] = useState({ start: null, end: null })
  const [sizeRange, setSizeRange] = useState([0, 100])
  const [ratingFilter, setRatingFilter] = useState(0)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [folders, setFolders] = useState([
    'Product Photos', 'Educational Content', 'Customer Stories', 
    'Templates', 'Seasonal Content', 'How-To Guides'
  ])
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [bulkEditMode, setBulkEditMode] = useState(false)
  const [aiTagging, setAiTagging] = useState(false)
  
  const fileInputRef = useRef(null)
  
  // Modals
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure()
  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isBulkEditOpen, onOpen: onBulkEditOpen, onClose: onBulkEditClose } = useDisclosure()
  const { isOpen: isCreateFolderOpen, onOpen: onCreateFolderOpen, onClose: onCreateFolderClose } = useDisclosure()
  const { isOpen: isShareOpen, onOpen: onShareOpen, onClose: onShareClose } = useDisclosure()

  // Get all unique tags
  const allTags = [...new Set(mockContent.flatMap(item => item.tags))]
  
  // Filter and sort content
  const filteredContent = mockContent.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesType = selectedType === 'all' || item.type === selectedType
    const matchesFolder = !selectedFolder || item.folder === selectedFolder
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => item.tags.includes(tag))
    const matchesPlatforms = selectedPlatforms.length === 0 || 
      selectedPlatforms.some(platform => item.platforms?.includes(platform))
    const matchesRating = item.rating >= ratingFilter
    const matchesFavorites = !showFavoritesOnly || item.isFavorite
    
    // Date range filter
    const matchesDate = !dateRange.start || !dateRange.end ||
      (new Date(item.createdAt) >= dateRange.start && new Date(item.createdAt) <= dateRange.end)
    
    // Size range filter (convert to MB for comparison)
    const itemSizeMB = item.sizeBytes ? item.sizeBytes / (1024 * 1024) : 0
    const matchesSize = itemSizeMB >= sizeRange[0] && itemSizeMB <= sizeRange[1]
    
    return matchesSearch && matchesCategory && matchesType && matchesFolder && 
           matchesTags && matchesPlatforms && matchesDate && matchesSize && 
           matchesRating && matchesFavorites
  }).sort((a, b) => {
    switch (sortBy) {
      case 'created-desc': return new Date(b.createdAt) - new Date(a.createdAt)
      case 'created-asc': return new Date(a.createdAt) - new Date(b.createdAt)
      case 'title-asc': return a.title.localeCompare(b.title)
      case 'title-desc': return b.title.localeCompare(a.title)
      case 'size-desc': return (b.sizeBytes || 0) - (a.sizeBytes || 0)
      case 'size-asc': return (a.sizeBytes || 0) - (b.sizeBytes || 0)
      case 'usage-desc': return b.usedInPosts - a.usedInPosts
      case 'rating-desc': return b.rating - a.rating
      case 'views-desc': return b.viewCount - a.viewCount
      default: return 0
    }
  })

  // Drag and drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    handleFileUpload(files)
  }, [])

  const handleFileUpload = async (files) => {
    setIsUploading(true)
    setUploadProgress(0)
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    setIsUploading(false)
    setUploadProgress(0)
    onUploadClose()
  }

  const handleContentSelect = (content) => {
    setSelectedContent(content)
    onViewOpen()
  }

  const handleBulkSelect = (contentId) => {
    setSelectedItems(prev => 
      prev.includes(contentId) 
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    )
  }

  const handleSelectAll = () => {
    if (selectedItems.length === filteredContent.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredContent.map(item => item.id))
    }
  }

  const handleBulkAction = (action) => {
    switch (action) {
      case 'delete':
        setSelectedItems([])
        break
      case 'download':
        // Implement bulk download
        break
      case 'edit':
        onBulkEditOpen()
        break
      case 'move':
        // Implement move to folder
        break
      case 'favorite':
        // Toggle favorite for selected items
        break
      default:
        break
    }
  }

  const getContentIcon = (type) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-4 h-4" />
      case 'video': return <Video className="w-4 h-4" />
      case 'template': return <FileText className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'image': return 'primary'
      case 'video': return 'secondary'
      case 'template': return 'warning'
      default: return 'default'
    }
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const clearAllFilters = () => {
    setSelectedCategory('all')
    setSelectedType('all')
    setSelectedTags([])
    setSelectedPlatforms([])
    setDateRange({ start: null, end: null })
    setSizeRange([0, 100])
    setRatingFilter(0)
    setShowFavoritesOnly(false)
    setSelectedFolder(null)
    setSearchQuery('')
  }

  return (
    <div 
      className="space-y-6"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      <AnimatePresence>
        {dragOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-blue-500/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center">
              <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Drop files here</h3>
              <p className="text-gray-600">Release to upload your content</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload progress */}
      {isUploading && (
        <Card>
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Uploading files...</span>
                  <span className="text-sm text-gray-600">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
              <Button size="sm" variant="flat" color="danger">
                Cancel
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      <div className="flex gap-6">
        {/* Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="w-80 space-y-4"
            >
              {/* Quick Stats */}
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-sm font-semibold">Library Overview</h3>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{mockContent.length}</div>
                      <div className="text-xs text-gray-600">Total Items</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(mockContent.reduce((acc, item) => acc + (item.sizeBytes || 0), 0) / (1024 * 1024))}MB
                      </div>
                      <div className="text-xs text-gray-600">Total Size</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {mockContent.reduce((acc, item) => acc + item.usedInPosts, 0)}
                      </div>
                      <div className="text-xs text-gray-600">Total Uses</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">
                        {mockContent.filter(item => item.isFavorite).length}
                      </div>
                      <div className="text-xs text-gray-600">Favorites</div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Folders */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold">Folders</h3>
                    <Button
                      size="sm"
                      isIconOnly
                      variant="flat"
                      onPress={onCreateFolderOpen}
                    >
                      <FolderPlus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="space-y-1">
                    <Button
                      variant={selectedFolder === null ? "solid" : "flat"}
                      size="sm"
                      className="w-full justify-start"
                      startContent={<Database className="w-4 h-4" />}
                      onPress={() => setSelectedFolder(null)}
                    >
                      All Content
                      <Chip size="sm" variant="flat" className="ml-auto">
                        {mockContent.length}
                      </Chip>
                    </Button>
                    {folders.map(folder => {
                      const count = mockContent.filter(item => item.folder === folder).length
                      return (
                        <Button
                          key={folder}
                          variant={selectedFolder === folder ? "solid" : "flat"}
                          size="sm"
                          className="w-full justify-start"
                          startContent={<Folder className="w-4 h-4" />}
                          onPress={() => setSelectedFolder(folder)}
                        >
                          {folder}
                          <Chip size="sm" variant="flat" className="ml-auto">
                            {count}
                          </Chip>
                        </Button>
                      )
                    })}
                  </div>
                </CardBody>
              </Card>

              {/* Quick Filters */}
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-sm font-semibold">Quick Filters</h3>
                </CardHeader>
                <CardBody className="pt-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Favorites Only</span>
                    <Switch
                      size="sm"
                      isSelected={showFavoritesOnly}
                      onValueChange={setShowFavoritesOnly}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Tagging</span>
                    <Switch
                      size="sm"
                      isSelected={aiTagging}
                      onValueChange={setAiTagging}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Min Rating</span>
                      <span className="text-xs text-gray-600">{ratingFilter}+</span>
                    </div>
                    <Slider
                      size="sm"
                      step={0.1}
                      maxValue={5}
                      minValue={0}
                      value={ratingFilter}
                      onChange={setRatingFilter}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">File Size (MB)</span>
                      <span className="text-xs text-gray-600">{sizeRange[0]}-{sizeRange[1]}</span>
                    </div>
                    <Slider
                      size="sm"
                      step={1}
                      maxValue={100}
                      minValue={0}
                      value={sizeRange}
                      onChange={setSizeRange}
                      className="w-full"
                    />
                  </div>

                  <Button
                    size="sm"
                    variant="flat"
                    className="w-full"
                    onPress={clearAllFilters}
                    startContent={<RefreshCw className="w-4 h-4" />}
                  >
                    Clear All Filters
                  </Button>
                </CardBody>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-sm font-semibold">Popular Tags</h3>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="flex flex-wrap gap-1">
                    {allTags.slice(0, 15).map(tag => (
                      <Chip
                        key={tag}
                        size="sm"
                        variant={selectedTags.includes(tag) ? "solid" : "flat"}
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedTags(prev => 
                            prev.includes(tag) 
                              ? prev.filter(t => t !== tag)
                              : [...prev, tag]
                          )
                        }}
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Button
                isIconOnly
                variant="flat"
                size="sm"
                onPress={() => setShowSidebar(!showSidebar)}
              >
                {showSidebar ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
              <div>
                <h2 className="text-xl font-bold">Content Library</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredContent.length} of {mockContent.length} items
                  {selectedFolder && ` in ${selectedFolder}`}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                color="secondary"
                variant="flat"
                startContent={<Import className="w-4 h-4" />}
              >
                Import
              </Button>
              <Button
                color="secondary"
                variant="flat"
                startContent={<FolderPlus className="w-4 h-4" />}
                onPress={onCreateFolderOpen}
              >
                New Folder
              </Button>
              <Button
                color="primary"
                startContent={<Upload className="w-4 h-4" />}
                onPress={onUploadOpen}
              >
                Upload Content
              </Button>
            </div>
          </div>

          {/* Advanced Search and Filters */}
          <Card>
            <CardBody>
              <div className="space-y-4">
                {/* Primary Search Bar */}
                <div className="flex gap-4 items-center">
                  <Input
                    placeholder="Search by title, description, tags, or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    startContent={<Search className="w-4 h-4 text-gray-400" />}
                    className="flex-1"
                    isClearable
                  />
                  
                  <Button
                    variant={showFilters ? "solid" : "flat"}
                    startContent={<Filter className="w-4 h-4" />}
                    onPress={() => setShowFilters(!showFilters)}
                  >
                    Filters
                  </Button>

                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="flat"
                        startContent={<SortAsc className="w-4 h-4" />}
                      >
                        Sort
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      selectedKeys={[sortBy]}
                      onSelectionChange={(keys) => setSortBy(Array.from(keys)[0])}
                    >
                      {sortOptions.map(option => (
                        <DropdownItem key={option.key}>
                          {option.label}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* Extended Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <Select
                        placeholder="Category"
                        selectedKeys={selectedCategory !== 'all' ? [selectedCategory] : []}
                        onSelectionChange={(keys) => setSelectedCategory(Array.from(keys)[0] || 'all')}
                      >
                        {categories.map(cat => (
                          <SelectItem key={cat.key} value={cat.key}>
                            <div className="flex items-center gap-2">
                              <cat.icon className="w-4 h-4" />
                              {cat.label}
                              <Chip size="sm" variant="flat" className="ml-auto">
                                {cat.count}
                              </Chip>
                            </div>
                          </SelectItem>
                        ))}
                      </Select>

                      <Select
                        placeholder="Content Type"
                        selectedKeys={selectedType !== 'all' ? [selectedType] : []}
                        onSelectionChange={(keys) => setSelectedType(Array.from(keys)[0] || 'all')}
                      >
                        {contentTypes.map(type => (
                          <SelectItem key={type.key} value={type.key}>
                            <div className="flex items-center gap-2">
                              <type.icon className="w-4 h-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </Select>

                      <Select
                        placeholder="Platform"
                        selectionMode="multiple"
                        selectedKeys={selectedPlatforms}
                        onSelectionChange={setSelectedPlatforms}
                      >
                        {platforms.map(platform => (
                          <SelectItem key={platform.key} value={platform.key}>
                            {platform.label}
                          </SelectItem>
                        ))}
                      </Select>

                      <Select
                        placeholder="Tags"
                        selectionMode="multiple"
                        selectedKeys={selectedTags}
                        onSelectionChange={setSelectedTags}
                      >
                        {allTags.map(tag => (
                          <SelectItem key={tag} value={tag}>
                            #{tag}
                          </SelectItem>
                        ))}
                      </Select>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* View Controls and Bulk Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant={viewMode === 'grid' ? 'solid' : 'flat'}
                        isIconOnly
                        onPress={() => setViewMode('grid')}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={viewMode === 'list' ? 'solid' : 'flat'}
                        isIconOnly
                        onPress={() => setViewMode('list')}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={viewMode === 'masonry' ? 'solid' : 'flat'}
                        isIconOnly
                        onPress={() => setViewMode('masonry')}
                      >
                        <Database className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {selectedItems.length > 0 && (
                      <div className="flex items-center gap-2 pl-4 border-l border-gray-200 dark:border-gray-700">
                        <Checkbox
                          isSelected={selectedItems.length === filteredContent.length}
                          isIndeterminate={selectedItems.length > 0 && selectedItems.length < filteredContent.length}
                          onValueChange={handleSelectAll}
                        />
                        <span className="text-sm">
                          {selectedItems.length} selected
                        </span>
                      </div>
                    )}
                  </div>

                  {selectedItems.length > 0 && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="flat"
                        startContent={<Download className="w-3 h-3" />}
                        onPress={() => handleBulkAction('download')}
                      >
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        startContent={<Share className="w-3 h-3" />}
                        onPress={() => handleBulkAction('share')}
                      >
                        Share
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        startContent={<Edit className="w-3 h-3" />}
                        onPress={() => handleBulkAction('edit')}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        startContent={<Move className="w-3 h-3" />}
                        onPress={() => handleBulkAction('move')}
                      >
                        Move
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        color="danger"
                        startContent={<Trash2 className="w-3 h-3" />}
                        onPress={() => handleBulkAction('delete')}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Content Grid/List/Masonry */}
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : viewMode === 'masonry'
              ? "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
              : "space-y-2"
          }>
            {filteredContent.map((content, index) => (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={viewMode === 'masonry' ? 'break-inside-avoid mb-4' : ''}
              >
                {viewMode === 'list' ? (
                  // List View
                  <Card className="group cursor-pointer hover:shadow-md transition-all duration-200">
                    <CardBody>
                      <div className="flex items-center gap-4">
                        {/* Selection Checkbox */}
                        <Checkbox
                          isSelected={selectedItems.includes(content.id)}
                          onValueChange={() => handleBulkSelect(content.id)}
                        />

                        {/* Thumbnail */}
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                          {content.type === 'template' ? (
                            getContentIcon(content.type)
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                              {getContentIcon(content.type)}
                            </div>
                          )}
                          {content.type === 'video' && content.duration && (
                            <div className="absolute bottom-1 right-1">
                              <Chip size="sm" className="bg-black/70 text-white text-xs">
                                {content.duration}
                              </Chip>
                            </div>
                          )}
                        </div>

                        {/* Content Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium truncate">{content.title}</h4>
                            <Chip size="sm" color={getTypeColor(content.type)} variant="flat">
                              {content.type}
                            </Chip>
                            {content.isFavorite && (
                              <Heart className="w-4 h-4 text-red-500 fill-current" />
                            )}
                            {content.isPrivate && (
                              <Chip size="sm" color="warning" variant="flat">
                                Private
                              </Chip>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-1">{content.description}</p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {content.tags.slice(0, 3).map(tag => (
                              <Chip key={tag} size="sm" variant="flat" className="text-xs">
                                #{tag}
                              </Chip>
                            ))}
                            {content.tags.length > 3 && (
                              <Chip size="sm" variant="flat" className="text-xs">
                                +{content.tags.length - 3}
                              </Chip>
                            )}
                          </div>

                          {/* Meta Info */}
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {content.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {content.viewCount}
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {content.downloadCount}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {content.rating}
                            </div>
                            <span>{formatFileSize(content.sizeBytes)}</span>
                            <span>{new Date(content.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Platform badges */}
                        <div className="flex flex-wrap gap-1">
                          {content.platforms?.slice(0, 3).map(platform => {
                            const platformData = platforms.find(p => p.key === platform)
                            return (
                              <Chip
                                key={platform}
                                size="sm"
                                color={platformData?.color}
                                variant="flat"
                                className="text-xs"
                              >
                                {platformData?.label}
                              </Chip>
                            )
                          })}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Tooltip content="Preview">
                            <Button
                              size="sm"
                              isIconOnly
                              variant="flat"
                              onPress={() => handleContentSelect(content)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Download">
                            <Button
                              size="sm"
                              isIconOnly
                              variant="flat"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Share">
                            <Button
                              size="sm"
                              isIconOnly
                              variant="flat"
                              onPress={onShareOpen}
                            >
                              <Share className="w-4 h-4" />
                            </Button>
                          </Tooltip>
                          <Dropdown>
                            <DropdownTrigger>
                              <Button
                                size="sm"
                                isIconOnly
                                variant="flat"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                              <DropdownItem startContent={<Edit className="w-4 h-4" />}>
                                Edit
                              </DropdownItem>
                              <DropdownItem startContent={<Copy className="w-4 h-4" />}>
                                Duplicate
                              </DropdownItem>
                              <DropdownItem startContent={<Move className="w-4 h-4" />}>
                                Move to Folder
                              </DropdownItem>
                              <DropdownItem startContent={<Archive className="w-4 h-4" />}>
                                Archive
                              </DropdownItem>
                              <DropdownItem 
                                startContent={<Trash2 className="w-4 h-4" />}
                                color="danger"
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ) : (
                  // Grid/Masonry View
                  <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardBody className="p-0">
                      <div className="relative">
                        {/* Thumbnail */}
                        <div className={`${viewMode === 'masonry' && content.type === 'image' ? 'aspect-auto' : 'aspect-video'} bg-gray-200 dark:bg-gray-700 rounded-t-lg flex items-center justify-center relative overflow-hidden`}>
                          {content.type === 'template' ? (
                            <div className="p-6 text-center">
                              <FileText className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                              <p className="text-sm font-medium">{content.title}</p>
                              <p className="text-xs text-gray-600 mt-1">{content.variables?.length} variables</p>
                            </div>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center relative">
                              {getContentIcon(content.type)}
                              
                              {/* Color palette for images */}
                              {content.colorPalette && (
                                <div className="absolute bottom-2 left-2 flex gap-1">
                                  {content.colorPalette.slice(0, 4).map((color, idx) => (
                                    <div
                                      key={idx}
                                      className="w-3 h-3 rounded-full border border-white/50"
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                          
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Tooltip content="Quick Preview">
                              <Button
                                size="sm"
                                isIconOnly
                                variant="flat"
                                className="bg-white/20 text-white backdrop-blur-sm"
                                onPress={() => handleContentSelect(content)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Tooltip>
                            <Tooltip content="Download">
                              <Button
                                size="sm"
                                isIconOnly
                                variant="flat"
                                className="bg-white/20 text-white backdrop-blur-sm"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </Tooltip>
                            <Tooltip content="Share">
                              <Button
                                size="sm"
                                isIconOnly
                                variant="flat"
                                className="bg-white/20 text-white backdrop-blur-sm"
                                onPress={onShareOpen}
                              >
                                <Share className="w-4 h-4" />
                              </Button>
                            </Tooltip>
                            <Tooltip content="More Actions">
                              <Dropdown>
                                <DropdownTrigger>
                                  <Button
                                    size="sm"
                                    isIconOnly
                                    variant="flat"
                                    className="bg-white/20 text-white backdrop-blur-sm"
                                  >
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                  <DropdownItem startContent={<Edit className="w-4 h-4" />}>
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem startContent={<Copy className="w-4 h-4" />}>
                                    Duplicate
                                  </DropdownItem>
                                  <DropdownItem startContent={<Heart className="w-4 h-4" />}>
                                    {content.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                                  </DropdownItem>
                                  <DropdownItem startContent={<Move className="w-4 h-4" />}>
                                    Move to Folder
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </Tooltip>
                          </div>

                          {/* Selection checkbox */}
                          <div className="absolute top-2 left-2">
                            <Checkbox
                              isSelected={selectedItems.includes(content.id)}
                              onValueChange={() => handleBulkSelect(content.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </div>

                          {/* Status indicators */}
                          <div className="absolute top-2 right-2 flex gap-1">
                            <Chip size="sm" color={getTypeColor(content.type)} variant="solid">
                              {content.type}
                            </Chip>
                            {content.isFavorite && (
                              <Badge content="" color="danger" placement="top-right">
                                <Heart className="w-4 h-4 text-red-500 fill-current" />
                              </Badge>
                            )}
                            {content.isPrivate && (
                              <Chip size="sm" color="warning" variant="solid">
                                Private
                              </Chip>
                            )}
                          </div>

                          {/* Duration for videos */}
                          {content.type === 'video' && content.duration && (
                            <div className="absolute bottom-2 right-2">
                              <Chip size="sm" className="bg-black/70 text-white">
                                {content.duration}
                              </Chip>
                            </div>
                          )}

                          {/* Resolution indicator */}
                          {content.dimensions && (
                            <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Chip size="sm" className="bg-black/70 text-white text-xs">
                                {content.dimensions}
                              </Chip>
                            </div>
                          )}
                        </div>

                        {/* Content Info */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-sm line-clamp-1 flex-1">{content.title}</h4>
                            <div className="flex items-center gap-1 ml-2">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs text-gray-600">{content.rating}</span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{content.description}</p>
                          
                          {/* Author */}
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar src={content.authorAvatar} size="sm" className="w-5 h-5" />
                            <span className="text-xs text-gray-600">{content.author}</span>
                          </div>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {content.tags.slice(0, 3).map(tag => (
                              <Chip key={tag} size="sm" variant="flat" className="text-xs">
                                #{tag}
                              </Chip>
                            ))}
                            {content.tags.length > 3 && (
                              <Chip size="sm" variant="flat" className="text-xs">
                                +{content.tags.length - 3}
                              </Chip>
                            )}
                          </div>

                          {/* Platform indicators */}
                          {content.platforms && content.platforms.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {content.platforms.slice(0, 3).map(platform => {
                                const platformData = platforms.find(p => p.key === platform)
                                return (
                                  <Chip
                                    key={platform}
                                    size="sm"
                                    color={platformData?.color}
                                    variant="flat"
                                    className="text-xs"
                                  >
                                    {platformData?.label}
                                  </Chip>
                                )
                              })}
                              {content.platforms.length > 3 && (
                                <Chip size="sm" variant="flat" className="text-xs">
                                  +{content.platforms.length - 3}
                                </Chip>
                              )}
                            </div>
                          )}

                          {/* Usage stats */}
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {content.viewCount}
                              </div>
                              <div className="flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                {content.downloadCount}
                              </div>
                              <span>Used {content.usedInPosts}x</span>
                            </div>
                            <span>{formatFileSize(content.sizeBytes)}</span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredContent.length === 0 && (
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto"
              >
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No content found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery || selectedCategory !== 'all' || selectedType !== 'all' || selectedTags.length > 0
                    ? 'Try adjusting your filters or search terms'
                    : 'Start building your content library by uploading your first asset'
                  }
                </p>
                <div className="flex gap-3 justify-center">
                  {(searchQuery || selectedCategory !== 'all' || selectedType !== 'all' || selectedTags.length > 0) && (
                    <Button 
                      variant="flat" 
                      onPress={clearAllFilters}
                      startContent={<RefreshCw className="w-4 h-4" />}
                    >
                      Clear Filters
                    </Button>
                  )}
                  <Button 
                    color="primary" 
                    onPress={onUploadOpen}
                    startContent={<Upload className="w-4 h-4" />}
                  >
                    Upload Content
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Content Detail Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="5xl" scrollBehavior="inside">
        <ModalContent>
          {selectedContent && (
            <>
              <ModalHeader>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    {getContentIcon(selectedContent.type)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{selectedContent.title}</span>
                        <Chip color={getTypeColor(selectedContent.type)} size="sm">
                          {selectedContent.type}
                        </Chip>
                        {selectedContent.isFavorite && (
                          <Heart className="w-4 h-4 text-red-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 font-normal">{selectedContent.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{selectedContent.rating}</span>
                    </div>
                    <Button
                      size="sm"
                      isIconOnly
                      variant="flat"
                      color={selectedContent.isFavorite ? "danger" : "default"}
                    >
                      <Heart className={`w-4 h-4 ${selectedContent.isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <Tabs>
                  <Tab key="preview" title="Preview">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Enhanced Preview */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">Preview</h4>
                          <div className="flex gap-2">
                            {selectedContent.type !== 'template' && (
                              <Button size="sm" variant="flat" startContent={<Maximize className="w-4 h-4" />}>
                                Fullscreen
                              </Button>
                            )}
                            <Button size="sm" variant="flat" startContent={<Download className="w-4 h-4" />}>
                              Download
                            </Button>
                          </div>
                        </div>
                        
                        {selectedContent.type === 'template' ? (
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 relative">
                            <pre className="whitespace-pre-wrap text-sm leading-relaxed">{selectedContent.content}</pre>
                            <Button
                              size="sm"
                              className="absolute top-2 right-2"
                              startContent={<Copy className="w-3 h-3" />}
                            >
                              Copy
                            </Button>
                          </div>
                        ) : selectedContent.type === 'video' ? (
                          <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center relative">
                            <Video className="w-16 h-16 text-gray-400" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button
                                size="lg"
                                isIconOnly
                                className="bg-black/50 text-white"
                                radius="full"
                              >
                                <Play className="w-8 h-8" />
                              </Button>
                            </div>
                            {selectedContent.chapters && (
                              <div className="absolute bottom-4 left-4 right-4">
                                <div className="bg-black/70 rounded p-2 text-white text-xs">
                                  Chapters: {selectedContent.chapters.length}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center relative">
                            <ImageIcon className="w-16 h-16 text-gray-400" />
                            {selectedContent.colorPalette && (
                              <div className="absolute bottom-4 left-4 flex gap-2">
                                <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">Colors:</span>
                                {selectedContent.colorPalette.map((color, idx) => (
                                  <div
                                    key={idx}
                                    className="w-6 h-6 rounded border-2 border-white"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* AI-Generated Insights */}
                        {selectedContent.type === 'image' && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <h5 className="font-medium mb-2 flex items-center gap-2">
                              <Zap className="w-4 h-4 text-blue-500" />
                              AI Insights
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Dominant colors:</span>
                                <span>Purple, Violet</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Detected objects:</span>
                                <span>Jewelry, Gemstone</span>
                              </div>
                              {selectedContent.faces > 0 && (
                                <div className="flex justify-between">
                                  <span>Faces detected:</span>
                                  <span>{selectedContent.faces}</span>
                                </div>
                              )}
                              {selectedContent.mood && (
                                <div className="flex justify-between">
                                  <span>Mood:</span>
                                  <span className="capitalize">{selectedContent.mood}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Enhanced Details */}
                      <div className="space-y-6">
                        {/* Basic Info */}
                        <div>
                          <h4 className="font-semibold mb-3">Details</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Author:</span>
                              <div className="flex items-center gap-2">
                                <Avatar src={selectedContent.authorAvatar} size="sm" />
                                <span>{selectedContent.author}</span>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Category:</span>
                              <Chip size="sm" variant="flat" className="capitalize">
                                {selectedContent.category}
                              </Chip>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Folder:</span>
                              <span>{selectedContent.folder}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <Chip 
                                size="sm" 
                                color={selectedContent.status === 'approved' ? 'success' : 'warning'}
                                variant="flat"
                                className="capitalize"
                              >
                                {selectedContent.status}
                              </Chip>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Created:</span>
                              <span>{new Date(selectedContent.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Last updated:</span>
                              <span>{new Date(selectedContent.updatedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* File Info */}
                        <div>
                          <h4 className="font-semibold mb-3">File Information</h4>
                          <div className="space-y-2 text-sm">
                            {selectedContent.sizeBytes && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">File size:</span>
                                <span>{formatFileSize(selectedContent.sizeBytes)}</span>
                              </div>
                            )}
                            {selectedContent.dimensions && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Dimensions:</span>
                                <span>{selectedContent.dimensions}</span>
                              </div>
                            )}
                            {selectedContent.aspectRatio && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Aspect ratio:</span>
                                <span>{selectedContent.aspectRatio}</span>
                              </div>
                            )}
                            {selectedContent.duration && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Duration:</span>
                                <span>{selectedContent.duration}</span>
                              </div>
                            )}
                            {selectedContent.fps && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Frame rate:</span>
                                <span>{selectedContent.fps} fps</span>
                              </div>
                            )}
                            {selectedContent.bitrate && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Bitrate:</span>
                                <span>{selectedContent.bitrate}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Usage Statistics */}
                        <div>
                          <h4 className="font-semibold mb-3">Usage & Performance</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="text-xl font-bold text-blue-600">{selectedContent.usedInPosts}</div>
                              <div className="text-xs text-gray-600">Posts</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="text-xl font-bold text-green-600">{selectedContent.viewCount}</div>
                              <div className="text-xs text-gray-600">Views</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="text-xl font-bold text-purple-600">{selectedContent.downloadCount}</div>
                              <div className="text-xs text-gray-600">Downloads</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="text-xl font-bold text-orange-600">{selectedContent.rating}</div>
                              <div className="text-xs text-gray-600">Rating</div>
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div>
                          <h4 className="font-semibold mb-3">Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedContent.tags.map(tag => (
                              <Chip key={tag} size="sm" variant="flat" startContent={<Hash className="w-3 h-3" />}>
                                {tag}
                              </Chip>
                            ))}
                          </div>
                        </div>

                        {/* Platforms */}
                        {selectedContent.platforms && (
                          <div>
                            <h4 className="font-semibold mb-3">Platform Compatibility</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedContent.platforms.map(platform => {
                                const platformData = platforms.find(p => p.key === platform)
                                return (
                                  <Chip
                                    key={platform}
                                    size="sm"
                                    color={platformData?.color}
                                    variant="flat"
                                    startContent={<Globe className="w-3 h-3" />}
                                  >
                                    {platformData?.label}
                                  </Chip>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* Alt Text */}
                        {selectedContent.alt && (
                          <div>
                            <h4 className="font-semibold mb-2">Accessibility</h4>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                              <p className="text-sm text-gray-600">{selectedContent.alt}</p>
                            </div>
                          </div>
                        )}

                        {/* Template Variables */}
                        {selectedContent.variables && (
                          <div>
                            <h4 className="font-semibold mb-3">Template Variables</h4>
                            <div className="space-y-2">
                              {selectedContent.variables.map(variable => (
                                <div key={variable} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                  <span className="text-sm font-mono">[{variable}]</span>
                                  <Button size="sm" variant="flat">
                                    Edit
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* EXIF Data */}
                        {selectedContent.exifData && (
                          <div>
                            <h4 className="font-semibold mb-3">Camera Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Camera:</span>
                                <span>{selectedContent.exifData.camera}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Lens:</span>
                                <span>{selectedContent.exifData.lens}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Settings:</span>
                                <span>{selectedContent.exifData.settings}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Tab>
                  
                  <Tab key="usage" title="Usage History">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Recent Usage</h4>
                      <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">Instagram Post #{i + 1}</p>
                                <p className="text-xs text-gray-600">Published 2 days ago</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Chip size="sm" color="success" variant="flat">
                                Published
                              </Chip>
                              <Button size="sm" variant="flat" startContent={<ExternalLink className="w-3 h-3" />}>
                                View
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Tab>

                  <Tab key="versions" title="Versions">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Version History</h4>
                        <Button size="sm" startContent={<Plus className="w-4 h-4" />}>
                          Create Version
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {[
                          { version: 'v1.2', date: '2024-12-01', author: 'Sarah Johnson', current: true },
                          { version: 'v1.1', date: '2024-11-28', author: 'Mike Chen', current: false },
                          { version: 'v1.0', date: '2024-11-25', author: 'Sarah Johnson', current: false }
                        ].map((version, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">{version.version}</span>
                                  {version.current && (
                                    <Chip size="sm" color="primary" variant="flat">
                                      Current
                                    </Chip>
                                  )}
                                </div>
                                <p className="text-xs text-gray-600">
                                  {version.date} by {version.author}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="flat">
                                Preview
                              </Button>
                              {!version.current && (
                                <Button size="sm" variant="flat">
                                  Restore
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onViewClose}>
                  Close
                </Button>
                <Button variant="flat" startContent={<Copy className="w-4 h-4" />}>
                  Copy Link
                </Button>
                <Button variant="flat" startContent={<Share className="w-4 h-4" />} onPress={onShareOpen}>
                  Share
                </Button>
                <Button startContent={<Download className="w-4 h-4" />}>
                  Download
                </Button>
                <Button color="primary" startContent={<Edit className="w-4 h-4" />} onPress={onEditOpen}>
                  Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Enhanced Upload Modal */}
      <Modal isOpen={isUploadOpen} onClose={onUploadClose} size="3xl">
        <ModalContent>
          <ModalHeader>Upload New Content</ModalHeader>
          <ModalBody>
            <Tabs>
              <Tab key="upload" title="Upload Files">
                <div className="space-y-6">
                  {/* Drag & Drop Area */}
                  <div 
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center transition-colors hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                    <p className="text-sm text-gray-600 mb-4">
                      Supports JPG, PNG, MP4, GIF, MOV, AVI up to 100MB per file
                    </p>
                    <Button color="primary" startContent={<Upload className="w-4 h-4" />}>
                      Choose Files
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(e) => e.target.files && handleFileUpload(Array.from(e.target.files))}
                    />
                  </div>

                  {/* Upload Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select label="Folder" placeholder="Select folder">
                      {folders.map(folder => (
                        <SelectItem key={folder} value={folder}>
                          {folder}
                        </SelectItem>
                      ))}
                    </Select>
                    
                    <Select label="Category" placeholder="Select category">
                      {categories.filter(c => c.key !== 'all').map(cat => (
                        <SelectItem key={cat.key} value={cat.key}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Input 
                      label="Tags" 
                      placeholder="Enter tags separated by commas"
                      description="e.g., jewelry, collection, amethyst, luxury"
                    />
                    
                    <div className="flex gap-4">
                      <Switch size="sm">Auto-generate tags with AI</Switch>
                      <Switch size="sm">Generate alt text automatically</Switch>
                      <Switch size="sm">Create thumbnails</Switch>
                    </div>
                  </div>

                  {/* Platform Optimization */}
                  <div>
                    <h4 className="font-semibold mb-3">Platform Optimization</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {platforms.map(platform => (
                        <div key={platform.key} className="flex items-center space-x-2">
                          <Checkbox size="sm" />
                          <span className="text-sm">{platform.label}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Auto-resize and optimize for selected platforms
                    </p>
                  </div>
                </div>
              </Tab>
              
              <Tab key="template" title="Create Template">
                <div className="space-y-4">
                  <Input label="Template Name" placeholder="Enter template name" />
                  
                  <Select label="Category">
                    {categories.filter(c => c.key !== 'all').map(cat => (
                      <SelectItem key={cat.key} value={cat.key}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </Select>
                  
                  <Textarea
                    label="Template Content"
                    placeholder="Enter your template content with variables like [PRODUCT_NAME]"
                    minRows={10}
                    description="Use [VARIABLE_NAME] syntax for dynamic content"
                  />
                  
                  <Input 
                    label="Tags" 
                    placeholder="Enter tags separated by commas" 
                  />

                  <div>
                    <h4 className="font-semibold mb-2">Variables Preview</h4>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <p className="text-sm text-gray-600">
                        Variables will be automatically detected from your template content
                      </p>
                    </div>
                  </div>
                </div>
              </Tab>
              
              <Tab key="import" title="Import from URL">
                <div className="space-y-4">
                  <Input 
                    label="URL" 
                    placeholder="https://example.com/image.jpg"
                    startContent={<Link className="w-4 h-4 text-gray-400" />}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Title" placeholder="Content title" />
                    <Input label="Author" placeholder="Content author" />
                  </div>
                  
                  <Textarea 
                    label="Description" 
                    placeholder="Content description"
                    minRows={3}
                  />
                  
                  <Input label="Tags" placeholder="Enter tags separated by commas" />
                  
                  <Button color="primary" className="w-full" startContent={<Import className="w-4 h-4" />}>
                    Import Content
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onUploadClose}>
              Cancel
            </Button>
            <Button color="primary" startContent={<Upload className="w-4 h-4" />}>
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Share Modal */}
      <Modal isOpen={isShareOpen} onClose={onShareClose} size="2xl">
        <ModalContent>
          <ModalHeader>Share Content</ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              {/* Share Link */}
              <div>
                <h4 className="font-semibold mb-3">Share Link</h4>
                <div className="flex gap-2">
                  <Input
                    value="https://shukragems.com/content/12345"
                    isReadOnly
                    endContent={
                      <Button size="sm" isIconOnly variant="flat">
                        <Copy className="w-4 h-4" />
                      </Button>
                    }
                  />
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h4 className="font-semibold mb-3">Permissions</h4>
                <RadioGroup defaultValue="view">
                  <Radio value="view">View Only</Radio>
                  <Radio value="download">View & Download</Radio>
                  <Radio value="edit">View, Download & Edit</Radio>
                </RadioGroup>
              </div>

              {/* Expiry */}
              <div>
                <h4 className="font-semibold mb-3">Link Expiry</h4>
                <Select placeholder="Select expiry">
                  <SelectItem key="never">Never</SelectItem>
                  <SelectItem key="1day">1 Day</SelectItem>
                  <SelectItem key="1week">1 Week</SelectItem>
                  <SelectItem key="1month">1 Month</SelectItem>
                </Select>
              </div>

              {/* Direct Share */}
              <div>
                <h4 className="font-semibold mb-3">Share Directly</h4>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { name: 'Email', icon: '📧' },
                    { name: 'Slack', icon: '💬' },
                    { name: 'Teams', icon: '👥' },
                    { name: 'WhatsApp', icon: '📱' }
                  ].map(service => (
                    <Button
                      key={service.name}
                      variant="flat"
                      className="h-16 flex-col"
                    >
                      <span className="text-2xl mb-1">{service.icon}</span>
                      <span className="text-xs">{service.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onShareClose}>
              Cancel
            </Button>
            <Button color="primary" startContent={<Share className="w-4 h-4" />}>
              Create Share Link
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Content Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="3xl">
        <ModalContent>
          <ModalHeader>Edit Content</ModalHeader>
          <ModalBody>
            {selectedContent && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Title" 
                    value={selectedContent.title}
                    placeholder="Content title"
                  />
                  <Select label="Category" defaultSelectedKeys={[selectedContent.category]}>
                    {categories.filter(c => c.key !== 'all').map(cat => (
                      <SelectItem key={cat.key} value={cat.key}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <Textarea
                  label="Description"
                  value={selectedContent.description}
                  placeholder="Content description"
                  minRows={3}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select label="Folder" defaultSelectedKeys={[selectedContent.folder]}>
                    {folders.map(folder => (
                      <SelectItem key={folder} value={folder}>
                        {folder}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select label="Author" defaultSelectedKeys={[selectedContent.author]}>
                    <SelectItem key="sarah" value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem key="mike" value="mike">Mike Chen</SelectItem>
                    <SelectItem key="emma" value="emma">Emma Wilson</SelectItem>
                  </Select>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Tags</h4>
                  <Input 
                    placeholder="Enter tags separated by commas"
                    defaultValue={selectedContent.tags.join(', ')}
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Platform Compatibility</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {platforms.map(platform => (
                      <div key={platform.key} className="flex items-center space-x-2">
                        <Checkbox 
                          size="sm" 
                          defaultSelected={selectedContent.platforms?.includes(platform.key)}
                        />
                        <span className="text-sm">{platform.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedContent.alt && (
                  <Textarea
                    label="Alt Text"
                    value={selectedContent.alt}
                    placeholder="Alternative text for accessibility"
                    minRows={2}
                  />
                )}

                <div className="flex gap-4">
                  <Switch size="sm" defaultSelected={selectedContent.isFavorite}>
                    Mark as Favorite
                  </Switch>
                  <Switch size="sm" defaultSelected={selectedContent.isPrivate}>
                    Private Content
                  </Switch>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onEditClose}>
              Cancel
            </Button>
            <Button color="primary" startContent={<CheckCircle className="w-4 h-4" />}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Bulk Edit Modal */}
      <Modal isOpen={isBulkEditOpen} onClose={onBulkEditClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            Bulk Edit ({selectedItems.length} items selected)
          </ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Selected Items</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedItems.slice(0, 5).map(id => {
                    const content = mockContent.find(c => c.id === id)
                    return content ? (
                      <Chip key={id} size="sm" variant="flat">
                        {content.title}
                      </Chip>
                    ) : null
                  })}
                  {selectedItems.length > 5 && (
                    <Chip size="sm" variant="flat">
                      +{selectedItems.length - 5} more
                    </Chip>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Bulk Actions</h4>
                <div className="space-y-4">
                  <Select label="Category" placeholder="Change category">
                    {categories.filter(c => c.key !== 'all').map(cat => (
                      <SelectItem key={cat.key} value={cat.key}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select label="Folder" placeholder="Move to folder">
                    {folders.map(folder => (
                      <SelectItem key={folder} value={folder}>
                        {folder}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input 
                    label="Add Tags" 
                    placeholder="Enter tags to add (comma separated)"
                  />

                  <Input 
                    label="Remove Tags" 
                    placeholder="Enter tags to remove (comma separated)"
                  />

                  <div className="flex gap-4">
                    <Switch size="sm">Mark as Favorite</Switch>
                    <Switch size="sm">Make Private</Switch>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Platform Updates</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {platforms.map(platform => (
                    <div key={platform.key} className="flex items-center space-x-2">
                      <Checkbox size="sm" />
                      <span className="text-sm">{platform.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onBulkEditClose}>
              Cancel
            </Button>
            <Button color="primary" startContent={<CheckCircle className="w-4 h-4" />}>
              Apply Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Create Folder Modal */}
      <Modal isOpen={isCreateFolderOpen} onClose={onCreateFolderClose}>
        <ModalContent>
          <ModalHeader>Create New Folder</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input 
                label="Folder Name" 
                placeholder="Enter folder name"
                autoFocus
              />
              <Textarea
                label="Description"
                placeholder="Optional folder description"
                minRows={3}
              />
              <Select label="Color Theme" placeholder="Choose a color">
                <SelectItem key="blue">Blue</SelectItem>
                <SelectItem key="green">Green</SelectItem>
                <SelectItem key="purple">Purple</SelectItem>
                <SelectItem key="orange">Orange</SelectItem>
                <SelectItem key="red">Red</SelectItem>
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onCreateFolderClose}>
              Cancel
            </Button>
            <Button color="primary" startContent={<FolderPlus className="w-4 h-4" />}>
              Create Folder
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
