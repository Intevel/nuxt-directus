---
title: "useDirectusFiles"
description: "Learn how to use Nuxt & Directus"
position: 11
category: "Usage"
---

> Check out the Directus [Files](https://docs.directus.io/reference/files/) documentation.

### `getFiles`

Search for files, [`global search querys`](https://docs.directus.io/reference/query/) can be used

- **Arguments:**

  - data: [`DirectusFileRequest`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L78)

- **Returns:** `Array<T>`

```vue [pages/files.vue]
<script setup lang="ts">
const { getFiles } = useDirectusFiles();
const router = useRouter();

const fetchFiles = async () => {
  var filter = { content: "testcontent", title: "Test1" };
  var files = await getFiles({
    params: {
      filter,
    },
  });
};
</script>
```

### `getThumbnail`

Generate image url from file id  
Directus will generate the image with the given [`parameters`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L61) on the server and deliver you an optimized image

- **Arguments:**

  - fileId: `String`
  - options: [`DirectusThumbnailOptions`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L61)

- **Returns:** `String`

```vue
<template>
  <div>
    <img :src="img(fileId)" alt="original" />
    <img
      :src="img(fileId, { width: 300, height: 300, fit: 'cover' })"
      alt="square"
    />
    <img :src="img(fileId, { width: 300, format: 'webp' })" alt="webp" />
  </div>
</template>

<script setup lang="ts">
const fileId = "5e47b7e6-fd78-400c-821f-0dca4a176f4f";
const { getThumbnail: img } = useDirectusFiles();
</script>
```
