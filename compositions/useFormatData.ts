import dayjs from 'dayjs'
// date => YYYY/MM/DD HH:mm
export const formatDateToSlashWithTime = (date: any): string => {
  const target = date.toDate()
  return dayjs(target).format('YYYY/MM/DD　HH:mm')
}
