// src/components/admin/ProductTable.jsx
'use client'
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableColumn, 
  TableRow, 
  TableCell,
  Button,
  User
} from '@nextui-org/react'
import { useState } from 'react'
import { products as initialProducts } from '@/lib/products'

export default function ProductTable() {
  const [products, setProducts] = useState(initialProducts)

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id))
  }

  return (
    <Table aria-label="Products table">
      <TableHeader>
        <TableColumn>PRODUCT</TableColumn>
        <TableColumn>CATEGORY</TableColumn>
        <TableColumn>PRICE</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <User
                name={product.name}
                avatarProps={{
                  src: product.image,
                  size: "sm"
                }}
              />
            </TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>${product.price.toFixed(2)}</TableCell>
            <TableCell>
              <Button 
                color="danger" 
                size="sm" 
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}