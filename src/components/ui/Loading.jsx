// src/components/ui/Loading.jsx
'use client'
import { CircularProgress } from "@nextui-org/react"

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <CircularProgress color="primary" />
    </div>
  )
}

