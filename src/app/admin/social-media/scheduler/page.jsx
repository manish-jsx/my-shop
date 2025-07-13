// src/app/admin/social-media/scheduler/page.jsx
'use client'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Clock } from 'lucide-react'
import PostScheduler from '@/components/admin/social-media/PostScheduler'

export default function SocialMediaSchedulerPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Post Scheduler</h1>
        </div>
        <p className="text-gray-600">
          Schedule your posts for optimal engagement across all social media platforms
        </p>
      </div>

      <Card>
        <CardBody className="p-0">
          <PostScheduler />
        </CardBody>
      </Card>
    </div>
  )
}
