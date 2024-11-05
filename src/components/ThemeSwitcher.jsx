// components/ThemeSwitcher.jsx
'use client'
import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/react'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button isIconOnly variant="light" className="w-9 h-9" />
  }

  return (
    <Button
      isIconOnly
      variant="light"
      onPress={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="w-9 h-9 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </Button>
  )
}