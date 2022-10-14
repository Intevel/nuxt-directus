---
title: "useDirectusItems"
description: "Learn how to use Nuxt & Directus"
position: 11
category: "Usage"
---

> Check out the Directus [Items](https://docs.directus.io/reference/items/) documentation.

In all the examples below, the following types are used:
```ts
interface Article {
  id?: string | number;
  title: string;
  content: string;
  status: string;
}

interface Imprint {
  id?: string | number;
  content: string;
}

interface Collections {
  news: Article;
  imprint: Imprint;
}
```

### `getItems`

Search for items in a specific collection, [`global search querys`](https://docs.directus.io/reference/query/) can be used

- **Arguments:**
  - collection [`keyof Collections`]
  - data: [`DirectusItemRequest`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L92)

- **Returns:** `Array`

```vue [pages/articles.vue]
<script setup lang="ts">
const { getItems } = useDirectusItems<Collections>();
const router = useRouter();

const fetchArticles = async () => {
  try {
    const items = await getItems("news", {
      params: {
        filter: {
          content: "testcontent",
          title: "Test1"
        },
      },
    });
  } catch (e) {}
};
</script>
```

### `getSingletonItem`

Get object from Singleton marked collection

- **Arguments:**
  - collection [`keyof Collections`]
  - data: [`DirectusItemRequest`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L92)

- **Returns:** `Object`

```vue [pages/imprint.vue]
<script setup lang="ts">
const { getSingletonItem } = useDirectusItems<Collections>();

const fetchImprint = async () => {
  try {
    const item = await getSingletonItem("imprint");
  } catch (e) {}
};
</script>
```

### `getItemById`

Search for an item by id in a specific collection

- **Arguments:**
  - collection [`keyof Collections`]
  - data: [`DirectusItemRequest`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L92)

- **Returns:** `Object`

```vue [pages/article.vue]
<script setup lang="ts">
const { getItemById } = useDirectusItems<Collections>();

const fetchArticle = async () => {
  try {
    const item = await getItemById("news", {
      id: "4776864a-75ee-4746-9ef4-bd5c2e38cc66"
    });
  } catch (e) {}
};
</script>
```

### `createItems`

Create one or multiple items in a specific collection

_Items don't have a pre-defined schema. The format depends completely on how you configured your collections and fields in Directus._

- **Arguments:**
  - collection [`keyof Collections`]
  - data: [`DirectusItemCreation`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#105)

- **Returns:** `Array`

```vue [pages/articles.vue]
<script setup lang="ts">
const { createItems } = useDirectusItems<Collections>();

const createArticles = async () => {
  try {
    await createItems("news", {
      items: [
        {
          title: "testitem",
          content: "testcontent",
          status: "published"
        },
        {
          title: "testitem2",
          content: "testcontent2",
          status: "published"
        }
      ]
    });
  } catch (e) {}
};
</script>
```

### `deleteItems`

Delete one or multiple items in a specific collection

- **Arguments:**
  - collection [`keyof Collections`]
  - data: [`DirectusItemDeletion`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#118)

- **Returns:** `void`

```vue [pages/articles.vue]
<script setup lang="ts">
const { deleteItems } = useDirectusItems<Collections>();

const deleteArticles = async () => {
  try {
    await deleteItems("news", {
      items: ["15", "20", "22"]
    });
  } catch (e) {}
};
</script>
```

### `updateItem`

Update item in a specific collection

- **Arguments:**
  - collection [`keyof Collections`]
  - data: [`DirectusItemUpdate`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#111)

- **Returns:** `Array`

```vue [pages/articles.vue]
<script setup lang="ts">
const { updateItem } = useDirectusItems<Collections>();

const updateArticles = async () => {
  try {
    await updateItem("news", {
      id: "itemid",
      item: {
        title: "This Item was updated"
      },
    });
  } catch (e) {}
};
</script>
```
