---
title: "useDirectusCollections"
description: "Learn how to use Nuxt & Directus"
position: 14
category: "Usage"
---

> Check out the Directus [Collections](https://docs.directus.io/reference/collections/) documentation.

### `getCollections`

List all collections.

- **Arguments:**

  - None

- **Returns:** `Array<T>`

```vue [pages/collections.vue]
<script setup lang="ts">
const { getCollections } = useDirectusCollections();
const router = useRouter();

const fetchCollections = async () => {
  const collections = await getCollections();
};
</script>
```

### `getCollection`

Retrieve a specific collection by [`name`](https://docs.directus.io/reference/system/collections/#retrieve-a-collection)

- **Arguments:**

  - data: [`DirectusCollectionRequest`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L95)

- **Returns:** `<T>`

```vue [pages/collections.vue]
<script setup lang="ts">
const { getCollections } = useDirectusCollections();
const router = useRouter();

const fetchCollection = async () => {
  const collectionParams = { collection: "Page" };
  const collection = await getCollections(collectionParams);
};
</script>
```

### `createCollection`

Create a new collection.

- **Arguments:**

  - data: [`DirectusCollectionCreation`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#122)

- **Returns:** `<T>`

```vue [pages/collection.vue]
<script setup lang="ts">
const { createCollection } = useDirectusCollections();

const createCollection = async () => {
  try {
    await createCollection({ 
      collection: "News", 
      meta: {
        icon: 'article'
      } 
  });
  } catch (e) {}
};
</script>
```

### `deleteCollection`

Delete a specific collection

- **Arguments:**

  - data: [`DirectusCollectionRequest`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#95)

- **Returns:** `Empty body`

```vue [pages/collection.vue]
<script setup lang="ts">
const { deleteCollection } = useDirectusCollections();

const deleteArticles: void = async () => {
  try {
    await deleteCollection({ collection: "Articles" });
  } catch (e) {}
};
</script>
```

### `updateCollection`

Update collection metadata. _Note: only meta data is updatable._

- **Arguments:**

  - data: [`DirectusCollectionUpdate`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#131)

- **Returns:** `<T>`

```vue [pages/collection.vue]
<script setup lang="ts">
const { updateCollection } = useDirectusCollections();

const updateCollection: Collection = async () => {
  try {
    await updateCollection<Collection>({ 
      collection: "News", 
      meta: {
        icon: 'page'
      } 
    });
  } catch (e) {}
};
</script>
```
