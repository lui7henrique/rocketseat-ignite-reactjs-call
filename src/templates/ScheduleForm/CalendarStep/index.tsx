import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Calendar } from '../../../components/Calendar'
import { api } from '../../../lib/axios'
import * as S from './styles'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export const CalendarStep = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState<Availability | null>(null)

  const { query } = useRouter()

  const isDateSelected = !!selectedDate
  const username = String(query.username)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null

  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  useEffect(() => {
    if (!selectedDate) {
      return
    }

    api
      .get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })
      .then((response) => {
        setAvailability(response.data)
      })
  }, [selectedDate, username])

  return (
    <S.Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <S.TimePicker>
          <S.TimePickerHeader>
            terça-feira <span>20 de setembro</span>
          </S.TimePickerHeader>

          <S.TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              return (
                <S.TimePickerItem
                  key={hour}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </S.TimePickerItem>
              )
            })}
          </S.TimePickerList>
        </S.TimePicker>
      )}
    </S.Container>
  )
}
