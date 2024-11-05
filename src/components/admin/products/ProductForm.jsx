// src/components/admin/products/ProductForm.jsx
'use client'
import { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Switch
} from '@nextui-org/react'
import { Image, X } from 'lucide-react'

export default function ProductForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    stock: '',
    image: '',
    featured: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    onClose()
  }

  const categories = [
    { value: 'charms', label: 'Charms' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'lights', label: 'Lights' }
  ]

  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add New Product
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Product Name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    isRequired
                  />
                  <Select
                    label="Category"
                    placeholder="Select category"
                    selectedKeys={formData.category ? [formData.category] : []}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    isRequired
                  >
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    label="Price"
                    placeholder="Enter price"
                    startContent="$"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    isRequired
                  />
                  <Input
                    type="number"
                    label="Stock"
                    placeholder="Enter stock quantity"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    isRequired
                  />
                </div>

                <Textarea
                  label="Description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  isRequired
                />

                <Input
                  label="Image URL"
                  placeholder="Enter image URL"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  startContent={<Image className="w-4 h-4 text-gray-400" />}
                />

                <Switch
                  isSelected={formData.featured}
                  onValueChange={(value) => setFormData({ ...formData, featured: value })}
                >
                  Featured Product
                </Switch>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Add Product
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}