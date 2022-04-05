import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
	modules: ["nuxt-directus", "@nuxtjs/tailwindcss"],
	directus: {
		url: "-",
	},
});
