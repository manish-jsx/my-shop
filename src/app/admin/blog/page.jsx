// src/app/admin/blog/page.jsx
'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Input, 
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Pagination
} from '@nextui-org/react'
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  MoreVertical,
  Filter,
  Download,
  FileText,
  Calendar,
  User
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { blogPosts, blogCategories } from '@/lib/blog'

export default function BlogAdminPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [posts, setPosts] = useState(blogPosts)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedPost, setSelectedPost] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10
  const searchParams = useSearchParams()

  // Handle URL action parameters
  useEffect(() => {
    const action = searchParams.get('action')
    if (action === 'create' || action === 'new') {
      // Navigate to create post page
      window.location.href = '/admin/blog/new'
    }
  }, [searchParams])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'success'
      case 'draft': return 'warning'
      case 'archived': return 'default'
      default: return 'primary'
    }
  }

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId))
    onClose()
  }

  const handleStatusChange = (postId, newStatus) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: newStatus } : post
    ))
  }

  const stats = [
    {
      title: 'Total Posts',
      value: posts.length,
      color: 'primary',
      icon: FileText
    },
    {
      title: 'Published',
      value: posts.filter(p => p.status === 'published').length,
      color: 'success',
      icon: Eye
    },
    {
      title: 'Drafts',
      value: posts.filter(p => p.status === 'draft').length,
      color: 'warning',
      icon: Edit2
    },
    {
      title: 'Total Views',
      value: posts.reduce((total, post) => total + post.views, 0).toLocaleString(),
      color: 'secondary',
      icon: Eye
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-600" />
              Blog Management
            </h1>
            <p className="text-gray-600 mt-1">Create and manage blog posts, news, and updates</p>
          </div>
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="flat"
              startContent={<Download className="w-4 h-4" />}
            >
              Export
            </Button>
            <Link href="/admin/blog/new">
              <Button
                color="primary"
                startContent={<Plus className="w-4 h-4" />}
              >
                New Post
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardBody className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              className="md:flex-1"
            />
            <Select
              placeholder="All Statuses"
              selectedKeys={statusFilter !== 'all' ? [statusFilter] : []}
              onSelectionChange={(keys) => setStatusFilter(Array.from(keys)[0] || 'all')}
              className="md:w-48"
            >
              <SelectItem key="all">All Statuses</SelectItem>
              <SelectItem key="published">Published</SelectItem>
              <SelectItem key="draft">Draft</SelectItem>
              <SelectItem key="archived">Archived</SelectItem>
            </Select>
            <Select
              placeholder="All Categories"
              selectedKeys={categoryFilter !== 'all' ? [categoryFilter] : []}
              onSelectionChange={(keys) => setCategoryFilter(Array.from(keys)[0] || 'all')}
              className="md:w-56"
            >
              <SelectItem key="all">All Categories</SelectItem>
              {blogCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        </CardBody>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <h3 className="text-lg font-semibold">Blog Posts</h3>
            <span className="text-sm text-gray-500">
              {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <Table aria-label="Blog posts table" removeWrapper>
            <TableHeader>
              <TableColumn>TITLE</TableColumn>
              <TableColumn>CATEGORY</TableColumn>
              <TableColumn>AUTHOR</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>VIEWS</TableColumn>
              <TableColumn>PUBLISHED</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {paginatedPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{post.title}</span>
                      <span className="text-sm text-gray-500 line-clamp-2">
                        {post.excerpt}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip size="sm" variant="flat" color="primary">
                      {blogCategories.find(cat => cat.id === post.category)?.name}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      {post.author}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      color={getStatusColor(post.status)}
                      variant="flat"
                    >
                      {post.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-gray-400" />
                      {post.views.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.publishedAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button size="sm" variant="flat" isIconOnly>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/blog/edit/${post.id}`}>
                        <Button size="sm" variant="flat" color="primary" isIconOnly>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button size="sm" variant="flat" isIconOnly>
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem
                            key="publish"
                            onPress={() => handleStatusChange(post.id, 'published')}
                          >
                            Publish
                          </DropdownItem>
                          <DropdownItem
                            key="draft"
                            onPress={() => handleStatusChange(post.id, 'draft')}
                          >
                            Move to Draft
                          </DropdownItem>
                          <DropdownItem
                            key="archive"
                            onPress={() => handleStatusChange(post.id, 'archived')}
                          >
                            Archive
                          </DropdownItem>
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            onPress={() => {
                              setSelectedPost(post)
                              onOpen()
                            }}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center p-6">
              <Pagination
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
                showControls
              />
            </div>
          )}
        </CardBody>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Delete Post</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete "{selectedPost?.title}"?</p>
            <p className="text-sm text-gray-500">This action cannot be undone.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={() => handleDeletePost(selectedPost?.id)}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
