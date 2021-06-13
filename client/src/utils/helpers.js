import validator from 'validator'

const { isEmpty, isCreditCard } = validator

export const validatePayment = (details) => {
  for (const key in details) {
    const value = details[key]
    if (isEmpty(value)) {
      return { valid: false, message: `Поле ${key} обязательно` }
    }

    if (key === 'number') {
      if (!isCreditCard(value)) {
        return { valid: false, message: `Неправильный номер карты` }
      }
    }

    if (key === 'expiry') {
      const today = new Date()
      const expiryDate = new Date(value)

      if (today > expiryDate) {
        return { valid: false, message: 'Неправильная дата окончания действия карты' }
      }
    }
  }

  return { valid: true, message: '' }
}
