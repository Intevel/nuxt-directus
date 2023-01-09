---
title: "Options"
description: "Discover the available options to configure Directus in Nuxt"
position: 4
category: "Getting started"
---

### `url`

URL of the Directus server.

```js{}[nuxt.config.js]
export default {
	directus: {
		url: 'https://your-directus-server.app/'
	}
};
```

You can also set Environment variable `DIRECTUS_URL` to override `url`

### `token`

Auth option for static tokens, *user token after login has priority*

```js{}[nuxt.config.js]
export default {
	directus: {
		token: 'sDhjk!.Ddj........'
	}
};
```

### Rendering

By default, `nuxt-directus` will fetch data either in the **client** (`ssr: false`) or on **server** (`ssr: true`) when
using the `nuxt build` command.

If you want to render a **static page**, you need to ensure to wrap the `nuxt-directus` calls into `useAsyncData` using
the `nuxt generate` command and set the property `ssr: true`.

````js{}[nuxt.config.js]
export default {   
  ssr: true
}
````

```vue [your-page.vue]

<script setup lang="ts">
const {getItems} = useDirectusItems();

interface Article {
  id?: string | number;
  title: string;
  content: string;
}

const {data, pending, error, refresh} = await useAsyncData('posts', () => {
  return getItems<Article>({
    collection: "blog"
  })
})
</script>
````

This ensures that the data fetching happens during build time.



> **Hint: statically serving images and other files is currently not possible with nuxt-directus**
