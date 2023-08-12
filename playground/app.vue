<template>
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
</template>

<script setup lang="ts">
const { signIn, signOut, refreshTokens } = useDirectusAuth()

const login = async () => {
  const t = await signIn('admin@example.com', 'Passw0rd!')
  // eslint-disable-next-line no-console
  console.log(t)
}
// console.log(await directus.login('admin@example.com', 'Passw0rd!'))
// console.log(await signIn('admin@example.com', 'Passw0rd!', {}))
</script>
