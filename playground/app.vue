<template>
  <div>
    Nuxt module playground!
    <button style="margin-top: 25px" @click="onSubmit">Login with Directus</button>
    <button style="margin-top: 25px" @click="fetchArticles">Fetch Articles</button>
    <button style="margin-top: 25px" @click="createArticles">Create Articles</button>
    <button style="margin-top: 25px" @click="deleteArticles">Delete Articles</button>
    <button style="margin-top: 25px" @click="logUser">Log User</button>
    <div style="margin-top: 25px">
      <img :src="img(fileId, { width: 300, height: 300, fit: 'cover' })" alt="square thumbnail" />
      <img :src="img(fileId, { width: 300, format: 'webp' })" alt="webp" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { login } = useDirectusAuth();
const user = useDirectusUser();
const { getItems, getItemById, createItems, deleteItems } = useDirectusItems();
const router = useRouter();
const fileId = 'da8e7c7b-d115-40cd-a88c-d4aedd7eea6c'
const { getThumbnail: img } = useDirectusFiles();

interface Article {
  id?: string | number;
  title: string;
  content: string;
  status: string;
}

const onSubmit = async () => {
  try {
    await login({
      email: "testuser@gmail.com",
      password: "test123",
    });

    router.push("/authenticated-page");
  } catch (e) { }
};

const logUser = async () => {
  try {
    console.log(user);
    console.log(user.value.email);
  } catch (e) { }
};

const createArticles = async () => {
  try {
    const items: Article[] = [
      {
        title: "testitem",
        content: "testcontent",
        status: "published",
      },
      {
        title: "testitem2",
        content: "testcontent2",
        status: "published",
      },
    ];
    await createItems<Article>({ collection: "News", items });
  } catch (e) { }
};

const deleteArticles = async () => {
  try {
    var items = [
      "c7480ee3-4be1-4562-87af-9dfa692a56bb",
      "a2f6b5e7-b151-42a1-9d9b-b6ccf1ae87ff",
    ];
    await deleteItems({ collection: "News", items });
  } catch (e) { }
};

const fetchArticles = async () => {
  try {
    const filters = { content: "yyeeet", title: "Test1" };
    const items = await getItemById<Article>({
      collection: "News",
      id: "4776864a-75ee-4746-9ef4-bd5c2e38cc66",
    });
    console.log(items);

    router.push("/d");
  } catch (e) { }
};
</script>
