// src/lib/products.js
export const products = [
  // Ruby Collection
  {
    id: 1,
    name: "Natural Ruby Pendant",
    price: 1299.99,
    category: "ruby",
    collection: "luxury",
    description: "Exquisite natural ruby pendant featuring a 2.5-carat certified Burmese ruby set in 18K white gold. Each ruby is hand-selected for its exceptional color and clarity.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&q=80",
    specifications: [
      { name: "Gemstone", value: "Natural Ruby" },
      { name: "Carat Weight", value: "2.5 ct" },
      { name: "Origin", value: "Burma (Myanmar)" },
      { name: "Cut", value: "Oval" },
      { name: "Color", value: "Pigeon Blood Red" },
      { name: "Clarity", value: "VS1" },
      { name: "Treatment", value: "Heat Only" },
      { name: "Certification", value: "GIA Certified" },
      { name: "Metal", value: "18K White Gold" },
      { name: "Chain Length", value: "18 inches" }
    ],
    stock: 3,
    featured: true,
    rating: 4.9,
    reviews: 47,
    loyaltyPoints: 130,
    bundleOffers: ["Ruby Earrings Set", "Ruby Ring Collection"]
  },
  {
    id: 2,
    name: "Classic Ruby Stud Earrings",
    price: 899.99,
    category: "ruby",
    collection: "classic",
    description: "Timeless ruby stud earrings featuring perfectly matched natural rubies in traditional 4-prong settings. Perfect for everyday elegance.",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&q=80",
    specifications: [
      { name: "Gemstone", value: "Natural Ruby" },
      { name: "Total Carat Weight", value: "1.5 ct (pair)" },
      { name: "Origin", value: "Thailand" },
      { name: "Cut", value: "Round Brilliant" },
      { name: "Color", value: "Deep Red" },
      { name: "Clarity", value: "SI1" },
      { name: "Treatment", value: "Heat Only" },
      { name: "Metal", value: "14K Yellow Gold" },
      { name: "Setting", value: "4-Prong" },
      { name: "Backing", value: "Secure Lock" }
    ],
    stock: 8,
    featured: false,
    rating: 4.7,
    reviews: 92,
    loyaltyPoints: 90,
    bundleOffers: ["Ruby Pendant Set"]
  },
  {
    id: 3,
    name: "Royal Sapphire Ring",
    price: 2299.99,
    category: "sapphire",
    collection: "luxury",
    description: "Magnificent blue sapphire engagement ring featuring a 3-carat Kashmir sapphire surrounded by diamonds in an elegant halo setting.",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop&q=80",
    specifications: [
      { name: "Center Stone", value: "Natural Blue Sapphire" },
      { name: "Carat Weight", value: "3.0 ct" },
      { name: "Origin", value: "Kashmir" },
      { name: "Cut", value: "Cushion" },
      { name: "Color", value: "Royal Blue" },
      { name: "Clarity", value: "VVS1" },
      { name: "Treatment", value: "No Heat" },
      { name: "Side Stones", value: "Natural Diamonds" },
      { name: "Diamond Weight", value: "0.75 ct total" },
      { name: "Metal", value: "Platinum" },
      { name: "Ring Size", value: "7 (Resizable)" }
    ],
    stock: 2,
    featured: true,
    rating: 5.0,
    reviews: 23,
    loyaltyPoints: 230,
    bundleOffers: ["Sapphire Earrings", "Wedding Band Set"]
  },

  // Emerald Collection
  {
    id: 4,
    name: "Colombian Emerald Necklace",
    price: 3299.99,
    category: "emerald",
    collection: "luxury",
    description: "Stunning Colombian emerald necklace featuring a 4-carat emerald-cut emerald centerpiece with diamond accents. A true statement piece.",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&q=80",
    specifications: [
      { name: "Center Stone", value: "Natural Emerald" },
      { name: "Carat Weight", value: "4.0 ct" },
      { name: "Origin", value: "Colombia" },
      { name: "Cut", value: "Emerald Cut" },
      { name: "Color", value: "Vivid Green" },
      { name: "Clarity", value: "VS2" },
      { name: "Treatment", value: "Traditional Oil" },
      { name: "Side Stones", value: "Natural Diamonds" },
      { name: "Diamond Weight", value: "1.2 ct total" },
      { name: "Metal", value: "18K White Gold" },
      { name: "Chain Length", value: "16-18 inches adjustable" }
    ],
    stock: 1,
    featured: true,
    rating: 4.9,
    reviews: 15,
    loyaltyPoints: 330,
    bundleOffers: ["Emerald Earrings Set", "Diamond Tennis Bracelet"]
  },
  {
    id: 5,
    name: "Diamond Tennis Bracelet",
    price: 4599.99,
    category: "diamond",
    collection: "luxury",
    description: "Classic diamond tennis bracelet featuring 5 carats of perfectly matched round brilliant diamonds in a secure setting.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&q=80",
    specifications: [
      { name: "Gemstone", value: "Natural Diamonds" },
      { name: "Total Carat Weight", value: "5.0 ct" },
      { name: "Cut", value: "Round Brilliant" },
      { name: "Color Grade", value: "G-H" },
      { name: "Clarity", value: "VS1-VS2" },
      { name: "Metal", value: "14K White Gold" },
      { name: "Length", value: "7 inches" },
      { name: "Setting", value: "4-Prong" },
      { name: "Clasp", value: "Hidden Safety" },
      { name: "Diamond Count", value: "63 stones" }
    ],
    stock: 4,
    featured: true,
    rating: 4.8,
    reviews: 67,
    loyaltyPoints: 460,
    bundleOffers: ["Diamond Earrings", "Diamond Ring Set"]
  },
  {
    id: 6,
    name: "Amethyst Healing Bracelet",
    price: 149.99,
    category: "amethyst",
    collection: "healing",
    description: "Natural amethyst bracelet designed for healing and spiritual balance. Features high-quality amethyst beads with sterling silver accents.",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop&q=80",
    specifications: [
      { name: "Gemstone", value: "Natural Amethyst" },
      { name: "Bead Size", value: "8mm" },
      { name: "Origin", value: "Brazil" },
      { name: "Color", value: "Deep Purple" },
      { name: "Treatment", value: "None" },
      { name: "Metal Accents", value: "Sterling Silver" },
      { name: "Length", value: "7.5 inches" },
      { name: "Clasp", value: "Toggle" },
      { name: "Healing Properties", value: "Clarity, Calmness" },
      { name: "Chakra", value: "Crown Chakra" }
    ],
    stock: 25,
    featured: false,
    rating: 4.6,
    reviews: 134,
    loyaltyPoints: 15,
    bundleOffers: ["Amethyst Earrings", "Healing Stone Set"]
  },
  // Zodiac & Birthstone Collection
  {
    id: 7,
    name: "Zodiac Birthstone Ring - Leo",
    price: 599.99,
    category: "birthstone",
    collection: "zodiac",
    description: "Leo birthstone ring featuring a beautiful peridot center stone with constellation engravings. Perfect for August birthdays.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&q=80",
    specifications: [
      { name: "Birthstone", value: "Natural Peridot" },
      { name: "Carat Weight", value: "1.5 ct" },
      { name: "Origin", value: "Pakistan" },
      { name: "Cut", value: "Round" },
      { name: "Color", value: "Olive Green" },
      { name: "Metal", value: "14K Yellow Gold" },
      { name: "Ring Size", value: "7 (Resizable)" },
      { name: "Zodiac Sign", value: "Leo" },
      { name: "Birth Month", value: "August" },
      { name: "Special Feature", value: "Constellation Engraving" }
    ],
    stock: 12,
    featured: true,
    rating: 4.7,
    reviews: 89,
    loyaltyPoints: 60,
    bundleOffers: ["Leo Pendant", "Peridot Earrings"]
  },
  {
    id: 8,
    name: "Raw Crystal Healing Set",
    price: 89.99,
    category: "healing",
    collection: "raw",
    description: "Curated set of raw healing crystals including amethyst, rose quartz, and clear quartz. Perfect for meditation and energy work.",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop&q=80",
    specifications: [
      { name: "Crystals Included", value: "7 pieces" },
      { name: "Amethyst", value: "Crown Chakra" },
      { name: "Rose Quartz", value: "Heart Chakra" },
      { name: "Clear Quartz", value: "All Chakras" },
      { name: "Citrine", value: "Solar Plexus" },
      { name: "Black Tourmaline", value: "Protection" },
      { name: "Selenite", value: "Cleansing" },
      { name: "Green Aventurine", value: "Heart Healing" },
      { name: "Size Range", value: "1-3 inches" },
      { name: "Origin", value: "Various (Brazil, Madagascar)" }
    ],
    stock: 50,
    featured: false,
    rating: 4.5,
    reviews: 267,
    loyaltyPoints: 9,
    bundleOffers: ["Healing Guide Book", "Crystal Storage Pouch"]
  },
  {
    id: 9,
    name: "Anniversary Diamond Pendant",
    price: 1799.99,
    category: "diamond",
    collection: "anniversary",
    description: "Elegant diamond pendant perfect for anniversaries featuring a heart-shaped diamond in a vintage-inspired setting.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&q=80",
    specifications: [
      { name: "Gemstone", value: "Natural Diamond" },
      { name: "Carat Weight", value: "1.0 ct" },
      { name: "Cut", value: "Heart Shape" },
      { name: "Color Grade", value: "F" },
      { name: "Clarity", value: "VS1" },
      { name: "Certification", value: "GIA Certified" },
      { name: "Metal", value: "18K Rose Gold" },
      { name: "Chain Included", value: "18-inch Box Chain" },
      { name: "Setting Style", value: "Vintage Halo" },
      { name: "Occasion", value: "Anniversary Gift" }
    ],
    stock: 6,
    featured: true,
    rating: 4.9,
    reviews: 43,
    loyaltyPoints: 180,
    bundleOffers: ["Diamond Earrings", "Anniversary Ring Set"]
  },
  {
    id: 10,
    name: "Turquoise Statement Necklace",
    price: 299.99,
    category: "turquoise",
    collection: "statement",
    description: "Bold turquoise statement necklace featuring natural Sleeping Beauty turquoise stones in sterling silver setting.",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop&q=80",
    specifications: [
      { name: "Gemstone", value: "Natural Turquoise" },
      { name: "Origin", value: "Sleeping Beauty Mine, Arizona" },
      { name: "Color", value: "Sky Blue" },
      { name: "Treatment", value: "Stabilized" },
      { name: "Metal", value: "Sterling Silver" },
      { name: "Length", value: "20 inches" },
      { name: "Stone Count", value: "15 graduated stones" },
      { name: "Largest Stone", value: "15mm x 12mm" },
      { name: "Style", value: "Southwestern" },
      { name: "Clasp", value: "Sterling Silver Hook" }
    ],
    stock: 18,
    featured: false,
    rating: 4.6,
    reviews: 78,
    loyaltyPoints: 30,
    bundleOffers: ["Turquoise Earrings", "Silver Bracelet Set"]
  },
  {
    id: 11,
    name: "Opal Fire Ring",
    price: 799.99,
    category: "opal",
    collection: "fire",
    description: "Mesmerizing fire opal ring featuring a 2-carat Ethiopian opal with incredible play-of-color in 14K gold setting.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&q=80",
    specifications: [
      { name: "Gemstone", value: "Natural Fire Opal" },
      { name: "Carat Weight", value: "2.0 ct" },
      { name: "Origin", value: "Ethiopia" },
      { name: "Cut", value: "Oval Cabochon" },
      { name: "Play of Color", value: "Red, Orange, Green" },
      { name: "Transparency", value: "Translucent" },
      { name: "Metal", value: "14K Yellow Gold" },
      { name: "Ring Size", value: "6 (Resizable)" },
      { name: "Setting", value: "Bezel" },
      { name: "Special Feature", value: "Color Flash" }
    ],
    stock: 5,
    featured: true,
    rating: 4.8,
    reviews: 34,
    loyaltyPoints: 80,
    bundleOffers: ["Opal Earrings", "Gold Chain Set"]
  },
  {
    id: 12,
    name: "Tanzanite Drop Earrings",
    price: 1299.99,
    category: "tanzanite",
    collection: "luxury",
    description: "Exquisite tanzanite drop earrings featuring 3-carat total weight of vivid blue tanzanites with diamond accents.",
    image: "/images/products/tanzanite-earrings.jpg",
    specifications: [
      { name: "Gemstone", value: "Natural Tanzanite" },
      { name: "Total Carat Weight", value: "3.0 ct (pair)" },
      { name: "Origin", value: "Tanzania" },
      { name: "Cut", value: "Pear Shape" },
      { name: "Color", value: "Vivid Blue-Violet" },
      { name: "Clarity", value: "VS1" },
      { name: "Treatment", value: "Heat Only" },
      { name: "Diamond Accents", value: "0.25 ct total" },
      { name: "Metal", value: "14K White Gold" },
      { name: "Drop Length", value: "1.5 inches" }
    ],
    stock: 3,
    featured: true,
    rating: 4.9,
    reviews: 21,
    loyaltyPoints: 130,
    bundleOffers: ["Tanzanite Ring", "Diamond Necklace"]
  }
]

