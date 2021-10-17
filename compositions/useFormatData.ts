import dayjs from 'dayjs'
import firebase from '@/plugins/firebase'
// date => YYYY/MM/DD HH:mm
export const formatDateToSlashWithTime = (date: any): string => {
  const target = date.toDate()
  return dayjs(target).format('YYYY/MM/DD　HH:mm')
}

// date => YYYY/MM/DD HH:mm
export const formatOnlyDateToSlashWithTime = (date: Date): string => {
  return dayjs(date).format('YYYY/MM/DD　HH:mm')
}
// date => YYYY/MM/DD HH:mm
export const formatOnlyDateToSlash = (date: string): string => {
  return dayjs(date).format('YYYY/MM/DD HH:mm')
}

// DateをFirestore のTimestamp に変換して返す
export const timestamp = (date: Date) => {
  return firebase.firestore.Timestamp.fromDate(date)
}
