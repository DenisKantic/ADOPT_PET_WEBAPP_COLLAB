import { format, parseISO } from 'date-fns'

export default function formatDate(dateString: string) {
  try {
    const date = parseISO(dateString)
    return format(date, 'dd/MM/yyyy')
  } catch (error) {
    console.error('Invalid date:', dateString, error)
    return dateString
  }
}
