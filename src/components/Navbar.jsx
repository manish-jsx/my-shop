// src/components/Navbar.jsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton, SignInButton, useUser } from '@clerk/nextjs'
import { 
  Navbar as NextUINavbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenu, 
  NavbarMenuItem, 
  NavbarMenuToggle,
  Button,
  Badge 
} from '@nextui-org/react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isLoaded } = useUser()
  const { cart } = useCart()

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Cart', href: '/cart' },
    ...(user?.publicMetadata?.role === 'admin' ? [{ name: 'Admin', href: '/admin' }] : []),
  ]

  return (
    <NextUINavbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-background/70 backdrop-blur-md"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            Enchanted Collections
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem 
            key={item.href} 
            isActive={pathname === item.href}
          >
            <Link href={item.href}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/cart">
            <Badge
              content={cartItemCount}
              color="primary"
              isInvisible={cartItemCount === 0}
            >
              <Button
                variant="light"
                isIconOnly
              >
                Cart
              </Button>
            </Badge>
          </Link>
        </NavbarItem>
        <NavbarItem>
          {!isLoaded || !user ? (
            <SignInButton mode="modal">
              <Button color="primary" variant="flat">
                Sign In
              </Button>
            </SignInButton>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              href={item.href}
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  )
}