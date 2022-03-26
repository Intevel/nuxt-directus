<template>
  <div>
    Nuxt module playground!
    <button style="margin-top: 25px" @click="onSubmit">
      Login with Directus
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
    <button style="margin-top: 25px" @click="logUser">Log User</button>
  </div>
</template>

<script setup lang="ts">
const { login } = useDirectusAuth();
const user = useDirectusUser();
const { getItems, getItemById, createItems, deleteItems } = useDirectusItems();
const router = useRouter();

const onSubmit = async () => {
  try {
    await login({
      email: "testuser@gmail.com",
      password: "test123",
    });

    router.push("/authenticated-page");
  } catch (e) {}
};

const logUser = async () => {
  try {
    console.log(user);
    console.log(user.email);
  } catch (e) {}
};

const createArticles = async () => {
  try {
    var items = [
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
    await createItems({ collection: "News", items });
  } catch (e) {}
};

const deleteArticles = async () => {
  try {
    var items = [
      "c7480ee3-4be1-4562-87af-9dfa692a56bb",
      "a2f6b5e7-b151-42a1-9d9b-b6ccf1ae87ff",
    ];
    await deleteItems({ collection: "News", items });
  } catch (e) {}
};

const fetchArticles = async () => {
  try {
    var filters = { content: "yyeeet", title: "Test1" };
    var items = await getItemById({
      collection: "News",
      id: "4776864a-75ee-4746-9ef4-bd5c2e38cc66",
    });
    console.log(items);

    router.push("/d");
  } catch (e) {}
};
</script>
