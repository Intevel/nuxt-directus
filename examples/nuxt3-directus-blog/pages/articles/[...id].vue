<template>
	<div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
		<div class="max-w-screen-sm sm:text-center sm:mx-auto">
			<h2 class="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">{{ post.title }}</h2>
			<hr class="w-full my-8 border-gray-300" />
			<p class="text-base text-gray-700 md:text-lg sm:px-4">{{ post.content }}</p>
		</div>
	</div>
</template>
<script setup>
const { getItemById } = useDirectusItems();
const route = useRoute();

const post = await getItemById({ collection: "blog", id: route.params.id });
if (!post) throwError("No article found, 404");
</script>
