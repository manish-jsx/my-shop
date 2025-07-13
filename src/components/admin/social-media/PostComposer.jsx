// src/components/admin/social-media/PostComposer.jsx
'use client'
import { useState, useRef } from 'react'
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
  Tabs,
  Tab,
  Chip,
  Avatar,
  Divider,
  Switch
} from '@nextui-org/react'
import { 
  Image as ImageIcon,
  Video,
  Calendar,
  Clock,
  Hash,
  AtSign,
  MapPin,
  Send,
  Save,
  Copy,
  RotateCcw
} from 'lucide-react'

export default function PostComposer({ 
  mode = 'create', 
  socialAccounts = [], 
  onClose, 
  existingPost = null,
  onPostCreate,
  onPostUpdate 
}) {
  const [activeTab, setActiveTab] = useState('compose')
  const [isLoading, setIsLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  
  const [postData, setPostData] = useState({
    content: existingPost?.content || '',
    platforms: existingPost?.platforms || [],
    postType: existingPost?.postType || 'text',
    scheduledDate: existingPost?.scheduledDate || null,
    mediaFiles: existingPost?.mediaFiles || [],
    hashtags: existingPost?.hashtags || [],
    mentions: existingPost?.mentions || [],
    location: existingPost?.location || '',
    targetAudience: existingPost?.targetAudience || 'all',
    callToAction: existingPost?.callToAction || '',
    linkUrl: existingPost?.linkUrl || '',
    priority: existingPost?.priority || 'normal'
  })

  const textareaRef = useRef(null)

  // Validation function
  const validatePost = () => {
    const errors = {}
    
    if (!postData.content.trim()) {
      errors.content = 'Content is required'
    }
    
    if (postData.platforms.length === 0) {
      errors.platforms = 'Select at least one platform'
    }
    
    if (mode === 'schedule' && !postData.scheduledDate) {
      errors.scheduledDate = 'Schedule date is required for scheduled posts'
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (field, value) => {
    setPostData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  const handleSave = async () => {
    if (!validatePost()) {
      console.log('Validation failed:', validationErrors)
      return
    }
    
    setIsLoading(true)
    try {
      const postToSave = {
        ...postData,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      if (existingPost && onPostUpdate) {
        await onPostUpdate({ ...existingPost, ...postToSave })
      } else if (onPostCreate) {
        await onPostCreate(postToSave)
      }
      
      console.log('Post saved successfully:', postToSave)
      if (onClose) onClose()
    } catch (error) {
      console.error('Error saving post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublish = async () => {
    if (!validatePost()) {
      console.log('Validation failed:', validationErrors)
      return
    }
    
    setIsLoading(true)
    try {
      const postToPublish = {
        ...postData,
        status: postData.scheduledDate ? 'scheduled' : 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: postData.scheduledDate ? null : new Date().toISOString()
      }
      
      if (existingPost && onPostUpdate) {
        await onPostUpdate({ ...existingPost, ...postToPublish })
      } else if (onPostCreate) {
        await onPostCreate(postToPublish)
      }
      
      console.log('Post published successfully:', postToPublish)
      if (onClose) onClose()
    } catch (error) {
      console.error('Error publishing post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetPost = () => {
    setPostData({
      content: '',
      platforms: [],
      postType: 'text',
      scheduledDate: null,
      mediaFiles: [],
      hashtags: [],
      mentions: [],
      location: '',
      targetAudience: 'all',
      callToAction: '',
      linkUrl: '',
      priority: 'normal'
    })
    setValidationErrors({})
  }

  const duplicatePost = () => {
    const duplicatedData = {
      ...postData,
      content: postData.content + ' (Copy)'
    }
    setPostData(duplicatedData)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onSelectionChange={setActiveTab} className="w-full">
        <Tab key="compose" title="Compose">
          <div className="space-y-6 mt-6">
            {/* Platform Selection */}
            <Card>
              <CardHeader>
                <h4 className="font-semibold">Select Platforms</h4>
              </CardHeader>
              <CardBody>
                <CheckboxGroup
                  value={postData.platforms}
                  onValueChange={(value) => handleInputChange('platforms', value)}
                  orientation="horizontal"
                  className="gap-4"
                  isInvalid={!!validationErrors.platforms}
                  errorMessage={validationErrors.platforms}
                >
                  {socialAccounts.map((platform) => (
                    <Checkbox key={platform.name} value={platform.name}>
                      <div className="flex items-center gap-2">
                        <Avatar
                          size="sm"
                          icon={<platform.icon className="w-4 h-4" />}
                          className={`bg-gradient-to-r ${platform.color} text-white`}
                        />
                        <span className="text-sm font-medium">{platform.name}</span>
                      </div>
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </CardBody>
            </Card>

            {/* Content Input */}
            <Card>
              <CardHeader>
                <h4 className="font-semibold">Content</h4>
              </CardHeader>
              <CardBody>
                <Textarea
                  ref={textareaRef}
                  placeholder="What's on your mind? Share your thoughts..."
                  value={postData.content}
                  onValueChange={(value) => handleInputChange('content', value)}
                  minRows={6}
                  maxRows={12}
                  className="w-full"
                  isInvalid={!!validationErrors.content}
                  errorMessage={validationErrors.content}
                />
                
                <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                  <Button
                    size="sm"
                    variant="flat"
                    startContent={<Hash className="w-3 h-3" />}
                    onPress={() => {
                      const hashtag = prompt("Enter hashtag (without #):")
                      if (hashtag) {
                        handleInputChange('hashtags', [...postData.hashtags, hashtag])
                      }
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
                      if (mention) {
                        handleInputChange('mentions', [...postData.mentions, mention])
                      }
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
                      if (location) handleInputChange('location', location)
                    }}
                  >
                    Add Location
                  </Button>
                </div>

                {/* Display hashtags and mentions */}
                {(postData.hashtags.length > 0 || postData.mentions.length > 0) && (
                  <div className="mt-4 space-y-2">
                    {postData.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {postData.hashtags.map((hashtag, index) => (
                          <Chip
                            key={index}
                            size="sm"
                            variant="flat"
                            color="primary"
                            onClose={() => {
                              const newHashtags = postData.hashtags.filter((_, i) => i !== index)
                              handleInputChange('hashtags', newHashtags)
                            }}
                          >
                            #{hashtag}
                          </Chip>
                        ))}
                      </div>
                    )}
                    {postData.mentions.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {postData.mentions.map((mention, index) => (
                          <Chip
                            key={index}
                            size="sm"
                            variant="flat"
                            color="secondary"
                            onClose={() => {
                              const newMentions = postData.mentions.filter((_, i) => i !== index)
                              handleInputChange('mentions', newMentions)
                            }}
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

            {/* Scheduling */}
            {mode === 'schedule' && (
              <Card>
                <CardHeader>
                  <h4 className="font-semibold">Schedule</h4>
                </CardHeader>
                <CardBody>
                  <Input
                    type="datetime-local"
                    label="Publish Date & Time"
                    value={postData.scheduledDate}
                    onValueChange={(value) => handleInputChange('scheduledDate', value)}
                    isInvalid={!!validationErrors.scheduledDate}
                    errorMessage={validationErrors.scheduledDate}
                  />
                </CardBody>
              </Card>
            )}

            {/* Additional Options */}
            <Card>
              <CardHeader>
                <h4 className="font-semibold">Additional Options</h4>
              </CardHeader>
              <CardBody className="space-y-4">
                <Select
                  label="Priority"
                  selectedKeys={[postData.priority]}
                  onSelectionChange={(value) => handleInputChange('priority', Array.from(value)[0])}
                >
                  <SelectItem key="low">Low</SelectItem>
                  <SelectItem key="normal">Normal</SelectItem>
                  <SelectItem key="high">High</SelectItem>
                  <SelectItem key="urgent">Urgent</SelectItem>
                </Select>

                <Input
                  label="Call to Action"
                  placeholder="e.g., Shop now, Learn more, Sign up"
                  value={postData.callToAction}
                  onValueChange={(value) => handleInputChange('callToAction', value)}
                />

                <Input
                  label="Link URL"
                  placeholder="https://example.com"
                  value={postData.linkUrl}
                  onValueChange={(value) => handleInputChange('linkUrl', value)}
                />

                {postData.location && (
                  <div className="p-3 bg-default-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-default-500" />
                      <span className="text-sm">Location: {postData.location}</span>
                      <Button
                        size="sm"
                        variant="light"
                        onPress={() => handleInputChange('location', '')}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="preview" title="Preview">
          <div className="mt-6">
            <Card>
              <CardHeader>
                <h4 className="font-semibold">Post Preview</h4>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-default-50">
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar size="sm" name="Your Brand" />
                      <div>
                        <p className="text-sm font-medium">Your Brand</p>
                        <p className="text-xs text-default-500">Just now</p>
                      </div>
                    </div>
                    
                    {postData.content && (
                      <p className="text-sm mb-3 whitespace-pre-wrap">{postData.content}</p>
                    )}
                    
                    {postData.callToAction && (
                      <Button size="sm" color="primary" className="mb-3">
                        {postData.callToAction}
                      </Button>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-default-500">
                      <span>👍 Like</span>
                      <span>💬 Comment</span>
                      <span>📤 Share</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Platforms:</p>
                      <p>{postData.platforms.length} selected</p>
                    </div>
                    <div>
                      <p className="font-medium">Priority:</p>
                      <p className="capitalize">{postData.priority}</p>
                    </div>
                    <div>
                      <p className="font-medium">Hashtags:</p>
                      <p>{postData.hashtags.length} added</p>
                    </div>
                    <div>
                      <p className="font-medium">Characters:</p>
                      <p>{postData.content.length}</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t">
        <div className="flex gap-2">
          <Button
            variant="flat"
            startContent={<Copy className="w-4 h-4" />}
            onPress={duplicatePost}
            size="sm"
          >
            Duplicate
          </Button>
          <Button
            variant="flat"
            startContent={<RotateCcw className="w-4 h-4" />}
            onPress={resetPost}
            size="sm"
          >
            Reset
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="flat"
            startContent={<Save className="w-4 h-4" />}
            onPress={handleSave}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Save Draft
          </Button>
          
          {mode === 'schedule' ? (
            <Button
              color="primary"
              startContent={<Calendar className="w-4 h-4" />}
              onPress={handlePublish}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Schedule Post
            </Button>
          ) : (
            <Button
              color="primary"
              startContent={<Send className="w-4 h-4" />}
              onPress={handlePublish}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Publish Now
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}