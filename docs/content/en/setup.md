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

Then add it to the `buildModules` section in your `nuxt.config.js`:

```js{}[nuxt.config.js]
export default {
	buildModules: ["nuxt-directus"],
	directus: {}
};
```

<alert type="success">

That's it! You can now use [Directus](/usage/useDirectusToken) in your Nuxt app ✨

</alert>
