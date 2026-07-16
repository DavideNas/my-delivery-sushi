export const rules = {
  // Using 'unknown' instead of 'any'
  required: (value: unknown) => {
    // Gestiamo in sicurezza la conversione a booleano o stringa vuota
    if (value === null || value === undefined) return 'This field is required'
    if (typeof value === 'string' && value.trim() === '') return 'This field is required'
    return !!value || 'This field is required'
  },
  
  phone: (value: string) => {
    const pattern = /^[0-9+\s-]{8,15}$/
    return !value || pattern.test(value) || 'Please enter a valid phone number'
  },
  
  email: (value: string) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return !value || pattern.test(value) || 'Please enter a valid email address'
  },
  
  cardNumber: (value: string) => {
    const cleanValue = (value || '').replace(/\s/g, '')
    return !value || /^\d{16}$/.test(cleanValue) || 'The card must contain 16 digits'
  },
  
  cardExpiry: (value: string) => {
    const pattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/
    return !value || pattern.test(value) || 'Please use the MM/YY format'
  },
  
  cardCVC: (value: string) => {
    return !value || /^\d{3,4}$/.test(value) || 'The CVC must be 3 or 4 digits'
  }
}