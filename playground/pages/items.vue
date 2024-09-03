<template>
  <div>
    <div>
      <label>
        Search:<br>
        <input v-model="search" type="text">
      </label>
      <br>
      <label>
        Limit:<br>
        <input v-model="limit" type="number">
      </label>
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

interface Page {
  date_created: Date
  date_updated: Date
  id: string
  seo: string
  sort: number | null
  status: 'published' | 'draft' | 'archived'
  title: string
  user_created: string
  user_updated: string
  permalink: string
  blocks: string[] | Record<string, unknown>[]
}

const { readItems } = useDirectusItems()
const search = ref('')
const limit = ref(1)

const { data } = await readItems<Page[]>('pages', {
  fields: ['id', 'title', 'permalink'],
  search,
  limit,
  watch: [limit, search],
})
</script>
