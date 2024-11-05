// src/app/admin/analytics/traffic/page.jsx
'use client'
import TrafficAnalytics from '@/components/admin/analytics/TrafficAnalytics'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function TrafficAnalyticsPage() {
  return (
    <PageTransition>
      <TrafficAnalytics />
    </PageTransition>
  )
}
