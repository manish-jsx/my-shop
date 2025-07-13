// src/app/(store)/press/page.jsx
'use client'
import { Card, CardBody, Button, Chip, Image } from '@nextui-org/react'
import { 
  Download, 
  ExternalLink, 
  Calendar, 
  Users, 
  Award,
  Gem,
  Camera,
  FileText,
  Mail,
  Phone
} from 'lucide-react'

export default function PressPage() {
  const pressReleases = [
    {
      title: "SHUKRA Gems Launches Revolutionary Gemstone Authentication Platform",
      date: "January 15, 2025",
      category: "Technology",
      excerpt: "New AI-powered platform enables instant verification of gemstone authenticity, setting new industry standards for transparency and trust.",
      downloadUrl: "#"
    },
    {
      title: "SHUKRA Gems Achieves Carbon Neutral Certification",
      date: "December 20, 2024", 
      category: "Sustainability",
      excerpt: "Company becomes first luxury gemstone retailer to achieve complete carbon neutrality across its global supply chain.",
      downloadUrl: "#"
    },
    {
      title: "Partnership with Leading Museums for Gemstone Education Initiative",
      date: "November 30, 2024",
      category: "Education",
      excerpt: "SHUKRA Gems partners with Smithsonian and Natural History Museum London to launch comprehensive gemstone education program.",
      downloadUrl: "#"
    },
    {
      title: "Record-Breaking Q3 Sales Drive 150% Year-over-Year Growth",
      date: "October 25, 2024",
      category: "Business",
      excerpt: "Strong demand for ethical gemstones and custom jewelry drives unprecedented growth in third quarter.",
      downloadUrl: "#"
    },
    {
      title: "SHUKRA Gems Opens Flagship Experience Center in Mumbai",
      date: "September 15, 2024",
      category: "Expansion",
      excerpt: "New 10,000 sq ft center features immersive gemstone experiences, healing crystal workshops, and custom design services.",
      downloadUrl: "#"
    }
  ]

  const mediaKits = [
    {
      title: "Company Overview & Brand Kit",
      description: "Complete brand guidelines, logos, company history, and executive bios",
      fileSize: "25 MB",
      format: "PDF + ZIP",
      downloadUrl: "#"
    },
    {
      title: "Product Images & Videos",
      description: "High-resolution product photography and marketing videos",
      fileSize: "150 MB", 
      format: "ZIP",
      downloadUrl: "#"
    },
    {
      title: "Executive Headshots",
      description: "Professional photos of leadership team and key personnel",
      fileSize: "45 MB",
      format: "ZIP",
      downloadUrl: "#"
    },
    {
      title: "Company Fact Sheet",
      description: "Key statistics, milestones, and company information",
      fileSize: "2 MB",
      format: "PDF",
      downloadUrl: "#"
    }
  ]

  const awards = [
    {
      year: "2024",
      title: "Ethical Business of the Year",
      organization: "Global Jewelry Council",
      description: "Recognized for outstanding commitment to ethical sourcing and fair trade practices"
    },
    {
      year: "2024",
      title: "Innovation Excellence Award",
      organization: "Gemstone Technology Institute",
      description: "Honored for breakthrough gemstone authentication technology platform"
    },
    {
      year: "2023",
      title: "Sustainability Leader Award",
      organization: "Green Business Alliance",
      description: "Acknowledged for pioneering sustainable practices in luxury retail"
    },
    {
      year: "2023",
      title: "Customer Choice Award",
      organization: "Luxury Retail Association",
      description: "Voted by customers as top luxury gemstone retailer for customer experience"
    }
  ]

  const mediaContact = {
    name: "Sarah Johnson",
    title: "Director of Communications",
    email: "press@shukragems.com",
    phone: "+1 (555) 123-4567",
    image: "/api/placeholder/150/150"
  }

  const executives = [
    {
      name: "Priya Sharma",
      title: "Founder & CEO", 
      bio: "With over 15 years in the gemstone industry, Priya founded SHUKRA Gems with a vision to make authentic, ethically-sourced gemstones accessible worldwide.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Michael Chen",
      title: "Chief Technology Officer",
      bio: "Former Silicon Valley executive who leads SHUKRA's digital innovation and authentication technology initiatives.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Dr. Amara Okafor",
      title: "Chief Gemologist",
      bio: "Renowned gemologist with PhD in Mineralogy from Columbia University and 20+ years of experience in gem authentication.",
      image: "/api/placeholder/150/150"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Camera className="w-16 h-16 text-purple-200" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Press & Media Center
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Get the latest news, press releases, and media resources about SHUKRA Gems. 
            We're always happy to connect with journalists and media professionals.
          </p>
          <Button 
            size="lg"
            className="bg-white text-purple-600 font-semibold hover:bg-purple-50"
            startContent={<Mail className="w-5 h-5" />}
          >
            Contact Media Team
          </Button>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Press Releases</h2>
            <p className="text-xl text-gray-600">
              Stay up to date with SHUKRA Gems news, announcements, and industry insights.
            </p>
          </div>

          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <Chip size="sm" color="primary" variant="flat">
                          {release.category}
                        </Chip>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {release.date}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {release.title}
                      </h3>
                      
                      <p className="text-gray-700">{release.excerpt}</p>
                    </div>
                    
                    <div className="flex gap-3 lg:ml-6">
                      <Button 
                        variant="bordered"
                        color="primary"
                        startContent={<ExternalLink className="w-4 h-4" />}
                      >
                        Read More
                      </Button>
                      <Button 
                        color="primary"
                        startContent={<Download className="w-4 h-4" />}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Media Resources</h2>
            <p className="text-xl text-gray-600">
              Download logos, images, and other brand assets for your stories about SHUKRA Gems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mediaKits.map((kit, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{kit.title}</h3>
                      <p className="text-gray-600 mb-3">{kit.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {kit.fileSize} • {kit.format}
                        </div>
                        <Button 
                          size="sm"
                          color="primary"
                          startContent={<Download className="w-4 h-4" />}
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600">
              We're honored to be recognized by industry leaders and organizations worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((award, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Award className="w-8 h-8 text-yellow-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{award.title}</h3>
                        <Chip size="sm" color="warning" variant="flat">
                          {award.year}
                        </Chip>
                      </div>
                      <p className="text-purple-600 font-semibold mb-2">{award.organization}</p>
                      <p className="text-gray-700">{award.description}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Executive Team</h2>
            <p className="text-xl text-gray-600">
              Meet the leadership team behind SHUKRA Gems' success and vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {executives.map((executive, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={executive.image}
                      alt={executive.name}
                      className="w-full h-full object-cover"
                      classNames={{
                        wrapper: "w-full h-full"
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{executive.name}</h3>
                  <p className="text-purple-600 font-semibold mb-3">{executive.title}</p>
                  <p className="text-gray-700 text-sm">{executive.bio}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Media Contact</h2>
            <p className="text-xl text-purple-100">
              Have a story idea or need more information? Get in touch with our media team.
            </p>
          </div>

          <Card className="p-8">
            <CardBody>
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={mediaContact.image}
                      alt={mediaContact.name}
                      className="w-full h-full object-cover"
                      classNames={{
                        wrapper: "w-full h-full"
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{mediaContact.name}</h3>
                  <p className="text-purple-600 font-semibold mb-4">{mediaContact.title}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center md:justify-start space-x-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <a 
                        href={`mailto:${mediaContact.email}`}
                        className="text-gray-700 hover:text-purple-600 transition-colors"
                      >
                        {mediaContact.email}
                      </a>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-3">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <a 
                        href={`tel:${mediaContact.phone}`}
                        className="text-gray-700 hover:text-purple-600 transition-colors"
                      >
                        {mediaContact.phone}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button 
                    color="primary"
                    size="lg"
                    startContent={<Mail className="w-5 h-5" />}
                  >
                    Send Email
                  </Button>
                  <Button 
                    variant="bordered"
                    size="lg"
                    className="border-gray-300 text-gray-700"
                    startContent={<Download className="w-5 h-5" />}
                  >
                    Download Media Kit
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  )
}
