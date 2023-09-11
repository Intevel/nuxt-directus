<template>
  <div>
    <div v-if="!pending && !!global">
      <h1>{{ global.title }}</h1>
      <p>{{ global.description }}</p>
    </div>
    <hr>
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
    <hr>
    <div>
      <h1>Posts</h1>
      <button @click="refreshPosts()">
        Refresh posts
      </button>
      <div>
        List Posts
        <ul>
          <li v-for="post in posts" :key="post.id">
            <h2>{{ post.title }}</h2>
            <sub>{{ post.id }}</sub>
            <p>{{ post.content }}</p>
          </li>
        </ul>
      </div>
      <div>
        Single Post by ID:
        <span>
          <input type="text" v-model="postId">
          <button @click="searchPost()">
            Refresh posts
          </button>
        </span>
        <ul>
          <li v-if="singlePost && !Array.isArray(singlePost)">
            <h2>{{ singlePost.title }}</h2>
            <sub>{{ singlePost.id }}</sub>
            <p>{{ singlePost.content }}</p>
          </li>
          <span v-else>No posts available</span>
        </ul>
      </div>
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

const { getItemById, getItems, getSingletonItem } = useDirectusItems<Schema>()

const { data: global } = await getSingletonItem('global')
const { data: posts, pending, refresh: refreshPosts } = await getItems('posts')

const postId = ref<string | number>('4002c62f-1787-4420-9805-9f1816276032')
const { data: singlePost, error, execute: searchPost } = await getItemById('posts', postId.value)
</script>
