// 'use client'
// import { useState } from 'react'
// import {
//   Card,
//   CardBody,
//   Button,
//   Input,
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Chip,
//   useDisclosure,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Textarea,
//   Select,
//   SelectItem,
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem
// } from '@nextui-org/react'
// import {
//   Plus,
//   Edit2,
//   Trash2,
//   MoreVertical,
//   PackageSearch,
//   AlertTriangle
// } from 'lucide-react'

// // Sample inventory data
// const initialInventory = [
//   {
//     id: 1,
//     sku: 'PRD-001',
//     name: 'Wireless Headphones',
//     category: 'Electronics',
//     price: 99.99,
//     stockLevel: 45,
//     reorderPoint: 20,
//     supplier: 'TechGear Inc',
//     location: 'Warehouse A',
//     status: 'in-stock'
//   },
//   {
//     id: 2,
//     sku: 'PRD-002',
//     name: 'Gaming Mouse',
//     category: 'Electronics',
//     price: 59.99,
//     stockLevel: 15,
//     reorderPoint: 25,
//     supplier: 'Gaming Peripherals Ltd',
//     location: 'Warehouse B',
//     status: 'low-stock'
//   }
// ]

// const categories = [
//   'Electronics',
//   'Clothing',
//   'Books',
//   'Home & Garden',
//   'Sports',
//   'Toys',
//   'Beauty',
//   'Food'
// ]

// const locations = [
//   'Warehouse A',
//   'Warehouse B',
//   'Warehouse C',
//   'Store Front',
//   'External Storage'
// ]

// export default function InventoryManager() {
//   const { isOpen, onOpen, onClose } = useDisclosure()
//   const [inventory, setInventory] = useState(initialInventory)
//   const [editingProduct, setEditingProduct] = useState(null)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [statusFilter, setStatusFilter] = useState('all')

//   const [formData, setFormData] = useState({
//     sku: '',
//     name: '',
//     category: '',
//     price: '',
//     stockLevel: '',
//     reorderPoint: '',
//     supplier: '',
//     location: ''
//   })

//   const getStockStatus = (stockLevel, reorderPoint) => {
//     if (stockLevel <= 0) return 'out-of-stock'
//     if (stockLevel <= reorderPoint) return 'low-stock'
//     return 'in-stock'
//   }

//   const handleEdit = (product) => {
//     setEditingProduct(product)
//     setFormData({
//       sku: product.sku,
//       name: product.name,
//       category: product.category,
//       price: product.price.toString(),
//       stockLevel: product.stockLevel.toString(),
//       reorderPoint: product.reorderPoint.toString(),
//       supplier: product.supplier,
//       location: product.location
//     })
//     onOpen()
//   }

//   const handleSubmit = () => {    
//     const newProduct = {
//       id: editingProduct ? editingProduct.id : Date.now(),
//       sku: formData.sku,
//       name: formData.name,
//       category: formData.category,
//       price: parseFloat(formData.price) || 0,
//       stockLevel: parseInt(formData.stockLevel) || 0,
//       reorderPoint: parseInt(formData.reorderPoint) || 0,
//       supplier: formData.supplier,
//       location: formData.location
//     }

//     newProduct.status = getStockStatus(newProduct.stockLevel, newProduct.reorderPoint)

//     if (editingProduct) {
//       setInventory(inventory.map(p => 
//         p.id === editingProduct.id ? newProduct : p
//       ))
//     } else {
//       setInventory([...inventory, newProduct])
//     }
    
//     onClose()
//     resetForm()
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Inventory Manager</h1>
//         <Button
//           color="primary"
//           startContent={<Plus className="w-4 h-4" />}
//           onPress={() => {
//             resetForm()
//             onOpen()
//           }}
//         >
//           Add Product
//         </Button>
//       </div>

