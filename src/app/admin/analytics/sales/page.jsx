// src/app/admin/analytics/sales/page.jsx
'use client'
import SalesAnalytics from '@/components/admin/analytics/SalesAnalytics'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function SalesAnalyticsPage() {
  return (
    <PageTransition>
      <SalesAnalytics />
    </PageTransition>
  )
}
