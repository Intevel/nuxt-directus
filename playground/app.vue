<template>
  <div>
    Nuxt module playground!
    <button style="margin-top: 25px" @click="onSubmit">
      Login with Directus
    </button>
    <button style="margin-top: 25px" @click="fetchArticles">
      Fetch Articles
    </button>
    <button style="margin-top: 25px" @click="fetchArticle">
      Fetch Article
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
    <button style="margin-top: 25px" @click="fetchCollection">
      Fetch Collection
    </button>
    <button style="margin-top: 25px" @click="logUser">
      Log User
    </button>
    <div style="margin-top: 25px">
      <img :src="img(fileId, { width: 300, height: 300, fit: 'cover' })" alt="square thumbnail">
      <img :src="img(fileId, { width: 300, format: 'webp' })" alt="webp">
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable no-console */

interface News {
  id?: string | number;
  title: string;
  content: string;
  status: string;
}

// TODO: I cannot reach the backend at this moment, so I cannot check what Collections exist in there
interface Books {
  id?: string | number;
  title: string;
  pages: number;
}

type Collections = {
  news: News;
  books: Books;
};

type DirectusCollections = {
  directus_fields: {
    id?: number;
    collection?: string;
    field?: string;
  };
};

type AllCollections = Collections & DirectusCollections;

const { login } = useDirectusAuth()
const user = useDirectusUser()
const { getItems, getItemById, createItems, deleteItems } = useDirectusItems<AllCollections>()
const { getCollections, getCollection } = useDirectusCollections<AllCollections>()
const router = useRouter()
const fileId = 'da8e7c7b-d115-40cd-a88c-d4aedd7eea6c'
const { getThumbnail: img } = useDirectusFiles()

const onSubmit = async () => {
  try {
    await login({
      email: 'testuser@gmail.com',
      password: 'test123'
    })

    router.push('/authenticated-page')
  } catch (e) { }
}

const logUser = () => {
  try {
    console.log(user)
    console.log(user.value.email)
  } catch (e) { }
}

const createArticles = async () => {
  try {
    await createItems({
      collection: 'news',
      items: [
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
    })
  } catch (e) { }
}

const deleteArticles = async () => {
  try {
    await deleteItems({
      collection: 'news',
      items: [
        'c7480ee3-4be1-4562-87af-9dfa692a56bb',
        'a2f6b5e7-b151-42a1-9d9b-b6ccf1ae87ff'
      ]
    })
  } catch (e) { }
}

const fetchArticles = async () => {
  try {
    const items = await getItems({
      collection: 'news',
      params: {
        filter: {
          content: 'yyeeet',
          title: 'Test1'
        },
        meta: '*'
      }
    })
    console.log(items)

    router.push('/d')
  } catch (e) { }
}

const fetchArticle = async () => {
  try {
    const item = await getItemById({
      collection: 'news',
      id: '4776864a-75ee-4746-9ef4-bd5c2e38cc66'
    })
    console.log(item)

    router.push('/d')
  } catch (e) { }
}

const fetchCollections = async () => {
  try {
    const collections = await getCollections()
    console.log(collections)

    router.push('/d')
  } catch (e) { }
}

const fetchCollection = async () => {
  try {
    const collection = await getCollection({ collection: 'news' })
    console.log(collection)

    router.push('/d')
  } catch (e) { }
}
</script>
