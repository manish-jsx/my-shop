// src/components/admin/tables/DataTable.jsx
'use client'
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableColumn, 
  TableRow, 
  TableCell,
  Input,
  Button,
  Pagination,
  Selection,
  SortDescriptor,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react'

export default function DataTable({
  data,
  columns,
  selectionMode = "multiple",
  onSelectionChange = () => {},
  onAction = () => {},
  actions = [],
  searchPlaceholder = "Search...",
  sortable = true,
}) {
  const [filterValue, setFilterValue] = useState("")
  const [selectedKeys, setSelectedKeys] = useState(new Set([]))
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "id",
    direction: "ascending",
  })

  // Handle search/filter
  const filteredItems = useMemo(() => {
    let filtered = [...data]

    if (filterValue) {
      filtered = filtered.filter(item =>
        columns.some(column => 
          String(item[column.key])
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        )
      )
    }

    // Handle sorting
    if (sortDescriptor.column) {
      filtered.sort((a, b) => {
        const first = a[sortDescriptor.column]
        const second = b[sortDescriptor.column]
        const cmp = first < second ? -1 : first > second ? 1 : 0

        return sortDescriptor.direction === "descending" ? -cmp : cmp
      })
    }

    return filtered
  }, [data, filterValue, sortDescriptor, columns])

  // Pagination
  const pages = Math.ceil(filteredItems.length / rowsPerPage)
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  // Handle selection
  const handleSelectionChange = (keys) => {
    setSelectedKeys(keys)
    onSelectionChange(keys)
  }

  return (
    <div className="space-y-4">
      {/* Table Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
            inputWrapper: "border-1",
          }}
          placeholder={searchPlaceholder}
          startContent={<Search className="w-4 h-4 text-gray-400" />}
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={setFilterValue}
        />
        <div className="flex gap-3">
          {actions.length > 0 && selectedKeys.size > 0 && (
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  endContent={<ChevronDown className="w-4 h-4" />}
                  variant="flat"
                >
                  Actions
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) => onAction(key, Array.from(selectedKeys))}
              >
                {actions.map((action) => (
                  <DropdownItem key={action.key}>
                    {action.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
          <Dropdown>
            <DropdownTrigger>
              <Button 
                endContent={<SlidersHorizontal className="w-4 h-4" />}
                variant="flat"
              >
                View
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectionMode="single"
              selectedKeys={new Set([rowsPerPage.toString()])}
              onSelectionChange={(keys) => setRowsPerPage(Number(Array.from(keys)[0]))}
            >
              <DropdownItem key="10">10 per page</DropdownItem>
              <DropdownItem key="20">20 per page</DropdownItem>
              <DropdownItem key="50">50 per page</DropdownItem>
              <DropdownItem key="100">100 per page</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* Table */}
      <Table
        aria-label="Data table"
        isHeaderSticky
        selectionMode={selectionMode}
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        classNames={{
          wrapper: "max-h-[600px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.align || "start"}
              allowsSorting={sortable && column.sortable !== false}
              width={column.width}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody 
          items={items}
          emptyContent="No data to display"
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columns.find(col => col.key === columnKey)?.render?.(item) || 
                    item[columnKey]}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Total {filteredItems.length} items
        </span>
        <Pagination
          showControls
          total={pages}
          page={page}
          onChange={setPage}
        />
      </div>
    </div>
  )
}