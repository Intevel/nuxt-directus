import {
  type DirectusClient,
  rest,
  type RestConfig,
  type RestClient
} from '@directus/sdk'
import { useNuxtApp } from '#imports'

export const useDirectus = <T extends Object>() => {
  return useNuxtApp().$directus as DirectusClient<T>
}

export const useDirectusRest = <T extends Object>(config?: RestConfig) => {
  return useNuxtApp().$directus.with(rest(config)) as RestClient<T>
}
