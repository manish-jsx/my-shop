// src/app/admin/marketing/discounts/page.jsx
'use client'
import DiscountManager from '@/components/admin/marketing/DiscountManager'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function DiscountsPage() {
  return (
    <PageTransition>
      <DiscountManager />
    </PageTransition>
  )
}
