// src/hooks/useProducts.js
'use client'
import { useState, useCallback, useEffect } from 'react'
import { products as initialProducts } from '@/lib/products'

export function useProducts(category = null) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProducts = () => {
      try {
        setLoading(true)
        // Simulate API call with local data
        const filteredProducts = category
          ? initialProducts.filter(p => p.category === category)
          : initialProducts
        setProducts(filteredProducts)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [category])

  const addProduct = useCallback((newProduct) => {
    setProducts(prev => [...prev, { ...newProduct, id: Date.now() }])
  }, [])

  const updateProduct = useCallback((id, updatedProduct) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    )
  }, [])

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(product => product.id !== id))
  }, [])

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct
  }
}
