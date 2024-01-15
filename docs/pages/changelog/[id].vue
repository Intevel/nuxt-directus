<script setup lang="ts">
const route = useRoute();

const { data: page } = await useFetch(
  `https://api.github.com/repos/Intevel/nuxt-directus/releases/${route.params.id}`,
  {
    method: "GET",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Accept: "application/vnd.github+json",
    },
    key: "GitRelease",
  }
);

useSeoMeta({
  title: page.value.name,
  ogTitle: page.value.name,
  description: "directus module for nuxt, " + page.value.name,
  ogDescription: "directus module for nuxt, " + page.value.name,
});


defineOgImage({
  component: 'Saas',
  title: page.value.name,
  description: "directus module for nuxt, " + page.value.name,
})
</script>

<template>
  <UContainer>
    <UPageHeader
      :title="page.name"
      :description="`Changelong for Nuxt-Directus module ${page.name}`"
    >
      <template #headline>
        <!--         <UBadge v-bind="post.badge" variant="subtle" />
 -->
        <span class="text-gray-500 dark:text-gray-400">&middot;</span>
        <time class="text-gray-500 dark:text-gray-400">{{
          new Date(page.published_at).toLocaleDateString("en", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        }}</time>
      </template>

      <!--       <div class="flex flex-wrap items-center gap-3 mt-4">
        <UButton
          v-for="(author, index) in page.author"
          :key="index"
          :to="author.to"
          color="white"
          target="_blank"
          size="sm"
        >
          <UAvatar v-bind="author.avatar" :alt="author.name" size="2xs" />

          {{ author.name }}
        </UButton>
      </div> -->
    </UPageHeader>

    <UPage>
      <UPageBody prose>
        <NuxtMarkdown :source="page.body" />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
