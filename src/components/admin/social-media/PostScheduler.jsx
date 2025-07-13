// src/components/admin/social-media/PostScheduler.jsx
'use client'
import { useState } from 'react'
import { 
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Chip,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Progress,
  Divider
} from '@nextui-org/react'
import { 
  Calendar,
  Clock,
  Image as ImageIcon,
  Video,
  Link as LinkIcon,
  Hash,
  AtSign,
  MapPin,
  Smile,
  X,
  Upload,
  Eye,
  Send,
  Save,
  Settings,
  FileText,
  Images
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { socialLinks } from '@/components/ui/SocialMediaLinks'

const POST_TYPES = [
  { key: 'text', label: 'Text Only', icon: FileText },
  { key: 'image', label: 'Image Post', icon: ImageIcon },
  { key: 'video', label: 'Video Post', icon: Video },
  { key: 'carousel', label: 'Carousel', icon: Images },
  { key: 'story', label: 'Story', icon: Clock },
  { key: 'reel', label: 'Reel/Short', icon: Video }
]

const CONTENT_TEMPLATES = [
  {
    id: 1,
    name: 'Product Showcase',
    content: '✨ Discover the mesmerizing beauty of our {product_name}! \n\nThis exquisite {gemstone_type} features:\n🔹 {feature_1}\n🔹 {feature_2}\n🔹 {feature_3}\n\nPerfect for {occasion}. Available now! 💎\n\n#SHUKRAGems #Gemstones #{product_tag} #LuxuryJewelry #HandcraftedWithLove',
    category: 'product',
    platforms: ['Instagram', 'Facebook', 'Pinterest']
  },
  {
    id: 2,
    name: 'Educational Content',
    content: '💎 Did You Know? \n\n{interesting_fact}\n\n{gemstone_name} is known for:\n• {property_1}\n• {property_2}\n• {property_3}\n\nLearn more about the fascinating world of gemstones on our blog! 📚\n\n#GemEducation #SHUKRAGems #GemstoneFacts #MineralMonday',
    category: 'education',
    platforms: ['Instagram', 'Facebook', 'LinkedIn', 'Twitter']
  },
  {
    id: 3,
    name: 'Behind the Scenes',
    content: '🔍 Behind the Scenes at SHUKRA Gems\n\nToday our master gemologist is {activity}. The precision and expertise required for {process} is truly remarkable!\n\nEvery gemstone in our collection goes through rigorous quality checks to ensure you receive only the finest pieces. ✨\n\n#BehindTheScenes #SHUKRAGems #Craftsmanship #QualityFirst',
    category: 'behind_scenes',
    platforms: ['Instagram', 'YouTube', 'Facebook']
  },
  {
    id: 4,
    name: 'Customer Story',
    content: '💕 Customer Spotlight!\n\n"{testimonial_text}" - {customer_name}\n\nWe love seeing how our {product_type} becomes part of your special moments! Thank you for choosing SHUKRA Gems for your {occasion}. ✨\n\nShare your SHUKRA Gems story with us! 📸\n\n#CustomerLove #SHUKRAGems #Testimonial #HappyCustomer',
    category: 'testimonial',
    platforms: ['Instagram', 'Facebook', 'Twitter']
  },
  {
    id: 5,
    name: 'Trend Alert',
    content: '🔥 Trending Now: {trend_name}\n\n{trend_description}\n\nOur {product_collection} perfectly captures this trend with:\n✨ {trend_feature_1}\n✨ {trend_feature_2}\n✨ {trend_feature_3}\n\nStay ahead of the curve with SHUKRA Gems! 💎\n\n#TrendAlert #SHUKRAGems #{trend_hashtag} #JewelryTrends #StyleInspiration',
    category: 'trend',
    platforms: ['Instagram', 'TikTok', 'Pinterest']
  }
]

export default function PostScheduler({ onSchedule, existingPost = null }) {
  const [postData, setPostData] = useState({
    content: existingPost?.content || '',
    platforms: existingPost?.platforms || [],
    postType: existingPost?.postType || 'text',
    scheduledDate: existingPost?.scheduledDate || null,
    mediaFiles: existingPost?.mediaFiles || [],
    tags: existingPost?.tags || [],
    location: existingPost?.location || '',
    targetAudience: existingPost?.targetAudience || 'all',
    priority: existingPost?.priority || 'normal'
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { isOpen: isTemplateOpen, onOpen: onTemplateOpen, onClose: onTemplateClose } = useDisclosure()

  const totalSteps = 4

  const handleInputChange = (field, value) => {
    setPostData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addMediaFile = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video',
      name: file.name,
      size: file.size
    }))

    setPostData(prev => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...newFiles]
    }))
  }

  const removeMediaFile = (id) => {
    setPostData(prev => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter(file => file.id !== id)
    }))
  }

  const addTag = (tag) => {
    if (tag && !postData.tags.includes(tag)) {
      setPostData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
    }
  }

  const removeTag = (tag) => {
    setPostData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const applyTemplate = (template) => {
    setPostData(prev => ({
      ...prev,
      content: template.content,
      platforms: template.platforms
    }))
    setSelectedTemplate(template)
    onTemplateClose()
  }

  const handleSchedule = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const scheduledPost = {
        id: existingPost?.id || Date.now(),
        ...postData,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
        engagement: { likes: 0, comments: 0, shares: 0, views: 0 }
      }

      if (onSchedule) {
        onSchedule(scheduledPost)
      }

      // Reset form
      setPostData({
        content: '',
        platforms: [],
        postType: 'text',
        scheduledDate: null,
        mediaFiles: [],
        tags: [],
        location: '',
        targetAudience: 'all',
        priority: 'normal'
      })
      setCurrentStep(1)
    } finally {
      setIsSaving(false)
    }
  }

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Content Creation</h3>
              <Button
                size="sm"
                variant="flat"
                onPress={onTemplateOpen}
                startContent={<Settings className="w-4 h-4" />}
              >
                Use Template
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {POST_TYPES.map((type) => {
                const IconComponent = type.icon
                return (
                  <Card
                    key={type.key}
                    isPressable
                    isHoverable
                    className={`cursor-pointer transition-all ${
                      postData.postType === type.key 
                        ? 'ring-2 ring-primary border-primary' 
                        : 'hover:border-gray-300'
                    }`}
                    onPress={() => handleInputChange('postType', type.key)}
                  >
                    <CardBody className="p-4 text-center">
                      <IconComponent className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">{type.label}</p>
                    </CardBody>
                  </Card>
                )
              })}
            </div>

            <Textarea
              label="Post Content"
              placeholder="Write your post content here..."
              value={postData.content}
              onValueChange={(value) => handleInputChange('content', value)}
              minRows={6}
              maxRows={10}
              description={`${postData.content.length}/2200 characters`}
            />

            {['image', 'video', 'carousel'].includes(postData.postType) && (
              <Card>
                <CardBody>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Media Files</h4>
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        startContent={<Upload className="w-4 h-4" />}
                        onPress={() => document.getElementById('media-upload').click()}
                      >
                        Add Media
                      </Button>
                      <input
                        id="media-upload"
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) => addMediaFile(e.target.files)}
                      />
                    </div>

                    {postData.mediaFiles.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {postData.mediaFiles.map((file) => (
                          <div key={file.id} className="relative group">
                            {file.type === 'image' ? (
                              <Image
                                src={file.url}
                                alt={file.name}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Video className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                            <Button
                              isIconOnly
                              size="sm"
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
                  </div>
                </CardBody>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Location (Optional)"
                placeholder="Add location..."
                value={postData.location}
                onValueChange={(value) => handleInputChange('location', value)}
                startContent={<MapPin className="w-4 h-4 text-gray-400" />}
              />

              <Select
                label="Priority"
                placeholder="Select priority"
                selectedKeys={[postData.priority]}
                onSelectionChange={(keys) => handleInputChange('priority', Array.from(keys)[0])}
              >
                <SelectItem key="low">Low Priority</SelectItem>
                <SelectItem key="normal">Normal Priority</SelectItem>
                <SelectItem key="high">High Priority</SelectItem>
                <SelectItem key="urgent">Urgent</SelectItem>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Platform Selection</h3>
            
            <CheckboxGroup
              value={postData.platforms}
              onValueChange={(value) => handleInputChange('platforms', value)}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {socialLinks.filter(link => link.category === 'primary' || link.category === 'secondary').map((platform) => (
                  <Card key={platform.name} className="p-3">
                    <Checkbox value={platform.name}>
                      <div className="flex items-center gap-3">
                        <platform.icon className={`w-5 h-5 bg-gradient-to-r ${platform.color} p-1 rounded text-white`} />
                        <div>
                          <p className="font-medium">{platform.name}</p>
                          <p className="text-xs text-gray-600">{platform.description}</p>
                        </div>
                      </div>
                    </Checkbox>
                  </Card>
                ))}
              </div>
            </CheckboxGroup>

            <Card>
              <CardBody>
                <h4 className="font-medium mb-3">Platform-Specific Optimization</h4>
                {postData.platforms.map((platformName) => {
                  const platform = socialLinks.find(p => p.name === platformName)
                  if (!platform) return null

                  return (
                    <div key={platformName} className="space-y-2 p-3 bg-gray-50 rounded-lg mb-3">
                      <div className="flex items-center gap-2">
                        <platform.icon className="w-4 h-4" />
                        <span className="font-medium">{platformName}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Recommended: {platform.features.slice(0, 3).join(', ')}</p>
                        <p>Character limit: {platformName === 'Twitter' ? '280' : '2200'}</p>
                      </div>
                    </div>
                  )
                })}
              </CardBody>
            </Card>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Scheduling & Tags</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DatePicker
                label="Schedule Date & Time"
                value={postData.scheduledDate}
                onChange={(value) => handleInputChange('scheduledDate', value)}
                showTimeField
              />

              <Select
                label="Target Audience"
                placeholder="Select audience"
                selectedKeys={[postData.targetAudience]}
                onSelectionChange={(keys) => handleInputChange('targetAudience', Array.from(keys)[0])}
              >
                <SelectItem key="all">All Followers</SelectItem>
                <SelectItem key="customers">Existing Customers</SelectItem>
                <SelectItem key="prospects">Prospects</SelectItem>
                <SelectItem key="collectors">Gem Collectors</SelectItem>
                <SelectItem key="jewelry_enthusiasts">Jewelry Enthusiasts</SelectItem>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Hashtags & Tags</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {postData.tags.map((tag) => (
                  <Chip
                    key={tag}
                    onClose={() => removeTag(tag)}
                    variant="flat"
                    color="primary"
                  >
                    #{tag}
                  </Chip>
                ))}
              </div>
              <Input
                placeholder="Add hashtag..."
                startContent={<Hash className="w-4 h-4 text-gray-400" />}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    addTag(e.target.value.trim().replace('#', ''))
                    e.target.value = ''
                  }
                }}
              />
            </div>

            <Card>
              <CardBody>
                <h4 className="font-medium mb-3">Quick Tag Suggestions</h4>
                <div className="flex flex-wrap gap-2">
                  {['SHUKRAGems', 'Gemstones', 'LuxuryJewelry', 'HandcraftedWithLove', 'GemEducation', 'CustomerLove'].map((suggestion) => (
                    <Button
                      key={suggestion}
                      size="sm"
                      variant="flat"
                      onPress={() => addTag(suggestion)}
                      disabled={postData.tags.includes(suggestion)}
                    >
                      #{suggestion}
                    </Button>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Preview & Confirm</h3>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center w-full">
                  <h4 className="font-medium">Post Preview</h4>
                  <Button
                    size="sm"
                    variant="flat"
                    startContent={<Eye className="w-4 h-4" />}
                    onPress={() => setIsPreviewMode(!isPreviewMode)}
                  >
                    {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {isPreviewMode ? (
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                        S
                      </div>
                      <div>
                        <p className="font-semibold">SHUKRA Gems</p>
                        <p className="text-sm text-gray-600">
                          {postData.scheduledDate ? new Date(postData.scheduledDate).toLocaleString() : 'Now'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="whitespace-pre-wrap">{postData.content}</p>
                      
                      {postData.mediaFiles.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                          {postData.mediaFiles.slice(0, 4).map((file, index) => (
                            <div key={file.id} className="relative">
                              {file.type === 'image' ? (
                                <Image
                                  src={file.url}
                                  alt={file.name}
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                              ) : (
                                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                                  <Video className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                              {index === 3 && postData.mediaFiles.length > 4 && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center text-white font-bold">
                                  +{postData.mediaFiles.length - 4}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {postData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {postData.tags.map((tag) => (
                            <span key={tag} className="text-blue-600 text-sm">#{tag}</span>
                          ))}
                        </div>
                      )}
                      
                      {postData.location && (
                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{postData.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Content</p>
                      <p className="text-sm">{postData.content || 'No content added'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Platforms</p>
                      <div className="flex gap-2">
                        {postData.platforms.map((platformName) => {
                          const platform = socialLinks.find(p => p.name === platformName)
                          return platform ? (
                            <Chip key={platformName} size="sm" variant="flat">
                              {platformName}
                            </Chip>
                          ) : null
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Schedule</p>
                      <p className="text-sm">
                        {postData.scheduledDate 
                          ? new Date(postData.scheduledDate).toLocaleString()
                          : 'Post immediately'
                        }
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Media Files</p>
                      <p className="text-sm">{postData.mediaFiles.length} file(s)</p>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return postData.content.trim().length > 0
      case 2:
        return postData.platforms.length > 0
      case 3:
        return true // Optional step
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <Progress 
          value={(currentStep / totalSteps) * 100} 
          color="primary"
          className="w-full"
        />
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {getStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button
          variant="flat"
          onPress={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        <div className="flex gap-2">
          <Button
            variant="flat"
            startContent={<Save className="w-4 h-4" />}
          >
            Save Draft
          </Button>

          {currentStep < totalSteps ? (
            <Button
              color="primary"
              onPress={() => setCurrentStep(prev => prev + 1)}
              disabled={!isStepValid()}
            >
              Next
            </Button>
          ) : (
            <Button
              color="primary"
              startContent={<Send className="w-4 h-4" />}
              onPress={handleSchedule}
              isLoading={isSaving}
              disabled={!isStepValid()}
            >
              {postData.scheduledDate ? 'Schedule Post' : 'Publish Now'}
            </Button>
          )}
        </div>
      </div>

      {/* Template Modal */}
      <Modal isOpen={isTemplateOpen} onClose={onTemplateClose} size="3xl">
        <ModalContent>
          <ModalHeader>Choose Content Template</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONTENT_TEMPLATES.map((template) => (
                <Card 
                  key={template.id} 
                  isPressable 
                  isHoverable
                  className="cursor-pointer"
                  onPress={() => applyTemplate(template)}
                >
                  <CardBody className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{template.name}</h4>
                        <Chip size="sm" variant="flat" color="primary">
                          {template.category}
                        </Chip>
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-4">
                        {template.content}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {template.platforms.slice(0, 3).map((platform) => (
                          <Chip key={platform} size="sm" variant="flat">
                            {platform}
                          </Chip>
                        ))}
                        {template.platforms.length > 3 && (
                          <Chip size="sm" variant="flat">
                            +{template.platforms.length - 3}
                          </Chip>
                        )}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onTemplateClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
