// src/app/admin/error.jsx
'use client'
import { Button } from "@nextui-org/react"

export default function AdminError({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-4">Admin Error</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <Button color="primary" onClick={() => reset()}>Try again</Button>
    </div>
  )
}
