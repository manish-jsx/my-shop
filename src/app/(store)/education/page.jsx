'use client'
import { motion } from 'framer-motion'
import { Card, CardBody, Button, Chip } from '@nextui-org/react'
import Link from 'next/link'
import PageTransition from '@/components/ui/PageTransition'
import { BookOpen, Sparkles, Heart, Shield, Award, HelpCircle } from 'lucide-react'

export default function EducationPage() {
  const educationTopics = [
    {
      id: 'gemstone-basics',
      title: 'Gemstone Basics',
      description: 'Learn about the fundamental properties of gemstones, how they form, and what makes them precious.',
      icon: Sparkles,
      articles: 12,
      readTime: '5-10 min',
      difficulty: 'Beginner'
    },
    {
      id: 'healing-properties',
      title: 'Healing Properties',
      description: 'Discover the metaphysical properties and healing benefits associated with different gemstones.',
      icon: Heart,
      articles: 18,
      readTime: '8-15 min',
      difficulty: 'Beginner'
    },
    {
      id: 'gemstone-care',
      title: 'Care & Maintenance',
      description: 'Proper care instructions to keep your gemstones and jewelry looking beautiful for years.',
      icon: Shield,
      articles: 15,
      readTime: '5-12 min',
      difficulty: 'Beginner'
    },
    {
      id: 'buying-guide',
      title: 'Buying Guides',
      description: 'Expert advice on what to look for when purchasing gemstones and how to avoid common pitfalls.',
      icon: Award,
      articles: 10,
      readTime: '10-20 min',
      difficulty: 'Intermediate'
    },
    {
      id: 'gemstone-grading',
      title: 'Gemstone Grading',
      description: 'Understanding the 4 Cs and other grading criteria used to evaluate gemstone quality.',
      icon: BookOpen,
      articles: 8,
      readTime: '15-25 min',
      difficulty: 'Advanced'
    },
    {
      id: 'identification',
      title: 'Identification & Testing',
      description: 'Learn how to identify genuine gemstones and understand different testing methods.',
      icon: HelpCircle,
      articles: 6,
      readTime: '12-20 min',
      difficulty: 'Advanced'
    }
  ]

  const featuredArticles = [
    {
      title: 'The Complete Guide to Ruby Quality',
      category: 'Buying Guides',
      readTime: '15 min',
      difficulty: 'Intermediate',
      description: 'Learn everything about ruby grading, from color and clarity to origin and treatment.',
      link: '/education/ruby-quality-guide'
    },
    {
      title: 'Healing Properties of Amethyst',
      category: 'Healing Properties',
      readTime: '8 min',
      difficulty: 'Beginner',
      description: 'Discover the spiritual and healing benefits of amethyst and how to use it effectively.',
      link: '/education/amethyst-healing'
    },
    {
      title: 'How to Clean Your Gemstone Jewelry',
      category: 'Care & Maintenance',
      readTime: '10 min',
      difficulty: 'Beginner',
      description: 'Step-by-step instructions for safely cleaning different types of gemstone jewelry.',
      link: '/education/jewelry-cleaning'
    }
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'success'
      case 'Intermediate': return 'warning'
      case 'Advanced': return 'danger'
      default: return 'default'
    }
  }

  return (
    <PageTransition>
      <div className="space-y-12">
        {/* Header */}
        <section className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Chip 
              color="primary" 
              variant="flat" 
              className="mb-4"
              startContent={<BookOpen className="w-4 h-4" />}
            >
              Gem Education Center
            </Chip>
            <h1 className="text-4xl md:text-5xl font-bold">
              Learn About Gemstones
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Expand your knowledge with our comprehensive gemstone education center. 
              From basic properties to advanced grading, become an informed gemstone enthusiast.
            </p>
          </motion.div>
        </section>

        {/* Featured Articles */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Chip size="sm" color="primary" variant="flat">
                          {article.category}
                        </Chip>
                        <Chip 
                          size="sm" 
                          color={getDifficultyColor(article.difficulty)} 
                          variant="flat"
                        >
                          {article.difficulty}
                        </Chip>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {article.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {article.readTime} read
                        </p>
                      </div>
                      
                      <Link href={article.link}>
                        <Button color="primary" variant="flat" size="sm" className="w-full">
                          Read Article
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Topics */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Education Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationTopics.map((topic, index) => {
              const IconComponent = topic.icon
              
              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300">
                    <CardBody className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{topic.title}</h3>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {topic.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{topic.articles} articles</span>
                          <span>{topic.readTime}</span>
                          <Chip 
                            size="sm" 
                            color={getDifficultyColor(topic.difficulty)} 
                            variant="flat"
                          >
                            {topic.difficulty}
                          </Chip>
                        </div>
                        
                        <Link href={`/education/${topic.id}`}>
                          <Button color="primary" variant="flat" size="sm" className="w-full">
                            Explore Topic
                          </Button>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Quick Reference */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Quick Reference Guides</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Need quick answers? Check our reference guides for instant information 
                about gemstone properties, care instructions, and more.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/education/gemstone-chart">
                <Button variant="bordered" className="w-full">
                  Gemstone Properties Chart
                </Button>
              </Link>
              <Link href="/education/care-guide">
                <Button variant="bordered" className="w-full">
                  Quick Care Guide
                </Button>
              </Link>
              <Link href="/education/birthstone-guide">
                <Button variant="bordered" className="w-full">
                  Birthstone Guide
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How do I know if a gemstone is genuine?",
                answer: "Look for certifications from reputable labs, check for natural inclusions, and consider professional testing."
              },
              {
                question: "What's the difference between natural and synthetic gems?",
                answer: "Natural gems form in nature over millions of years, while synthetic gems are created in laboratories with identical properties."
              },
              {
                question: "How should I store my gemstone jewelry?",
                answer: "Store pieces separately in soft pouches, away from direct sunlight, and in a dry environment."
              },
              {
                question: "Do healing crystals really work?",
                answer: "While scientific evidence is limited, many people report positive effects from crystal healing practices."
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              >
                <Card>
                  <CardBody className="p-6">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/education/faq">
              <Button color="primary" variant="flat">
                View All FAQs
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
