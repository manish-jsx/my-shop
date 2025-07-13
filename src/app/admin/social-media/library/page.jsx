// src/app/admin/social-media/library/page.jsx
'use client'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Image as ImageIcon } from 'lucide-react'
import ContentLibrary from '@/components/admin/social-media/ContentLibrary'

export default function SocialMediaLibraryPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <ImageIcon className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Content Library</h1>
        </div>
        <p className="text-gray-600">
          Manage your media assets, organize content, and access your creative resources
        </p>
      </div>

      <Card>
        <CardBody className="p-0">
          <ContentLibrary />
        </CardBody>
      </Card>
    </div>
  )
}
