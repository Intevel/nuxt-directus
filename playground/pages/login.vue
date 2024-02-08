<template>
  <div>
    <h1>Login page</h1>
    <NuxtLink to="/">
      Home
    </NuxtLink>
    <hr>
    <div>
      <div v-if="!user">
        User Login
        <form @submit.prevent>
          <input v-model="credentials.email" type="email" placeholder="Email">
          <input v-model="credentials.password" type="password" placeholder="Password">
          <button @click="login(credentials.email, credentials.password).then(async () => await navigateTo('/restricted'))">
            Sign in
          </button>
        </form>
      </div>
      <span v-else>
        <button @click="logout()">
          Sign out
        </button>
        <button @click="refresh()">
          Refresh Tokens
        </button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { navigateTo, useDirectusAuth, useDirectusUsers } from '#imports'

const { login, logout, refresh } = useDirectusAuth()
const { user } = useDirectusUsers()

const credentials = ref({ email: '', password: '' })
</script>
