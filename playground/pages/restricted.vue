<template>
  <div>
    <h1>Restricted Page</h1>
    <NuxtLink to="/">
      Home
    </NuxtLink>
    <hr>
    <div>
      <div v-if="user">
        <h3>User data</h3>
        <pre>
          <details>
            <summary>Show user data</summary>
            {{ user }}
          </details>
        </pre>
        <h3>Tokens data</h3>
        <pre>
          <details>
            <summary>Show tokens data</summary>
            {{ tokens }}
          </details>
        </pre>
      </div>
      <div v-else>
        <h3>User not authenticated.</h3>
        <NuxtLink :to="redirectTo">
          Log in
        </NuxtLink>
      </div>
    </div>
    <div v-if="user?.avatar">
      <h3>User avatar</h3>
      <div>
        <NuxtImg :src="`${user.avatar}`" alt="User avatar" provider="nuxt-directus" :modifiers="{ access_token: false }" />
      </div>
      <div v-if="image">
        <h4>Manually passing tokens to images</h4>
        <h5>Disable token</h5>
        <p style="word-wrap: break-word;">
          {{ image.false }}
        </p>
        <h5>Static token</h5>
        <p style="word-wrap: break-word;">
          {{ image.static }}
        </p>
        <h5>Auth token</h5>
        <p style="word-wrap: break-word;">
          {{ image.auth }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  useDirectusUsers,
  useRuntimeConfig,
  useImage
} from '#imports'

// @ts-ignore
const { moduleConfig: { autoRefresh: { redirectTo } } } = useRuntimeConfig().public.directus
const { user, tokens } = useDirectusUsers()

// To manually construct the image URL
const img = useImage()
const image = reactive({
  false: '',
  static: '',
  auth: ''
})
watch([user, tokens], () => {
  image.false = img(`${user.value?.avatar}`, { access_token: false }) // manually disabling token
  image.static = img(`${user.value?.avatar}`) // picking default form the current runtime config
  image.auth = img(`${user.value?.avatar}`, { access_token: tokens.value?.access_token ?? undefined }) // manually passing access_token
}, {
  immediate: true
})
</script>

<style scoped>
h5 {
  margin-block-end: 0;
}
p {
  margin-block-start: 0;
}
</style>
