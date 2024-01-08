import { readItems } from '@directus/sdk'

export default defineEventHandler((event) => {
  const client = useDirectusRest<any>()

  return client.request(readItems('posts'))
})
