// src/app/(store)/template.jsx
import Navbar from '@/components/Navbar'

export default function StoreTemplate({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-[470px]:py-0 max-[470px]:px-0">
        {children}
      </main>
    </div>
  )
}