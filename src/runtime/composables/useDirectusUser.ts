import { useState } from '#app'

import type { Ref } from 'vue'
import type { DirectusUser } from '../types'

export const useDirectusUser = (): Ref<DirectusUser> =>
  useState<DirectusUser>('directus.user')
