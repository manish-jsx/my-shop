// src/hooks/useCategories.js
'use client'
import { useMemo } from 'react'
import { products } from '@/lib/products'

export function useCategories() {
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))]
    return uniqueCategories.map(category => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1)
    }))
  }, [])

  return categories
}