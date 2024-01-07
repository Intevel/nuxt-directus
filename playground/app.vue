<template>
  <div>
    <div v-if="!pendingPosts && !!global">
      <h1>{{ global.title }}</h1>
      <p>{{ global.description }}</p>
    </div>
    <hr>
    <div>
      <div v-if="!user">
        User Login
        <form @submit.prevent>
          <input v-model="credentials.email" type="email" placeholder="Email">
          <input v-model="credentials.password" type="password" placeholder="Password">
          <button @click="login(credentials.email, credentials.password)">
            Sign in
          </button>
        </form>
      </div>
      <span v-if="user">
        <button @click="logout()">
          Sign out
        </button>
        <button @click="refreshTokens()">
          Refresh Tokens
        </button>
      </span>
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
        <ul style="width: fit-content;">
          <li v-for="post in posts" :key="post.id">
            <div>
              <span
                style="width: 100%; display: inline-flex; justify-content: space-between; gap: 1rem; align-items: center;"
              >
                <h3>{{ post.title }}</h3>
                <sub>{{ post.status }}</sub>
              </span>
              <div>
                <sub>{{ post.slug }} | {{ post.id }}</sub>
                <p>{{ post.content }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="user" style="display: inline-flex; gap: 4rem;">
        <div>
          <h3>New Post</h3>
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
          <h3>Update or Delete a Post</h3>
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
  </div>
</template>

<script setup lang="ts">
const { login, logout, refreshTokens } = useDirectusAuth()
const { user } = useDirectusUsers()

const credentials = ref({ email: '', password: '' })

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

const { createItem, readItems, readSingleton, updateItem, deleteItem } = useDirectusItems<Schema>({ useStaticToken: false })

const { data: global, error: globalError } = await readSingleton('global')
if (!global.value && globalError.value) {
  console.error('Global fetch error:', globalError.value)
}
const { data: posts, pending: pendingPosts, refresh: refreshPosts, error: postsError } = await readItems('posts', {
  query: {
    fields: ['title', 'id', 'slug', 'content', 'status']
  },
  params: {
    watch: [user]
  }
})
if (!posts.value && postsError.value) {
  console.error('Posts fetch error:', postsError.value)
}

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
