import type { DirectusUser } from '../types'
import { type Ref, useState } from '#imports'

export const useDirectusUser = <T extends DirectusUser<any>>(): Ref<T | null> =>
  useState<T | null>('directus.user')
