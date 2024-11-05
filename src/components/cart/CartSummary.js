// src/components/cart/CartSummary.js
'use client'
import { Card, Button } from '@nextui-org/react'
import { useCart } from '@/context/CartContext'

export default function CartSummary() {
  const { cart, getCartTotal } = useCart()
  const subtotal = getCartTotal()
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Button 
          color="primary" 
          size="lg" 
          className="w-full"
        >
          Proceed to Checkout
        </Button>
      </div>
    </Card>
  )
}