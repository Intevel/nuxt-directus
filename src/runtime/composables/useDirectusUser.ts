import { rest, readMe } from '@directus/sdk'

export const useDirectusUser = async () => {
  const directus = useDirectusRest({
    onRequest: (request) => {
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

  const user = await directus.request(readMe()).catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    return undefined
  })

  return user
}
