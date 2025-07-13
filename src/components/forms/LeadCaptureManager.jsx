// src/components/forms/LeadCaptureManager.jsx
'use client'
import { useState, useEffect, useRef } from 'react'
import PopupLeadForm from './PopupLeadForm'

export default function LeadCaptureManager() {
  const [showPopup, setShowPopup] = useState(false)
  const [trigger, setTrigger] = useState(null)
  const hasTriggered = useRef(false)
  const isInitialized = useRef(false)

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitialized.current) return
    isInitialized.current = true

    // Check if user has interacted with popup before
    const userDismissed = localStorage.getItem('popupDismissed')
    const lastDismissed = localStorage.getItem('lastPopupDismissed')
    const userSubscribed = localStorage.getItem('userSubscribed')
    
    // Don't show if user already subscribed or filled form
    if (userSubscribed === 'true') {
      return
    }

    // If user dismissed, respect that for 24 hours (or 7 days if dismissed multiple times)
    if (userDismissed && lastDismissed) {
      const dismissCount = parseInt(localStorage.getItem('popupDismissCount') || '0')
      const hoursSinceLastDismissed = (Date.now() - parseInt(lastDismissed)) / (1000 * 60 * 60)
      
      // Progressive dismissal periods: 24 hours, then 7 days, then 30 days
      let waitPeriod = 24 // hours
      if (dismissCount >= 2) waitPeriod = 24 * 30 // 30 days
      else if (dismissCount >= 1) waitPeriod = 24 * 7 // 7 days
      
      if (hoursSinceLastDismissed < waitPeriod) {
        return
      }
    }

    let timeoutId, scrollHandler, mouseHandler

    // Time-based trigger (60 seconds - longer delay)
    timeoutId = setTimeout(() => {
      if (!hasTriggered.current && !showPopup) {
        hasTriggered.current = true
        setTrigger('time')
        setShowPopup(true)
      }
    }, 60000) // Increased to 60 seconds

    // Scroll-based trigger (70% of page - deeper engagement)
    const handleScroll = () => {
      if (hasTriggered.current) return

      const scrolled = window.scrollY
      const viewHeight = window.innerHeight
      const fullHeight = document.body.scrollHeight
      const scrollPercentage = (scrolled + viewHeight) / fullHeight

      if (scrollPercentage > 0.7 && !showPopup) { // Increased to 70%
        hasTriggered.current = true
        setTrigger('scroll')
        setShowPopup(true)
        // Remove listener after triggering
        window.removeEventListener('scroll', handleScroll)
      }
    }

    // Exit intent trigger (only on desktop)
    const handleMouseLeave = (e) => {
      if (hasTriggered.current) return
      
      // Only trigger on desktop and when mouse actually leaves window
      if (window.innerWidth > 768 && e.clientY <= 0 && e.relatedTarget === null) {
        hasTriggered.current = true
        setTrigger('exit_intent')
        setShowPopup(true)
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    // Add event listeners with delay to avoid immediate triggers
    setTimeout(() => {
      if (!hasTriggered.current) {
        scrollHandler = handleScroll
        mouseHandler = handleMouseLeave
        window.addEventListener('scroll', scrollHandler, { passive: true })
        document.addEventListener('mouseleave', mouseHandler)
      }
    }, 10000) // Wait 10 seconds before enabling scroll/exit triggers

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
      if (mouseHandler) document.removeEventListener('mouseleave', mouseHandler)
    }
  }, [])

  const handleClosePopup = (submitted = false) => {
    setShowPopup(false)
    
    if (submitted) {
      // User subscribed - don't show again
      localStorage.setItem('userSubscribed', 'true')
    } else {
      // User dismissed - track dismissal
      const dismissCount = parseInt(localStorage.getItem('popupDismissCount') || '0')
      localStorage.setItem('popupDismissed', 'true')
      localStorage.setItem('lastPopupDismissed', Date.now().toString())
      localStorage.setItem('popupDismissCount', (dismissCount + 1).toString())
    }
  }

  return (
    <PopupLeadForm
      isOpen={showPopup}
      onClose={handleClosePopup}
      trigger={trigger}
    />
  )
}
