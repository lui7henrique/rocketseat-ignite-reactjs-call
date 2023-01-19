import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useCallback } from 'react'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import { api } from '../../lib/axios'
import { getWeekDays } from '../../utils/get-week-days'

import { Container, Header } from '../Register/styles'
import {
  TimeIntervalsFormInput,
  TimeIntervalsFormOutput,
  timeIntervalsFormSchema,
} from './schema'

import * as S from './styles'

export const TimeIntervalsTemplate = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    watch,
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const { push } = useRouter()

  const intervals = watch('intervals')
  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const handleSetTimeIntervals = useCallback(async (data: unknown) => {
    const { intervals } = data as TimeIntervalsFormOutput

    await api.post('/users/time-intervals', {
      intervals,
    })

    push('/register/update-profile')
  }, [])

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horário que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <S.IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <S.IntervalContainer>
          {fields.map((field, index) => {
            return (
              <S.IntervalItem key={field.id}>
                <S.IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                          checked={field.value}
                        />
                      )
                    }}
                  />
                  <Text>{weekDays[field.weekDay]}</Text>
                </S.IntervalDay>

                <S.IntervalInputs>
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.startTime`)}
                  />

                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </S.IntervalInputs>
              </S.IntervalItem>
            )
          })}
        </S.IntervalContainer>

        {errors.intervals && (
          <S.FormError size="sm">{errors.intervals.message}</S.FormError>
        )}

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </S.IntervalBox>
    </Container>
  )
}
