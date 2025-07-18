// src/app/cart/page.jsx
'use client'
import { useCart } from '@/context/CartContext'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import PageTransition from '@/components/ui/PageTransition'
import { useMobile } from '@/hooks/useMobile'
import MobileSakuraLayout from '@/components/mobile/sakura/MobileSakuraLayout'
import MobileSakuraCart from '@/components/mobile/sakura/MobileSakuraCart'

export default function CartPage() {
  const isMobile = useMobile()
  const { cart } = useCart()

  // Show mobile UI on mobile devices
  if (isMobile) {
    return (
      <MobileSakuraLayout showHeader={true}>
        <MobileSakuraCart />
      </MobileSakuraLayout>
    )
  }

  return (
    <PageTransition>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div>
              <CartSummary />
            </div>
          
          </div>
        )}
      </div>
    </PageTransition>
  )
}
