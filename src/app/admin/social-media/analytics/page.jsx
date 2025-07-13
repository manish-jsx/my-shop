// src/app/admin/social-media/analytics/page.jsx
'use client'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { BarChart3 } from 'lucide-react'
import SocialAnalytics from '@/components/admin/social-media/SocialAnalytics'

export default function SocialMediaAnalyticsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Social Media Analytics</h1>
        </div>
        <p className="text-gray-600">
          Track performance, analyze engagement, and optimize your social media strategy
        </p>
      </div>

      <Card>
        <CardBody className="p-0">
          <SocialAnalytics />
        </CardBody>
      </Card>
    </div>
  )
}
