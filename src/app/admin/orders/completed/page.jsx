// src/app/admin/orders/completed/page.jsx
'use client'
import CompletedOrders from '@/components/admin/orders/CompletedOrders'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function CompletedOrdersPage() {
  return (
    <PageTransition>
      <CompletedOrders />
    </PageTransition>
  )
}