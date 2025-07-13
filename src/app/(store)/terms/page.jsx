// src/app/(store)/terms/page.jsx
'use client'
import { Card, CardBody, Chip } from '@nextui-org/react'
import { Scale, FileText, Shield, CreditCard, Truck, RotateCcw, AlertTriangle, Clock } from 'lucide-react'

export default function TermsOfServicePage() {
  const lastUpdated = "January 15, 2025"
  const effectiveDate = "January 15, 2025"

  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      content: [
        {
          subtitle: "Agreement to Terms",
          details: "By accessing or using the SHUKRA Gems website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services."
        },
        {
          subtitle: "Legal Capacity",
          details: "You must be at least 18 years old or have reached the age of majority in your jurisdiction to use our services. By using our services, you represent that you meet these age requirements."
        },
        {
          subtitle: "Modifications",
          details: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms."
        }
      ]
    },
    {
      title: "Use of Our Services",
      icon: <Shield className="w-6 h-6 text-green-500" />,
      content: [
        {
          subtitle: "Permitted Use",
          details: "You may use our website and services for lawful purposes only. You agree not to use our services for any unlawful or prohibited activities, or in any way that could damage, disable, or impair our services."
        },
        {
          subtitle: "Account Responsibility",
          details: "You are responsible for maintaining the confidentiality of your account information and password. You agree to notify us immediately of any unauthorized use of your account."
        },
        {
          subtitle: "Prohibited Activities",
          details: "You may not: (a) violate any applicable laws; (b) infringe on intellectual property rights; (c) transmit harmful code or viruses; (d) engage in fraudulent activities; (e) harass or abuse other users; or (f) attempt to gain unauthorized access to our systems."
        }
      ]
    },
    {
      title: "Product Information and Availability",
      icon: <Truck className="w-6 h-6 text-purple-500" />,
      content: [
        {
          subtitle: "Product Descriptions",
          details: "We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, or error-free."
        },
        {
          subtitle: "Availability",
          details: "All products are subject to availability. We reserve the right to discontinue any product at any time without notice. In case of unavailability after an order is placed, we will notify you and provide a full refund."
        },
        {
          subtitle: "Gemstone Authenticity",
          details: "All gemstones come with certificates of authenticity. We guarantee that our gemstones are genuine and ethically sourced. Any concerns about authenticity should be reported within 30 days of purchase."
        }
      ]
    },
    {
      title: "Orders and Payment",
      icon: <CreditCard className="w-6 h-6 text-indigo-500" />,
      content: [
        {
          subtitle: "Order Acceptance",
          details: "Your order is an offer to purchase products from us. We reserve the right to accept or decline any order for any reason. Order confirmation does not guarantee product availability or price accuracy."
        },
        {
          subtitle: "Payment Terms",
          details: "Payment is due at the time of purchase. We accept major credit cards, PayPal, and other payment methods as indicated on our website. All payments are processed securely through encrypted channels."
        },
        {
          subtitle: "Pricing",
          details: "All prices are displayed in US dollars and are subject to change without notice. The price charged will be the price displayed at the time of order confirmation. Prices do not include applicable taxes or shipping charges unless otherwise stated."
        },
        {
          subtitle: "Order Cancellation",
          details: "You may cancel your order before it ships by contacting us. Once shipped, orders are subject to our return policy. We reserve the right to cancel orders for any reason, including product unavailability or pricing errors."
        }
      ]
    },
    {
      title: "Shipping and Delivery",
      icon: <Truck className="w-6 h-6 text-orange-500" />,
      content: [
        {
          subtitle: "Shipping Methods",
          details: "We offer various shipping options including standard, expedited, and overnight delivery. Shipping costs and delivery times vary based on destination and shipping method selected."
        },
        {
          subtitle: "Delivery",
          details: "Delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers, customs, weather, or other factors beyond our control."
        },
        {
          subtitle: "International Shipping",
          details: "International orders may be subject to customs duties, taxes, and fees imposed by the destination country. Customers are responsible for any additional charges incurred."
        },
        {
          subtitle: "Risk of Loss",
          details: "Risk of loss and title to products pass to you upon delivery to the shipping carrier. We recommend purchasing shipping insurance for high-value items."
        }
      ]
    },
    {
      title: "Returns and Exchanges",
      icon: <RotateCcw className="w-6 h-6 text-teal-500" />,
      content: [
        {
          subtitle: "Return Policy",
          details: "We offer a 30-day return policy for most items. Products must be returned in original condition with all certificates and packaging. Custom or personalized items may not be returnable."
        },
        {
          subtitle: "Return Process",
          details: "To initiate a return, contact our customer service team for a return authorization. Items must be shipped back within the specified timeframe using our provided return label when applicable."
        },
        {
          subtitle: "Refunds",
          details: "Refunds will be processed to the original payment method within 5-10 business days after we receive the returned item. Shipping charges are non-refundable unless the return is due to our error."
        },
        {
          subtitle: "Exchanges",
          details: "We offer exchanges for different sizes or alternative products of equal or lesser value. Price differences for higher-value items must be paid separately."
        }
      ]
    },
    {
      title: "Intellectual Property",
      icon: <Shield className="w-6 h-6 text-red-500" />,
      content: [
        {
          subtitle: "Our Content",
          details: "All content on our website, including text, graphics, logos, images, and software, is the property of SHUKRA Gems or our licensors and is protected by copyright, trademark, and other intellectual property laws."
        },
        {
          subtitle: "Limited License",
          details: "We grant you a limited, non-exclusive, non-transferable license to access and use our website for personal, non-commercial purposes. You may not reproduce, distribute, or create derivative works without our express written permission."
        },
        {
          subtitle: "User Content",
          details: "By submitting content to our website (reviews, comments, etc.), you grant us a non-exclusive, royalty-free, perpetual license to use, reproduce, and display such content in connection with our services."
        },
        {
          subtitle: "Trademark Policy",
          details: "SHUKRA Gems and our logo are trademarks of our company. You may not use our trademarks without our prior written consent."
        }
      ]
    },
    {
      title: "Privacy and Data Protection",
      icon: <Shield className="w-6 h-6 text-cyan-500" />,
      content: [
        {
          subtitle: "Privacy Policy",
          details: "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our services, you consent to our privacy practices."
        },
        {
          subtitle: "Data Security",
          details: "We implement industry-standard security measures to protect your personal and payment information. However, no method of transmission over the internet is 100% secure."
        },
        {
          subtitle: "Cookies",
          details: "Our website uses cookies to enhance your experience and analyze website usage. You can control cookie preferences through your browser settings."
        }
      ]
    },
    {
      title: "Disclaimers and Limitation of Liability",
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
      content: [
        {
          subtitle: "Service Disclaimer",
          details: "Our services are provided 'as is' without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, secure, or error-free."
        },
        {
          subtitle: "Limitation of Liability",
          details: "In no event shall SHUKRA Gems be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses."
        },
        {
          subtitle: "Maximum Liability",
          details: "Our total liability to you for any claims arising from your use of our services shall not exceed the amount you paid for the specific product or service giving rise to the claim."
        },
        {
          subtitle: "Force Majeure",
          details: "We are not liable for any failure to perform our obligations due to circumstances beyond our reasonable control, including natural disasters, acts of government, or network failures."
        }
      ]
    },
    {
      title: "Dispute Resolution",
      icon: <Scale className="w-6 h-6 text-purple-600" />,
      content: [
        {
          subtitle: "Governing Law",
          details: "These Terms of Service are governed by the laws of the State of New York, without regard to conflict of law principles."
        },
        {
          subtitle: "Arbitration",
          details: "Any disputes arising from these terms or your use of our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association."
        },
        {
          subtitle: "Class Action Waiver",
          details: "You agree that any arbitration or legal proceeding shall be conducted on an individual basis and not as part of a class action or representative proceeding."
        },
        {
          subtitle: "Jurisdiction",
          details: "If arbitration is not applicable, any legal proceedings shall be conducted in the courts of New York, and you consent to the jurisdiction of such courts."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Scale className="w-16 h-16 text-blue-200" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-4">
            These terms govern your use of SHUKRA Gems services. Please read them carefully 
            as they contain important information about your rights and obligations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-blue-200">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Last updated: {lastUpdated}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Effective: {effectiveDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Introduction */}
          <Card className="p-8 mb-8">
            <CardBody>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to SHUKRA Gems</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your access to and use of the SHUKRA Gems 
                website, mobile application, and related services (collectively, the "Services") 
                operated by SHUKRA Gems Inc. ("SHUKRA Gems," "we," "us," or "our").
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Please read these Terms carefully before using our Services. By accessing or using 
                our Services, you agree to be bound by these Terms. If you disagree with any part 
                of these Terms, then you may not access or use our Services.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-800 font-medium">
                  <strong>Important:</strong> These Terms include provisions that limit our liability 
                  and require individual arbitration of disputes. Please review Sections 8 and 9 carefully.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="p-6">
                <CardBody>
                  <div className="flex items-center space-x-3 mb-6">
                    {section.icon}
                    <h2 className="text-2xl font-bold text-gray-900">
                      {sectionIndex + 1}. {section.title}
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {sectionIndex + 1}.{itemIndex + 1} {item.subtitle}
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

          {/* Additional Terms */}
          <Card className="p-8 mt-8">
            <CardBody>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Miscellaneous</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">11.1 Entire Agreement</h3>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms, along with our Privacy Policy and any other legal notices published 
                    by us on our website, constitute the entire agreement between you and SHUKRA Gems.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">11.2 Severability</h3>
                  <p className="text-gray-700 leading-relaxed">
                    If any provision of these Terms is found to be unenforceable, the remaining 
                    provisions will continue to be valid and enforceable.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">11.3 Waiver</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our failure to enforce any right or provision of these Terms will not be 
                    considered a waiver of those rights.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">11.4 Assignment</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You may not assign or transfer these Terms or your rights hereunder without 
                    our prior written consent. We may assign these Terms without restriction.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Contact Information */}
          <Card className="p-8 mt-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardBody>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About These Terms?</h2>
                <p className="text-gray-700 mb-6">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-blue-600">legal@shukragems.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                    <p className="text-blue-600">1-800-SHUKRA-1</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Mail</h3>
                    <p className="text-gray-700">
                      SHUKRA Gems Legal Department<br />
                      123 Gem Street<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="p-6">
              <CardBody>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Your Rights</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center space-x-2">
                    <Chip size="sm" color="success" variant="dot" />
                    <span>30-day return policy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Chip size="sm" color="success" variant="dot" />
                    <span>Authentic gemstone guarantee</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Chip size="sm" color="success" variant="dot" />
                    <span>Secure payment processing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Chip size="sm" color="success" variant="dot" />
                    <span>Privacy protection</span>
                  </li>
                </ul>
              </CardBody>
            </Card>
            
            <Card className="p-6">
              <CardBody>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Your Responsibilities</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center space-x-2">
                    <Chip size="sm" color="warning" variant="dot" />
                    <span>Use services lawfully</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Chip size="sm" color="warning" variant="dot" />
                    <span>Maintain account security</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Chip size="sm" color="warning" variant="dot" />
                    <span>Provide accurate information</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Chip size="sm" color="warning" variant="dot" />
                    <span>Respect intellectual property</span>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
