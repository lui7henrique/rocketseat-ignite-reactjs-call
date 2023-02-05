import { NextSeo } from 'next-seo'
import { TimeIntervalsTemplate } from '../../../templates/TimeIntervals'

export default function TimeIntervals() {
  return (
    <>
      <TimeIntervalsTemplate />
      <NextSeo title="Selecione sua disponibilidade | Ignite Call" noindex />
    </>
  )
}
