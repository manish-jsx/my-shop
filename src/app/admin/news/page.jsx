// src/app/admin/news/page.jsx
'use client'
import { useState } from 'react'
import {
  Card,
  CardBody,
  Button,
  Input,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Textarea,
  Switch,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  MoreVertical,
  Calendar,
  Eye,
  EyeOff,
  Newspaper,
  TrendingUp
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/ui/PageTransitions'

const initialNews = [
  {
    id: 1,
    title: 'SHUKRA Gems Partners with Leading GIA Lab for Enhanced Certification',
    excerpt: 'We are excited to announce our new partnership with GIA to provide even more comprehensive gemstone certification services.',
    category: 'company-updates',
    status: 'published',
    author: 'SHUKRA Team',
    publishedAt: '2025-01-10',
    createdAt: '2025-01-09',
    views: 1234,
    featured: true
  },
  {
    id: 2,
    title: 'Global Gemstone Market Trends: What to Expect in 2025',
    excerpt: 'Industry analysis of emerging trends, pricing fluctuations, and new discoveries in the gemstone market.',
    category: 'industry-news',
    status: 'published',
    author: 'Dr. Sarah Chen',
    publishedAt: '2025-01-08',
    createdAt: '2025-01-05',
    views: 987,
    featured: false
  },
  {
    id: 3,
    title: 'New Ruby Collection from Myanmar Mines',
    excerpt: 'Discover our latest collection of premium rubies sourced directly from the renowned Mogok mines.',
    category: 'company-updates',
    status: 'draft',
    author: 'Michael Rodriguez',
    publishedAt: null,
    createdAt: '2025-01-07',
    views: 0,
    featured: false
  }
]

const categories = [
  { key: 'company-updates', label: 'Company Updates' },
  { key: 'industry-news', label: 'Industry News' },
  { key: 'product-launches', label: 'Product Launches' },
  { key: 'educational', label: 'Educational' }
]

export default function NewsAdminPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [news, setNews] = useState(initialNews)
  const [editingNews, setEditingNews] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'company-updates',
    status: 'draft',
    author: '',
    featured: false,
    publishedAt: ''
  })

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem)
    setFormData({
      title: newsItem.title,
      excerpt: newsItem.excerpt,
      content: newsItem.content || '',
      category: newsItem.category,
      status: newsItem.status,
      author: newsItem.author,
      featured: newsItem.featured,
      publishedAt: newsItem.publishedAt || ''
    })
    onOpen()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newsData = {
      id: editingNews ? editingNews.id : Date.now(),
      ...formData,
      createdAt: editingNews ? editingNews.createdAt : new Date().toISOString().split('T')[0],
      views: editingNews ? editingNews.views : 0,
      publishedAt: formData.status === 'published' ? (formData.publishedAt || new Date().toISOString().split('T')[0]) : null
    }

    if (editingNews) {
      setNews(news.map(item => item.id === editingNews.id ? newsData : item))
    } else {
      setNews([newsData, ...news])
    }
    
    onClose()
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'company-updates',
      status: 'draft',
      author: '',
      featured: false,
      publishedAt: ''
    })
    setEditingNews(null)
  }

  const handleDelete = (id) => {
    setNews(news.filter(item => item.id !== id))
  }

  const toggleStatus = (id) => {
    setNews(news.map(item => {
      if (item.id === id) {
        const newStatus = item.status === 'published' ? 'draft' : 'published'
        return {
          ...item,
          status: newStatus,
          publishedAt: newStatus === 'published' ? new Date().toISOString().split('T')[0] : null
        }
      }
      return item
    }))
  }

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const stats = {
    total: news.length,
    published: news.filter(item => item.status === 'published').length,
    drafts: news.filter(item => item.status === 'draft').length,
    featured: news.filter(item => item.featured).length
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Newspaper className="w-6 h-6" />
              News & Updates Management
            </h1>
            <p className="text-gray-600 mt-1">Manage company news, industry updates, and announcements</p>
          </div>
          <Button
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
            onPress={() => {
              resetForm()
              onOpen()
            }}
          >
            Create News Article
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Articles', value: stats.total, color: 'primary' },
            { label: 'Published', value: stats.published, color: 'success' },
            { label: 'Drafts', value: stats.drafts, color: 'warning' },
            { label: 'Featured', value: stats.featured, color: 'secondary' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardBody className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardBody className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search className="w-4 h-4 text-gray-400" />}
                className="md:flex-1"
              />
              <Select
                placeholder="Status"
                selectedKeys={[statusFilter]}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="md:w-48"
              >
                <SelectItem key="all">All Status</SelectItem>
                <SelectItem key="published">Published</SelectItem>
                <SelectItem key="draft">Draft</SelectItem>
              </Select>
              <Select
                placeholder="Category"
                selectedKeys={[categoryFilter]}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="md:w-48"
              >
                <SelectItem key="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.key}>{cat.label}</SelectItem>
                ))}
              </Select>
            </div>
          </CardBody>
        </Card>

        {/* News Table */}
        <Card>
          <CardBody>
            <Table aria-label="News articles table">
              <TableHeader>
                <TableColumn>ARTICLE</TableColumn>
                <TableColumn>CATEGORY</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>AUTHOR</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>VIEWS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {filteredNews.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium line-clamp-1">{item.title}</h4>
                            {item.featured && (
                              <Chip size="sm" color="warning" variant="flat">
                                <TrendingUp className="w-3 h-3" />
                              </Chip>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                            {item.excerpt}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip size="sm" variant="flat" color="primary">
                        {categories.find(cat => cat.key === item.category)?.label}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="sm"
                        color={item.status === 'published' ? 'success' : 'warning'}
                        variant="flat"
                      >
                        {item.status}
                      </Chip>
                    </TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        {item.publishedAt || item.createdAt}
                      </div>
                    </TableCell>
                    <TableCell>{item.views.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() => handleEdit(item)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem
                              key="toggle"
                              startContent={item.status === 'published' ? 
                                <EyeOff className="w-4 h-4" /> : 
                                <Eye className="w-4 h-4" />
                              }
                              onPress={() => toggleStatus(item.id)}
                            >
                              {item.status === 'published' ? 'Unpublish' : 'Publish'}
                            </DropdownItem>
                            <DropdownItem
                              key="delete"
                              className="text-danger"
                              color="danger"
                              startContent={<Trash2 className="w-4 h-4" />}
                              onPress={() => handleDelete(item.id)}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        {/* News Form Modal */}
        <Modal size="3xl" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  {editingNews ? 'Edit News Article' : 'Create News Article'}
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      label="Article Title"
                      placeholder="Enter article title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      isRequired
                    />

                    <Textarea
                      label="Excerpt"
                      placeholder="Brief description of the article"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      isRequired
                    />

                    <Textarea
                      label="Content"
                      placeholder="Full article content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      minRows={6}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        label="Category"
                        selectedKeys={[formData.category]}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        isRequired
                      >
                        {categories.map((cat) => (
                          <SelectItem key={cat.key}>{cat.label}</SelectItem>
                        ))}
                      </Select>

                      <Select
                        label="Status"
                        selectedKeys={[formData.status]}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        isRequired
                      >
                        <SelectItem key="draft">Draft</SelectItem>
                        <SelectItem key="published">Published</SelectItem>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Author"
                        placeholder="Author name"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        isRequired
                      />

                      {formData.status === 'published' && (
                        <Input
                          type="date"
                          label="Publish Date"
                          value={formData.publishedAt}
                          onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                        />
                      )}
                    </div>

                    <Switch
                      isSelected={formData.featured}
                      onValueChange={(value) => setFormData({ ...formData, featured: value })}
                    >
                      Featured Article
                    </Switch>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={handleSubmit}>
                    {editingNews ? 'Update' : 'Create'} Article
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </PageTransition>
  )
}
