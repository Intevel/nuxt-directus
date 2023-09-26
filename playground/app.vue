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
        <div v-if="!postId && singlePostPending">
          No post selected.
        </div>
        <div v-else-if="singlePostPending">
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
      <div>
        <h1>New Post</h1>
        <div>
          <input v-model="postNewData.title" placeholder="Post title">
          <input v-model="postNewData.slug" placeholder="Post slug">
          <input v-model="postNewData.content" placeholder="Post content">
          <button @click="async () => await createItem('posts', postNewData)">
            Create Post
          </button>
        </div>
      </div>
      <div>
        <h1>Update Post</h1>
        <div>
          <input v-model="postIdUpdate" placeholder="Post ID">
          <input v-model="postUpdateData.title" placeholder="Post title">
          <input v-model="postUpdateData.slug" placeholder="Post slug">
          <input v-model="postUpdateData.content" placeholder="Post content">
          <button @click="updateItem('posts', postIdUpdate, postUpdateData)">
            Update Post
          </button>
        </div>
      </div>
      <div>
        <h1>Delete Post</h1>
        <input v-model="postIdDelete" placeholder="Post ID">
        <button @click="deleteItem('posts', postIdDelete)">
          Delete Post
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { login, logout, refreshTokens, fetchUser } = useDirectusAuth()
const { user } = useDirectusUser()

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

const { createItem, readItems, readItem, readSingleton, updateItem, deleteItem } = useDirectusItems<Schema>()

const { data: global, error: errorGlobal } = await readSingleton('global')
const { data: posts, pending: pendingPosts, refresh: refreshPosts } = await readItems('posts', {
  query: {
    fields: ['title', 'id', 'content']
  },
  params: {
    watch: [user]
  }
})

onMounted(() => {
  refreshPosts()
})

const postId = ref<Posts['id']>('')
const { data: singlePost, pending: singlePostPending, error: singlePostError } = await readItem('posts', postId, {params: {immediate: false, watch: [postId]}})

const postNewData = ref<Partial<Posts>>({
  title: '',
  slug: '',
  content: ''
})

const postIdUpdate = ref<Posts['id']>('')
const postUpdateData = ref<Partial<Posts>>({
  title: '',
  slug: '',
  content: ''
})

const postIdDelete = ref<Posts['id']>('')
</script>
