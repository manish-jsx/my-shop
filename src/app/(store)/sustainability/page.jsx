// src/app/(store)/sustainability/page.jsx
'use client'
import { Card, CardBody, Button, Progress, Chip } from '@nextui-org/react'
import { 
  Leaf, 
  Recycle, 
  Globe, 
  Heart, 
  Shield, 
  Users,
  Factory,
  Truck,
  Award,
  Target,
  TreePine,
  Droplets,
  Sun,
  Wind
} from 'lucide-react'

export default function SustainabilityPage() {
  const commitments = [
    {
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      title: "Carbon Neutral by 2025",
      description: "We're committed to achieving complete carbon neutrality across our entire supply chain and operations.",
      progress: 78,
      status: "On Track"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "100% Ethical Sourcing",
      description: "Every gemstone we sell is ethically sourced with full transparency and fair trade practices.",
      progress: 95,
      status: "Leading"
    },
    {
      icon: <Recycle className="w-8 h-8 text-purple-500" />,
      title: "Zero Waste Operations",
      description: "Working towards zero waste in our packaging, operations, and customer experience.",
      progress: 65,
      status: "In Progress"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Community Impact",
      description: "Supporting mining communities and local economies where our gemstones originate.",
      progress: 85,
      status: "Expanding"
    }
  ]

  const initiatives = [
    {
      title: "Renewable Energy",
      description: "All SHUKRA facilities powered by 100% renewable energy sources",
      icon: <Sun className="w-6 h-6 text-yellow-500" />,
      impact: "Reduced CO2 emissions by 40%",
      year: "2024"
    },
    {
      title: "Sustainable Packaging",
      description: "Biodegradable and recyclable packaging for all shipments",
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      impact: "85% reduction in plastic waste",
      year: "2023"
    },
    {
      title: "Water Conservation",
      description: "Advanced water recycling systems in all processing facilities",
      icon: <Droplets className="w-6 h-6 text-blue-500" />,
      impact: "50% water usage reduction",
      year: "2024"
    },
    {
      title: "Carbon Offset Program",
      description: "Reforestation projects and carbon credits for every purchase",
      icon: <TreePine className="w-6 h-6 text-green-600" />,
      impact: "1M+ trees planted globally",
      year: "2023"
    },
    {
      title: "Electric Fleet",
      description: "Transition to electric vehicles for local deliveries",
      icon: <Truck className="w-6 h-6 text-purple-500" />,
      impact: "60% fleet electrification",
      year: "2024"
    },
    {
      title: "Wind Power",
      description: "Wind farm partnerships for clean energy generation",
      icon: <Wind className="w-6 h-6 text-cyan-500" />,
      impact: "25MW renewable capacity",
      year: "2024"
    }
  ]

  const certifications = [
    {
      name: "Responsible Jewellery Council",
      description: "Certified member ensuring ethical practices throughout the jewelry supply chain",
      logo: "/api/placeholder/80/80",
      year: "2023"
    },
    {
      name: "Fair Trade Certified",
      description: "Ensuring fair wages and working conditions for all partners in our supply chain",
      logo: "/api/placeholder/80/80", 
      year: "2022"
    },
    {
      name: "Carbon Trust Standard",
      description: "Verified carbon footprint measurement and reduction commitments",
      logo: "/api/placeholder/80/80",
      year: "2024"
    },
    {
      name: "B Corp Certified",
      description: "Meeting highest standards of social and environmental performance",
      logo: "/api/placeholder/80/80",
      year: "2024"
    }
  ]

  const impactStats = [
    {
      number: "2,500+",
      label: "Families Supported",
      description: "Mining families receiving fair wages and benefits"
    },
    {
      number: "95%",
      label: "Waste Diverted",
      description: "From landfills through recycling and reuse"
    },
    {
      number: "1.2M",
      label: "Trees Planted",
      description: "Through our reforestation partnerships"
    },
    {
      number: "50%",
      label: "Carbon Reduction",
      description: "Achieved since 2020 baseline"
    }
  ]

  const partnerships = [
    {
      name: "GIA (Gemological Institute of America)",
      description: "Partnering on ethical sourcing standards and gemstone authentication",
      focus: "Authentication & Standards"
    },
    {
      name: "Mining Communities Fund",
      description: "Supporting education and healthcare in mining communities",
      focus: "Community Development"
    },
    {
      name: "Rainforest Alliance",
      description: "Protecting biodiversity in mining regions",
      focus: "Environmental Protection"
    },
    {
      name: "UN Global Compact",
      description: "Committed to UN principles for responsible business",
      focus: "Global Standards"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Leaf className="w-16 h-16 text-green-200" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Our Commitment to Sustainability
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            At SHUKRA Gems, we believe that beauty should never come at the cost of our planet or its people. 
            Discover how we're leading the industry toward a more sustainable and ethical future.
          </p>
          <Button 
            size="lg"
            className="bg-white text-green-600 font-semibold hover:bg-green-50"
          >
            Download Sustainability Report
          </Button>
        </div>
      </section>

      {/* Key Commitments */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Sustainability Goals</h2>
            <p className="text-xl text-gray-600">
              Measurable commitments with clear timelines and transparent progress tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commitments.map((commitment, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="flex-shrink-0">
                      {commitment.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{commitment.title}</h3>
                        <Chip 
                          size="sm" 
                          color={commitment.status === 'Leading' ? 'success' : commitment.status === 'On Track' ? 'primary' : 'warning'}
                          variant="flat"
                        >
                          {commitment.status}
                        </Chip>
                      </div>
                      <p className="text-gray-600 mb-4">{commitment.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-900">{commitment.progress}%</span>
                    </div>
                    <Progress 
                      value={commitment.progress} 
                      className="w-full"
                      color={commitment.progress >= 80 ? 'success' : commitment.progress >= 60 ? 'primary' : 'warning'}
                    />
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact by Numbers</h2>
            <p className="text-xl text-gray-600">
              Real results from our sustainability initiatives and community programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</h3>
                  <p className="text-gray-600 text-sm">{stat.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Initiatives */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Green Initiatives</h2>
            <p className="text-xl text-gray-600">
              Comprehensive programs driving positive environmental and social impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="flex items-center space-x-3 mb-4">
                    {initiative.icon}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{initiative.title}</h3>
                      <Chip size="sm" color="primary" variant="flat">
                        Since {initiative.year}
                      </Chip>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{initiative.description}</p>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-green-700 font-semibold text-sm">{initiative.impact}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Standards</h2>
            <p className="text-xl text-gray-600">
              Third-party verified commitments to ethical and sustainable practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-8 h-8 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{cert.name}</h3>
                        <Chip size="sm" color="success" variant="flat">
                          {cert.year}
                        </Chip>
                      </div>
                      <p className="text-gray-600">{cert.description}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Strategic Partnerships</h2>
            <p className="text-xl text-gray-600">
              Collaborating with leading organizations to drive positive change in our industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerships.map((partnership, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{partnership.name}</h3>
                      <p className="text-gray-600 mb-3">{partnership.description}</p>
                      <Chip size="sm" color="primary" variant="flat">
                        {partnership.focus}
                      </Chip>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Us in Making a Difference</h2>
          <p className="text-xl text-green-100 mb-8">
            Every purchase supports ethical sourcing, environmental protection, and community development. 
            Together, we can create a more sustainable future for the jewelry industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-green-600 font-semibold hover:bg-green-50"
            >
              Shop Ethical Gemstones
            </Button>
            <Button 
              size="lg"
              variant="bordered"
              className="border-white text-white hover:bg-white hover:text-green-600"
            >
              Learn About Our Impact
            </Button>
          </div>
        </div>
      </section>

      {/* Progress Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Sustainability Journey</h2>
            <p className="text-xl text-gray-600">
              Tracking our progress and looking ahead to future commitments.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">2025 Goals</h3>
                  <Chip color="primary" variant="flat">Target</Chip>
                </div>
                <p className="text-gray-600">Achieve carbon neutrality, 100% renewable energy, zero waste operations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">2024 Achievements</h3>
                  <Chip color="success" variant="flat">Completed</Chip>
                </div>
                <p className="text-gray-600">B Corp certification, 50% carbon reduction, electric fleet deployment</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="w-4 h-4 bg-purple-500 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">2023 Milestones</h3>
                  <Chip color="success" variant="flat">Completed</Chip>
                </div>
                <p className="text-gray-600">Fair Trade certification, sustainable packaging launch, 1M trees planted</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
