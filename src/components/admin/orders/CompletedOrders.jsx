
// src/components/admin/orders/CompletedOrders.jsx
'use client'
import { useState } from 'react'
import {
  Card,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User
} from '@nextui-org/react'
import { 
  Search, 
  Calendar,
  Download,
  Filter,
  ChevronDown,
  Star,
  MessageSquare
} from 'lucide-react'

// Sample completed orders
const completedOrders = [
  {
    id: 'ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://i.pravatar.cc/150?u=1'
    },
    items: [
      { name: 'Crystal Heart Charm', quantity: 2, price: 29.99 },
      { name: 'Pearl Necklace', quantity: 1, price: 70.01 }
    ],
    total: 129.99,
    date: '2024-01-15',
    completedDate: '2024-01-17',
    status: 'delivered',
    paymentMethod: 'credit_card',
    rating: 5,
    feedback: 'Great service and fast delivery!'
  },
  // Add more orders...
]

export default function CompletedOrders() {
  const [filterValue, setFilterValue] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const filteredOrders = completedOrders.filter(order => {
    const matchesSearch = (
      order.id.toLowerCase().includes(filterValue.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(filterValue.toLowerCase())
    )
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Download orders report
  const handleDownload = () => {
    // Implement CSV/PDF download
    console.log('Downloading report...')
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: 'Total Orders',
            value: '1,234',
            change: '+12.3%'
          },
          {
            title: 'Average Value',
            value: '$89.99',
            change: '+5.6%'
          },
          {
            title: 'Customer Rating',
            value: '4.8/5',
            change: '+0.2'
          },
          {
            title: 'Processing Time',
            value: '2.3 days',
            change: '-8.1%'
          }
        ].map((stat) => (
          <Card key={stat.title}>
            <CardBody>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className={`text-sm ${
                stat.change.startsWith('+') ? 'text-success' : 'text-danger'
              }`}>
                {stat.change} vs last period
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Filters and Actions */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex gap-4 flex-wrap flex-1">
          <Input
            isClearable
            placeholder="Search orders..."
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            value={filterValue}
            onClear={() => setFilterValue('')}
            onValueChange={setFilterValue}
            className="w-full sm:max-w-[44%]"
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat"
                  startContent={<Filter className="w-4 h-4" />}
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                selectedKeys={[statusFilter]}
                onSelectionChange={(keys) => setStatusFilter(Array.from(keys)[0])}
                selectionMode="single"
              >
                <DropdownItem key="all">All</DropdownItem>
                <DropdownItem key="delivered">Delivered</DropdownItem>
                <DropdownItem key="returned">Returned</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button
              variant="flat"
              startContent={<Calendar className="w-4 h-4" />}
            >
              Date Range
            </Button>
          </div>
        </div>
        <Button
          color="primary"
          startContent={<Download className="w-4 h-4" />}
          onPress={handleDownload}
        >
          Export
        </Button>
      </div>

      {/* Orders Table */}
      <Card>
        <CardBody>
          <Table aria-label="Completed orders table">
            <TableHeader>
              <TableColumn>ORDER</TableColumn>
              <TableColumn>CUSTOMER</TableColumn>
              <TableColumn>ITEMS</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>RATING</TableColumn>
              <TableColumn>FEEDBACK</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {order.completedDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <User
                      name={order.customer.name}
                      description={order.customer.email}
                      avatarProps={{
                        src: order.customer.avatar,
                        size: "sm"
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm">
                          {item.quantity}x {item.name}
                        </p>
                      ))}
                      <p className="font-medium mt-1">
                        Total: ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={order.status === 'delivered' ? 'success' : 'warning'}
                      variant="flat"
                    >
                      {order.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star 
                        className={`w-4 h-4 ${
                          order.rating >= 4 ? 'text-warning' : 'text-gray-400'
                        }`} 
                        fill="currentColor"
                      />
                      {order.rating}/5
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span className="text-sm truncate max-w-[200px]">
                        {order.feedback}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  )
}
