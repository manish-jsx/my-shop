// app/layout.jsx
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import ConditionalFooter from '@/components/ConditionalFooter'
import LeadCaptureManager from '@/components/forms/LeadCaptureManager'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SHUKRA Gems - Authentic Gemstones & Healing Crystals',
  description: 'Discover authentic gemstones, healing crystals, and certified luxury jewelry at SHUKRA Gems. Ethically sourced, GIA certified, with expert guidance and lifetime warranty.',
  keywords: 'gemstones, jewelry, healing crystals, ruby, sapphire, emerald, diamond, birthstones, luxury jewelry, GIA certified, authentic gems',
  openGraph: {
    title: 'SHUKRA Gems - Authentic Gemstones & Healing Crystals',
    description: 'Discover authentic gemstones, healing crystals, and certified luxury jewelry.',
    url: 'https://shukragems.com',
    siteName: 'SHUKRA Gems',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SHUKRA Gems - Authentic Gemstones',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHUKRA Gems - Authentic Gemstones & Healing Crystals',
    description: 'Discover authentic gemstones, healing crystals, and certified luxury jewelry.',
    images: ['/images/twitter-image.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
          <Providers>
            {children}
            <ConditionalFooter />
            <LeadCaptureManager />
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