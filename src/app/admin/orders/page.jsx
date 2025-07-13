// src/app/admin/orders/page.jsx
'use client'
import { useState } from 'react'
import { Card, CardBody, CardHeader, Button, Input, Tabs, Tab, Chip, Select, SelectItem } from '@nextui-org/react'
import { Search, Filter, FileText, AlertTriangle, CheckCircle, Clock, DollarSign, Shield, Gem } from 'lucide-react'
import OrderTable from '@/components/admin/orders/OrderTable'
import OrderDetails from '@/components/admin/orders/OrderDetails'

import { useDisclosure } from '@nextui-org/react'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function OrdersPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const orderStats = [
    {
      title: 'Total Orders',
      value: '1,342',
      change: '+18 today',
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'High-Value Orders',
      value: '67',
      change: '$450K+ value',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Pending Verification',
      value: '23',
      change: 'Requires authentication',
      icon: Shield,
      color: 'warning'
    },
    {
      title: 'Urgent Orders',
      value: '8',
      change: 'Priority processing',
      icon: AlertTriangle,
      color: 'danger'
    }
  ]

  const statusOptions = [
    { key: 'all', label: 'All Status' },
    { key: 'pending', label: 'Pending' },
    { key: 'verification', label: 'Pending Verification' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'cancelled', label: 'Cancelled' }
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
                Order Management
              </h1>
              <p className="text-gray-600 mt-1">Track and manage high-value gemstone orders</p>
            </div>
            <div className="flex gap-2">
              <Button
                startContent={<FileText className="w-4 h-4" />}
                variant="flat"
                color="primary"
              >
                Export Orders
              </Button>
              <Button
                startContent={<Shield className="w-4 h-4" />}
                color="warning"
                variant="flat"
              >
                Verify Pending (23)
              </Button>
            </div>
          </div>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {orderStats.map((stat) => (
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
                    stat.color === 'green' ? 'bg-green-100' :
                    stat.color === 'warning' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    <stat.icon className={`w-5 h-5 ${
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'warning' ? 'text-yellow-600' :
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
                  placeholder="Search orders by ID, customer name, or product..."
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
                  placeholder="Filter by status"
                  selectedKeys={[statusFilter]}
                  onSelectionChange={(keys) => setStatusFilter(Array.from(keys)[0])}
                  size="sm"
                >
                  {statusOptions.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <Button
                startContent={<Filter className="w-4 h-4" />}
                variant="flat"
                color="primary"
              >
                More Filters
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Order Priority Tabs */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-0">
            <Tabs
              selectedKey={selectedTab}
              onSelectionChange={setSelectedTab}
              variant="underlined"
              color="primary"
            >
              <Tab key="all" title="All Orders" />
              <Tab key="high-value" title={
                <div className="flex items-center gap-2">
                  High-Value
                  <Chip size="sm" color="success" variant="flat">67</Chip>
                </div>
              } />
              <Tab key="verification" title={
                <div className="flex items-center gap-2">
                  Verification
                  <Chip size="sm" color="warning" variant="flat">23</Chip>
                </div>
              } />
              <Tab key="urgent" title={
                <div className="flex items-center gap-2">
                  Urgent
                  <Chip size="sm" color="danger" variant="flat">8</Chip>
                </div>
              } />
              <Tab key="completed" title="Completed" />
            </Tabs>
          </CardHeader>
          <CardBody>
            <OrderTable 
              onViewDetails={onOpen} 
              searchQuery={searchQuery} 
              selectedTab={selectedTab}
              statusFilter={statusFilter}
            />
          </CardBody>
        </Card>

        <OrderDetails isOpen={isOpen} onClose={onClose} />
      </div>
    </PageTransition>
  )
}
