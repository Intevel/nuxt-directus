---
title: "Setup"
description: ""
position: 2
category: "Getting started"
---

## Install

Add `nuxt-directus` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add nuxt-directus
```

  </code-block>
  <code-block label="NPM">

```bash
npm install nuxt-directus
```

  </code-block>
</code-group>

Then add it to the `modules` section in your `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
	modules: ["nuxt-directus"],
	directus: {}
};
```

If you have a `runtimeConfig` in your `nuxt.config.js` file then you will need to add the `directus` config object to it:

```js{}[nuxt.config.js]
runtimeConfig: {
  directus: {
    url: "",
  },
}
```

<alert type="success">

That's it! You can now use [Directus](/usage/useDirectusToken) in your Nuxt app ✨

</alert>
