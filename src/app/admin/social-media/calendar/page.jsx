// src/app/admin/social-media/calendar/page.jsx
'use client'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Calendar as CalendarIcon } from 'lucide-react'
import ContentCalendar from '@/components/admin/social-media/ContentCalendar'

export default function SocialMediaCalendarPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <CalendarIcon className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Content Calendar</h1>
        </div>
        <p className="text-gray-600">
          Plan and schedule your social media content across all platforms
        </p>
      </div>

      <Card>
        <CardBody className="p-0">
          <ContentCalendar />
        </CardBody>
      </Card>
    </div>
  )
}
