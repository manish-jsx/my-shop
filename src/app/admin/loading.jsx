// src/app/admin/loading.jsx
import { Spinner } from "@nextui-org/react"

export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Spinner size="lg" color="primary" />
    </div>
  )
}