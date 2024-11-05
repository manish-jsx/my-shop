// src/components/admin/forms/Form.jsx
'use client'
import { useState } from 'react'
import { 
  Card, 
  CardBody, 
  Button, 
  Input, 
  Textarea,
  Select,
  SelectItem,
  Switch
} from '@nextui-org/react'
import { motion } from 'framer-motion'

export default function Form({
  fields,
  initialValues = {},
  onSubmit,
  submitLabel = "Submit",
  isLoading = false,
}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validate = (fieldName, value) => {
    const field = fields.find(f => f.name === fieldName)
    if (!field?.validation) return ""

    const rules = field.validation
    if (rules.required && !value) {
      return `${field.label} is required`
    }
    if (rules.minLength && value.length < rules.minLength) {
      return `${field.label} must be at least ${rules.minLength} characters`
    }
    if (rules.pattern && !rules.pattern.test(value)) {
      return `${field.label} is invalid`
    }
    if (rules.custom) {
      return rules.custom(value)
    }
    return ""
  }

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validate(name, value)
      }))
    }
  }

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({
      ...prev,
      [name]: validate(name, values[name])
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors = {}
    fields.forEach(field => {
      const error = validate(field.name, values[field.name])
      if (error) newErrors[field.name] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: true }), {})
      )
      return
    }

    onSubmit(values)
  }

  const renderField = (field) => {
    const commonProps = {
      label: field.label,
      placeholder: field.placeholder,
      value: values[field.name] || '',
      onChange: (e) => handleChange(field.name, e.target.value),
      onBlur: () => handleBlur(field.name),
      isInvalid: touched[field.name] && !!errors[field.name],
      errorMessage: touched[field.name] && errors[field.name],
      isRequired: field.validation?.required,
      className: "mb-4"
    }

    switch (field.type) {
      case 'textarea':
        return <Textarea {...commonProps} minRows={3} />
      
      case 'select':
        return (
          <Select {...commonProps}>
            {field.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        )
      
      case 'switch':
        return (
          <Switch
            {...commonProps}
            isSelected={values[field.name]}
            onValueChange={(checked) => handleChange(field.name, checked)}
          >
            {field.label}
          </Switch>
        )
      
      default:
        return <Input {...commonProps} type={field.type || 'text'} />
    }
  }

  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {renderField(field)}
            </motion.div>
          ))}
          <div className="flex justify-end gap-3">
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
            >
              {submitLabel}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}