//       {/* Filters */}
//       <div className="flex gap-4">
//         <Input
//           className="max-w-xs"
//           placeholder="Search by name or SKU..."
//           startContent={<PackageSearch className="w-4 h-4 text-gray-400" />}
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <Select
//           className="max-w-xs"
//           placeholder="Filter by status"
//           selectedKeys={[statusFilter]}
//           onChange={(e) => setStatusFilter(e.target.value)}
//         >
//           <SelectItem key="all">All</SelectItem>
//           <SelectItem key="in-stock">In Stock</SelectItem>
//           <SelectItem key="low-stock">Low Stock</SelectItem>
//           <SelectItem key="out-of-stock">Out of Stock</SelectItem>
//         </Select>
//       </div>

//       {/* Low Stock Alerts */}
//       {inventory.some(p => p.status === 'low-stock' || p.status === 'out-of-stock') && (
//         <Card className="bg-warning-50">
//           <CardBody>
//             <div className="flex items-center gap-2 text-warning-600">
//               <AlertTriangle className="w-5 h-5" />
//               <p>Some products are running low on stock. Please check the inventory levels.</p>
//             </div>
//           </CardBody>
//         </Card>
//       )}

//       {/* Inventory Table */}
//       <Card>
//         <CardBody>
//           <Table aria-label="Inventory table">
//             <TableHeader>
//               <TableColumn>PRODUCT</TableColumn>
//               <TableColumn>CATEGORY</TableColumn>
//               <TableColumn>PRICE</TableColumn>
//               <TableColumn>STOCK</TableColumn>
//               <TableColumn>LOCATION</TableColumn>
//               <TableColumn>STATUS</TableColumn>
//               <TableColumn>ACTIONS</TableColumn>
//             </TableHeader>
//             <TableBody>
//               {filteredInventory.map((product) => (
//                 <TableRow key={product.id}>
//                   <TableCell>
//                     <div>
//                       <p className="font-medium">{product.name}</p>
//                       <p className="text-sm text-gray-500">SKU: {product.sku}</p>
//                     </div>
//                   </TableCell>
//                   <TableCell>{product.category}</TableCell>
//                   <TableCell>${product.price.toFixed(2)}</TableCell>
//                   <TableCell>
//                     <div>
//                       <p>Stock: {product.stockLevel}</p>
//                       <p className="text-sm text-gray-500">
//                         Reorder at: {product.reorderPoint}
//                       </p>
//                     </div>
//                   </TableCell>
//                   <TableCell>{product.location}</TableCell>
//                   <TableCell>
//                     <Chip
//                       color={statusColor[product.status]}
//                       size="sm"
//                       variant="flat"
//                     >
//                       {product.status.replace('-', ' ')}
//                     </Chip>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Button
//                         isIconOnly
//                         size="sm"
//                         variant="light"
//                         onPress={() => handleEdit(product)}
//                       >
//                         <Edit2 className="w-4 h-4" />
//                       </Button>
//                       <Dropdown>
//                         <DropdownTrigger>
//                           <Button
//                             isIconOnly
//                             size="sm"
//                             variant="light"
//                           >
//                             <MoreVertical className="w-4 h-4" />
//                           </Button>
//                         </DropdownTrigger>
//                         <DropdownMenu>
//                           <DropdownItem
//                             key="delete"
//                             className="text-danger"
//                             color="danger"
//                             startContent={<Trash2 className="w-4 h-4" />}
//                             onPress={() => handleDelete(product.id)}
//                           >
//                             Delete
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </Dropdown>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardBody>
//       </Card>

