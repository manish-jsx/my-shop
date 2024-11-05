// src/app/admin/marketing/campaigns/page.jsx
'use client'
import CampaignManager from '@/components/admin/marketing/CampaignManager'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function CampaignsPage() {
  return (
    <PageTransition>
      <CampaignManager />
    </PageTransition>
  )
}