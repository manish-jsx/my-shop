// src/components/ui/Toast.jsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { XCircle, CheckCircle, Info, AlertCircle } from 'lucide-react'

const variants = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 border-green-200 text-green-800'
  },
  error: {
    icon: XCircle,
    className: 'bg-red-50 border-red-200 text-red-800'
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 text-blue-800'
  },
  warning: {
    icon: AlertCircle,
    className: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  }
}

export default function Toast({ toasts }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map(toast => {
          const { icon: Icon, className } = variants[toast.variant] || variants.info

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`flex items-center p-4 rounded-lg border shadow-lg ${className}`}
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">{toast.title}</h4>
                {toast.description && (
                  <p className="text-sm opacity-90">{toast.description}</p>
                )}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}