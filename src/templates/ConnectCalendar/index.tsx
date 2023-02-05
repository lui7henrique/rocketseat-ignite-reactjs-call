import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'
import { signIn, useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import * as SRegister from '../Register/styles'
import * as S from './styles'
import { useCallback } from 'react'

export const ConnectCalendarTemplate = () => {
  const session = useSession()
  const { push, query } = useRouter()

  const hasAuthError = !!query.error
  const isSignedId = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  const handleNavigateToNextStep = useCallback(() => {
    push('/register/time-intervals')
  }, [])

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

          {isSignedId ? (
            <Button size="sm" onClick={() => signOut()}>
              Desconectar
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </S.ConnectItem>

        <Button
          onClick={handleNavigateToNextStep}
          type="submit"
          disabled={!isSignedId}
        >
          Próximo passo
          <ArrowRight />
        </Button>
      </S.ConnectBox>
    </SRegister.Container>
  )
}
