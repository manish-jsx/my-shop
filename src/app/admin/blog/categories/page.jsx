// src/app/admin/blog/categories/page.jsx
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea
} from '@nextui-org/react'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  ArrowLeft,
  Tag,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { blogCategories } from '@/lib/blog'

export default function BlogCategoriesPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categories, setCategories] = useState(blogCategories)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: ''
  })

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData(category)
    onOpen()
  }

  const handleCreate = () => {
    setEditingCategory(null)
    setFormData({
      id: '',
      name: '',
      description: ''
    })
    onOpen()
  }

  const handleSave = () => {
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? formData : cat
      ))
    } else {
      // Create new category
      const newCategory = {
        ...formData,
        id: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      }
      setCategories([...categories, newCategory])
    }
    onClose()
  }

  const handleDelete = (categoryId) => {
    setCategories(categories.filter(cat => cat.id !== categoryId))
  }

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
                <Tag className="w-6 h-6 text-purple-600" />
                Blog Categories
              </h1>
              <p className="text-gray-600 mt-1">Manage blog post categories</p>
            </div>
          </div>
          <Button
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
            onPress={handleCreate}
          >
            New Category
          </Button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Tag className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="flat"
                      color="primary"
                      isIconOnly
                      onPress={() => handleEdit(category)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      color="danger"
                      isIconOnly
                      onPress={() => handleDelete(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {category.description}
                </p>
                <div className="mt-4 text-xs text-gray-500">
                  ID: {category.id}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Category Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          <ModalHeader>
            {editingCategory ? 'Edit Category' : 'Create New Category'}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Category Name"
                placeholder="Enter category name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                isRequired
              />
              <Input
                label="Category ID"
                placeholder="category-id"
                value={formData.id || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                description="URL-friendly identifier"
                isDisabled={!!editingCategory}
              />
              <Textarea
                label="Description"
                placeholder="Describe this category"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                minRows={3}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button 
              color="primary" 
              onPress={handleSave}
              isDisabled={!formData.name.trim()}
            >
              {editingCategory ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
