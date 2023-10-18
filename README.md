[![nuxt-directus](https://raw.githubusercontent.com/Intevel/nuxt-directus/main/docs/public/cover.png)](https://nuxt-directus.site/)

# Nuxt Directus _(deprecated)_

> **DEPRECATED** - Nuxt-Directus is now deprecated. It will no longer receive updates.
I recommend using the new [Directus JavaScript SDK](https://docs.directus.io/guides/sdk/getting-started.html)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Integrate [Directus](https://directus.io/) to your [Nuxt](https://nuxt.com/) application.

- [✨ &nbsp;Release Notes](https://github.com/directus-community/nuxt-directus/releases)
- [📖 &nbsp;Read the documentation](https://nuxt-directus.site/)

## Features

- Nuxt 3 ready
- Handle authentication
- RESTful methods
- TypeScript Support

## Setup

```sh
yarn add nuxt-directus # yarn
npm i nuxt-directus # npm
```

## Basic usage

Add `nuxt-directus` to your Nuxt config:

```javascript
// nuxt.config.ts

export default defineNuxtConfig({
  modules: ["nuxt-directus"],
});
```

## Development

1. Clone this repository
2. Install dependencies using `pnpm install` or `npm install`
3. Run `pnpm dev:prepare` or `npm run dev:prepare`
4. Start development server using `pnpm dev` or `npm run dev`

## License

Copyright (c) 2022 Conner Luka Bachmann
[MIT License](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-directus/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-directus
[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-directus.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-directus
[license-src]: https://img.shields.io/npm/l/nuxt-directus.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-directus
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
