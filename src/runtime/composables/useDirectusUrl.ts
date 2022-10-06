import { useRuntimeConfig } from '#app'

export const useDirectusUrl = (): string => {
  const config = useRuntimeConfig()
  return config.directus.url
}
