/* eslint-disable camelcase */
import { login, refresh, logout, readMe } from '#imports'

export function useDirectusAuth () {
  const { accessToken, refreshToken } = useDirectusCookie()
  const user = useDirectusUser()
  const directus = useDirectusRest({
    onRequest: (request) => {
      if (accessToken() && accessToken().value) {
        request.headers = {
          ...request.headers,
          authorization: `Bearer ${accessToken().value}`
        }
      }

      return request
    }
  })

  const setUser = (value: any) => {
    user.value = value
  }

  const fetchUser = async () => {
    if (accessToken().value) {
      try {
        const res = await directus.request(readMe())
        setUser(res)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
    return user
  }

  const signIn = async (identifier: string, password: string) => {
    try {
      const { access_token, expires, refresh_token, expires_at } = await directus.request(login(identifier, password, {}))
      /* the following `if` is required to avoid a type error
      *  because the type of expires is number | null
      *  while maxAge for useCookie is number | undefined
      */
      if (expires !== null) { refreshToken(expires).value = refresh_token }
      accessToken().value = access_token

      return { access_token, refresh_token, expires_at, expires }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  const refreshTokens = async () => {
    try {
      const { access_token, expires, refresh_token, expires_at } = await directus.request(refresh(refreshToken().value!))
      // check previous note about type error
      if (expires !== null) { refreshToken(expires).value = refresh_token }
      accessToken().value = access_token

      return { access_token, refresh_token, expires_at, expires }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  const signOut = async () => {
    try {
      await directus.request(logout(refreshToken().value!))
      accessToken().value = null
      refreshToken().value = null
      user.value = null
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return {
    setUser,
    fetchUser,
    signIn,
    refreshTokens,
    signOut
  }
}
