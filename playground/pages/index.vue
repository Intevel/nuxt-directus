<template>
  <div>
    <div>
      <input v-model="search" type="text">
      <input v-model="limit" type="number">
    </div>
    <div>
      <pre>
        {{ data }}
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDirectusItems } from '#imports'

const { readItems } = useDirectusItems()
const search = ref('')
const limit = ref(1)

const { data } = await readItems('pages', {
  fields: ['id', 'title'],
  search,
  limit,
  watch: [limit, search],
})
</script>
