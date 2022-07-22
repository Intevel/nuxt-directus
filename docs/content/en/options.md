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

You can also set Enviroment variable `DIRECTUS_URL` to override `url`

### `token`

Auth option for static tokens, *user token after login has priority*

```js{}[nuxt.config.js]
export default {
	directus: {
		token: 'sDhjk!.Ddj........'
	}
};
```