import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'

import { prisma } from '../../lib/prisma'
import {
  ScheduleTemplate,
  ScheduleTemplateProps,
} from '../../templates/Schedule'

export default function Schedule(props: ScheduleTemplateProps) {
  return (
    <>
      <ScheduleTemplate {...props} />
      <NextSeo title={`Agendar com ${props.user.name} | Ignite Call`} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
