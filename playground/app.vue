<template>
  <div>
    <div v-if="!pendingPosts && !!global">
      <h1>{{ global.title }}</h1>
      <p>{{ global.description }}</p>
    </div>
    <hr>
    <div>
      Nuxt module playground
      <button @click="login('admin@example.com', 'Passw0rd!')">
        Sign in
      </button>
      <button @click="logout">
        Sign out
      </button>
      <button @click="refreshTokens">
        Refresh Tokens
      </button>
      <button @click="fetchUser">
        Refresh User
      </button>
    </div>
    <div>
      <pre>
        <details v-if="user">
          <summary>Show user data</summary>
          {{ user }}
        </details>
        <div v-else>Not logged in</div>
      </pre>
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
        <h1>Single Post</h1>
        <input v-model="postId" placeholder="Post ID">
        <button @click="searchPost()">
          Search post
        </button>
        <div v-if="singlePostPending">
          Searching post...
        </div>
        <div v-else-if="singlePostError">
          {{ singlePostError }}
        </div>
        <div v-else-if="singlePost">
          {{ singlePost }}
        </div>
        <div v-else>
          No post found
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { login, logout, refreshTokens, fetchUser } = useDirectusAuth()
const user = useDirectusUser()

interface Global {
  title: string
  description: string
}

interface Posts {
  id: string | number
  title: string
  slug: string
  content: string
}

interface Schema {
  global: Global
  posts: Posts[]
}

const { getItems, getItemById, getSingletonItem } = useDirectusItems<Schema>()

const { data: global } = await getSingletonItem('global')
const { data: posts, pending: pendingPosts, refresh: refreshPosts } = await getItems('posts')

const postId = ref<Posts['id']>('')
const { data: singlePost, pending: singlePostPending, error: singlePostError, refresh: searchPost } = await getItemById('posts', postId)
</script>
