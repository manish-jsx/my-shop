// src/app/admin/products/inventory/page.jsx
'use client'
import InventoryManager from '@/components/admin/products/InventoryManager'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function InventoryPage() {
  return (
    <PageTransition>
      <InventoryManager />
    </PageTransition>
  )
}