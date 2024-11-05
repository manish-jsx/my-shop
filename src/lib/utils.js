// src/lib/utils.js
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export const calculateDiscount = (originalPrice, discountPercentage) => {
  return originalPrice - (originalPrice * discountPercentage) / 100
}

export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key]
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {})
}

export const sortProducts = (products, sortBy = 'name') => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })
}

export const filterProducts = (products, filters) => {
  return products.filter(product => {
    const matchesCategory = !filters.category || product.category === filters.category
    const matchesSearch = !filters.search || 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.search.toLowerCase())
    const matchesPrice = !filters.maxPrice || product.price <= filters.maxPrice
    
    return matchesCategory && matchesSearch && matchesPrice
  })
}