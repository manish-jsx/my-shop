// src/context/WishlistContext.js
'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useToast } from '@/hooks/useToast'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { showToast } = useToast()

  // Initialize wishlist from localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedWishlist = localStorage.getItem('wishlist')
        setWishlist(savedWishlist ? JSON.parse(savedWishlist) : [])
      }
    } catch (error) {
      console.error('Error loading wishlist:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      try {
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
      } catch (error) {
        console.error('Error saving wishlist:', error)
      }
    }
  }, [wishlist, isLoading])

  const addToWishlist = (product) => {
    try {
      if (!product?.id) {
        throw new Error('Invalid product')
      }

      setWishlist(prev => {
        // Check if product already exists in wishlist
        if (prev.some(item => item.id === product.id)) {
          showToast({
            title: 'Already in Wishlist',
            description: 'This item is already in your wishlist.',
            variant: 'info'
          })
          return prev
        }

        showToast({
          title: 'Added to Wishlist',
          description: `${product.name} has been added to your wishlist.`,
          variant: 'success'
        })
        
        return [...prev, {
          ...product,
          addedAt: new Date().toISOString()
        }]
      })
    } catch (error) {
      console.error('Error adding to wishlist:', error)
      showToast({
        title: 'Error',
        description: 'Failed to add item to wishlist.',
        variant: 'error'
      })
    }
  }

  const removeFromWishlist = (productId) => {
    try {
      setWishlist(prev => {
        const product = prev.find(item => item.id === productId)
        if (product) {
          showToast({
            title: 'Removed from Wishlist',
            description: `${product.name} has been removed from your wishlist.`,
            variant: 'success'
          })
        }
        return prev.filter(item => item.id !== productId)
      })
    } catch (error) {
      console.error('Error removing from wishlist:', error)
      showToast({
        title: 'Error',
        description: 'Failed to remove item from wishlist.',
        variant: 'error'
      })
    }
  }

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId)
  }

  const clearWishlist = () => {
    try {
      setWishlist([])
      showToast({
        title: 'Wishlist Cleared',
        description: 'Your wishlist has been cleared.',
        variant: 'success'
      })
    } catch (error) {
      console.error('Error clearing wishlist:', error)
      showToast({
        title: 'Error',
        description: 'Failed to clear wishlist.',
        variant: 'error'
      })
    }
  }

  const moveToCart = (productId, addToCart) => {
    try {
      const product = wishlist.find(item => item.id === productId)
      if (product) {
        addToCart(product)
        removeFromWishlist(productId)
        showToast({
          title: 'Moved to Cart',
          description: `${product.name} has been moved to your cart.`,
          variant: 'success'
        })
      }
    } catch (error) {
      console.error('Error moving to cart:', error)
      showToast({
        title: 'Error',
        description: 'Failed to move item to cart.',
        variant: 'error'
      })
    }
  }

  const sortWishlist = (sortBy = 'date') => {
    try {
      setWishlist(prev => {
        const sorted = [...prev].sort((a, b) => {
          switch (sortBy) {
            case 'price-low':
              return a.price - b.price
            case 'price-high':
              return b.price - a.price
            case 'name':
              return a.name.localeCompare(b.name)
            case 'date':
            default:
              return new Date(b.addedAt) - new Date(a.addedAt)
          }
        })
        return sorted
      })
    } catch (error) {
      console.error('Error sorting wishlist:', error)
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoading,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        moveToCart,
        sortWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}