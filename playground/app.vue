<template>
  <div>
    Nuxt module playground!
    <button style="margin-top: 25px" @click="onSubmit">
      Login with Directus
    </button>
    <button style="margin-top: 25px" @click="fetchSingleArticle">
      Fetch Single Article
    </button>
    <button style="margin-top: 25px" @click="fetchArticles">
      Fetch Articles
    </button>
    <button style="margin-top: 25px" @click="createArticles">
      Create Articles
    </button>
    <button style="margin-top: 25px" @click="deleteArticles">
      Delete Articles
    </button>
    <button style="margin-top: 25px" @click="fetchCollections">
      Fetch Collections
    </button>
    <button style="margin-top: 25px" @click="logUser">
      Log User
    </button>

    <div>
      <!-- User Composable Tests -->
      <button :disabled="(createdUserId !== '')" style="margin-top: 25px" @click="createUser">
        Create User
      </button>
      <button :disabled="!(createdUserId !== '')" style="margin-top: 25px" @click="updateCreatedUser">
        Update User
      </button>
      <button :disabled="!(createdUserId !== '')" style="margin-top: 25px" @click="fetchSingleUser">
        Fetch Single User
      </button>
      <button :disabled="!(createdUserId !== '')" style="margin-top: 25px" @click="deleteUser">
        Delete User
      </button>
      <button style="margin-top: 25px" @click="fetchAllUsers">
        Fetch All Users
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DirectusUserRequest, DirectusUserUpdate } from '../src/runtime/types'

const { login } = useDirectusAuth()
const user = useDirectusUser()
const { getItems, getItemById, createItems, deleteItems } = useDirectusItems()
const { getCollections } = useDirectusCollections()
const router = useRouter()
const { token } = useDirectusToken()

const {
  createUsers,
  deleteUsers,
  getUserById,
  getUsers,
  updateUser
} = useDirectusUsers()

interface Article {
  id?: string | number;
  title: string;
  content: string;
  status: string;
}

let articleIds: (string | number | undefined)[] = []

const onSubmit = async () => {
  try {
    await login({
      email: 'admin@example.com',
      password: 'd1r3ctu5'
    })

    router.push('/authenticated-page')
  } catch (e) {
    console.log(e)
  }
}

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
