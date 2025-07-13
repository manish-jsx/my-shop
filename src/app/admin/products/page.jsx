// src/app/admin/products/page.jsx
'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardBody, CardHeader, Button, Input, Tabs, Tab, Chip } from '@nextui-org/react'
import { Search, Plus, Filter, Upload, Download, Gem, Award, Shield } from 'lucide-react'
import ProductTable from '@/components/admin/products/ProductTable'
import ProductForm from '@/components/admin/products/ProductForm'

import { useDisclosure } from '@nextui-org/react'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function ProductsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState('all')
  const searchParams = useSearchParams()

  // Handle URL action parameters
  useEffect(() => {
    const action = searchParams.get('action')
    if (action === 'add' || action === 'create') {
      onOpen()
    }
  }, [searchParams, onOpen])

  const productStats = [
    {
      title: 'Total Products',
      value: '1,247',
      change: '+23 this month',
      icon: Gem,
      color: 'purple'
    },
    {
      title: 'Certified Gems',
      value: '892',
      change: 'GIA & other certs',
      icon: Award,
      color: 'blue'
    },
    {
      title: 'Low Stock',
      value: '45',
      change: 'Needs restocking',
      icon: Shield,
      color: 'warning'
    }
  ]

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Gem className="w-6 h-6 text-purple-600" />
                Product Management
              </h1>
              <p className="text-gray-600 mt-1">Manage your gemstone and jewelry inventory</p>
            </div>
            <div className="flex gap-2">
              <Button
                startContent={<Upload className="w-4 h-4" />}
                variant="flat"
                color="primary"
              >
                Import
              </Button>
              <Button
                startContent={<Download className="w-4 h-4" />}
                variant="flat"
                color="primary"
              >
                Export
              </Button>
              <Button
                startContent={<Plus className="w-4 h-4" />}
                color="primary"
                onPress={onOpen}
              >
                Add Product
              </Button>
            </div>
          </div>

      
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {productStats.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-md">
              <CardBody className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-md">
          <CardBody className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search products by name, SKU, or certificate number..."
                  startContent={<Search className="w-4 h-4 text-gray-400" />}
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  classNames={{
                    input: "text-sm",
                    inputWrapper: "h-10"
                  }}
                />
              </div>
              <Button
                startContent={<Filter className="w-4 h-4" />}
                variant="flat"
                color="primary"
              >
                Advanced Filters
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Product Tabs */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-0">
            <Tabs
              selectedKey={selectedTab}
              onSelectionChange={setSelectedTab}
              variant="underlined"
              color="primary"
            >
              <Tab key="all" title="All Products" />
              <Tab key="gems" title="Gemstones" />
              <Tab key="jewelry" title="Jewelry" />
              <Tab key="certified" title="Certified" />
              <Tab key="low-stock" title={
                <div className="flex items-center gap-2">
                  Low Stock
                  <Chip size="sm" color="warning" variant="flat">45</Chip>
                </div>
              } />
            </Tabs>
          </CardHeader>
          <CardBody>
            <ProductTable onAddNew={onOpen} searchQuery={searchQuery} selectedTab={selectedTab} />
          </CardBody>
        </Card>

        <ProductForm isOpen={isOpen} onClose={onClose} />
      </div>
    </PageTransition>
  )
}