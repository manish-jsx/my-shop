// src/components/mobile/sakura/MobileSakuraLayout.jsx
'use client'
import { Suspense } from 'react'
import MobileSakuraHeader from './MobileSakuraHeader'
import MobileSakuraFooter from './MobileSakuraFooter'
import { useMobile } from '@/hooks/useMobile'

export default function MobileSakuraLayout({ children, showHeader = true, showFooter = true }) {
  const isMobile = useMobile()

  if (!isMobile) {
    return null // Don't render on desktop
  }

  return (
    <div className="mobile-sakura-layout min-h-screen bg-gray-50 m-0 p-0 overflow-x-hidden overflow-y-auto relative w-full max-w-full">
      {/* Mobile Header */}
      {showHeader && <MobileSakuraHeader />}
      
      {/* Main Content */}
      <main className={`${showFooter ? 'pb-20' : 'pb-0'} ${showHeader ? 'pt-0' : 'pt-0'} m-0 p-0 w-full overflow-x-hidden`}>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[50vh] m-0 p-4">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-purple-600 font-medium">Loading SAKURA Gems...</p>
            </div>
          </div>
        }>
          {children}
        </Suspense>
      </main>
      
      {/* Footer Navigation - Completely Fixed */}
      {showFooter && (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full">
          <MobileSakuraFooter />
        </div>
      )}
    </div>
  )
}
