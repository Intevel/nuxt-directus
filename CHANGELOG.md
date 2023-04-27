# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## v5.2.1


### 🩹 Fixes

  - UseDirectusToken.ts #140 (#140)

### ❤️  Contributors

- Casualmatt <matteo@rezzin.ch>

## v5.2.0


### 🚀 Enhancements

  - Make auth cookie names configurable (6193e2e)
  - Integrated directus admin dashboard to devtools (#138)

### 🩹 Fixes

  - Missing type & incorrect usage (bf04ac3)
  - Linting (21f542d)
  - Return response on Errors, fixed linting (ac5fd4e)

### 📖 Documentation

  - Add new documentation (#134)

### ❤️  Contributors

- Conner Bachmann ([@Intevel](http://github.com/Intevel))
- Conner ([@Intevel](http://github.com/Intevel))

## v5.1.3


### 🩹 Fixes

  - Env variable is not used in production (87f1a5e)
  - RefreshTokens is not reset after logout (35024ed)

### ❤️  Contributors

- Conner Bachmann ([@Intevel](http://github.com/Intevel))

## v5.1.2


### 🩹 Fixes

  - Use createError instead of showError (#124)

### ❤️  Contributors

- Matt

## v5.1.1


### 🩹 Fixes

  - Missing import (9d421e6)

### ❤️  Contributors

- Conner Bachmann ([@Intevel](http://github.com/Intevel))

## v5.1.0


### 🚀 Enhancements

  - Changelog (313a5a2)
  - Add types for DirectusUser, DirectusFile and DirectusFolders (#113)
  - Improved error management (#120)
  - Add refresh token support (2898e0e)

### 🩹 Fixes

  - **chore:** Release command (f6e02fb)
  - **chore:** Add push arg to changelogen (5fbda08)

### 🏡 Chore

  - **readme:** Small improvements (#117)
  - **readme:** Update banner (94b6900)

### ❤️  Contributors

- Conner Bachmann ([@Intevel](http://github.com/Intevel))
- Matt 
- Conner ([@Intevel](http://github.com/Intevel))
- Sébastien Chopin <seb@nuxtlabs.com>

## v5.0.0


### 🚀 Enhancements

  - Ability to pass custom image transformation presets and various docs fixes (#93)
  - Rendering section added to options.md (#96)
  - UseDirectusUsers composables to access built-in Users collection (#87)
  - ⚠️  Switch to pnpm, maintenance, removed directus graphql composable (45e2e04)
  - UseStaticToken options (6c17719)
  - Maintenance (a633f3a)

#### ⚠️  Breaking Changes

  - ⚠️  Switch to pnpm, maintenance, removed directus graphql composable (45e2e04)

### ❤️  Contributors

- Conner Bachmann ([@Intevel](http://github.com/Intevel))
- Dochoss <boclifton@gmail.com>
- Marian Klühspies <marianklueh@gmail.com>
- Sandros94

## v4.0.0


### 🚀 Enhancements

  - Ability to pass custom image transformation presets and various docs fixes (#93)
  - Rendering section added to options.md (#96)
  - UseDirectusUsers composables to access built-in Users collection (#87)
  - ⚠️  Switch to pnpm, maintenance, removed directus graphql composable (45e2e04)
  - UseStaticToken options (6c17719)

#### ⚠️  Breaking Changes

  - ⚠️  Switch to pnpm, maintenance, removed directus graphql composable (45e2e04)

### ❤️  Contributors

- Conner Bachmann ([@Intevel](http://github.com/Intevel))
- Dochoss <boclifton@gmail.com>
- Marian Klühspies <marianklueh@gmail.com>
- Sandros94

### [3.2.2](https://github.com/intevel/nuxt-directus/compare/v3.2.1...v3.2.2) (2022-11-17)

### [3.2.1](https://github.com/intevel/nuxt-directus/compare/v3.2.0...v3.2.1) (2022-11-07)


### Bug Fixes

* **auth:** bug on switching accounts ([620d312](https://github.com/intevel/nuxt-directus/commit/620d312e4bd946fcf6cee299bf0430b66a3e6166))

## [3.2.0](https://github.com/intevel/nuxt-directus/compare/v3.1.0...v3.2.0) (2022-11-06)


### Features

* throw err on $fetch ([ae10524](https://github.com/intevel/nuxt-directus/commit/ae10524e6908066769c00fedfd9e9fd0dccaebfb))


### Bug Fixes

* small bugs ([5080140](https://github.com/intevel/nuxt-directus/commit/508014038771340115a5ffa9b024e410174b49c5))

## [3.1.0](https://github.com/intevel/nuxt-directus/compare/v3.0.3...v3.1.0) (2022-10-06)


### Features

* **module:** implemented support for revisions ([5771b0a](https://github.com/intevel/nuxt-directus/commit/5771b0a72c07b4f7b22d5dda3f1e00c9058b9a8c))


### Bug Fixes

* **module:** fixed linting ([5814b41](https://github.com/intevel/nuxt-directus/commit/5814b41b30a4728b3a59e210402b5cba8ed8e4a4))

### [3.0.3](https://github.com/intevel/nuxt-directus/compare/v3.0.2...v3.0.3) (2022-09-05)


### Bug Fixes

* **module:** error 500 when meta isnt defined ([f84f0a9](https://github.com/intevel/nuxt-directus/commit/f84f0a9226103f20f60c5df074c17db0f10e2256))

### [3.0.2](https://github.com/intevel/nuxt-directus/compare/v3.0.1...v3.0.2) (2022-09-04)


### Bug Fixes

* **module:** autoimport hook deprecated ([38eb525](https://github.com/intevel/nuxt-directus/commit/38eb52506ac038b11a2ede23a7c5f8dbf6542aef))

### [3.0.1](https://github.com/intevel/nuxt-directus/compare/v3.0.0...v3.0.1) (2022-09-04)


### Bug Fixes

* **module:** compatibily issue ([641a504](https://github.com/intevel/nuxt-directus/commit/641a504416f6ea43f7ad6dc820d3810d524ef547))

## [3.0.0](https://github.com/intevel/nuxt-directus/compare/v2.4.0...v3.0.0) (2022-08-28)


### ⚠ BREAKING CHANGES

* **main:** getItems doesnt return meta

### Features

* add token to getThumbnail url query params ([361e0a5](https://github.com/intevel/nuxt-directus/commit/361e0a52ba620f1586cea3e6bdb1468a21bc915c))


### Bug Fixes

* **main:** getItems doesnt return meta ([92b268c](https://github.com/intevel/nuxt-directus/commit/92b268cee6272ebcba51a039ab83d189d3230133))

## [2.4.0](https://github.com/intevel/nuxt-directus/compare/v2.3.0...v2.4.0) (2022-07-29)


### Features

* **chore:** added meta to param type ([41d0bf2](https://github.com/intevel/nuxt-directus/commit/41d0bf24ef4b1b04ef8be9f2cb18f01e63fc1fa5))

## [2.3.0](https://github.com/intevel/nuxt-directus/compare/v2.2.0...v2.3.0) (2022-07-25)


### Features

* **chore:** implemented token auth option ([45ad98f](https://github.com/intevel/nuxt-directus/commit/45ad98f3a53f636406cedd3df0a056faa385c1d6))
* **docs:** added new option to docs ([0cfc499](https://github.com/intevel/nuxt-directus/commit/0cfc499a9184cff3e76a45b10f06ff539ae04d30))


### Bug Fixes

* :bug: playground fetch collection now works ([2c4f260](https://github.com/intevel/nuxt-directus/commit/2c4f260ce5e4c0b55e3684b694247b360d6b182e))

## [2.2.0](https://github.com/intevel/nuxt-directus/compare/v2.1.0...v2.2.0) (2022-07-11)


### Features

* **chore:** archive to gitignore ([3a1945a](https://github.com/intevel/nuxt-directus/commit/3a1945abe0d8854fc2889fba4ed098aaa22c35e4))
* **chore:** updated cover & title readme ([af14019](https://github.com/intevel/nuxt-directus/commit/af14019e592527d8e04b923b8cd06cc7cecfba8b))


### Bug Fixes

* **docs:** correct usage of getThumbnail ([eb1b399](https://github.com/intevel/nuxt-directus/commit/eb1b3997cc9f00ab08c3a0c1f681c435d198a0e2))
* throw error instead of type error login ([fa310a2](https://github.com/intevel/nuxt-directus/commit/fa310a249fb343bc56374a0aa82098bdd9db26a2))

## [2.1.0](https://github.com/intevel/nuxt-directus/compare/v2.0.2...v2.1.0) (2022-06-10)


### Features

* **chore:** implement fetch user params ([2fe048a](https://github.com/intevel/nuxt-directus/commit/2fe048af2fb7bc25fc72c383216b99475487236d)), closes [#37](https://github.com/intevel/nuxt-directus/issues/37)
* **chore:** integrate autoFetch user option ([66d3dba](https://github.com/intevel/nuxt-directus/commit/66d3dba04f4d7b5cbe620deab9d71a96586a0bb1)), closes [#37](https://github.com/intevel/nuxt-directus/issues/37)


### Bug Fixes

* stringify "deep" key on get item by id ([1ca45b6](https://github.com/intevel/nuxt-directus/commit/1ca45b67af898250431ecd2d3b547c37f53e8ada))

### [2.0.2](https://github.com/intevel/nuxt-directus/compare/v2.0.1...v2.0.2) (2022-05-27)


### Bug Fixes

* **chore:** missing Directus URL in .env ([02c6bfe](https://github.com/intevel/nuxt-directus/commit/02c6bfeef5fba258a6235626d6c8efa806002d74))
* **chore:** missing Directus URL in .env ([01f25b5](https://github.com/intevel/nuxt-directus/commit/01f25b5a1e5a0ed765711ec8e0792c6e62cda633))

### [2.0.1](https://github.com/intevel/nuxt-directus/compare/v2.0.0...v2.0.1) (2022-05-18)


### Bug Fixes

* **chore:** getItemById returns undefined ([cd8df17](https://github.com/intevel/nuxt-directus/commit/cd8df171fd8f7c88ba6b2fcd9499f5e27c094390)), closes [#35](https://github.com/intevel/nuxt-directus/issues/35)
* **chore:** merge options order ([74c0d02](https://github.com/intevel/nuxt-directus/commit/74c0d02508fe1b36048448d304750279f3a8e6e6))

## [2.0.0](https://github.com/intevel/nuxt-directus/compare/v1.8.0...v2.0.0) (2022-05-06)


### ⚠ BREAKING CHANGES

* **chore:** getItemById return an array of items

### Features

* **docs:** created docs for notifications ([afacf8a](https://github.com/intevel/nuxt-directus/commit/afacf8ae5c3e5cf947371db5b91623f4953538e9))
* **main:** created notification types ([f0d8719](https://github.com/intevel/nuxt-directus/commit/f0d8719a40c5c31000657a2d71f60e057556e0ed))
* **main:** implement notification support ([7d0c5b9](https://github.com/intevel/nuxt-directus/commit/7d0c5b95a4455c95fd1cd2e4d5530c286fd75570))
* **main:** removed error throwing ([7919b63](https://github.com/intevel/nuxt-directus/commit/7919b63a06d0b7122c5a4fec15ce5115d6d82c27))


### Bug Fixes

* **chore:** getItemById return an array of items ([2ef29ce](https://github.com/intevel/nuxt-directus/commit/2ef29ce9094508cd9606bb450bb8461e7fa212ed)), closes [#29](https://github.com/intevel/nuxt-directus/issues/29)
* **docs:** buildModules to module ([0731e38](https://github.com/intevel/nuxt-directus/commit/0731e386a4a95da22585c9e7055552cf01ae1097))
* **docs:** setup buildModule ([291b9e7](https://github.com/intevel/nuxt-directus/commit/291b9e731f0860c33275ca5bf7d8c0c01fedc2bd))
* **docs:** setup space ([8268149](https://github.com/intevel/nuxt-directus/commit/8268149dffe011254bda94c9ef7e3ce426081aba))

## [1.8.0](https://github.com/intevel/nuxt-directus/compare/v1.7.1...v1.8.0) (2022-04-24)


### Features

* **chore:** add graphql support ([358bbf6](https://github.com/intevel/nuxt-directus/commit/358bbf6d4c418741c5528b3d083f054d6efbb355))


### Bug Fixes

* **chore:** useDirectusFiles 500 error ([5ca7a54](https://github.com/intevel/nuxt-directus/commit/5ca7a54efca7ee72a7f580112e0d5b2df764f94f)), closes [#23](https://github.com/intevel/nuxt-directus/issues/23)

### [1.7.1](https://github.com/intevel/nuxt-directus/compare/v1.7.0...v1.7.1) (2022-04-23)

## [1.7.0](https://github.com/intevel/nuxt-directus/compare/v1.6.0...v1.7.0) (2022-04-19)


### Features

* **chore:** created npmignore ([a456c11](https://github.com/intevel/nuxt-directus/commit/a456c114173c6e9344e9914b474565029f3af3f3))
* **module:** added getFiles method ([6c4b6bf](https://github.com/intevel/nuxt-directus/commit/6c4b6bfabbf32ad9d31e93e3152c2f1a0ec28afa))


### Bug Fixes

* **chore:** updated types ([a1c123f](https://github.com/intevel/nuxt-directus/commit/a1c123fa3c3aa08db8d6be4ad2ca8c146870ac1e))

## [1.6.0](https://github.com/intevel/nuxt-directus/compare/v1.5.0...v1.6.0) (2022-04-14)


### Features

* **chore:** added deep query params support ([a06fb19](https://github.com/intevel/nuxt-directus/commit/a06fb19887147d64187eb27aa00fa849bc68a1e7)), closes [#21](https://github.com/intevel/nuxt-directus/issues/21)

## [1.5.0](https://github.com/intevel/nuxt-directus/compare/v1.4.0...v1.5.0) (2022-04-11)


### Features

* add global params support to getItemsByID ([bbb161e](https://github.com/intevel/nuxt-directus/commit/bbb161e2d2e462b18428b747f45ecd86bdc42d03))

## [1.4.0](https://github.com/intevel/nuxt-directus/compare/v1.3.0...v1.4.0) (2022-04-09)


### Features

* added createUser method ([0444c23](https://github.com/intevel/nuxt-directus/commit/0444c235160aa3bf7968786533ac2a9e4736a4dc))
* **examples:** moved to directus repository ([872545c](https://github.com/intevel/nuxt-directus/commit/872545c856762f710899e0a2a99aafbb066cb7dd))


### Bug Fixes

* updated middleware docs ([67caccb](https://github.com/intevel/nuxt-directus/commit/67caccb28c4c618c14be64747f0945374842281c))

## [1.3.0](https://github.com/intevel/nuxt-directus/compare/v1.2.1...v1.3.0) (2022-04-03)


### Features

* add docs ([48846c8](https://github.com/intevel/nuxt-directus/commit/48846c83dff8d79cf9f71c86c1893642065224d7))
* add getThumbnail method ([64c2640](https://github.com/intevel/nuxt-directus/commit/64c264027abc10565f17f9adfa56d39bb85a0275))
* add playground Generics ([fe48ef0](https://github.com/intevel/nuxt-directus/commit/fe48ef0c780894f5b68b686522d28d8efa989197))
* add sample to playground ([a44fa42](https://github.com/intevel/nuxt-directus/commit/a44fa42a6d7a21cd7af9e424cb89066f96ad393d))
* add updateItem method ([7e844e7](https://github.com/intevel/nuxt-directus/commit/7e844e73aa8462f042bcf3fdccd1acb75c06fc4b))


### Bug Fixes

* naming issue ([4707cab](https://github.com/intevel/nuxt-directus/commit/4707cabe9446744e9936f5fedb5c0c313f7f1595))
* **useDirectusAuth:** remove typescript ignore ([39098b3](https://github.com/intevel/nuxt-directus/commit/39098b3db6e737a758cb1389913da4fe6b23369a))
* **useDirectusAuth:** remove typescript ignore ([516e40e](https://github.com/intevel/nuxt-directus/commit/516e40e6e98cf02ab203a4c20e87f0e4303b3d4b))

### [1.2.1](https://github.com/intevel/nuxt-directus/compare/v1.2.0...v1.2.1) (2022-03-31)

## [1.2.0](https://github.com/intevel/nuxt-directus/compare/v1.1.4...v1.2.0) (2022-03-31)


### Features

* update compatibility settings ([391254c](https://github.com/intevel/nuxt-directus/commit/391254c979e52ebf8ef6eb73d556e12f2ad17dfa)), closes [#4](https://github.com/intevel/nuxt-directus/issues/4)

### [1.1.4](https://github.com/intevel/nuxt-directus/compare/v1.1.3...v1.1.4) (2022-03-27)


### Bug Fixes

* missing import statement ([2977a0b](https://github.com/intevel/nuxt-directus/commit/2977a0b567208c4f654ce2487cbb99aca9603763))

### [1.1.3](https://github.com/intevel/nuxt-directus/compare/v1.1.2...v1.1.3) (2022-03-27)


### Bug Fixes

* update dependencies & package.json ([1f2b91c](https://github.com/intevel/nuxt-directus/commit/1f2b91ca94d954e5669edf4fe38023d7aea1d057))

### [1.1.2](https://github.com/Intevel/nuxt-directus/compare/v1.1.1...v1.1.2) (2022-03-27)

### [1.1.1](https://github.com/Intevel/nuxt-directus/compare/v1.1.0...v1.1.1) (2022-03-27)

## 1.1.0 (2022-03-27)


### Features

* added delete items method ([f82c273](https://github.com/Intevel/nuxt-directus/commit/f82c273af7f2e8fce0c9701c8a2570e570938123))
* added delete items to docs ([c240fad](https://github.com/Intevel/nuxt-directus/commit/c240fad2ddc73fad1db84faf2c07b7612e7a7941))
* added first item composables ([6fb9436](https://github.com/Intevel/nuxt-directus/commit/6fb94364f365b6d425093810d83e502d4b53451c))
* added passwort resets ([2607b93](https://github.com/Intevel/nuxt-directus/commit/2607b9347aadd387c4e418396ae1f11c45745293))
* added useDirectusToken hook ([e3cb334](https://github.com/Intevel/nuxt-directus/commit/e3cb334c6010db60e79795a51d8cdf40ec0a4a0b))
* added useDirectusUrl hook ([a722130](https://github.com/Intevel/nuxt-directus/commit/a72213052f900836dde178de868e4a2331d155a3))
* added user & login methods ([9e3fdd3](https://github.com/Intevel/nuxt-directus/commit/9e3fdd3348a5a289e60b6fcd8f8ab8a69b1a794d))
* better search for items ([ca45774](https://github.com/Intevel/nuxt-directus/commit/ca45774f817ac372ac2b0f50d027362a8bac1741))
* create item method ([fb26ef4](https://github.com/Intevel/nuxt-directus/commit/fb26ef494296d524c464ca330c4c870ce2cc9713))
* created types ([090024b](https://github.com/Intevel/nuxt-directus/commit/090024bcaa641aefa3ca18744aea26c4ebb963e9))
* logout method ([cb8d236](https://github.com/Intevel/nuxt-directus/commit/cb8d2369a8c59540ca6968aed058d4f2bbe958f6))
* new types ([428d985](https://github.com/Intevel/nuxt-directus/commit/428d985ab015574f962867c95ecda6bd0bcab61a))


### Bug Fixes

* better syntax ([dba462e](https://github.com/Intevel/nuxt-directus/commit/dba462ec1b6292f826c65923f80adf12d6079ea2))
* fixed typeo ([805dbcc](https://github.com/Intevel/nuxt-directus/commit/805dbcc8725a097c5cce7e96838125328320721b))
* removed logs ([e38a23d](https://github.com/Intevel/nuxt-directus/commit/e38a23dd7844a05bc3eb4b11a71cfd488cc6875c))
* return request data ([9b2f7a9](https://github.com/Intevel/nuxt-directus/commit/9b2f7a9b1a2fad187b62f4f269f3127565c638b8))
* syntax highlighting ([68eaee8](https://github.com/Intevel/nuxt-directus/commit/68eaee84861869473da263124f602f1c622a3c02))
* updated comment ([87db18c](https://github.com/Intevel/nuxt-directus/commit/87db18ca803343633cff049b301df67330546692))
* updated types ([7920b73](https://github.com/Intevel/nuxt-directus/commit/7920b73ed443187d0a45c66f2dba825478e9d484))
* user fetching problems ([47b7027](https://github.com/Intevel/nuxt-directus/commit/47b70270279acbf08132e713ee72008de8ec92b8))
