import { Button, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import * as S from './styles'

const ClaimUsernameFormSchema = z.object({
  username: z.string(),
})

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>

export const ClaimUsernameForm = () => {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>()

  const handleClaimUsername = useCallback((data: ClaimUsernameFormData) => {
    console.log({ data })
  }, [])

  return (
    <S.Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuário"
        {...register('username')}
      />

      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </S.Form>
  )
}