//       {/* Product Form Modal */}
//       <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader>
//                 {editingProduct ? 'Edit Product' : 'Add Product'}
//               </ModalHeader>
//               <ModalBody>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <Input
//                       label="SKU"
//                       placeholder="Enter SKU"
//                       value={formData.sku}
//                       onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
//                       isRequired
//                     />
//                     <Input
//                       label="Product Name"
//                       placeholder="Enter product name"
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       isRequired
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <Select
//                       label="Category"
//                       placeholder="Select category"
//                       selectedKeys={formData.category ? [formData.category] : []}
//                       onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                       isRequired
//                     >
//                       {categories.map(category => (
//                         <SelectItem key={category} value={category}>
//                           {category}
//                         </SelectItem>
//                       ))}
//                     </Select>
//                     <Input
//                       type="number"
//                       label="Price"
//                       placeholder="Enter price"
//                       startContent="$"
//                       value={formData.price}
//                       onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                       isRequired
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <Input
//                       type="number"
//                       label="Stock Level"
//                       placeholder="Enter current stock"
//                       value={formData.stockLevel}
//                       onChange={(e) => setFormData({ ...formData, stockLevel: e.target.value })}
//                       isRequired
//                     />
//                     <Input
//                       type="number"
//                       label="Reorder Point"
//                       placeholder="Enter reorder point"
//                       value={formData.reorderPoint}
//                       onChange={(e) => setFormData({ ...formData, reorderPoint: e.target.value })}
//                       isRequired
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <Input
//                       label="Supplier"
//                       placeholder="Enter supplier name"
//                       value={formData.supplier}
//                       onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
//                       isRequired
//                     />
//                     <Select
//                       label="Location"
//                       placeholder="Select location"
//                       selectedKeys={formData.location ? [formData.location] : []}
//                       onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                       isRequired
//                     >
//                       {locations.map(location => (
//                         <SelectItem key={location} value={location}>
//                           {location}
//                         </SelectItem>
//                       ))}
//                     </Select>
//                   </div>
//                 </div>
//               </ModalBody>
//               <ModalFooter>
//                 <Button variant="flat" onPress={onClose}>
//                   Cancel
//                 </Button>
//                 <Button color="primary" onPress={handleSubmit}>
//                   {editingProduct ? 'Update' : 'Add'} Product
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   )
// }

'use client'
import { useState } from 'react'
import {
  Card,
  CardBody,
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import {
  Plus,
  Edit2,
  Trash2,
  MoreVertical,
  PackageSearch,
  AlertTriangle
} from 'lucide-react'

// Sample inventory data
const initialInventory = [
  {
    id: 1,
    sku: 'PRD-001',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 99.99,
    stockLevel: 45,
    reorderPoint: 20,
    supplier: 'TechGear Inc',
    location: 'Warehouse A',
    status: 'in-stock'
  },
  {
    id: 2,
    sku: 'PRD-002',
    name: 'Gaming Mouse',
    category: 'Electronics',
    price: 59.99,
    stockLevel: 15,
    reorderPoint: 25,
    supplier: 'Gaming Peripherals Ltd',
    location: 'Warehouse B',
    status: 'low-stock'
  }
]

const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Beauty',
  'Food'
]

const locations = [
  'Warehouse A',
  'Warehouse B',
  'Warehouse C',
  'Store Front',
  'External Storage'
]

