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
  </div>
</template>

<script setup lang="ts">
import {
  useDirectusUsers,
  useRuntimeConfig
} from '#imports'

const { redirectTo } = useRuntimeConfig().public.directus.moduleConfig.autoRefresh
const { user, tokens } = useDirectusUsers()
</script>