// Utility functions
export function getSimilarProducts(productId, category, limit = 4) {
  return products
    .filter(product => 
      product.id !== productId && 
      product.category === category
    )
    .slice(0, limit)
}

export function getProductsByCategory(category) {
  return category === 'all' 
    ? products 
    : products.filter(product => product.category === category)
}

export function getFeaturedProducts(limit = 6) {
  return products
    .filter(product => product.featured)
    .slice(0, limit)
}

export function searchProducts(query) {
  const searchTerm = query.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  )
}

export function getProductById(id) {
  return products.find(product => product.id === parseInt(id))
}

export const categories = [
  {
    id: 'ruby',
    name: 'Ruby',
    description: 'Passionate red rubies symbolizing love, courage, and vitality',
    image: '/images/categories/ruby.jpg'
  },
  {
    id: 'sapphire',
    name: 'Sapphire',
    description: 'Royal blue sapphires representing wisdom, nobility, and divine favor',
    image: '/images/categories/sapphire.jpg'
  },
  {
    id: 'emerald',
    name: 'Emerald',
    description: 'Lush green emeralds embodying growth, harmony, and renewal',
    image: '/images/categories/emerald.jpg'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    description: 'Brilliant diamonds for eternal elegance and unbreakable bonds',
    image: '/images/categories/diamond.jpg'
  },
  {
    id: 'amethyst',
    name: 'Amethyst',
    description: 'Purple amethyst for spiritual clarity and peaceful energy',
    image: '/images/categories/amethyst.jpg'
  },
  {
    id: 'turquoise',
    name: 'Turquoise',
    description: 'Sacred turquoise for protection and healing vibrations',
    image: '/images/categories/turquoise.jpg'
  },
  {
    id: 'opal',
    name: 'Opal',
    description: 'Mystical opals with dancing colors and creative inspiration',
    image: '/images/categories/opal.jpg'
  },
  {
    id: 'tanzanite',
    name: 'Tanzanite',
    description: 'Rare tanzanite gems found only in Tanzania, symbolizing transformation',
    image: '/images/categories/tanzanite.jpg'
  },
  {
    id: 'birthstone',
    name: 'Birthstones',
    description: 'Personal birthstones for every month and zodiac sign',
    image: '/images/categories/birthstones.jpg'
  },
  {
    id: 'healing',
    name: 'Healing Crystals',
    description: 'Powerful healing crystals for energy, balance, and wellness',
    image: '/images/categories/healing.jpg'
  }
]

