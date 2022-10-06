import type { Ref } from 'vue'
import type { DirectusUser } from '../types'
import { useState } from '#app'

export const useDirectusUser = (): Ref<DirectusUser> =>
  useState<DirectusUser>('directus.user')
