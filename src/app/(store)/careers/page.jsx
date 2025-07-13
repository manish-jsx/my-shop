// src/app/(store)/careers/page.jsx
'use client'
import { Card, CardBody, Button, Chip } from '@nextui-org/react'
import { 
  MapPin, 
  Clock, 
  Users, 
  Heart, 
  Gem, 
  Award,
  Globe,
  TrendingUp,
  Coffee,
  Lightbulb
} from 'lucide-react'

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior Gemologist",
      department: "Quality Assurance",
      location: "New York, NY",
      type: "Full-time",
      experience: "5+ years",
      description: "Lead our gemstone authentication and quality assessment processes."
    },
    {
      title: "Digital Marketing Manager", 
      department: "Marketing",
      location: "Los Angeles, CA",
      type: "Full-time",
      experience: "3+ years",
      description: "Drive our online presence and customer acquisition strategies."
    },
    {
      title: "Customer Experience Specialist",
      department: "Customer Service",
      location: "Mumbai, India",
      type: "Full-time", 
      experience: "2+ years",
      description: "Provide exceptional service to our global customer base."
    },
    {
      title: "Jewelry Designer",
      department: "Design",
      location: "New York, NY",
      type: "Contract",
      experience: "4+ years",
      description: "Create stunning custom jewelry pieces featuring our premium gemstones."
    },
    {
      title: "Supply Chain Coordinator",
      department: "Operations",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years", 
      description: "Manage our global network of ethical gemstone suppliers."
    },
    {
      title: "Content Creator",
      department: "Marketing",
      location: "Los Angeles, CA",
      type: "Part-time",
      experience: "1+ years",
      description: "Create engaging content about gemstones, jewelry, and wellness."
    }
  ]

  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs"
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      title: "Remote-First Culture",
      description: "Flexible work arrangements with options for remote and hybrid work"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      title: "Growth & Development", 
      description: "Professional development budget, conferences, and continuous learning opportunities"
    },
    {
      icon: <Coffee className="w-6 h-6 text-amber-600" />,
      title: "Work-Life Balance",
      description: "Unlimited PTO, flexible hours, and company-wide mental health days"
    },
    {
      icon: <Award className="w-6 h-6 text-purple-500" />,
      title: "Recognition & Rewards",
      description: "Performance bonuses, equity options, and employee appreciation programs"
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
      title: "Innovation Time",
      description: "20% time for personal projects and exploring new ideas"
    }
  ]

  const values = [
    {
      title: "Authenticity",
      description: "We believe in genuine relationships, honest communication, and authentic products."
    },
    {
      title: "Excellence",
      description: "We strive for perfection in every gemstone, every interaction, every detail."
    },
    {
      title: "Sustainability", 
      description: "We're committed to ethical sourcing and environmental responsibility."
    },
    {
      title: "Innovation",
      description: "We embrace new technologies and creative approaches to serve our customers better."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Gem className="w-16 h-16 text-purple-200" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Join the SHUKRA Gems Family
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Help us bring the world's most beautiful gemstones to people everywhere. 
            Build your career with a company that values authenticity, excellence, and positive impact.
          </p>
          <Button 
            size="lg"
            className="bg-white text-purple-600 font-semibold hover:bg-purple-50"
          >
            View Open Positions
          </Button>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why SHUKRA Gems?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're more than just a gemstone company. We're a community of passionate individuals 
              dedicated to bringing beauty, authenticity, and positive energy into the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardBody>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
            <p className="text-xl text-gray-600">
              We believe in taking care of our team so they can take care of our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardBody className="flex flex-row items-start space-x-4">
                  <div className="flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">
              Find your next adventure with us. We're always looking for talented individuals to join our team.
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{position.title}</h3>
                        <Chip size="sm" color="primary" variant="flat">
                          {position.department}
                        </Chip>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {position.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {position.experience}
                        </div>
                      </div>
                      
                      <p className="text-gray-700">{position.description}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                      <Button 
                        variant="bordered"
                        color="primary"
                        className="min-w-32"
                      >
                        Learn More
                      </Button>
                      <Button 
                        color="primary"
                        className="min-w-32"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Hiring Process</h2>
            <p className="text-xl text-gray-600">
              We believe in a transparent, fair, and efficient hiring process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Application</h3>
              <p className="text-gray-600">Submit your application and resume through our portal</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Review</h3>
              <p className="text-gray-600">Our team reviews your application within 5 business days</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Interview</h3>
              <p className="text-gray-600">Meet with the team through video or in-person interviews</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Decision</h3>
              <p className="text-gray-600">We'll make a decision and get back to you promptly</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Shine With Us?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Don't see a position that fits? We're always interested in hearing from talented individuals. 
            Send us your resume and let us know how you'd like to contribute to SHUKRA Gems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-purple-600 font-semibold hover:bg-purple-50"
            >
              Send Us Your Resume
            </Button>
            <Button 
              size="lg"
              variant="bordered"
              className="border-white text-white hover:bg-white hover:text-purple-600"
            >
              Contact HR Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
