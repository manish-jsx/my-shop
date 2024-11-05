// src/app/admin/products/categories/page.jsx
'use client'
import CategoryManager from '@/components/admin/products/CategoryManager'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function CategoriesPage() {
  return (
    <PageTransition>
      <CategoryManager />
    </PageTransition>
  )
}
