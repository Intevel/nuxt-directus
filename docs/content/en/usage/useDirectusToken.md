---
title: "useDirectusToken"
description: "Learn how to use Nuxt & Directus"
position: 8
category: "Usage"
---

You can use this composable to get the jwt token, it is used internally to get the `directus_token` cookie.

```vue
<script setup>
const token = useDirectusToken();
</script>
```
