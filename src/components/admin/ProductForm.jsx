// src/components/admin/ProductForm.jsx
'use client'
import { useState } from 'react'
import { Card, Input, Button, Select, SelectItem } from '@nextui-org/react'

export default function ProductForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  })

  const categories = [
    { label: 'Charms', value: 'charms' },
    { label: 'Jewelry', value: 'jewelry' },
    { label: 'Lights', value: 'lights' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({
      ...formData,
      price: parseFloat(formData.price),
      id: Date.now()
    })
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      image: ''
    })
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          type="number"
          label="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          startContent="$"
          required
        />
        <Select
          label="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </Select>
        <Input
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <Input
          label="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />
        <Button color="primary" type="submit">
          Add Product
        </Button>
      </form>
    </Card>
  )
}