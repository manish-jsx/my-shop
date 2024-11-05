
// src/components/admin/orders/OrderTable.jsx
'use client'
import { useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Pagination
} from '@nextui-org/react'
import { 
  Search,
  SlidersHorizontal,
  Eye,
  MoreVertical,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react'

// Sample orders data
const orders = [
  {
    id: 'ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://i.pravatar.cc/150?u=1'
    },
    date: '2024-01-15',
    total: 129.99,
    status: 'completed',
    payment: 'paid',
    items: [
      { name: 'Crystal Heart Charm', quantity: 2, price: 29.99 },
      { name: 'Pearl Necklace', quantity: 1, price: 70.01 }
    ]
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://i.pravatar.cc/150?u=2'
    },
    date: '2024-01-15',
    total: 199.99,
    status: 'processing',
    payment: 'paid',
    items: [
      { name: 'Diamond Earrings', quantity: 1, price: 199.99 }
    ]
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: 'https://i.pravatar.cc/150?u=3'
    },
    date: '2024-01-14',
    total: 89.97,
    status: 'pending',
    payment: 'unpaid',
    items: [
      { name: 'LED String Lights', quantity: 3, price: 29.99 }
    ]
  }
]

const statusColorMap = {
  pending: 'warning',
  processing: 'primary',
  completed: 'success',
  cancelled: 'danger'
}

export default function OrderTable({ onViewDetails }) {
  const [filterValue, setFilterValue] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const rowsPerPage = 10

  const filteredOrders = orders.filter(order => {
    const matchesSearch = (
      order.id.toLowerCase().includes(filterValue.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(filterValue.toLowerCase())
    )
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const pages = Math.ceil(filteredOrders.length / rowsPerPage)
  const items = filteredOrders.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const renderCell = (order, columnKey) => {
    switch (columnKey) {
      case 'order':
        return (
          <div className="flex flex-col">
            <p className="text-bold">{order.id}</p>
            <p className="text-tiny text-default-500">{order.date}</p>
          </div>
        )
      case 'customer':
        return (
          <User
            name={order.customer.name}
            description={order.customer.email}
            avatarProps={{
              src: order.customer.avatar,
              size: "sm"
            }}
          />
        )
      case 'total':
        return `$${order.total.toFixed(2)}`
      case 'status':
        return (
          <Chip
            color={statusColorMap[order.status]}
            size="sm"
            variant="flat"
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Chip>
        )
      case 'payment':
        return (
          <Chip
            color={order.payment === 'paid' ? 'success' : 'warning'}
            size="sm"
            variant="flat"
          >
            {order.payment.charAt(0).toUpperCase() + order.payment.slice(1)}
          </Chip>
        )
      case 'actions':
        return (
          <div className="flex items-center gap-2">
            <Button 
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => onViewDetails(order)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  isIconOnly
                  size="sm"
                  variant="light"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Mark as Completed</DropdownItem>
                <DropdownItem>Send Reminder</DropdownItem>
                <DropdownItem className="text-danger">Cancel Order</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      default:
        return order[columnKey]
    }
  }

  return (
    <div className="space-y-4">
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
                startContent={<SlidersHorizontal className="w-4 h-4" />}
              >
                Status: {statusFilter === 'all' ? 'All' : 
                  statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              selectedKeys={[statusFilter]}
              selectionMode="single"
              onSelectionChange={(keys) => setStatusFilter(Array.from(keys)[0])}
            >
              <DropdownItem key="all">All</DropdownItem>
              <DropdownItem key="pending">Pending</DropdownItem>
              <DropdownItem key="processing">Processing</DropdownItem>
              <DropdownItem key="completed">Completed</DropdownItem>
              <DropdownItem key="cancelled">Cancelled</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="bg-white rounded-large shadow-sm">
        <Table
          aria-label="Orders table"
          bottomContent={
            <div className="flex justify-between items-center px-2 py-2">
              <span className="text-small text-default-400">
                Total {filteredOrders.length} orders
              </span>
              <Pagination
                showControls
                total={pages}
                page={page}
                onChange={setPage}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn key="order">ORDER</TableColumn>
            <TableColumn key="customer">CUSTOMER</TableColumn>
            <TableColumn key="total">TOTAL</TableColumn>
            <TableColumn key="status">STATUS</TableColumn>
            <TableColumn key="payment">PAYMENT</TableColumn>
            <TableColumn key="actions">ACTIONS</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(order) => (
              <TableRow key={order.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(order, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
