<template>
  <div>
    <div style="margin-bottom: 1rem;">
      <label for="collection">Collection</label>
      <select id="collection" v-model="collection">
        <option value="posts">
          Posts
        </option>
        <option value="tests">
          Tests
        </option>
      </select>
      <button @click="refresh(); refreshTest(); useFetchRefresh()">
        Refresh
      </button>
      <br>
      <input v-model="fields" type="text" placeholder="Field Param">
      <input v-model="search" type="text" placeholder="Search posts">
    </div>
    <div v-if="data && data.length > 0">
      <strong>
        nuxt-directus
      </strong>
      <pre>
        {{ data }}
      </pre>
    </div>
    <div v-if="dataTest && dataTest.length > 0">
      <strong>
        Composable with useAsyncData + SDK
      </strong>
      <pre>
        {{ dataTest }}
      </pre>
    </div>
    <div v-if="useFetchData && useFetchData.data">
      <strong>
        useFetch
      </strong>
      <pre>
        {{ useFetchData.data }}
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type {
  RegularCollections,
  QueryFields
} from '@directus/sdk'
import { useRuntimeConfig } from '#imports'
import { myComposable } from '../composables/test'
import type { Schema, Post, Test } from '../types'

const { staticToken } = useRuntimeConfig().public.directus
const { readAsyncItems } = useDirectusItems<Schema>()
const { readAsyncItems: readTest } = myComposable<Schema>()

const collection = ref<RegularCollections<Schema>>('posts')
const fields = ref<QueryFields<Schema, Post | Test>>(['id'])
const search = ref('')

const { data, refresh } = await readAsyncItems(collection, {
  query: {
    fields,
    search
  },
  immediate: false,
  watch: [collection, fields, search]
})

const { data: dataTest, refresh: refreshTest } = await readTest(collection, {
  query: {
    fields,
    search
  },
  immediate: false,
  watch: [collection, fields, search]
})

const { data: useFetchData, refresh: useFetchRefresh } = await useFetch<{ data: Array<object> }>(collection, {
  query: {
    fields,
    search
  },
  baseURL: 'http://localhost:8055/items',
  immediate: false,
  watch: [collection, fields, search],
  headers: {
    Authorization: `Bearer ${staticToken}`
  }
})
</script>

<style scoped>
strong {
  font-size: large;
}
</style>
