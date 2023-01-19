import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../lib/axios'
import { Container } from '../Register/styles'
import { Header } from '../Register/styles'
import { UpdateProfileData, updateProfileSchema } from './schema'

import * as S from './styles'

export const UpdateProfileTemplate = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const session = useSession()
  const { push } = useRouter()

  const handleUpdateProfile = useCallback(async (data: UpdateProfileData) => {
    await api.put('/users/profile', {
      bio: data.bio,
    })

    await push(`/schedule/${session.data?.user.username}`)
  }, [])

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <S.ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text>Foto de perfil</Text>
          <Avatar
            src={session.data?.user.avatar_url}
            referrerPolicy="no-referrer"
            alt={session.data?.user.name}
          />
        </label>

        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register('bio')} />
          <S.FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </S.FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </S.ProfileBox>
    </Container>
  )
}
