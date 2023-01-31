import { useQuery as useReactQuery } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'
import { api } from '../lib/axios'

export const useQuery = <T>(
  keys: Array<string | number>,
  endpoint: string,
  config?: AxiosRequestConfig,
) => {
  const query = useReactQuery(keys, async () => {
    const { data } = await api.get<T>(endpoint, config)
    return data
  })

  return query
}
