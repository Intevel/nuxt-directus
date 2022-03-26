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
		url: 'mydirectusurl'
	}
};
```

You can also set Enviroment variable `DIRECTUS_URL` to override `url`
