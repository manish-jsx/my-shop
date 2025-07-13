// src/components/Footer.jsx
'use client'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Shield,
  Truck,
  RotateCcw,
  Award,
  Heart,
  Gem
} from 'lucide-react'
import SocialMediaLinks from './ui/SocialMediaLinks'
import NewsletterForm from './forms/NewsletterForm'
import { useMobile } from '@/hooks/useMobile'

export default function Footer() {
  const isMobile = useMobile()

  // Don't render footer on mobile (470px and below)
  if (isMobile) {
    return null
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Badges Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Shield className="w-8 h-8 text-blue-400" />
              <h4 className="font-semibold">GIA Certified</h4>
              <p className="text-sm text-gray-400">Authentic gemstones with certification</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Truck className="w-8 h-8 text-green-400" />
              <h4 className="font-semibold">Free Shipping</h4>
              <p className="text-sm text-gray-400">On orders over $500</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <RotateCcw className="w-8 h-8 text-purple-400" />
              <h4 className="font-semibold">30-Day Returns</h4>
              <p className="text-sm text-gray-400">Hassle-free returns</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Award className="w-8 h-8 text-yellow-400" />
              <h4 className="font-semibold">Lifetime Warranty</h4>
              <p className="text-sm text-gray-400">On all jewelry pieces</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Gem className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold">SHUKRA Gems</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Discover the world's finest gemstones and healing crystals. Each piece is carefully selected, 
              ethically sourced, and comes with our guarantee of authenticity and quality.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="font-semibold">Join Our Newsletter</h4>
              <NewsletterForm variant="footer" />
            </div>
            
            {/* Social Media Links */}
            <div className="space-y-3 mt-6">
              <h4 className="font-semibold">Follow Us</h4>
              <SocialMediaLinks variant="footer" />
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">All Gemstones</Link></li>
              <li><Link href="/products?category=ruby" className="text-gray-400 hover:text-white transition-colors">Ruby</Link></li>
              <li><Link href="/products?category=sapphire" className="text-gray-400 hover:text-white transition-colors">Sapphire</Link></li>
              <li><Link href="/products?category=emerald" className="text-gray-400 hover:text-white transition-colors">Emerald</Link></li>
              <li><Link href="/products?category=diamond" className="text-gray-400 hover:text-white transition-colors">Diamond</Link></li>
              <li><Link href="/products?category=healing" className="text-gray-400 hover:text-white transition-colors">Healing Crystals</Link></li>
              <li><Link href="/products?collection=birthstone" className="text-gray-400 hover:text-white transition-colors">Birthstones</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/collections" className="text-gray-400 hover:text-white transition-colors">Collections</Link></li>
              <li><Link href="/education" className="text-gray-400 hover:text-white transition-colors">Education</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/press" className="text-gray-400 hover:text-white transition-colors">Press</Link></li>
              <li><Link href="/sustainability" className="text-gray-400 hover:text-white transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/size-guide" className="text-gray-400 hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link href="/care" className="text-gray-400 hover:text-white transition-colors">Jewelry Care</Link></li>
              <li><Link href="/warranty" className="text-gray-400 hover:text-white transition-colors">Warranty</Link></li>
              <li><Link href="/authentication" className="text-gray-400 hover:text-white transition-colors">Authentication</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-purple-400" />
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-gray-400">1-800-SHUKRA-1</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-purple-400" />
              <div>
                <p className="font-semibold">Email Us</p>
                <p className="text-gray-400">hello@shukragems.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-purple-400" />
              <div>
                <p className="font-semibold">Visit Us</p>
                <p className="text-gray-400">New York • Los Angeles • Mumbai</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Follow Us:</span>
              <SocialMediaLinks variant="footer-bottom" />
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400 flex items-center justify-center space-x-1">
              <span>© 2025 SHUKRA Gems. All rights reserved.</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>Made with love for gem enthusiasts worldwide.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
