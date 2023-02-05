import { NextSeo } from 'next-seo'
import { RegisterTemplate } from '../../templates/Register'

export default function Register() {
  return (
    <>
      <NextSeo title="Crie uma conta | Ignite Call" />
      <RegisterTemplate />
    </>
  )
}
