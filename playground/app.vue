<template>
  <div>
    <div>
      <h1>{{ global.title }}</h1>
      <p>{{ global.description }}</p>
    </div>
    <div>
      <button @click="fetchUser">
        Fetch user
      </button>
      <pre>
        {{ user ?? 'Not logged in' }}
      </pre>
    </div>
    <div>
      Nuxt module playground
      <button @click="signIn('admin@example.com', 'Passw0rd!')">
        Sign in
      </button>
      <button @click="signOut">
        Sign out
      </button>
      <button @click="refreshTokens">
        Refresh Tokens
      </button>
    </div>
    <div>
      Posts
      <ul>
        <li v-for="post in posts" :key="post.id">
          <h2>{{ post.title }}</h2>
          <sub>{{ post.slug }}</sub>
          <p>{{ post.content }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchUser, signIn, signOut, refreshTokens } = useDirectusAuth()
const user = useDirectusUser()

interface Global {
  title: string
  description: string
}

interface Posts {
  id: string
  title: string
  slug: string
  content: string
}

interface Schema {
  global: Global
  posts: Posts[]
}

const { getItems, getSingletonItem } = useDirectusItems<Schema>()

const global = await getSingletonItem('global')
const posts = await getItems('posts')
</script>
