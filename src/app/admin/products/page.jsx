// src/app/admin/products/page.jsx
'use client'
import ProductTable from '@/components/admin/products/ProductTable'
import ProductForm from '@/components/admin/products/ProductForm'
import { useDisclosure } from '@nextui-org/react'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function ProductsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <PageTransition>
      <div className="space-y-6">
        <ProductTable onAddNew={onOpen} />
        <ProductForm isOpen={isOpen} onClose={onClose} />
      </div>
    </PageTransition>
  )
}