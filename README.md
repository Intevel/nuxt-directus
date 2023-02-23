[![nuxt-directus](https://nuxt-directus.netlify.app/cover.png)](https://nuxt-directus.netlify.app/)

# Nuxt Directus

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![License][license-src]][license-href]

> Directus Module for [Nuxt](https://nuxt.com/)

- [✨ &nbsp;Release Notes](https://github.com/intevel/nuxt-directus/releases)
- [📖 &nbsp;Read the documentation](https://nuxt-directus.netlify.app/)

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
// nuxt.config.js

export default {
  modules: ["nuxt-directus"],
};
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

[npm-version-src]: https://img.shields.io/npm/v/nuxt-directus/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-directus
[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-directus.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-directus
[github-actions-ci-src]: https://github.com/intevel/nuxt-directus/actions/workflows/ci.yml/badge.svg
[github-actions-ci-href]: https://github.com/intevel/nuxt-directus/actions?query=workflow%3Aci
[license-src]: https://img.shields.io/npm/l/nuxt-directus.svg
[license-href]: https://npmjs.com/package/nuxt-directus
