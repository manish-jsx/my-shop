// src/app/(store)/privacy/page.jsx
'use client'
import { Card, CardBody, Chip } from '@nextui-org/react'
import { Shield, Eye, Lock, Users, Globe, FileText, Clock, Mail } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2025"

  const sections = [
    {
      title: "Information We Collect",
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      content: [
        {
          subtitle: "Personal Information",
          details: "When you create an account, place an order, or contact us, we may collect personal information such as your name, email address, phone number, billing address, shipping address, and payment information."
        },
        {
          subtitle: "Account Information",
          details: "Information you provide when creating and managing your account, including preferences, wishlist items, and purchase history."
        },
        {
          subtitle: "Automatically Collected Information",
          details: "We automatically collect certain information about your device and how you interact with our website, including IP address, browser type, operating system, referring URLs, and pages visited."
        },
        {
          subtitle: "Cookies and Tracking Technologies",
          details: "We use cookies, web beacons, and similar technologies to enhance your experience, remember your preferences, and analyze website usage patterns."
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <Users className="w-6 h-6 text-green-500" />,
      content: [
        {
          subtitle: "Order Processing",
          details: "To process and fulfill your orders, send order confirmations, provide customer support, and handle returns or exchanges."
        },
        {
          subtitle: "Communication",
          details: "To send you important updates about your orders, account information, promotional offers (with your consent), and respond to your inquiries."
        },
        {
          subtitle: "Personalization",
          details: "To customize your shopping experience, recommend products that may interest you, and remember your preferences."
        },
        {
          subtitle: "Analytics and Improvement",
          details: "To analyze website usage, improve our services, develop new features, and ensure the security of our platform."
        },
        {
          subtitle: "Legal Compliance",
          details: "To comply with applicable laws, regulations, legal processes, and enforce our terms of service."
        }
      ]
    },
    {
      title: "Information Sharing and Disclosure",
      icon: <Globe className="w-6 h-6 text-purple-500" />,
      content: [
        {
          subtitle: "Service Providers",
          details: "We may share your information with trusted third-party service providers who help us operate our business, such as payment processors, shipping companies, and email service providers."
        },
        {
          subtitle: "Business Transfers",
          details: "In the event of a merger, acquisition, or sale of all or part of our business, your information may be transferred as part of that transaction."
        },
        {
          subtitle: "Legal Requirements",
          details: "We may disclose your information if required to do so by law or in response to valid legal requests from public authorities."
        },
        {
          subtitle: "Protection of Rights",
          details: "We may share information to protect the rights, property, and safety of SHUKRA Gems, our customers, or others."
        }
      ]
    },
    {
      title: "Data Security",
      icon: <Lock className="w-6 h-6 text-red-500" />,
      content: [
        {
          subtitle: "Security Measures",
          details: "We implement industry-standard security measures to protect your personal information, including encryption, secure socket layer (SSL) technology, and secure servers."
        },
        {
          subtitle: "Payment Security",
          details: "All payment information is processed through PCI DSS compliant payment processors. We do not store complete credit card information on our servers."
        },
        {
          subtitle: "Access Controls",
          details: "Access to your personal information is restricted to employees and service providers who need it to provide services to you."
        },
        {
          subtitle: "Regular Monitoring",
          details: "We regularly monitor our systems for potential vulnerabilities and attacks and conduct security assessments."
        }
      ]
    },
    {
      title: "Your Privacy Rights",
      icon: <Eye className="w-6 h-6 text-orange-500" />,
      content: [
        {
          subtitle: "Access and Correction",
          details: "You have the right to access, update, or correct your personal information. You can do this through your account settings or by contacting us."
        },
        {
          subtitle: "Data Portability",
          details: "You have the right to request a copy of your personal information in a commonly used and machine-readable format."
        },
        {
          subtitle: "Deletion",
          details: "You can request deletion of your personal information, subject to certain exceptions such as legal requirements or legitimate business needs."
        },
        {
          subtitle: "Marketing Communications",
          details: "You can opt out of marketing communications at any time by using the unsubscribe link in our emails or contacting us directly."
        },
        {
          subtitle: "Cookies",
          details: "You can control cookie preferences through your browser settings, though some features may not function properly if cookies are disabled."
        }
      ]
    },
    {
      title: "International Data Transfers",
      icon: <Globe className="w-6 h-6 text-cyan-500" />,
      content: [
        {
          subtitle: "Global Operations",
          details: "SHUKRA Gems operates globally, and your information may be transferred to and processed in countries other than your country of residence."
        },
        {
          subtitle: "Safeguards",
          details: "When we transfer personal information internationally, we ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws."
        },
        {
          subtitle: "EU-US Privacy Framework",
          details: "For transfers from the European Union, we comply with applicable privacy frameworks and regulations, including GDPR requirements."
        }
      ]
    },
    {
      title: "Children's Privacy",
      icon: <Shield className="w-6 h-6 text-pink-500" />,
      content: [
        {
          subtitle: "Age Restrictions",
          details: "Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13."
        },
        {
          subtitle: "Parental Consent",
          details: "If we learn that we have collected personal information from a child under 13 without parental consent, we will delete that information promptly."
        },
        {
          subtitle: "Teen Users",
          details: "Users between 13 and 18 years old should have parental permission before providing personal information or making purchases."
        }
      ]
    },
    {
      title: "Changes to This Privacy Policy",
      icon: <Clock className="w-6 h-6 text-amber-500" />,
      content: [
        {
          subtitle: "Policy Updates",
          details: "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws."
        },
        {
          subtitle: "Notification",
          details: "We will notify you of material changes by posting the updated policy on our website and, where appropriate, by sending you an email notification."
        },
        {
          subtitle: "Effective Date",
          details: "Changes become effective on the date specified in the updated Privacy Policy. Your continued use of our services after the effective date constitutes acceptance of the updated policy."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-blue-200" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-4">
            Your privacy is important to us. This policy explains how SHUKRA Gems collects, 
            uses, and protects your personal information.
          </p>
          <div className="flex items-center justify-center space-x-2 text-blue-200">
            <Clock className="w-5 h-5" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Introduction */}
          <Card className="p-8 mb-8">
            <CardBody>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                SHUKRA Gems ("we," "our," or "us") is committed to protecting your privacy and ensuring 
                the security of your personal information. This Privacy Policy describes how we collect, 
                use, share, and protect information about you when you visit our website, use our services, 
                or interact with us.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our website or services, you agree to the collection and use of information 
                in accordance with this Privacy Policy. If you do not agree with our policies and 
                practices, please do not use our services.
              </p>
            </CardBody>
          </Card>

          {/* Policy Sections */}
          <div className="space-y-8">
            {sections.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="p-6">
                <CardBody>
                  <div className="flex items-center space-x-3 mb-6">
                    {section.icon}
                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.subtitle}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {item.details}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Contact Information */}
          <Card className="p-8 mt-8 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardBody>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Privacy?</h2>
                <p className="text-gray-700 mb-6">
                  If you have any questions about this Privacy Policy or our privacy practices, 
                  please don't hesitate to contact us.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-blue-600">privacy@shukragems.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                    <p className="text-blue-600">1-800-PRIVACY</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Mail</h3>
                    <p className="text-gray-700">
                      SHUKRA Gems Privacy Team<br />
                      123 Gem Street<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Quick Reference */}
          <Card className="p-6 mt-8 border-l-4 border-blue-500">
            <CardBody>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Reference</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Chip size="sm" color="primary" variant="flat">Key Point</Chip>
                  <span className="text-gray-700">We never sell your personal information</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Chip size="sm" color="success" variant="flat">Secure</Chip>
                  <span className="text-gray-700">Industry-standard encryption and security</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Chip size="sm" color="warning" variant="flat">Control</Chip>
                  <span className="text-gray-700">You can access, update, or delete your data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Chip size="sm" color="secondary" variant="flat">Transparent</Chip>
                  <span className="text-gray-700">Clear information about data collection and use</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  )
}
