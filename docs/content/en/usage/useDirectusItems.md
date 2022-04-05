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

- **Returns:** `Array<T>`

```vue [pages/articles.vue]
<script setup lang="ts">
const { getItems } = useDirectusItems();
const router = useRouter();

interface Article {
  id?: string | number;
  title: string;
  content: string;
  status: string;
}

const fetchArticles = async () => {
  try {
    var filters = { content: "testcontent", title: "Test1" };
    var items = await getItems<Article>({
      collection: "News",
      params: {
        filter: filters,
      },
    });
  } catch (e) {}
};
</script>
```

### `getSingletonItem`

Get object from Singleton marked collection

- **Arguments:**

  - data: [`DirectusItemRequest`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L26)

- **Returns:** `Object<T>`

```vue [pages/imprint.vue]
<script setup lang="ts">
const { getSingletonItem } = useDirectusItems();

interface Imprint {
  id?: string | number;
  content: string;
}

const fetchArticle: Article[] = async () => {
  try {
    var item = await getSingletonItem<Imprint>({
      collection: "Imprint",
    });
  } catch (e) {}
};
</script>
```

### `getItemById`

Search for an item by id in a specific collection

- **Arguments:**

  - data: [`DirectusItemRequest`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L26)

- **Returns:** `Object<T>`

```vue [pages/article.vue]
<script setup lang="ts">
const { getItemById } = useDirectusItems();

interface Article {
  id?: string | number;
  title: string;
  content: string;
  status: string;
}

const fetchArticle: Article = async () => {
  try {
    var item = await getItemById<Article>({
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

- **Returns:** `Array<T>`

```vue [pages/articles.vue]
<script setup lang="ts">
const { createItems } = useDirectusItems();

interface Article {
  id?: string | number;
  title: string;
  content: string;
  status: string;
}

const createArticles: Article[] = async () => {
  try {
    var items: Article[] = [
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
  } catch (e) {}
};
</script>
```

### `deleteItems`

Delete one or multiple items in a specific collection

- **Arguments:**

  - data: [`DirectusItemDeletion`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#42)

- **Returns:** `Empty body`

```vue [pages/articles.vue]
<script setup lang="ts">
const { deleteItems } = useDirectusItems();

const deleteArticles: void = async () => {
  try {
    var items = ["15", "20", "22"];
    await deleteItems({ collection: "News", items });
  } catch (e) {}
};
</script>
```

### `updateItem`

Update item in a specific collection

- **Arguments:**

  - data: [`DirectusItemUpdate`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#37)

- **Returns:** `Array<T>`

```vue [pages/articles.vue]
<script setup lang="ts">
const { updateItem } = useDirectusItems();

interface Article {
  id?: string | number;
  title: string;
  content: string;
  status: string;
}

const updateArticles: Article[] = async () => {
  try {
    var newItem = { title: "This Item was updated" };
    await updateItem<Article>({ collection: "News", id: "itemid", item: newItem });
  } catch (e) {}
};
</script>
```
