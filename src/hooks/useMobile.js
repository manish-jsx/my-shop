// src/hooks/useMobile.js
'use client'
import { useState, useEffect } from 'react'

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const screenWidth = window.innerWidth <= 470
      setIsMobile(screenWidth)
    }

    // Check on mount
    checkMobile()
    
    // Add resize listener with debouncing
    let timeoutId
    const debouncedCheck = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkMobile, 100)
    }
    
    window.addEventListener('resize', debouncedCheck)
    
    return () => {
      window.removeEventListener('resize', debouncedCheck)
      clearTimeout(timeoutId)
    }
  }, [])

  return isMobile
}

export function getMobileOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'ios'
  }

  if (/android/i.test(userAgent)) {
    return 'android'
  }

  return 'unknown'
}
