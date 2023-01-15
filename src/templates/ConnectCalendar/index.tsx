import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { signIn, useSession } from 'next-auth/react'

import * as SRegister from '../Register/styles'
import * as S from './styles'

export const ConnectCalendarTemplate = () => {
  const session = useSession()

  return (
    <SRegister.Container>
      <SRegister.Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </SRegister.Header>

      <S.ConnectBox>
        <S.ConnectItem>
          <Text>Google Calendar</Text>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => signIn('google')}
          >
            Conectar
            <ArrowRight />
          </Button>
        </S.ConnectItem>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </S.ConnectBox>
    </SRegister.Container>
  )
}
