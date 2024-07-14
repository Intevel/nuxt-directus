import { readItems } from '@directus/sdk'

export default defineEventHandler((_event) => {
  const client = useDirectusRest({
    staticToken: false, // this will prevent the use of serverToken from nuxt.config.ts or .env file
  })

  return client.request(readItems('posts'))
})
