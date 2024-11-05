// src/app/admin/orders/pending/page.jsx
'use client'
import PendingOrders from '@/components/admin/orders/PendingOrders'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function PendingOrdersPage() {
  return (
    <PageTransition>
      <PendingOrders />
    </PageTransition>
  )
}
