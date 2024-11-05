// src/lib/validation.js
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePassword = (password) => {
  return {
    isValid: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }
}

export const validateProduct = (product) => {
  const errors = {}

  if (!product.name?.trim()) {
    errors.name = 'Name is required'
  }

  if (!product.price || product.price <= 0) {
    errors.price = 'Price must be greater than 0'
  }

  if (!product.category?.trim()) {
    errors.category = 'Category is required'
  }

  if (!product.description?.trim()) {
    errors.description = 'Description is required'
  }

  if (!product.image?.trim()) {
    errors.image = 'Image URL is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}