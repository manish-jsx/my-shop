// src/app/admin/blog/comments/page.jsx
'use client'
import { useState } from 'react'
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
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Avatar
} from '@nextui-org/react'
import { 
  Search, 
  MessageSquare, 
  Eye, 
  Trash2, 
  Check, 
  X,
  ArrowLeft,
  Calendar,
  User
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const sampleComments = [
  {
    id: 1,
    author: 'Sarah Johnson',
    email: 'sarah@example.com',
    content: 'Great article about rubies! Very informative and well-written.',
    postTitle: 'The Ultimate Guide to Ruby: King of Precious Stones',
    status: 'approved',
    createdAt: '2025-01-10',
    ip: '192.168.1.1'
  },
  {
    id: 2,
    author: 'Michael Chen',
    email: 'michael@example.com',
    content: 'I disagree with some points about crystal healing. Would love to see more scientific evidence.',
    postTitle: 'Crystal Healing: Science vs. Spirituality',
    status: 'pending',
    createdAt: '2025-01-09',
    ip: '192.168.1.2'
  },
  {
    id: 3,
    author: 'Emma Rodriguez',
    email: 'emma@example.com',
    content: 'This is spam content promoting unrelated products.',
    postTitle: 'How to Clean and Care for Your Precious Gemstones',
    status: 'spam',
    createdAt: '2025-01-08',
    ip: '192.168.1.3'
  }
]

export default function BlogCommentsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [comments, setComments] = useState(sampleComments)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedComment, setSelectedComment] = useState(null)

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.postTitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success'
      case 'pending': return 'warning'
      case 'spam': return 'danger'
      default: return 'default'
    }
  }

  const handleStatusChange = (commentId, newStatus) => {
    setComments(comments.map(comment => 
      comment.id === commentId ? { ...comment, status: newStatus } : comment
    ))
  }

  const handleDelete = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId))
    onClose()
  }

  const stats = [
    {
      title: 'Total Comments',
      value: comments.length,
      color: 'primary'
    },
    {
      title: 'Pending Review',
      value: comments.filter(c => c.status === 'pending').length,
      color: 'warning'
    },
    {
      title: 'Approved',
      value: comments.filter(c => c.status === 'approved').length,
      color: 'success'
    },
    {
      title: 'Spam',
      value: comments.filter(c => c.status === 'spam').length,
      color: 'danger'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/blog">
              <Button variant="flat" startContent={<ArrowLeft className="w-4 h-4" />}>
                Back to Blog
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-purple-600" />
                Comments Management
              </h1>
              <p className="text-gray-600 mt-1">Moderate and manage blog comments</p>
            </div>
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
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
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
              placeholder="Search comments..."
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
              <SelectItem key="pending">Pending</SelectItem>
              <SelectItem key="approved">Approved</SelectItem>
              <SelectItem key="spam">Spam</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

      {/* Comments Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <h3 className="text-lg font-semibold">Comments</h3>
            <span className="text-sm text-gray-500">
              {filteredComments.length} comment{filteredComments.length !== 1 ? 's' : ''}
            </span>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <Table aria-label="Comments table" removeWrapper>
            <TableHeader>
              <TableColumn>AUTHOR</TableColumn>
              <TableColumn>COMMENT</TableColumn>
              <TableColumn>POST</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>DATE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredComments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={comment.author.split(' ').map(n => n[0]).join('')}
                        size="sm"
                        className="bg-purple-100 text-purple-700"
                      />
                      <div>
                        <div className="font-medium">{comment.author}</div>
                        <div className="text-sm text-gray-500">{comment.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="line-clamp-2 text-sm">{comment.content}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="line-clamp-1 text-sm font-medium">{comment.postTitle}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      color={getStatusColor(comment.status)}
                      variant="flat"
                    >
                      {comment.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(comment.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="flat"
                        color="success"
                        isIconOnly
                        onPress={() => handleStatusChange(comment.id, 'approved')}
                        isDisabled={comment.status === 'approved'}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        color="warning"
                        isIconOnly
                        onPress={() => handleStatusChange(comment.id, 'pending')}
                        isDisabled={comment.status === 'pending'}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        color="danger"
                        isIconOnly
                        onPress={() => handleStatusChange(comment.id, 'spam')}
                        isDisabled={comment.status === 'spam'}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        color="danger"
                        isIconOnly
                        onPress={() => {
                          setSelectedComment(comment)
                          onOpen()
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Delete Comment</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this comment from {selectedComment?.author}?</p>
            <p className="text-sm text-gray-500">This action cannot be undone.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={() => handleDelete(selectedComment?.id)}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
