import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'

import * as S from './styles'

import previewImage from '../../assets/app-preview.png'

export const HomeTemplate = () => {
  return (
    <S.Container>
      <S.Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </S.Hero>

      <S.Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendário simbolizando aplicação em funcionamento"
        />
      </S.Preview>
    </S.Container>
  )
}
