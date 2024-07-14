<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = [{
  label: 'Docs',
  to: '/docs',
}, {
  label: 'Changelog',
  to: '/changelog',
}, {
  label: 'Blog',
  to: '/blog',
}]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      Nuxt Directus <UBadge label="v6.0" variant="subtle" class="mb-0.5" />
    </template>

    <template #right>
      <UButton label="GitHub" color="gray" to="https://github.com/intevel/nuxt-directus" />
      <UButton
        label="Playground"
        icon="i-heroicons-arrow-right-20-solid"
        trailing
        color="black"
        to="https://playground.nuxt-directus.site"
        class="hidden lg:flex"
      />
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template>
  </UHeader>
</template>
