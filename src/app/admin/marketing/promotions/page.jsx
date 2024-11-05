// src/app/admin/marketing/promotions/page.jsx
'use client'
import PromotionManager from '@/components/admin/marketing/PromotionManager'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function PromotionsPage() {
  return (
    <PageTransition>
      <PromotionManager />
    </PageTransition>
  )
}
