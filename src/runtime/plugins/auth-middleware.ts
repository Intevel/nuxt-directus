import {
  addRouteMiddleware,
  defineNuxtPlugin,
  navigateTo,
  onNuxtReady,
  useDirectusUsers,
  useRuntimeConfig
} from '#imports'

export default defineNuxtPlugin((_nuxtApp) => {
  const {
    global,
    name,
    redirect,
    to: toArray
  } = useRuntimeConfig().public.directus.moduleConfig.authMiddleware

  addRouteMiddleware(name, (to, _from) => {
    const { user } = useDirectusUsers()

    onNuxtReady(() => {
      if (!user.value && (toArray.length === 0 || !toArray.indexOf(to.path))) {
        return navigateTo(redirect)
      }
    })
  }, {
    global
  })
})
