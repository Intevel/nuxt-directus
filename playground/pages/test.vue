<template>
  <div>
    <input v-model="fieldParam" type="text" placeholder="Field Param">
    <input v-model="searchParam" type="text" placeholder="Search posts">
    <button @click="refresh(); refreshToo(); refreshThree(); refreshFour();">
      Refresh
    </button>
    <pre v-if="notWorking && notWorking.length > 0">
      useAsyncData (not working)
      {{ notWorking }}
    </pre>
    <pre v-if="notWorkingToo && notWorkingToo.length > 0">
      Local Composable (not working)
      {{ notWorkingToo }}
    </pre>
    <pre v-if="working && working.length > 0">
      SDK (working)
      {{ working }}
    </pre>
    <pre v-if="workingToo && workingToo.length > 0">
      myComposable (working)
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

const { readItemsTest, testReadItems } = myComposable()

const { data: workingToo, refresh: refreshThree } =
  await readItemsTest(fieldParam, searchParam)
const { data: notWorkingToo, refresh: refreshFour } =
  await testReadItems('posts', {
    query: {
      fields: [fieldParam.value],
      search: searchParam.value
    },
    params: {
      immediate: false,
      watch: [fieldParam, searchParam]
    }
  })
</script>
