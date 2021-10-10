import dayjs from 'dayjs'
// date => YYYY/MM/DD HH:mm
export const formatDateToSlashWithTime = (date: any): string => {
  const target = date.toDate()
  return dayjs(target).format('YYYY/MM/DD　HH:mm')
}

// date => YYYY/MM/DD HH:mm
export const formatOnlyDateToSlashWithTime = (date: Date): string => {
  return dayjs(date).format('YYYY/MM/DD　HH:mm')
}
