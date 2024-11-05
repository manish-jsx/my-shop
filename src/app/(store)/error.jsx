// src/app/(store)/error.jsx
'use client'
import { Button } from "@nextui-org/react"

export default function StoreError({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}