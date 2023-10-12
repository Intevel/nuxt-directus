<template>
  <div class="dashboard">
    <div class="welcome">
      <div v-if="user.value">
        Welcome to the dashboard, {{ user.value.first_name ? user.value.first_name : user.value.email }}!
      </div>
      <div v-else>
        Welcome to the dashboard!
      </div>
      <button class="action-button" @click="logOutMethod">
        Logout
      </button>
    </div>

    <div class="module-playground">
      Nuxt module playground!
      <button class="action-button" @click="fetchSingleArticle">Fetch Single Article</button>
      <button class="action-button" @click="fetchArticles">Fetch Articles</button>
      <button class="action-button" @click="createArticles">Create Articles</button>
      <button class="action-button" @click="deleteArticles">Delete Articles</button>
      <button class="action-button" @click="fetchCollections">Fetch Collections</button>
      <button class="action-button" @click="logUser">Log User</button>
    </div>

    <div class="user-tests">
      <!-- User Composable Tests -->
      <button class="action-button" :disabled="(createdUserId !== '')" @click="createUser">Create User</button>
      <button class="action-button" :disabled="!(createdUserId !== '')" @click="updateCreatedUser">Update User</button>
      <button class="action-button" :disabled="!(createdUserId !== '')" @click="fetchSingleUser">Fetch Single User</button>
      <button class="action-button" :disabled="!(createdUserId !== '')" @click="deleteUser">Delete User</button>
      <button class="action-button" @click="fetchAllUsers">Fetch All Users</button>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { DirectusUserRequest, DirectusUserUpdate } from '../src/runtime/types'
import { useDirectusUser } from '../src/runtime/composables/useDirectusUser'
import { useDirectusUsers } from '../src/runtime/composables/useDirectusUsers'
import { useDirectusAuth } from '../src/runtime/composables/useDirectusAuth'
import { useDirectusItems } from '../src/runtime/composables/useDirectusItems'
import { useDirectusCollections } from '../src/runtime/composables/useDirectusCollections'
import { ref } from 'vue';
import { useRouter } from 'nuxt/app';

definePageMeta({
  middleware: 'auth'
})

const router = useRouter();

const { logout } = useDirectusAuth();

const logOutMethod = async () => {
    console.log("Logout clicked");
    await logout();
};

const user = useDirectusUser();
const { getItems, getItemById, createItems, deleteItems } = useDirectusItems();
const { getCollections } = useDirectusCollections();
const { 
  createUsers,
  deleteUsers,
  getUserById,
  getUsers,
  updateUser
} = useDirectusUsers();

interface Article {
    id?: string | number;
    title: string;
    content: string;
    status: string;
}

let articleIds: (string | number | undefined)[] = [];
   
  const logUser = async () => {
    try {
      console.log(user)
      console.log(user.value.email)
    } catch (e) {}
  }
  
  const createArticles = async () => {
    try {
      const items: Article[] = [
        {
          title: 'testitem',
          content: 'testcontent',
          status: 'published'
        },
        {
          title: 'testitem2',
          content: 'testcontent2',
          status: 'published'
        }
      ]
      const articles = await createItems<Article>({ collection: 'Articles', items })
      articleIds = articles.map(article => article.id)
    } catch (e) {}
  }
  
  const deleteArticles = async () => {
    try {
      await deleteItems({ collection: 'Articles', items: articleIds })
    } catch (e) {}
  }
  
  const fetchArticles = async () => {
    try {
      const items = await getItems<Article>({
        collection: 'Articles'
      })
      console.log(items)
  
      router.push('/d')
    } catch (e) {}
  }
  
  const fetchSingleArticle = async () => {
    try {
      const items = await getItemById<Article>({
        collection: 'Articles',
        id: articleIds[0]
      })
      console.log(items)
    } catch (e) {}
  }
  
  const fetchCollections = async () => {
    try {
      const collections = await getCollections()
      console.log(collections)
  
      router.push('/d')
    } catch (e) {}
  }
  
  // User Composable Tests
  
  interface User {
    id?: string | number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    status: string;
  }
  
  const createdUserId = ref('')
  
  const createUser = async () => {
    const userResponse = await createUsers<User>({
      users: [
        {
          email: 'abraham@lincoln.gov',
          password: 'password',
          first_name: 'Abraham',
          last_name: 'Lincoln'
        }
      ]
    })
    console.log(userResponse)
    createdUserId.value = (userResponse as User[])[0].id as string
  }
  
  const updateCreatedUser = async () => {
    const request: DirectusUserUpdate = {
      id: createdUserId.value,
      user: {
        first_name: 'John'
      }
    }
  
    const userResponse = await updateUser<User>(request)
    console.log(userResponse)
  }
  
  const fetchSingleUser = async () => {
    const request: DirectusUserRequest = {
      id: createdUserId.value
    }
  
    const userResponse = await getUserById<User>(request)
    console.log(userResponse)
  }
  
  const deleteUser = async () => {
    try {
      await deleteUsers({ users: [createdUserId.value] })
      createdUserId.value = ''
    } catch (e) { console.error(e) }
  }
  
  const fetchAllUsers = async () => {
    const userResponse = await getUsers<User>()
    console.log(userResponse)
  }
  
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
  }
  
  .welcome {
    margin-bottom: 20px;
  }
  
  .module-playground, .user-tests {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .action-button {
    margin-top: 15px;
    margin-right: 15px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #008CBA;
    color: white;
    cursor: pointer;
  }
  </style>
  