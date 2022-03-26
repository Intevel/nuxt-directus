---
title: "useDirectusUser"
description: "Learn how to use Nuxt & Directus"
position: 9
category: "Usage"
---

If you are logged in you can access the user everywhere, if you are not logged in undefined is returned.

```vue
<script setup>
const user = useDirectusUser();

var email = user.value.email;
</script>
```
