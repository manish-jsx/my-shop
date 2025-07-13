// src/app/admin/products/inventory/page.jsx
'use client'
import { useState } from 'react'
import { Card, CardBody, CardHeader, Button, Input, Tabs, Tab, Chip, Progress, Avatar, Select, SelectItem } from '@nextui-org/react'
import { Search, AlertTriangle, Package, Shield, Award, TrendingDown, Plus, Upload, Download, Eye, Edit, Trash2 } from 'lucide-react'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState('all')
  const [stockFilter, setStockFilter] = useState('all')

  const inventoryStats = [
    {
      title: 'Total Items',
      value: '1,247',
      change: '+23 this month',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Low Stock Alerts',
      value: '45',
      change: 'Needs immediate attention',
      icon: AlertTriangle,
      color: 'warning'
    },
    {
      title: 'Certified Inventory',
      value: '$2.4M',
      change: 'Total authenticated value',
      icon: Shield,
      color: 'green'
    },
    {
      title: 'Out of Stock',
      value: '12',
      change: 'High-demand items',
      icon: TrendingDown,
      color: 'danger'
    }
  ]

  const inventoryItems = [
    {
      id: 'GEM-RBY-001',
      name: '5.2ct Burmese Ruby',
      category: 'Ruby',
      stock: 3,
      reserved: 1,
      available: 2,
      value: 45000,
      certificate: 'GIA',
      certificateNumber: 'GIA-RBY-2024-001',
      location: 'Vault A-12',
      status: 'low',
      lastUpdated: '2 hours ago',
      image: '/api/placeholder/60/60'
    },
    {
      id: 'GEM-SAP-045',
      name: '3.8ct Kashmir Sapphire',
      category: 'Sapphire',
      stock: 1,
      reserved: 0,
      available: 1,
      value: 67000,
      certificate: 'Gübelin',
      certificateNumber: 'GUB-SAP-2024-045',
      location: 'Vault A-03',
      status: 'critical',
      lastUpdated: '1 day ago',
      image: '/api/placeholder/60/60'
    },
    {
      id: 'GEM-EME-023',
      name: '4.1ct Colombian Emerald',
      category: 'Emerald',
      stock: 8,
      reserved: 2,
      available: 6,
      value: 32000,
      certificate: 'SSEF',
      certificateNumber: 'SSEF-EME-2024-023',
      location: 'Vault B-05',
      status: 'good',
      lastUpdated: '3 hours ago',
      image: '/api/placeholder/60/60'
    },
    {
      id: 'GEM-DIA-089',
      name: '2.5ct Pink Diamond',
      category: 'Diamond',
      stock: 0,
      reserved: 1,
      available: 0,
      value: 125000,
      certificate: 'GIA',
      certificateNumber: 'GIA-DIA-2024-089',
      location: 'Vault A-01',
      status: 'out-of-stock',
      lastUpdated: '2 days ago',
      image: '/api/placeholder/60/60'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'success'
      case 'low': return 'warning'
      case 'critical': return 'danger'
      case 'out-of-stock': return 'default'
      default: return 'primary'
    }
  }

  const getStockLevel = (item) => {
    const percentage = (item.available / (item.stock + item.reserved)) * 100
    if (percentage === 0) return 0
    if (percentage < 25) return 25
    if (percentage < 50) return 50
    if (percentage < 75) return 75
    return 100
  }

  const stockFilterOptions = [
    { key: 'all', label: 'All Stock Levels' },
    { key: 'good', label: 'Good Stock' },
    { key: 'low', label: 'Low Stock' },
    { key: 'critical', label: 'Critical' },
    { key: 'out-of-stock', label: 'Out of Stock' }
  ]

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-6 h-6 text-purple-600" />
              Inventory Management
            </h1>
            <p className="text-gray-600 mt-1">Track and manage your precious gemstone inventory</p>
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
            >
              Add Item
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {inventoryStats.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-md">
              <CardBody className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${
                    stat.color === 'blue' ? 'bg-blue-100' :
                    stat.color === 'warning' ? 'bg-yellow-100' :
                    stat.color === 'green' ? 'bg-green-100' :
                    'bg-red-100'
                  }`}>
                    <stat.icon className={`w-5 h-5 ${
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'warning' ? 'text-yellow-600' :
                      stat.color === 'green' ? 'text-green-600' :
                      'text-red-600'
                    }`} />
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
                  placeholder="Search by item name, SKU, or certificate number..."
                  startContent={<Search className="w-4 h-4 text-gray-400" />}
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  classNames={{
                    input: "text-sm",
                    inputWrapper: "h-10"
                  }}
                />
              </div>
              <div className="w-48">
                <Select
                  placeholder="Filter by stock level"
                  selectedKeys={[stockFilter]}
                  onSelectionChange={(keys) => setStockFilter(Array.from(keys)[0])}
                  size="sm"
                >
                  {stockFilterOptions.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Inventory Tabs */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-0">
            <Tabs
              selectedKey={selectedTab}
              onSelectionChange={setSelectedTab}
              variant="underlined"
              color="primary"
            >
              <Tab key="all" title="All Items" />
              <Tab key="low-stock" title={
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Low Stock
                  <Chip size="sm" color="warning" variant="flat">45</Chip>
                </div>
              } />
              <Tab key="certified" title={
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Certified
                </div>
              } />
              <Tab key="high-value" title="High Value" />
            </Tabs>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {inventoryItems.map((item) => (
                <Card key={item.id} className="border-0 shadow-sm">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={item.image}
                          alt={item.name}
                          size="lg"
                          className="shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                            <Chip 
                              size="sm" 
                              color={getStatusColor(item.status)}
                              variant="flat"
                            >
                              {item.status.replace('-', ' ')}
                            </Chip>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>SKU: {item.id}</span>
                            <span className="flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              {item.certificate}: {item.certificateNumber}
                            </span>
                            <span>Location: {item.location}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Stock Level:</span>
                              <Progress 
                                value={getStockLevel(item)} 
                                color={getStatusColor(item.status)}
                                className="w-24"
                                size="sm"
                              />
                              <span className="text-sm font-medium">
                                {item.available}/{item.stock + item.reserved}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ${item.value.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">per piece</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Chip size="sm" color="primary" variant="flat">
                              Available: {item.available}
                            </Chip>
                            {item.reserved > 0 && (
                              <Chip size="sm" color="warning" variant="flat">
                                Reserved: {item.reserved}
                              </Chip>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            color="primary"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            color="warning"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            color="danger"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-md bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Urgent Restocking</h4>
                  <p className="text-sm opacity-90 mt-1">12 items critically low</p>
                </div>
                <Button 
                  size="sm" 
                  variant="flat" 
                  className="bg-white/20 text-white hover:bg-white/30"
                >
                  View
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Certificate Renewal</h4>
                  <p className="text-sm opacity-90 mt-1">8 certificates expiring soon</p>
                </div>
                <Button 
                  size="sm" 
                  variant="flat" 
                  className="bg-white/20 text-white hover:bg-white/30"
                >
                  Manage
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Inventory Audit</h4>
                  <p className="text-sm opacity-90 mt-1">Schedule monthly verification</p>
                </div>
                <Button 
                  size="sm" 
                  variant="flat" 
                  className="bg-white/20 text-white hover:bg-white/30"
                >
                  Schedule
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}