// src/lib/products.js
export const products = [
  // Charms Category
  {
    id: 1,
    name: "Crystal Heart Charm",
    price: 29.99,
    category: "charms",
    description: "Beautiful crystal heart charm with silver finish. Perfect for bracelets and necklaces. Each piece is carefully crafted to catch and reflect light beautifully.",
    image: "/images/products/crystal-heart-charm.jpg",
    specifications: [
      { name: "Material", value: "Sterling Silver, Crystal" },
      { name: "Dimensions", value: "1.2 x 1.2 cm" },
      { name: "Weight", value: "3g" },
      { name: "Chain Compatible", value: "Yes" },
      { name: "Clasp Type", value: "Lobster Clasp" }
    ],
    stock: 15,
    featured: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Lucky Clover Charm",
    price: 24.99,
    category: "charms",
    description: "Four-leaf clover charm symbolizing luck and fortune. Hand-crafted from sterling silver with delicate enamel detailing.",
    image: "/images/products/lucky-clover-charm.jpg",
    specifications: [
      { name: "Material", value: "Sterling Silver, Enamel" },
      { name: "Dimensions", value: "1.5 x 1.5 cm" },
      { name: "Weight", value: "2.5g" },
      { name: "Chain Compatible", value: "Yes" },
      { name: "Finish", value: "Green Enamel" }
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: "Moon & Stars Charm",
    price: 34.99,
    category: "charms",
    description: "Celestial-themed charm featuring a crescent moon and delicate stars. Perfect for adding a mystical touch to your jewelry.",
    image: "/images/products/moon-stars-charm.jpg",
    specifications: [
      { name: "Material", value: "14K Gold Plated" },
      { name: "Dimensions", value: "1.8 x 1 cm" },
      { name: "Weight", value: "2.8g" },
      { name: "Chain Compatible", value: "Yes" },
      { name: "Style", value: "Celestial" }
    ],
    stock: 12,
    featured: true,
    rating: 4.9,
    reviews: 156
  },

  // Jewelry Category
  {
    id: 4,
    name: "Pearl Necklace",
    price: 199.99,
    category: "jewelry",
    description: "Elegant freshwater pearl necklace with sterling silver clasp. Each pearl is hand-selected for optimal lustre and matching size.",
    image: "/images/products/pearl-necklace.jpg",
    specifications: [
      { name: "Material", value: "Freshwater Pearl, Sterling Silver" },
      { name: "Length", value: "18 inches" },
      { name: "Pearl Size", value: "7-8mm" },
      { name: "Clasp Type", value: "Lobster Clasp" },
      { name: "Pearl Grade", value: "AAA" }
    ],
    stock: 8,
    featured: true,
    rating: 4.7,
    reviews: 203
  },
  {
    id: 5,
    name: "Diamond Stud Earrings",
    price: 499.99,
    category: "jewelry",
    description: "Classic diamond stud earrings set in 14K white gold. Perfect for everyday elegance or special occasions.",
    image: "/images/products/diamond-studs.jpg",
    specifications: [
      { name: "Material", value: "14K White Gold" },
      { name: "Diamond Weight", value: "0.5 carat total" },
      { name: "Clarity", value: "VS1" },
      { name: "Color Grade", value: "F" },
      { name: "Setting", value: "4-Prong" }
    ],
    stock: 6,
    featured: true,
    rating: 4.9,
    reviews: 167
  },
  {
    id: 6,
    name: "Rose Gold Bracelet",
    price: 149.99,
    category: "jewelry",
    description: "Delicate rose gold chain bracelet with adjustable length. Features a unique interlocking design.",
    image: "/images/products/rose-gold-bracelet.jpg",
    specifications: [
      { name: "Material", value: "14K Rose Gold" },
      { name: "Length", value: "6.5-7.5 inches adjustable" },
      { name: "Width", value: "2mm" },
      { name: "Clasp Type", value: "Sliding" },
      { name: "Style", value: "Chain Link" }
    ],
    stock: 15,
    featured: false,
    rating: 4.5,
    reviews: 92
  },

  // Lights Category
  {
    id: 7,
    name: "Crystal Chandelier",
    price: 299.99,
    category: "lights",
    description: "Modern crystal chandelier with LED lights. Creates stunning light patterns and adds elegance to any room.",
    image: "/images/products/crystal-chandelier.jpg",
    specifications: [
      { name: "Material", value: "Crystal, Chrome" },
      { name: "Dimensions", value: "24\" diameter x 28\" height" },
      { name: "Bulb Type", value: "LED" },
      { name: "Wattage", value: "60W" },
      { name: "Installation", value: "Professional Required" }
    ],
    stock: 4,
    featured: true,
    rating: 4.8,
    reviews: 75
  },
  {
    id: 8,
    name: "Fairy String Lights",
    price: 24.99,
    category: "lights",
    description: "Waterproof LED string lights perfect for indoor or outdoor decoration. Features multiple lighting modes.",
    image: "/images/products/fairy-lights.jpg",
    specifications: [
      { name: "Length", value: "33 feet" },
      { name: "LED Count", value: "100 bulbs" },
      { name: "Power Source", value: "USB/Battery" },
      { name: "Modes", value: "8 different patterns" },
      { name: "Waterproof Rating", value: "IP65" }
    ],
    stock: 30,
    featured: false,
    rating: 4.6,
    reviews: 428
  },
  {
    id: 9,
    name: "Modern Floor Lamp",
    price: 159.99,
    category: "lights",
    description: "Contemporary LED floor lamp with adjustable brightness and color temperature. Perfect for reading or ambient lighting.",
    image: "/images/products/floor-lamp.jpg",
    specifications: [
      { name: "Height", value: "60 inches" },
      { name: "Base Diameter", value: "10 inches" },
      { name: "Power", value: "24W LED" },
      { name: "Color Temperature", value: "3000K-6000K" },
      { name: "Features", value: "Touch Control, Dimmer" }
    ],
    stock: 10,
    featured: true,
    rating: 4.7,
    reviews: 183
  },
  {
    id: 10,
    name: "Vintage Edison Bulbs",
    price: 39.99,
    category: "lights",
    description: "Set of 6 vintage-style Edison bulbs with exposed filaments. Creates warm, ambient lighting with a retro feel.",
    image: "/images/products/edison-bulbs.jpg",
    specifications: [
      { name: "Type", value: "ST64" },
      { name: "Wattage", value: "40W" },
      { name: "Base Type", value: "E26" },
      { name: "Lifespan", value: "3000 hours" },
      { name: "Color Temperature", value: "2700K" }
    ],
    stock: 25,
    featured: false,
    rating: 4.5,
    reviews: 92
  },
  {
    id: 11,
    name: "Crystal Table Lamp",
    price: 89.99,
    category: "lights",
    description: "Elegant crystal table lamp with fabric shade. Perfect for bedside tables or living room accents.",
    image: "/images/products/table-lamp.jpg",
    specifications: [
      { name: "Height", value: "22 inches" },
      { name: "Base Material", value: "Crystal, Chrome" },
      { name: "Shade Material", value: "Fabric" },
      { name: "Bulb Type", value: "E26 (not included)" },
      { name: "Switch Type", value: "Pull Chain" }
    ],
    stock: 18,
    featured: true,
    rating: 4.4,
    reviews: 67
  },
  {
    id: 12,
    name: "LED Strip Lights",
    price: 49.99,
    category: "lights",
    description: "Smart LED strip lights with app control. Features millions of colors and music sync capability.",
    image: "/images/products/led-strip.jpg",
    specifications: [
      { name: "Length", value: "16.4 feet" },
      { name: "Connectivity", value: "WiFi/Bluetooth" },
      { name: "Color Options", value: "16 Million Colors" },
      { name: "Compatible With", value: "Alexa, Google Home" },
      { name: "Features", value: "Music Sync, Schedule" }
    ],
    stock: 40,
    featured: false,
    rating: 4.7,
    reviews: 315
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
    id: 'charms',
    name: 'Charms',
    description: 'Beautiful charms for any occasion',
    image: '/images/categories/charms.jpg'
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    description: 'Elegant jewelry pieces',
    image: '/images/categories/jewelry.jpg'
  },
  {
    id: 'lights',
    name: 'Lights',
    description: 'Decorative lighting solutions',
    image: '/images/categories/lights.jpg'
  }
]