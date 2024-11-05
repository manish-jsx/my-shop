// src/app/admin/analytics/page.jsx
'use client'
import AnalyticsOverview from '@/components/admin/analytics/AnalyticsOverview'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function AnalyticsPage() {
  return (
    <PageTransition>
      <AnalyticsOverview />
    </PageTransition>
  )
}
