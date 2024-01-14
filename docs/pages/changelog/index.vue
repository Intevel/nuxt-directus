<script setup lang="ts">
const { data: page } = await useAsyncData("changelog", () =>
  queryContent("/changelog").findOne()
);
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

/* const { data: versions } = await useAsyncData('versions', () => queryContent('/changelog')
  .where({ _extension: 'md' })
  .without(['body', 'excerpt'])
  .sort({ date: -1 })
  .find())
 */

const { data: GitVersions } = await useFetch(
  "https://api.github.com/repos/Intevel/nuxt-directus/releases",
  {
    method: "GET",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Accept: "application/vnd.github+json",
    },
    key: "GitVersions",
  }
);

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});

defineOgImage({
  component: "Saas",
  title: page.value.title,
  description: page.value.description,
});
</script>

<template>
  <UContainer>
    <UPageHeader v-bind="page" class="py-[50px]" />
    <UPageBody>
      <UBlogList>
        <UBlogPost
          v-for="(post, index) in GitVersions"
          :key="index"
          :to="`/changelog/${post.id}`"
          :title="post.name"
          :date="
            new Date(post.published_at).toLocaleDateString('en', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          "
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[index === 0 && 'col-span-full']"
          :ui="{
            description: 'line-clamp-2',
          }"
        />
      </UBlogList>
    </UPageBody>
  </UContainer>
</template>
