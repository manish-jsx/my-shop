'use client'
import { motion } from 'framer-motion'
import { Card, CardBody, Button, Chip } from '@nextui-org/react'
import Link from 'next/link'
import PageTransition from '@/components/ui/PageTransition'
import NewsletterForm from '@/components/forms/NewsletterForm'
import SocialMediaLinks from '@/components/ui/SocialMediaLinks'
import { Heart, Award, Shield, Globe, Users, Sparkles } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: "Authenticity",
      description: "Every gemstone is certified and ethically sourced with complete transparency about origin and quality."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Our love for gemstones drives us to curate the finest collection and share their beauty with the world."
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Building lasting relationships through honest practices, lifetime warranties, and exceptional service."
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Committed to ethical sourcing and supporting mining communities while protecting our planet."
    }
  ]

  const milestones = [
    {
      year: "2010",
      title: "Foundation",
      description: "SHUKRA Gems was founded with a vision to make authentic gemstones accessible to everyone."
    },
    {
      year: "2015",
      title: "Global Sourcing",
      description: "Established direct partnerships with miners in Sri Lanka, Myanmar, and Colombia."
    },
    {
      year: "2018",
      title: "Certification Program",
      description: "Launched our comprehensive gemstone certification and education program."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched our e-commerce platform, making premium gemstones available worldwide."
    },
    {
      year: "2023",
      title: "Sustainability Initiative",
      description: "Became carbon-neutral and launched our ethical mining support program."
    }
  ]

  const team = [
    {
      name: "Dr. Rajesh Sharma",
      role: "Founder & Chief Gemologist",
      experience: "25+ years",
      specialty: "Ruby & Sapphire Authentication"
    },
    {
      name: "Priya Gupta",
      role: "Head of Design",
      experience: "15+ years",
      specialty: "Contemporary Jewelry Design"
    },
    {
      name: "Michael Chen",
      role: "Sourcing Director",
      experience: "20+ years",
      specialty: "Ethical Gemstone Sourcing"
    }
  ]

  return (
    <PageTransition>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Chip 
              color="primary" 
              variant="flat" 
              className="mb-6"
              startContent={<Sparkles className="w-4 h-4" />}
            >
              Our Story
            </Chip>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Crafting Dreams with
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Precious Stones
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              For over a decade, SHUKRA Gems has been at the forefront of the gemstone industry, 
              connecting people with the perfect stones that resonate with their spirit. Our journey 
              began with a simple belief: every person deserves access to authentic, beautiful gemstones 
              that carry both aesthetic beauty and spiritual significance.
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardBody className="p-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    To democratize access to authentic, high-quality gemstones while preserving 
                    traditional craftsmanship and promoting ethical sourcing practices. We believe 
                    that everyone should be able to experience the beauty and energy of genuine gemstones.
                  </p>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardBody className="p-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    To become the world's most trusted gemstone destination, known for our commitment 
                    to authenticity, education, and ethical practices. We envision a future where 
                    gemstone appreciation is accessible to all, fostering a global community of 
                    conscious collectors and spiritual seekers.
                  </p>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </section>

        {/* Values */}
        <section className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These core values guide every decision we make and every relationship we build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardBody className="text-center p-6">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {value.description}
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From humble beginnings to becoming a trusted name in gemstones.
            </p>
          </motion.div>

          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                      <div className="shrink-0">
                        <Chip color="primary" variant="flat" size="lg">
                          {milestone.year}
                        </Chip>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Leadership Team */}
        <section className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Meet Our Experts</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our team of gemstone experts, designers, and sourcing specialists bring decades 
              of combined experience to serve you better.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardBody className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-primary font-medium text-sm">{member.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{member.experience}</p>
                    <Chip size="sm" color="primary" variant="flat" className="mt-2">
                      {member.specialty}
                    </Chip>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sustainability */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center space-y-6"
          >
            <Globe className="w-12 h-12 mx-auto text-primary" />
            <div>
              <h2 className="text-3xl font-bold mb-4">Commitment to Sustainability</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We believe in responsible business practices that protect our planet and support 
                mining communities. Our carbon-neutral operations and ethical sourcing initiatives 
                ensure that beauty doesn't come at the cost of our environment or communities.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Ethically Sourced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Carbon</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Neutral Operations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Communities Supported</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact CTA */}
        <section className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Gem?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Whether you're looking for a special piece or have questions about gemstones, 
              our experts are here to help you on your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" color="primary">
                  Browse Our Collection
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="bordered">
                  Contact Our Experts
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Newsletter Section */}
        <section className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <NewsletterForm />
          </motion.div>
        </section>

        {/* Social Media Section */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">Follow Our Story</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              See behind-the-scenes content, meet our team, and discover our sourcing journeys
            </p>
            <div className="flex justify-center">
              <SocialMediaLinks showLabels />
            </div>
          </motion.div>
        </section>
      </div>
    </PageTransition>
  )
}
