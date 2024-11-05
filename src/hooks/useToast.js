// src/hooks/useToast.js
'use client'
import { useState, useCallback } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback(({ title, description, variant = 'info', duration = 3000 }) => {
    const id = Date.now()
    
    setToasts(prev => [...prev, { id, title, description, variant }])

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, duration)
  }, [])

  return { toasts, showToast }
}