import type {
  DirectusClient,
  GraphqlClient,
  RestClient,
  RestConfig
} from '@directus/sdk'
import {
  useNuxtApp,
  graphql,
  rest
} from '#imports'

export const useDirectus = <T extends Object>() => {
  return useNuxtApp().$directus as DirectusClient<T>
}

export const useDirectusRest = <T extends Object>(config?: RestConfig) => {
  return useNuxtApp().$directus.with(rest(config)) as RestClient<T>
}

export const useDirectusGraphql = <T extends Object>() => {
  return useNuxtApp().$directus.with(graphql()) as GraphqlClient<T>
}
