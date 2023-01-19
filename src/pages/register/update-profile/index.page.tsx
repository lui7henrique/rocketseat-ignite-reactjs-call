import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { UpdateProfileTemplate } from '../../../templates/UpdateProfile'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'

export default function UpdateProfile() {
  return <UpdateProfileTemplate />
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
