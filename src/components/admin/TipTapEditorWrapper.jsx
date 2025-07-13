// src/components/admin/TipTapEditorWrapper.jsx
'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const TipTapEditor = dynamic(() => import('./TipTapEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="border-b border-gray-300 p-3 bg-gray-50">
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="min-h-[400px] bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading editor...</div>
      </div>
    </div>
  )
})

const TipTapEditorWrapper = ({ content, onChange, placeholder }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="border-b border-gray-300 p-3 bg-gray-50">
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="min-h-[400px] bg-white flex items-center justify-center">
          <div className="text-gray-500">Initializing editor...</div>
        </div>
      </div>
    )
  }

  return (
    <TipTapEditor 
      content={content}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default TipTapEditorWrapper
