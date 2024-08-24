<template>
  <div>
    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { useDirectusItems } from '#imports'

const { readItems } = useDirectusItems()

const { data } = await readItems('pages')
</script>
