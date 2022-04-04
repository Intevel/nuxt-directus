---
title: "useDirectusAuth"
description: "Learn how to use Nuxt & Directus"
position: 10
category: "Usage"
---

> Check out the Directus [Authentication](https://docs.directus.io/reference/authentication/) documentation.

### `login`

Authentication is submitted with email and password of the user to the given directus server. Sets [`user`](/usage/useDirectusUser) and [`token`](/usage#useDirectusToken).

- **Arguments:**
  - data: [`DirectusAuthCredentials`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L3)
- **Returns:** [`Promise<DirectusAuthResponse>`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L9)

```vue [pages/login.vue]
<script setup lang="ts">
const { login } = useDirectusAuth();
const router = useRouter();

const onSubmit = async () => {
  try {
    await login({ email: "", password: "" });
  } catch (e) {}
};
</script>
```

### `logout`

Reset [`user`](/usage/useDirectusUser) and [`token`](/usage#useDirectusToken).

```vue [pages/home.vue]
<script setup lang="ts">
const { logout } = useDirectusAuth();

const onSubmit = async () => {
  logout();
};
</script>
```

### `requestPasswordReset`

Password Request is submitted with email of the user to the given directus server.

- **Arguments:**
  - data: [`DirectusPasswordForgotCredentials`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L16)
- **Returns:** `Promise<void>`

```vue
<script setup lang="ts">
const { requestPasswordReset } = useDirectusAuth();
const router = useRouter();

const onSubmit = async () => {
  try {
    await requestPasswordReset({ email: "" });
  } catch (e) {}
};
</script>
```

### `resetPassword`

Password reset is submitted with token of reset email & the new password to the given directus server.

- **Arguments:**
  - data: [`DirectusPasswordResetCredentials`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L21)
- **Returns:** `Promise<void>`

```vue
<script setup lang="ts">
const { resetPassword } = useDirectusAuth();
const router = useRouter();

const onSubmit = async () => {
  try {
    await resetPassword({ token: "", password: "" });
  } catch (e) {}
};
</script>
```

## Real-life Example
### Redirect user to login
You can protect your authenticated routes by creating a custom composable in your project, here is an example:

Add ```./middleware/auth.ts```

```ts
export default defineNuxtRouteMiddleware((to, _from) => {
    const user = useDirectusUser();
  
    if (!user.value) {
      return navigateTo('/login')
    }
  })
```

Now you can add to your pages in the ```<script setup lang="ts">```
```ts
definePageMeta({
  middleware: ["auth"]
})
```