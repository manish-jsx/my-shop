// src/components/Providers.jsx
'use client'
import { NextUIProvider } from '@nextui-org/react'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'

export default function Providers({ children }) {
  return (
    <NextUIProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </NextUIProvider>
  )
}

