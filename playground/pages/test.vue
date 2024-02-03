<template>
  <div>
    <input v-model="fieldParam" type="text" placeholder="Field Param">
    <input v-model="searchParam" type="text" placeholder="Search posts">
    <button @click="refresh(); refreshToo(); refreshThree()">
      Refresh
    </button>
    <pre v-if="notWorking && notWorking.length > 0">
      useAsyncData
      {{ notWorking }}
    </pre>
    <pre v-if="working && working.length > 0">
      SDK
      {{ working }}
    </pre>
    <pre v-if="workingToo && workingToo.length > 0">
      myComposable
      {{ workingToo }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { readItems as readItemsSDK } from '@directus/sdk'
import { useAsyncData, useDirectusItems } from '#imports'
import { myComposable } from '../composables/test'
import type { Schema } from '../types'

const { readItems, client } = useDirectusItems<Schema>()

const fieldParam = ref<string>('id')
const searchParam = ref<string>('')

const { data: notWorking, refresh } = await readItems('posts', {
  query: {
    fields: [fieldParam.value],
    search: searchParam.value
  },
  params: {
    immediate: false,
    watch: [fieldParam, searchParam]
  }
})

const { data: working, refresh: refreshToo } = await useAsyncData(
  () => client.request(readItemsSDK('posts', {
    fields: [fieldParam.value],
    search: searchParam.value
  })), {
    immediate: false,
    watch: [fieldParam, searchParam]
  }
)

const { readItemsTest } = myComposable()

const { data: workingToo, refresh: refreshThree } =
  await readItemsTest(fieldParam, searchParam)
</script>
