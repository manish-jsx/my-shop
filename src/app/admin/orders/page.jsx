// src/app/admin/orders/page.jsx
'use client'
import OrderTable from '@/components/admin/orders/OrderTable'
import OrderDetails from '@/components/admin/orders/OrderDetails'
import { useDisclosure } from '@nextui-org/react'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function OrdersPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <PageTransition>
      <div className="space-y-6">
        <OrderTable onViewDetails={onOpen} />
        <OrderDetails isOpen={isOpen} onClose={onClose} />
      </div>
    </PageTransition>
  )
}
