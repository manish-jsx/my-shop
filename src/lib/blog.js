// src/lib/blog.js
export const blogCategories = [
  { id: 'gemstone-education', name: 'Gemstone Education', description: 'Learn about different gemstones and their properties' },
  { id: 'healing-crystals', name: 'Healing Crystals', description: 'Discover the healing properties of crystals' },
  { id: 'jewelry-care', name: 'Jewelry Care', description: 'Tips for maintaining your precious jewelry' },
  { id: 'industry-news', name: 'Industry News', description: 'Latest news from the gemstone industry' },
  { id: 'company-updates', name: 'Company Updates', description: 'Updates and announcements from SHUKRA Gems' },
  { id: 'astrology', name: 'Astrology & Gems', description: 'The connection between gemstones and astrology' }
]

export const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Ruby: King of Precious Stones",
    slug: "ultimate-guide-to-ruby",
    excerpt: "Discover the fascinating world of rubies, their formation, healing properties, and how to choose the perfect ruby for your collection.",
    content: `
      <h2>Introduction to Rubies</h2>
      <p>Rubies have been treasured for millennia as symbols of passion, protection, and prosperity. Known as the "King of Precious Stones," rubies are among the most valuable gemstones in the world.</p>
      
      <h2>Formation and Characteristics</h2>
      <p>Rubies are formed deep within the earth under intense pressure and heat. They are composed of the mineral corundum, with trace amounts of chromium giving them their distinctive red color.</p>
      
      <h2>Healing Properties</h2>
      <ul>
        <li>Enhances passion and energy</li>
        <li>Promotes courage and confidence</li>
        <li>Supports heart health and circulation</li>
        <li>Protects against negative energy</li>
      </ul>
      
      <h2>How to Choose a Ruby</h2>
      <p>When selecting a ruby, consider the 4 Cs: Color, Clarity, Cut, and Carat weight. The most valuable rubies display a pure red color with minimal inclusions.</p>
    `,
    category: 'gemstone-education',
    author: 'Dr. Sarah Gemstone',
    publishedAt: '2025-01-10',
    updatedAt: '2025-01-10',
    status: 'published',
    featuredImage: '/images/blog/ruby-guide.jpg',
    tags: ['ruby', 'precious stones', 'education', 'healing'],
    readTime: 8,
    views: 1245,
    featured: true
  },
  {
    id: 2,
    title: "Crystal Healing: Science vs. Spirituality",
    slug: "crystal-healing-science-vs-spirituality",
    excerpt: "Exploring the scientific and spiritual aspects of crystal healing, and how both perspectives can coexist in modern wellness practices.",
    content: `
      <h2>The Scientific Perspective</h2>
      <p>While scientific studies on crystal healing are limited, many people report positive experiences with crystal therapy. The placebo effect and the psychological benefits of ritual and mindfulness may play important roles.</p>
      
      <h2>Spiritual and Cultural Traditions</h2>
      <p>Crystal healing has been practiced for thousands of years across various cultures. Ancient civilizations believed that crystals could channel energy and promote healing.</p>
      
      <h2>Finding Your Balance</h2>
      <p>Whether you approach crystals from a scientific or spiritual perspective, the key is finding what works for you personally.</p>
    `,
    category: 'healing-crystals',
    author: 'Michael Chen',
    publishedAt: '2025-01-08',
    updatedAt: '2025-01-08',
    status: 'published',
    featuredImage: '/images/blog/crystal-healing.jpg',
    tags: ['healing', 'crystals', 'wellness', 'spirituality'],
    readTime: 6,
    views: 892,
    featured: false
  },
  {
    id: 3,
    title: "SHUKRA Gems Announces New Certification Program",
    slug: "new-certification-program-announcement",
    excerpt: "We're excited to announce our new gemstone certification program, ensuring even higher quality and authenticity for our customers.",
    content: `
      <h2>Enhanced Quality Assurance</h2>
      <p>Starting this month, all SHUKRA Gems products will undergo our new comprehensive certification process, providing customers with even greater confidence in their purchases.</p>
      
      <h2>What This Means for You</h2>
      <ul>
        <li>Detailed certification documents</li>
        <li>Blockchain-verified authenticity</li>
        <li>Enhanced warranty coverage</li>
        <li>Lifetime authenticity guarantee</li>
      </ul>
    `,
    category: 'company-updates',
    author: 'SHUKRA Gems Team',
    publishedAt: '2025-01-05',
    updatedAt: '2025-01-05',
    status: 'published',
    featuredImage: '/images/blog/certification-program.jpg',
    tags: ['certification', 'quality', 'announcement'],
    readTime: 3,
    views: 567,
    featured: true
  },
  {
    id: 4,
    title: "How to Clean and Care for Your Precious Gemstones",
    slug: "gemstone-cleaning-care-guide",
    excerpt: "Essential tips for maintaining the beauty and longevity of your precious gemstone jewelry.",
    content: `
      <h2>Daily Care Tips</h2>
      <p>Proper daily care can significantly extend the life and beauty of your gemstone jewelry.</p>
      
      <h2>Cleaning Methods by Gemstone Type</h2>
      <h3>Hard Gemstones (Diamond, Ruby, Sapphire)</h3>
      <p>These can withstand gentle scrubbing with a soft brush and mild soap solution.</p>
      
      <h3>Soft Gemstones (Pearl, Opal, Turquoise)</h3>
      <p>Require more gentle cleaning with just a damp cloth.</p>
      
      <h2>Storage Best Practices</h2>
      <ul>
        <li>Store pieces separately to prevent scratching</li>
        <li>Keep in a cool, dry place</li>
        <li>Use soft pouches or lined jewelry boxes</li>
      </ul>
    `,
    category: 'jewelry-care',
    author: 'Emma Rodriguez',
    publishedAt: '2025-01-03',
    updatedAt: '2025-01-03',
    status: 'published',
    featuredImage: '/images/blog/jewelry-care.jpg',
    tags: ['care', 'maintenance', 'jewelry', 'tips'],
    readTime: 5,
    views: 1023,
    featured: false
  },
  {
    id: 5,
    title: "Emerging Trends in Gemstone Market 2025",
    slug: "gemstone-market-trends-2025",
    excerpt: "An analysis of the latest trends shaping the gemstone market, from sustainable sourcing to new cutting techniques.",
    content: `
      <h2>Sustainability Takes Center Stage</h2>
      <p>Consumers are increasingly demanding ethically sourced gemstones with full supply chain transparency.</p>
      
      <h2>Technology Integration</h2>
      <p>Blockchain certification, AI-powered grading, and virtual try-on experiences are revolutionizing the industry.</p>
      
      <h2>Color Trends</h2>
      <p>Vibrant colored gemstones are gaining popularity over traditional white diamonds, with emeralds and sapphires leading the charge.</p>
    `,
    category: 'industry-news',
    author: 'Industry Analyst Team',
    publishedAt: '2025-01-01',
    updatedAt: '2025-01-01',
    status: 'published',
    featuredImage: '/images/blog/market-trends.jpg',
    tags: ['trends', 'market', 'industry', '2025'],
    readTime: 7,
    views: 756,
    featured: true
  }
]

export const getFeaturedPosts = (limit = 3) => {
  return blogPosts.filter(post => post.featured && post.status === 'published').slice(0, limit)
}

export const getPostsByCategory = (categoryId, limit = null) => {
  const posts = blogPosts.filter(post => post.category === categoryId && post.status === 'published')
  return limit ? posts.slice(0, limit) : posts
}

export const getRecentPosts = (limit = 5) => {
  return blogPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit)
}

export const getPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug && post.status === 'published')
}

export const searchPosts = (query) => {
  const lowercaseQuery = query.toLowerCase()
  return blogPosts.filter(post => 
    post.status === 'published' && (
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  )
}

export const getAllTags = () => {
  const tags = new Set()
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
}

export const getPostsByTag = (tag) => {
  return blogPosts.filter(post => 
    post.status === 'published' && 
    post.tags.includes(tag)
  )
}
