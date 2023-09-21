import type { DirectusUser } from '../types'
import { type Ref, useState } from '#imports'

export const useDirectusUser = <T extends object>(): Ref<DirectusUser<T> | null> =>
  useState<DirectusUser<T> | null>('directus.user', () => null)
