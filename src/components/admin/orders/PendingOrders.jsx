
// src/components/admin/orders/PendingOrders.jsx
'use client'
import { useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Card,
  CardBody,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User
} from '@nextui-org/react'
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Filter,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { motion } from 'framer-motion'

// Sample pending orders data
const pendingOrders = [
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
    waitTime: '2h 15m',
    priority: 'high',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://i.pravatar.cc/150?u=2'
    },
    items: [
      { name: 'Diamond Earrings', quantity: 1, price: 199.99 }
    ],
    total: 199.99,
    date: '2024-01-15',
    waitTime: '1h 30m',
    priority: 'medium',
    paymentStatus: 'pending'
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: 'https://i.pravatar.cc/150?u=3'
    },
    items: [
      { name: 'LED String Lights', quantity: 3, price: 29.99 }
    ],
    total: 89.97,
    date: '2024-01-14',
    waitTime: '45m',
    priority: 'low',
    paymentStatus: 'paid'
  }
]

const priorityColorMap = {
  high: 'danger',
  medium: 'warning',
  low: 'primary'
}

export default function PendingOrders() {
  const [filterValue, setFilterValue] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedOrders, setSelectedOrders] = useState(new Set([]))

  const filteredOrders = pendingOrders.filter(order => {
    const matchesSearch = (
      order.id.toLowerCase().includes(filterValue.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(filterValue.toLowerCase())
    )
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter
    return matchesSearch && matchesPriority
  })

  const handleProcessOrder = (orderId) => {
    console.log('Processing order:', orderId)
  }

  const handleBulkProcess = () => {
    console.log('Processing orders:', Array.from(selectedOrders))
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardBody className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-lg bg-danger/10">
                <AlertTriangle className="w-6 h-6 text-danger" />
              </div>
              <div>
                <p className="text-sm text-gray-500">High Priority</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardBody className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Wait Time</p>
                <p className="text-2xl font-bold">1h 30m</p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardBody className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Processed Today</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Filters and Actions */}
      <div className="flex justify-between items-center gap-3 flex-wrap">
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
                Priority: {priorityFilter === 'all' ? 'All' : 
                  priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1)}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              selectedKeys={[priorityFilter]}
              selectionMode="single"
              onSelectionChange={keys => setPriorityFilter(Array.from(keys)[0])}
            >
              <DropdownItem key="all">All</DropdownItem>
              <DropdownItem key="high">High</DropdownItem>
              <DropdownItem key="medium">Medium</DropdownItem>
              <DropdownItem key="low">Low</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {selectedOrders.size > 0 && (
            <Button 
              color="primary"
              onPress={handleBulkProcess}
            >
              Process Selected ({selectedOrders.size})
            </Button>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardBody>
          <Table
            aria-label="Pending orders table"
            selectionMode="multiple"
            selectedKeys={selectedOrders}
            onSelectionChange={setSelectedOrders}
          >
            <TableHeader>
              <TableColumn>ORDER</TableColumn>
              <TableColumn>CUSTOMER</TableColumn>
              <TableColumn>PRIORITY</TableColumn>
              <TableColumn>WAIT TIME</TableColumn>
              <TableColumn>PAYMENT</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
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
                    <Chip
                      color={priorityColorMap[order.priority]}
                      size="sm"
                      variant="flat"
                    >
                      {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {order.waitTime}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={order.paymentStatus === 'paid' ? 'success' : 'warning'}
                      size="sm"
                      variant="flat"
                    >
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      size="sm"
                      onPress={() => handleProcessOrder(order.id)}
                    >
                      Process
                    </Button>
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
