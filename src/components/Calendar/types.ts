import dayjs from 'dayjs'

export interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

export type CalendarWeeks = CalendarWeek[]

export interface BlockedDates {
  blockedWeekDays: number[]
  blockedDates: number[]
}

export interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}
