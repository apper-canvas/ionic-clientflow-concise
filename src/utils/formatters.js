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

export const formatDateTime = (date) => {
  return format(date, 'MMM dd, yyyy HH:mm')
}

export const formatTime = (date) => {
  return format(date, 'HH:mm')
}

export const formatDateLong = (date) => {
  return format(date, 'EEEE, MMMM dd, yyyy')
}

export const formatCalendarDate = (date) => {
  return format(date, 'yyyy-MM-dd\'T\'HH:mm')
}
