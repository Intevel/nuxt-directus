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
      <button @click="logout()">
        Sign out
      </button>
      <button @click="refreshTokens()">
        Refresh Tokens
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
            <h3>{{ post.title }}</h3>
            <sub>{{ post.slug }} | {{ post.id }}</sub>
            <p>{{ post.content }}</p>
          </li>
        </ul>
      </div>
      <div>
        <h2>New Post</h2>
        <div>
          <input v-model="postNewData.title" type="text" placeholder="Post title">
          <input v-model="postNewData.slug" type="text" placeholder="Post slug">
          <br>
          <textarea v-model="postNewData.content" placeholder="Post content" />
          <button @click="createContent()">
            Create Post
          </button>
        </div>
      </div>
      <div>
        <h2>Update or Delete a Post</h2>
        <div>
          <div v-for="post in posts" :key="post.id">
            <input :id="post.id.toString" v-model="postId" type="radio" :value="post.id">
            <label for="post.id">{{ post.title }}</label>
          </div>
          <input v-model="postUpdateData.title" type="text" placeholder="Post title">
          <input v-model="postUpdateData.slug" type="text" placeholder="Post slug">
          <br>
          <textarea v-model="postUpdateData.content" placeholder="Post content" />
          <button @click="updateContent()">
            Update Post
          </button>
          <button @click="deleteItem('posts', postId).then(()=>refreshPosts())">
            Delete Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { login, logout, refreshTokens } = useDirectusAuth()
const { user } = useDirectusUsers()

interface Global {
  title: string
  description: string
}

interface Post {
  id: string | number
  title: string
  slug: string
  content: string
  status: string
}

interface Schema {
  global: Global
  posts: Post[]
}

const { createItem, readItems, readSingleton, updateItem, deleteItem } = useDirectusItems<Schema>()

const { data: global } = await readSingleton('global')
const { data: posts, pending: pendingPosts, refresh: refreshPosts } = await readItems('posts', {
  query: {
    fields: ['title', 'id', 'slug', 'content']
  },
  params: {
    watch: [user]
  }
})

const postNewData = ref<Partial<Post>>({})

async function createContent () {
  await createItem('posts', postNewData.value)
  refreshPosts()
}

const postId = ref<Post['id']>(posts.value?.[0].id || '')
const postUpdateData = ref<Partial<Post>>({})

async function updateContent () {
  await updateItem('posts', postId.value, postUpdateData.value)
  refreshPosts()
}
</script>
