---
title: "useDirectusItems"
description: "Learn how to use Nuxt & Directus"
position: 11
category: "Usage"
---

> Check out the Directus [Items](https://docs.directus.io/reference/items/) documentation.

### `getItems`

Search for items in a specific collection, [`global search querys`](https://docs.directus.io/reference/query/) can be used

- **Arguments:**

  - data: [`DirectusItemRequest`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L26)

- **Returns:** `Array`

```vue [pages/articles.vue]
<script setup lang="ts">
const { getItems } = useDirectusItems();
const router = useRouter();

const fetchArticles = async () => {
  try {
    var filters = { content: "testcontent", title: "Test1" };
    var items = await getItems({
      collection: "News",
      params: {
        filter: filters,
      },
    });
  } catch (e) {}
};
</script>
```

### `getItemById`

Search for an item by id in a specific collection

- **Arguments:**

  - data: [`DirectusItemRequest`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L26)

- **Returns:** `Object`

```vue [pages/article.vue]
<script setup lang="ts">
const { getItemById } = useDirectusItems();

const fetchArticle = async () => {
  try {
    var item = await getItemById({
      collection: "News",
      id: "4776864a-75ee-4746-9ef4-bd5c2e38cc66",
    });
  } catch (e) {}
};
</script>
```

### `createItems`

Create one or multiple items in a specific collection

_Items don't have a pre-defined schema. The format depends completely on how you configured your collections and fields in Directus._

- **Arguments:**

  - data: [`DirectusItemCreation`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#32)

- **Returns:** `Empty body`

```vue [pages/articles.vue]
<script setup lang="ts">
const { createItems } = useDirectusItems();

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
</script>
```

### `deleteItems`

Delete one or multiple items in a specific collection

- **Arguments:**

  - data: [`DirectusItemDeletion`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#37)

- **Returns:** `Empty body`

```vue [pages/articles.vue]
<script setup lang="ts">
const { deleteItems } = useDirectusItems();

const deleteArticles = async () => {
  try {
    var items = ["15", "20", "22"];
    await deleteItems({ collection: "News", items });
  } catch (e) {}
};
</script>
```
