// src/components/admin/products/ProductTable.jsx
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
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination
} from '@nextui-org/react'
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  SlidersHorizontal
} from 'lucide-react'
import { products } from '@/lib/products'

export default function ProductTable({ onAddNew }) {
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState(new Set([]))
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const columns = [
    { name: 'PRODUCT', uid: 'name' },
    { name: 'CATEGORY', uid: 'category' },
    { name: 'PRICE', uid: 'price' },
    { name: 'STOCK', uid: 'stock' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' }
  ]

  const filteredItems = [...products].filter(item =>
    item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
    item.category.toLowerCase().includes(filterValue.toLowerCase())
  )

  const pages = Math.ceil(filteredItems.length / rowsPerPage)
  const items = filteredItems.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const renderCell = (item, columnKey) => {
    switch(columnKey) {
      case 'name':
        return (
          <User
            name={item.name}
            description={item.description.substring(0, 50) + '...'}
            avatarProps={{
              src: item.image,
              radius: 'lg'
            }}
          />
        )
      case 'category':
        return (
          <Chip
            variant="flat"
            color="primary"
            size="sm"
          >
            {item.category}
          </Chip>
        )
      case 'price':
        return `$${item.price.toFixed(2)}`
      case 'stock':
        return (
          <Chip
            variant="flat"
            color={item.stock < 10 ? 'danger' : item.stock < 20 ? 'warning' : 'success'}
            size="sm"
          >
            {item.stock} units
          </Chip>
        )
      case 'status':
        return (
          <Chip
            variant="flat"
            color={item.stock === 0 ? 'danger' : 'success'}
            size="sm"
          >
            {item.stock === 0 ? 'Out of Stock' : 'In Stock'}
          </Chip>
        )
      case 'actions':
        return (
          <div className="flex gap-2 items-center">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => console.log('View', item.id)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => console.log('Edit', item.id)}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              color="danger"
              onPress={() => console.log('Delete', item.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )
      default:
        return item[columnKey]
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-3 flex-wrap">
        <Input
          isClearable
          placeholder="Search products..."
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
                Filters
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>Low Stock</DropdownItem>
              <DropdownItem>Out of Stock</DropdownItem>
              <DropdownItem>Featured</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button 
            color="primary" 
            startContent={<Plus className="w-4 h-4" />}
            onPress={onAddNew}
          >
            Add New Product
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-large shadow-sm">
        <Table
          aria-label="Products table"
          isHeaderSticky
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          bottomContent={
            <div className="flex justify-between items-center px-2 py-2">
              <span className="text-small text-default-400">
                {selectedKeys.size} of {filteredItems.length} selected
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
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn 
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={items} emptyContent="No products found">
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}