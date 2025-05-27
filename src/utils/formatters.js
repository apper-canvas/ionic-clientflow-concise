import { format } from 'date-fns'

export const formatDate = (date) => {
  return format(date, 'MMM dd')
}

export const formatCurrency = (value) => {
  return `$${value.toLocaleString()}`
}

export const formatDateForInput = (date) => {
  return format(date, 'yyyy-MM-dd')
} 