export default function InventoryManager() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [inventory, setInventory] = useState(initialInventory)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: '',
    price: '',
    stockLevel: '',
    reorderPoint: '',
    supplier: '',
    location: ''
  })

  const getStockStatus = (stockLevel, reorderPoint) => {
    if (stockLevel <= 0) return 'out-of-stock'
    if (stockLevel <= reorderPoint) return 'low-stock'
    return 'in-stock'
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      sku: product.sku,
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stockLevel: product.stockLevel.toString(),
      reorderPoint: product.reorderPoint.toString(),
      supplier: product.supplier,
      location: product.location
    })
    onOpen()
  }

  const handleSubmit = () => {    
    const newProduct = {
      id: editingProduct ? editingProduct.id : Date.now(),
      sku: formData.sku,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      stockLevel: parseInt(formData.stockLevel) || 0,
      reorderPoint: parseInt(formData.reorderPoint) || 0,
      supplier: formData.supplier,
      location: formData.location
    }

    newProduct.status = getStockStatus(newProduct.stockLevel, newProduct.reorderPoint)

    if (editingProduct) {
      setInventory(inventory.map(p => 
        p.id === editingProduct.id ? newProduct : p
      ))
    } else {
      setInventory([...inventory, newProduct])
    }
    
    onClose()
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      sku: '',
      name: '',
      category: '',
      price: '',
      stockLevel: '',
      reorderPoint: '',
      supplier: '',
      location: ''
    })
    setEditingProduct(null)
  }

  const handleDelete = (productId) => {
    setInventory(inventory.filter(p => p.id !== productId))
  }

  // Filter inventory based on search query and status
  const filteredInventory = inventory.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusColor = {
    'in-stock': 'success',
    'low-stock': 'warning',
    'out-of-stock': 'danger'
  }

  const hasLowStock = inventory.some(p => 
    p.status === 'low-stock' || p.status === 'out-of-stock'
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Manager</h1>
        <Button
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
          onPress={() => {
            resetForm()
            onOpen()
          }}
        >
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Input
          className="max-w-xs"
          placeholder="Search by name or SKU..."
          startContent={<PackageSearch className="w-4 h-4 text-gray-400" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          className="max-w-xs"
          placeholder="Filter by status"
          selectedKeys={[statusFilter]}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <SelectItem key="all">All</SelectItem>
          <SelectItem key="in-stock">In Stock</SelectItem>
          <SelectItem key="low-stock">Low Stock</SelectItem>
          <SelectItem key="out-of-stock">Out of Stock</SelectItem>
        </Select>
      </div>

      {/* Low Stock Alerts */}
      {hasLowStock && (
        <Card className="bg-warning-50">
          <CardBody>
            <div className="flex items-center gap-2 text-warning-600">
              <AlertTriangle className="w-5 h-5" />
              <p>Some products are running low on stock. Please check the inventory levels.</p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Inventory Table */}
      <Card>
        <CardBody>
          <Table aria-label="Inventory table">
            <TableHeader>
              <TableColumn>PRODUCT</TableColumn>
              <TableColumn>CATEGORY</TableColumn>
              <TableColumn>PRICE</TableColumn>
              <TableColumn>STOCK</TableColumn>
              <TableColumn>LOCATION</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div>
                      <p>Stock: {product.stockLevel}</p>
                      <p className="text-sm text-gray-500">
                        Reorder at: {product.reorderPoint}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{product.location}</TableCell>
                  <TableCell>
                    <Chip
                      color={statusColor[product.status]}
                      size="sm"
                      variant="flat"
                    >
                      {product.status.replace('-', ' ')}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleEdit(product)}
                      >
                        <Edit2 className="w-4 h-4" />
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
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            startContent={<Trash2 className="w-4 h-4" />}
                            onPress={() => handleDelete(product.id)}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Product Form Modal */}
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="SKU"
                      placeholder="Enter SKU"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      isRequired
                    />
                    <Input
                      label="Product Name"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      isRequired
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="Category"
                      placeholder="Select category"
                      selectedKeys={formData.category ? [formData.category] : []}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      isRequired
                    >
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      type="number"
                      label="Price"
                      placeholder="Enter price"
                      startContent="$"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      isRequired
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      label="Stock Level"
                      placeholder="Enter current stock"
                      value={formData.stockLevel}
                      onChange={(e) => setFormData({ ...formData, stockLevel: e.target.value })}
                      isRequired
                    />
                    <Input
                      type="number"
                      label="Reorder Point"
                      placeholder="Enter reorder point"
                      value={formData.reorderPoint}
                      onChange={(e) => setFormData({ ...formData, reorderPoint: e.target.value })}
                      isRequired
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Supplier"
                      placeholder="Enter supplier name"
                      value={formData.supplier}
                      onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                      isRequired
                    />
                    <Select
                      label="Location"
                      placeholder="Select location"
                      selectedKeys={formData.location ? [formData.location] : []}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      isRequired
                    >
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  {editingProduct ? 'Update' : 'Add'} Product
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}