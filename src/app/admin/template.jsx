// src/app/admin/template.jsx
'use client'
import { useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AuthGuard from '@/components/admin/AuthGuard'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import QuickActions from '@/components/admin/QuickActions'
import { PageTransition } from '@/components/ui/PageTransitions'

export default function AdminTemplate({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar 
          isCollapsed={isCollapsed} 
          onToggle={() => setIsCollapsed(!isCollapsed)} 
        />
        <div className={`transition-all duration-300 ${
          isCollapsed ? 'ml-[80px]' : 'ml-[280px]'
        }`}>
          <AdminHeader />
          <main className="p-6">
            <Breadcrumbs />
            <QuickActions />
            <div className="mt-6">
              <PageTransition>
                {children}
              </PageTransition>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}