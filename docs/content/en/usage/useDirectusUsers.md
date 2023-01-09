---
title: useDirectusUsers
description: Learn how to use Nuxt & Directus
position: 14
category: Usage
---

> Check out the Directus [User](https://docs.directus.io/reference/system/users.html) documentation.

### `getUsers`

Search for users, [`global search querys`](https://docs.directus.io/reference/query/) can be used

- **Arguments:**

  - data: [`DirectusUserRequest`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L61)

- **Returns:** `Array<T>`

```vue [pages/articles.vue]
<script setup lang="ts">
const { getUsers } = useDirectusUsers();
const router = useRouter();

interface User {
  id: string,
  first_name: string,
	last_name: string,
	location: string
}

const fetchUsers = async () => {
  try {
    var filters = { 
      last_name: 'Jefferson', 
      first_name: 'Thomas' 
    };
    var users = await getUsers<User>({
      params: {
        filter: filters,
      },
    });
  } catch (e) {}
};
</script>
```

### `getUserById`

Search for a user by id

- **Arguments:**

  - data: [`DirectusUserRequest`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#L61)

- **Returns:** `T`

```vue [pages/article.vue]
<script setup lang="ts">
const { getUserById } = useDirectusUsers();

const fetchUser = async () => {
  try {
    var item = await getUserById({
      id: '4776864a-75ee-4746-9ef4-bd5c2e38cc66',
    });
  } catch (e) {}
};
</script>
```

### `createUsers`

Create one or multiple users

- **Arguments:**

  - data: [`DirectusUserCreation`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#66)

- **Returns:** `Array<T>`

```vue [pages/articles.vue]
<script setup lang="ts">
const { createUsers } = useDirectusUsers();

interface User {
  id: string,
  first_name: string,
	last_name: string,
	location: string
}

const createNewUsers: User[] = async () => {
  try {
    var users: User[] = [
      {
        first_name: 'George',
        last_name: 'Washington',
        status: 'archived'
      },
      {
        first_name: 'John',
        last_name: 'Adams',
        status: 'active'
      },
    ];
    await createUsers<User>({ users });
  } catch (e) {}
};
</script>
```

### `deleteUsers`

Delete one or multiple users

- **Arguments:**

  - data: [`DirectusUserDeletion`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#75)

- **Returns:** `Empty body`

```vue [pages/articles.vue]
<script setup lang="ts">
const { deleteUsers } = useDirectusUsers();

const deleteExistingUsers: void = async () => {
  try {
    var users = [
      '4776864a-75ee-4746-9ef4-bd5c2e38cc66', 
      '4776864a-75ee-4746-9ef4-bd5c2e38cc67', 
      '4776864a-75ee-4746-9ef4-bd5c2e38cc68'];
    await deleteUsers({ users });
  } catch (e) {}
};
</script>
```

### `updateUser`

Update user

- **Arguments:**

  - data: [`DirectusUserUpdate`](https://github.com/Intevel/nuxt-directus/blob/master/src/runtime/types/index.d.ts#70)

- **Returns:** `Array<T>`

```vue [pages/articles.vue]
<script setup lang="ts">
const { updateUser } = useDirectusUsers();

interface User {
  id: string,
  first_name: string,
	last_name: string,
	location: string
}

const updateExistingUsers: User[] = async () => {
  try {
    var newUser = { 
      id: '4776864a-75ee-4746-9ef4-bd5c2e38cc67',
      first_name: 'Abraham',
      last_name: 'Lincoln',
      location: 'Hodgenville, KY'
    };
    await updateUser<User>({
      id: newUser.id,
      item: newUser,
    });
  } catch (e) {}
};
</script>
```
