<template>
  <div>
    <div>
      <label>
        Collection:<br>
        <input v-model="collection" type="text">
      </label>
      <br>
      <label>
        Search:<br>
        <input v-model="search" type="search">
      </label>
      <br>
      <label>
        Limit:<br>
        <input
          v-model="limit"
          type="range"
          min="-1"
          max="10"
          step="1"
        >
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
const collection = ref('pages')
const search = ref('')
const limit = ref(-1)

const { data } = await readItems<Page[]>(collection, {
  fields: ['id', 'title', 'permalink'],
  search,
  limit,
  watch: [limit, search],
})
</script>
