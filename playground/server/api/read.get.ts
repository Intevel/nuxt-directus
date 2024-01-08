import { readItems } from '@directus/sdk'

export default defineEventHandler((event) => {
  const client = useDirectusRest<any>({ useStaticToken: false })

  return client.request(readItems('posts'))
})
