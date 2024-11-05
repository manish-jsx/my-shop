// src/components/admin/products/CategoryManager.jsx
'use client'
import { useState } from 'react'
import {
  Card,
  CardBody,
  Button,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip
} from '@nextui-org/react'
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

// Sample categories data
const initialCategories = [
  {
    id: 1,
    name: 'Charms',
    slug: 'charms',
    description: 'Beautiful and unique charms for any occasion',
    image: '/images/categories/charms.jpg',
    productCount: 15,
    isActive: true
  },
  {
    id: 2,
    name: 'Jewelry',
    slug: 'jewelry',
    description: 'Elegant jewelry pieces and accessories',
    image: '/images/categories/jewelry.jpg',
    productCount: 25,
    isActive: true
  },
  {
    id: 3,
    name: 'Lights',
    slug: 'lights',
    description: 'Decorative lighting solutions',
    image: '/images/categories/lights.jpg',
    productCount: 18,
    isActive: true
  }
]

export default function CategoryManager() {
  const [categories, setCategories] = useState(initialCategories)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editingCategory, setEditingCategory] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    isActive: true
  })

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
      isActive: category.isActive
    })
    onOpen()
  }

  const handleDelete = (categoryId) => {
    setCategories(categories.filter(cat => cat.id !== categoryId))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, ...formData }
          : cat
      ))
    } else {
      // Add new category
      const newCategory = {
        id: Date.now(),
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        productCount: 0,
        ...formData
      }
      setCategories([...categories, newCategory])
    }
    handleClose()
  }

  const handleClose = () => {
    setEditingCategory(null)
    setFormData({
      name: '',
      description: '',
      image: '',
      isActive: true
    })
    onClose()
  }

  const columns = [
    { name: 'CATEGORY', uid: 'name' },
    { name: 'PRODUCTS', uid: 'productCount' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
          onPress={() => {
            setEditingCategory(null)
            onOpen()
          }}
        >
          Add Category
        </Button>
      </div>

      <Card>
        <CardBody>
          <Table aria-label="Categories table">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-gray-500">{category.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip size="sm" variant="flat">
                      {category.productCount} products
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={category.isActive ? 'success' : 'default'}
                      size="sm"
                      variant="flat"
                    >
                      {category.isActive ? 'Active' : 'Inactive'}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleEdit(category)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        variant="light"
                        onPress={() => handleDelete(category.id)}
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

      {/* Category Form Modal */}
      <Modal isOpen={isOpen} onClose={handleClose} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Category Name"
                    placeholder="Enter category name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    isRequired
                  />
                  <Input
                    label="Description"
                    placeholder="Enter category description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <Input
                    label="Image URL"
                    placeholder="Enter image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    startContent={<ImageIcon className="w-4 h-4 text-gray-400" />}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={handleClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  {editingCategory ? 'Update' : 'Add'} Category
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
