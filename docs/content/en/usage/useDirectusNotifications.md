---
title: "useDirectusNotifications"
description: "Learn how to use Nuxt & Directus"
position: 13
category: "Usage"
---

> Check out the Directus [Notifications](https://docs.directus.io/reference/system/notifications/) documentation.

### `getNotifications`

Search for notifications, [`global search querys`](https://docs.directus.io/reference/query/) can be used

- **Arguments:**

  - data: [`params`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L47)

- **Returns:** `Array<T>`

```vue [pages/notifications.vue]
<script setup lang="ts">
const { getNotifications } = useDirectusNotifications();
const router = useRouter();

const notifications = await getNotifications({
  params: {
    filter: { subject: "Directus is great!" },
  },
});
</script>
```

### `getNotificationByKey`

Get notifications by primary id key.

- **Arguments:**

  - data: [`id, params`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L47)

- **Returns:** `Object<T>`

```vue [pages/notifications.vue]
<script setup lang="ts">
const { getNotificationByKey } = useDirectusNotifications();

const notification = await getNotificationByKey({
  id: "2",
});
</script>
```

### `createNotification`

Create one notifications

_Partial notification object can be provided_

- **Arguments:**

  - data: [`DirectusNotificationObject`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#83)

- **Returns:** [`DirectusNotificationObject`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#83)

```vue [pages/notifications.vue]
<script setup lang="ts">
const { createNotification } = useDirectusNotifications();

await createNotification({
  recipient: "13231234saf-24wasf",
  subject: "Hey there!",
});
</script>
```

### `deleteNotifications`

Delete one or multiple notifications, provide notification id's.

- **Arguments:**

  - data: `Array<string> | string;`

- **Returns:** `Empty body`

```vue [pages/notifications.vue]
<script setup lang="ts">
const { deleteNotifications } = useDirectusNotifications();

const notifications = ["15", "20", "22"];

await deleteNotifications({ notifications });
</script>
```
