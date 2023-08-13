import { readMe } from '#imports'

export const useDirectusUser = async () => {
  const directus = useDirectusRest({
    onRequest: (request: any) => {
      const accessToken = useCookie('directus_access_token')

      if (accessToken) {
        request.headers = {
          ...request.headers,
          authorization: `Bearer ${accessToken.value}`
        }
      }

      return request
    }
  })

  const user = await directus.request(readMe()).catch((e: any) => {
    // eslint-disable-next-line no-console
    console.error(e)
    return undefined
  })

  return user
}
