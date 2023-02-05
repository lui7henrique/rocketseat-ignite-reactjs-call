import { NextSeo } from 'next-seo'
import { HomeTemplate } from '../templates/Home'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Ignite Call"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />

      <HomeTemplate />
    </>
  )
}
