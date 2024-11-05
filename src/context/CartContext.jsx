// src/context/CartContext.js
'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [savedItems, setSavedItems] = useState([])
  const [checkoutStep, setCheckoutStep] = useState(0)

  useEffect(() => {
    // Load cart and saved items from localStorage
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart')
      const savedForLater = localStorage.getItem('savedItems')
      if (savedCart) setCart(JSON.parse(savedCart))
      if (savedForLater) setSavedItems(JSON.parse(savedForLater))
    }
  }, [])

  useEffect(() => {
    // Save to localStorage when cart or saved items change
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart))
      localStorage.setItem('savedItems', JSON.stringify(savedItems))
    }
  }, [cart, savedItems])

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const saveForLater = (productId) => {
    const item = cart.find(item => item.id === productId)
    if (item) {
      setSavedItems(prev => [...prev, item])
      removeFromCart(productId)
    }
  }

  const moveToCart = (productId) => {
    const item = savedItems.find(item => item.id === productId)
    if (item) {
      addToCart(item)
      setSavedItems(prev => prev.filter(item => item.id !== productId))
    }
  }

  const clearCart = () => {
    setCart([])
    setSavedItems([])
    setCheckoutStep(0)
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const startCheckout = () => {
    setCheckoutStep(1)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        savedItems,
        checkoutStep,
        addToCart,
        removeFromCart,
        updateQuantity,
        saveForLater,
        moveToCart,
        clearCart,
        getCartTotal,
        startCheckout,
        setCheckoutStep
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)