<template>
  <div>
    <div v-if="!!global">
      <h1>{{ global.title }}</h1>
      <p>{{ global.description }}</p>
    </div>
    <hr>
    <div>
      <div v-if="user">
        <NuxtLink to="/restricted">
          Restricted Area
        </NuxtLink>,
        <button @click="logout()">
          Logout
        </button>
      </div>
      <div v-else>
        <NuxtLink to="/restricted">
          Restricted Area
        </NuxtLink>,
        <button @click="navigateTo('/login')">
          Login
        </button>
      </div>
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
            <br>
            <label for="newPostStatus">Status</label>
            <select id="newPostStatus" v-model="postNewData.status">
              <option value="draft">
                Draft
              </option>
              <option value="published">
                Published
              </option>
              <option value="archived">
                Archived
              </option>
            </select>
            <button @click="createContent()">
              Create Post
            </button>
          </div>
        </div>
        <div>
          <h3>Update or Delete a Post</h3>
          <div>
            <div v-for="post in posts" :key="post.id">
              <input :id="`${post.id}`" v-model="postId" type="radio" :value="post.id">
              <label :for="`${post.id}`">{{ post.title }}</label>
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
import { ref } from 'vue'
import { navigateTo, useDirectusAuth, useDirectusUsers, useDirectusItems } from '#imports'
import type { Post, Schema } from '../types'

const { logout } = useDirectusAuth()
const { user } = useDirectusUsers()

const { createItem, readAsyncItems, readAsyncSingleton, updateItem, deleteItem } = useDirectusItems<Schema>()

const { data: global } = await readAsyncSingleton('global')
const { data: posts, refresh: refreshPosts, error: postsError } = await readAsyncItems('posts', {
  query: {
    fields: ['title', 'id', 'slug', 'content', 'status']
  },
  watch: [user]
})
if (!posts.value && postsError.value) {
  console.error('Posts fetch error:', postsError.value)
}

const postNewData = ref<Partial<Post>>({
  status: 'draft'
})

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
