// // src/components/Navbar.jsx
// 'use client'
// import { useState } from 'react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { UserButton, SignInButton, useUser } from '@clerk/nextjs'
// import { 
//   Navbar as NextUINavbar, 
//   NavbarBrand, 
//   NavbarContent, 
//   NavbarItem, 
//   NavbarMenu, 
//   NavbarMenuItem, 
//   NavbarMenuToggle,
//   Button,
//   Badge 
// } from '@nextui-org/react'
// import { useCart } from '@/context/CartContext'

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const pathname = usePathname()
//   const { user, isLoaded } = useUser()
//   const { cart } = useCart()

//   const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

//   const menuItems = [
//     { name: 'Home', href: '/' },
//     { name: 'Products', href: '/products' },
//     { name: 'Cart', href: '/cart' },
//     ...(user?.publicMetadata?.role === 'admin' ? [{ name: 'Admin', href: '/admin' }] : []),
//   ]

//   return (
//     <NextUINavbar
//       isBordered
//       isMenuOpen={isMenuOpen}
//       onMenuOpenChange={setIsMenuOpen}
//       className="bg-background/70 backdrop-blur-md"
//     >
//       <NavbarContent className="sm:hidden" justify="start">
//         <NavbarMenuToggle />
//       </NavbarContent>

//       <NavbarContent justify="start">
//         <NavbarBrand>
//           <Link href="/" className="font-bold text-inherit">
//             Enchanted Collections
//           </Link>
//         </NavbarBrand>
//       </NavbarContent>

//       <NavbarContent className="hidden sm:flex gap-4" justify="center">
//         {menuItems.map((item) => (
//           <NavbarItem 
//             key={item.href} 
//             isActive={pathname === item.href}
//           >
//             <Link href={item.href}>
//               {item.name}
//             </Link>
//           </NavbarItem>
//         ))}
//       </NavbarContent>

//       <NavbarContent justify="end">
//         <NavbarItem>
//           <Link href="/cart">
//             <Badge
//               content={cartItemCount}
//               color="primary"
//               isInvisible={cartItemCount === 0}
//             >
//               <Button
//                 variant="light"
//                 isIconOnly
//               >
//                 Cart
//               </Button>
//             </Badge>
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           {!isLoaded || !user ? (
//             <SignInButton mode="modal">
//               <Button color="primary" variant="flat">
//                 Sign In
//               </Button>
//             </SignInButton>
//           ) : (
//             <UserButton afterSignOutUrl="/" />
//           )}
//         </NavbarItem>
//       </NavbarContent>

//       <NavbarMenu>
//         {menuItems.map((item) => (
//           <NavbarMenuItem key={item.href}>
//             <Link
//               href={item.href}
//               className="w-full"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {item.name}
//             </Link>
//           </NavbarMenuItem>
//         ))}
//       </NavbarMenu>
//     </NextUINavbar>
//   )
// }


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
import { ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { useMobile } from '@/hooks/useMobile'

export default function Navbar() {
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isLoaded } = useUser()
  const { cart } = useCart()
  const { wishlist } = useWishlist()

  // Don't render navbar on mobile (470px and below)
  if (isMobile) {
    return null
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const wishlistItemCount = wishlist.length

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'Collections', href: '/collections' },
    { name: 'Education', href: '/education' },
    { name: 'Blog', href: '/blog' },
    { name: 'News', href: '/news' },
    { name: 'About', href: '/about' },
    { name: 'Cart', href: '/cart' },
    { name: 'Wishlist', href: '/wishlist' },
    ...(user?.publicMetadata?.role === 'admin' ? [{ name: 'Admin', href: '/admin' }] : []),
  ]

  return (
    <NextUINavbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-background/70 backdrop-blur-md dark:bg-gray-900/70"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            SHUKRA Gems
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem 
            key={item.href} 
            isActive={pathname === item.href}
          >
            <Link 
              href={item.href}
              className="dark:text-gray-300 dark:hover:text-white"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2">
        {/* Theme Switcher */}
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        
        {/* Wishlist */}
        <NavbarItem>
          <Link href="/wishlist">
            <Badge
              content={wishlistItemCount}
              color="danger"
              isInvisible={wishlistItemCount === 0}
            >
              <Button
                variant="light"
                isIconOnly
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </Badge>
          </Link>
        </NavbarItem>
        
        {/* Cart */}
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
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Badge>
          </Link>
        </NavbarItem>

        {/* Auth Button */}
        <NavbarItem>
          {!isLoaded || !user ? (
            <SignInButton mode="modal">
              <Button 
                color="primary" 
                variant="flat"
                className="dark:text-white"
              >
                Sign In
              </Button>
            </SignInButton>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="dark:bg-gray-900">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              href={item.href}
              className="w-full dark:text-gray-300 dark:hover:text-white"
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