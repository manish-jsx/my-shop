// src/app/(store)/loading.jsx
import { Spinner } from "@nextui-org/react"

export default function StoreLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Spinner size="lg" />
    </div>
  )
}
