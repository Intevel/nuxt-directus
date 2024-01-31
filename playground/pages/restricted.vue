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
      </div>
      <div v-else>
        <h3>User not authenticated.</h3>
        <NuxtLink :to="redirect">
          Log in
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  useDirectusUsers,
  useRuntimeConfig
} from '#imports'

const { redirect } = useRuntimeConfig().public.directus.moduleConfig.authMiddleware
const { user } = useDirectusUsers()
</script>