// Collections for organizing products
export const collections = [
  {
    id: 'luxury',
    name: 'Luxury Collection',
    description: 'Premium gemstones with exceptional quality and rarity',
    image: '/images/collections/luxury.jpg'
  },
  {
    id: 'classic',
    name: 'Classic Collection',
    description: 'Timeless designs for everyday elegance',
    image: '/images/collections/classic.jpg'
  },
  {
    id: 'zodiac',
    name: 'Zodiac Collection',
    description: 'Curated pieces based on astrological signs',
    image: '/images/collections/zodiac.jpg'
  },
  {
    id: 'healing',
    name: 'Healing Collection',
    description: 'Crystals and stones for spiritual wellness',
    image: '/images/collections/healing.jpg'
  },
  {
    id: 'anniversary',
    name: 'Anniversary Collection',
    description: 'Special pieces to celebrate milestones',
    image: '/images/collections/anniversary.jpg'
  },
  {
    id: 'statement',
    name: 'Statement Collection',
    description: 'Bold pieces that make a lasting impression',
    image: '/images/collections/statement.jpg'
  },
  {
    id: 'fire',
    name: 'Fire Collection',
    description: 'Gems with exceptional brilliance and fire',
    image: '/images/collections/fire.jpg'
  },
  {
    id: 'raw',
    name: 'Raw Collection',
    description: 'Natural, uncut crystals in their raw form',
    image: '/images/collections/raw.jpg'
  }
]