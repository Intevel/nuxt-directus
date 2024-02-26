import { readItems } from '@directus/sdk'
import { getHeader } from 'h3'

export default defineEventHandler((event) => {
  const token = getHeader(event, 'Authorization')

  const client = useDirectusRest({
    staticToken: token?.replace('Bearer ', '') // this will pass the access token from the request if available
  })

  return client.request(readItems('posts'))
})
