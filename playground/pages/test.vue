<template>
  <div>
    <div style="margin-bottom: 1rem;">
      <label for="collection">Collection</label>
      <select id="collection" v-model="collectionName">
        <option value="posts">
          Posts
        </option>
        <option value="tests">
          Tests
        </option>
      </select>
      <button @click="refresh(); refreshToo(); refreshThree(); refreshFour();">
        Refresh
      </button>
      <br>
      <input v-model="fieldParam" type="text" placeholder="Field Param">
      <input v-model="searchParam" type="text" placeholder="Search posts">
    </div>
    <div v-if="notWorking && notWorking.length > 0">
      <strong>
        Composable with useAsyncData + SDK (not working)
      </strong>
      <pre>
        {{ notWorking }}
      </pre>
    </div>
    <div v-if="notWorkingToo && notWorkingToo.length > 0">
      <strong>
        Composable with useAsyncData + Test Promise (not working)
      </strong>
      <pre>
        {{ notWorkingToo }}
      </pre>
    </div>
    <div v-if="working && working.length > 0">
      <strong>
        useAsyncData + SDK (working)
      </strong>
      <pre>
        {{ working }}
      </pre>
    </div>
    <div v-if="workingToo && workingToo.length > 0">
      <strong>
        Composable with useAsyncData + SDK(only specific parameters) (working)
      </strong>
      <pre>
        {{ workingToo }}
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  type RegularCollections,
  readItems as readItemsSDK
} from '@directus/sdk'
import { useAsyncData, useDirectusItems } from '#imports'
import { myComposable } from '../composables/test'
import type { Schema } from '../types'

const { readItems, client } = useDirectusItems<Schema>()

const collectionName = ref<RegularCollections<Schema>>('posts')
const fieldParam = ref<string>('id')
const searchParam = ref<string>('')

const { data: notWorking, refresh } = await useAsyncData(() => readItems(collectionName.value, {
  fields: [fieldParam.value],
  search: searchParam.value,
  nuxtData: false
}), {
  immediate: false,
  watch: [collectionName, fieldParam, searchParam]
})

const { data: working, refresh: refreshToo } = await useAsyncData(
  () => client.request(readItemsSDK(collectionName.value, {
    fields: [fieldParam.value],
    search: searchParam.value
  })), {
    immediate: false,
    watch: [collectionName, fieldParam, searchParam]
  }
)

const { readItemsTest, testReadItems } = myComposable()

const { data: workingToo, refresh: refreshThree } =
  await readItemsTest(collectionName, fieldParam, searchParam, {
    immediate: false,
    watch: [collectionName, fieldParam, searchParam]
  })
const { data: notWorkingToo, refresh: refreshFour } =
  await testReadItems(collectionName.value, {
    query: {
      fields: [fieldParam.value],
      search: searchParam.value
    },
    params: {
      immediate: false,
      watch: [collectionName, fieldParam, searchParam]
    }
  })
</script>

<style scoped>
strong {
  font-size: large;
}
</style>
