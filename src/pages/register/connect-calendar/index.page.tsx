import { NextSeo } from 'next-seo'
import { ConnectCalendarTemplate } from '../../../templates/ConnectCalendar'

export default function ConnectCalendar() {
  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Ignite Call" noindex />
      <ConnectCalendarTemplate />
    </>
  )
}
