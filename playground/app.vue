<template>
  <div>
    <pre>
      {{ user ?? 'Not logged in' }}
    </pre>
    <div>
      Nuxt module playground
      <button @click="login">
        Sign in
      </button>
      <button @click="signOut">
        Sign out
      </button>
      <button @click="refreshTokens">
        Refresh Tokens
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signIn, signOut, refreshTokens } = useDirectusAuth()

const login = async () => {
  const t = await signIn('admin@example.com', 'Passw0rd!')
  // eslint-disable-next-line no-console
  console.log(t)
}

const user = await useDirectusUser()
</script>
