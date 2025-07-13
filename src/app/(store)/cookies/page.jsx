// src/app/(store)/cookies/page.jsx
'use client'
import { Card, CardBody, Chip, Button } from '@nextui-org/react'
import { Cookie, Settings, Shield, BarChart3, Target, Globe, Clock, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function CookiePolicyPage() {
  const lastUpdated = "January 15, 2025"
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always required
    functional: true,
    analytics: true,
    marketing: false
  })

  const cookieTypes = [
    {
      title: "Essential Cookies",
      icon: <Shield className="w-6 h-6 text-green-500" />,
      required: true,
      description: "These cookies are necessary for the website to function properly and cannot be disabled.",
      purpose: "Website functionality, security, and basic features",
      examples: [
        "Shopping cart contents",
        "Login session management", 
        "Security and fraud prevention",
        "Language and region preferences"
      ],
      retention: "Session or up to 1 year",
      cookies: [
        { name: "session_id", purpose: "Maintains your login session", duration: "Session" },
        { name: "cart_token", purpose: "Stores shopping cart contents", duration: "30 days" },
        { name: "csrf_token", purpose: "Security protection", duration: "Session" }
      ]
    },
    {
      title: "Functional Cookies",
      icon: <Settings className="w-6 h-6 text-blue-500" />,
      required: false,
      description: "These cookies enhance website functionality and provide personalized features.",
      purpose: "Enhanced user experience and personalization",
      examples: [
        "Remember your preferences",
        "Wishlist synchronization",
        "Recently viewed products",
        "Theme and display settings"
      ],
      retention: "Up to 2 years",
      cookies: [
        { name: "user_preferences", purpose: "Stores your website preferences", duration: "1 year" },
        { name: "wishlist_sync", purpose: "Synchronizes wishlist across devices", duration: "6 months" },
        { name: "theme_setting", purpose: "Remembers your theme choice", duration: "1 year" }
      ]
    },
    {
      title: "Analytics Cookies",
      icon: <BarChart3 className="w-6 h-6 text-purple-500" />,
      required: false,
      description: "These cookies help us understand how visitors interact with our website.",
      purpose: "Website performance analysis and improvement",
      examples: [
        "Page views and user journeys",
        "Popular products and categories",
        "Search terms and results",
        "Website performance metrics"
      ],
      retention: "Up to 2 years",
      cookies: [
        { name: "_ga", purpose: "Google Analytics - tracks sessions", duration: "2 years" },
        { name: "_gid", purpose: "Google Analytics - tracks page views", duration: "24 hours" },
        { name: "hotjar_session", purpose: "Hotjar - user behavior analysis", duration: "30 minutes" }
      ]
    },
    {
      title: "Marketing Cookies",
      icon: <Target className="w-6 h-6 text-orange-500" />,
      required: false,
      description: "These cookies are used to deliver relevant advertisements and track campaign effectiveness.",
      purpose: "Personalized advertising and marketing",
      examples: [
        "Targeted advertisements",
        "Social media integration",
        "Email marketing personalization",
        "Retargeting campaigns"
      ],
      retention: "Up to 1 year",
      cookies: [
        { name: "facebook_pixel", purpose: "Facebook advertising targeting", duration: "90 days" },
        { name: "google_ads", purpose: "Google Ads conversion tracking", duration: "90 days" },
        { name: "email_campaign", purpose: "Email marketing personalization", duration: "6 months" }
      ]
    }
  ]

  const thirdPartyServices = [
    {
      name: "Google Analytics",
      purpose: "Website analytics and performance monitoring",
      dataCollected: "Page views, user interactions, device information",
      privacyPolicy: "https://policies.google.com/privacy"
    },
    {
      name: "Hotjar",
      purpose: "User experience analysis and heat mapping",
      dataCollected: "Mouse movements, clicks, form interactions",
      privacyPolicy: "https://www.hotjar.com/legal/policies/privacy"
    },
    {
      name: "Facebook Pixel",
      purpose: "Social media advertising and conversion tracking",
      dataCollected: "Website interactions, purchase behavior",
      privacyPolicy: "https://www.facebook.com/privacy/policy"
    },
    {
      name: "Stripe",
      purpose: "Payment processing and fraud prevention",
      dataCollected: "Payment information, transaction details",
      privacyPolicy: "https://stripe.com/privacy"
    },
    {
      name: "Mailchimp",
      purpose: "Email marketing and newsletter management",
      dataCollected: "Email address, engagement metrics",
      privacyPolicy: "https://mailchimp.com/legal/privacy"
    }
  ]

  const handleCookiePreference = (type, enabled) => {
    if (type === 'essential') return // Essential cookies cannot be disabled
    
    setCookiePreferences(prev => ({
      ...prev,
      [type]: enabled
    }))
  }

  const savePreferences = () => {
    // In a real implementation, this would save preferences to localStorage
    // and potentially send to backend
    console.log('Saving cookie preferences:', cookiePreferences)
    alert('Cookie preferences saved successfully!')
  }

  const acceptAllCookies = () => {
    setCookiePreferences({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true
    })
    savePreferences()
  }

  const rejectOptionalCookies = () => {
    setCookiePreferences({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false
    })
    savePreferences()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-amber-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Cookie className="w-16 h-16 text-orange-200" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Cookie Policy
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-4">
            Learn how SHUKRA Gems uses cookies to improve your browsing experience, 
            analyze website performance, and deliver personalized content.
          </p>
          <div className="flex items-center justify-center space-x-2 text-orange-200">
            <Clock className="w-5 h-5" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Cookie Preferences Panel */}
      <section className="py-8 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="p-6">
            <CardBody>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-4 lg:mb-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Your Cookie Preferences</h2>
                  <p className="text-gray-600">
                    Choose which types of cookies you'd like to allow. You can change these settings at any time.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    color="success"
                    onPress={acceptAllCookies}
                    startContent={<CheckCircle className="w-4 h-4" />}
                  >
                    Accept All
                  </Button>
                  <Button 
                    variant="bordered"
                    onPress={rejectOptionalCookies}
                  >
                    Reject Optional
                  </Button>
                  <Button 
                    color="primary"
                    onPress={savePreferences}
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="p-8 mb-8">
            <CardBody>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better, faster, and more personalized experience by 
                remembering your preferences and understanding how you interact with our site.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies do not contain any personally identifiable information unless you have 
                specifically provided it to us. They cannot access your personal files or install 
                software on your device.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                <p className="text-amber-800">
                  <strong>Note:</strong> You can control cookie settings through your browser, 
                  but disabling certain cookies may affect website functionality.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
            <p className="text-xl text-gray-600">
              Different cookies serve different purposes on our website.
            </p>
          </div>

          <div className="space-y-8">
            {cookieTypes.map((type, index) => (
              <Card key={index} className="p-6">
                <CardBody>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex items-center space-x-3 mb-4 lg:mb-0">
                      {type.icon}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Chip 
                            size="sm" 
                            color={type.required ? "danger" : "primary"} 
                            variant="flat"
                          >
                            {type.required ? "Required" : "Optional"}
                          </Chip>
                          <span className="text-sm text-gray-500">Retention: {type.retention}</span>
                        </div>
                      </div>
                    </div>
                    
                    {!type.required && (
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">Allow</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={cookiePreferences[type.title.toLowerCase().split(' ')[0]]}
                            onChange={(e) => handleCookiePreference(
                              type.title.toLowerCase().split(' ')[0], 
                              e.target.checked
                            )}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                        </label>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-700 mb-4">{type.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Purpose & Examples:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {type.examples.map((example, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Specific Cookies:</h4>
                      <div className="space-y-2">
                        {type.cookies.map((cookie, idx) => (
                          <div key={idx} className="text-sm">
                            <span className="font-medium text-gray-900">{cookie.name}</span>
                            <span className="text-gray-600"> - {cookie.purpose}</span>
                            <br />
                            <span className="text-xs text-gray-500">Duration: {cookie.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Third Party Services */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            <p className="text-xl text-gray-600">
              We work with trusted partners who may also use cookies to provide their services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thirdPartyServices.map((service, index) => (
              <Card key={index} className="p-6">
                <CardBody>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600 mb-3">{service.purpose}</p>
                      <div className="text-sm text-gray-500 mb-3">
                        <strong>Data collected:</strong> {service.dataCollected}
                      </div>
                      <a 
                        href={service.privacyPolicy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                      >
                        View Privacy Policy →
                      </a>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Browser Controls */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browser Cookie Controls</h2>
            <p className="text-xl text-gray-600">
              You can also manage cookies directly through your browser settings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Chrome", link: "https://support.google.com/chrome/answer/95647" },
              { name: "Firefox", link: "https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" },
              { name: "Safari", link: "https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" },
              { name: "Edge", link: "https://support.microsoft.com/en-us/help/4027947/microsoft-edge-delete-cookies" }
            ].map((browser, index) => (
              <Card key={index} className="p-4 text-center">
                <CardBody>
                  <h3 className="font-bold text-gray-900 mb-2">{browser.name}</h3>
                  <a 
                    href={browser.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 text-sm"
                  >
                    Cookie Settings Guide →
                  </a>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Questions About Cookies?</h2>
          <p className="text-xl text-orange-100 mb-8">
            If you have any questions about our use of cookies or this Cookie Policy, 
            please don't hesitate to contact us.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-orange-200">cookies@shukragems.com</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-orange-200">1-800-COOKIES</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-orange-200">Available 24/7 on our website</p>
            </div>
          </div>
          
          <Button 
            size="lg"
            className="bg-white text-orange-600 font-semibold hover:bg-orange-50"
          >
            Contact Support
          </Button>
        </div>
      </section>
    </div>
  )
}
