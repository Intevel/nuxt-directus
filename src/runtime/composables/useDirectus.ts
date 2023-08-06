import { type DirectusClient } from '@directus/sdk'
import { useNuxtApp } from '#imports'

export const useDirectus = <T extends Object>() => {
  return useNuxtApp().$directus as DirectusClient<T>
}
