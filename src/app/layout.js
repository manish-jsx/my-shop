// // src/app/layout.jsx
// import { ClerkProvider } from '@clerk/nextjs'
// import { Inter } from 'next/font/google'
// import Providers from '@/components/Providers'
// import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Enchanted Collections',
//   description: 'Your one-stop shop for charms, jewelry, and lights',
// }

// export default function RootLayout({ children }) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//       <body className={`${inter.className} dark:bg-gray-900`}>

//           <Providers>
//             {children}
//           </Providers>
//         </body>
//       </html>
//     </ClerkProvider>
//   )
// }

// app/layout.jsx
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Enchanted Collections',
  description: 'Your one-stop shop for charms, jewelry, and lights',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
          <Providers>
            {children}
          </Providers>
          <script dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  if (mode) {
                    document.documentElement.classList.add(mode);
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `
          }} />
        </body>
      </html>
    </ClerkProvider>
  )
}