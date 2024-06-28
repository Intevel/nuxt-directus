import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'
import { createOperationsGenerator } from '#image'
import { useRuntimeConfig, useDirectusTokens } from '#imports'

export const operationsGenerator = createOperationsGenerator({
  joinWith: '&',
})

export const getImage: ProviderGetImage = (src, { baseURL, modifiers = {} }) => {
  const {
    url,
    staticToken,
    moduleConfig: {
      nuxtImage: {
        useAuthToken,
        useStaticToken,
      },
    },
  } = useRuntimeConfig().public.directus
  const { get } = useDirectusTokens()
  const { access_token: accessToken } = get() as { access_token: string | undefined }

  // Apply default values from Runtime Config
  if (!baseURL) {
    baseURL = url
  }

  // Apply token to modifiers
  if (!modifiers.access_token && (useStaticToken || useAuthToken)) {
    modifiers.access_token === false
      ? modifiers.access_token = undefined
      : useAuthToken && accessToken
        ? modifiers.access_token = accessToken
        : modifiers.access_token = staticToken
  }

  // Separating the transforms from the rest of the modifiers
  let transforms = modifiers.transforms
  if (transforms && Array.isArray(transforms) && transforms.length > 0) {
    // de-duplicate (can get multiplied when having >1 densities configured)
    transforms = Array.from(new Set(transforms.map(obj => JSON.stringify(obj)))).map(value => JSON.parse(value))
    // We stringify and encode in URL the list of lists, then apply it back to the modifiers
    modifiers.transforms = new URLSearchParams(JSON.stringify(transforms)).toString().replace(/=+$/, '') as unknown as (string | number)[][]
  }
  const operations = operationsGenerator(modifiers)
  return {
    url: joinURL(baseURL, '/assets', src + (operations ? ('?' + operations) : '')),
  }
}
