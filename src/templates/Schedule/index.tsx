import { Avatar, Heading, Text } from '@ignite-ui/react'
import { ScheduleForm } from '../ScheduleForm'
import * as S from './styles'

export interface ScheduleTemplateProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export const ScheduleTemplate = (props: ScheduleTemplateProps) => {
  const { user } = props

  return (
    <S.Container>
      <S.UserHeader>
        <Avatar src={user.avatarUrl} />
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </S.UserHeader>

      <ScheduleForm />
    </S.Container>
  )
}
