import { resolve } from "path";
import { fileURLToPath } from "url";
import defu from "defu";
import { defineNuxtModule, addPlugin } from "@nuxt/kit";

export interface ModuleOptions {
  /**
   * Directus API URL
   * @default process.env.DIRECTUS_URL
   * @type string
   */
  url?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-directus",
    configKey: "directus",
    compatibility: {
      nuxt: "^3.0.0 || ^2.16.0",
      bridge: true
    }
  },
  defaults: {
    url: process.env.DIRECTUS_URL,
  },
  setup (options, nuxt) {
    if (!options.url) {
      throw new Error("Missing `DIRECTUS_URL` in `.env`");
    }

    nuxt.options.publicRuntimeConfig.directus = defu(
      nuxt.options.publicRuntimeConfig.directus,
      {
        url: options.url,
      }
    );

    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);

    addPlugin(resolve(runtimeDir, "plugin"));

    nuxt.hook("autoImports:dirs", (dirs) => {
      dirs.push(resolve(runtimeDir, "composables"));
    });
  },
});

declare module "@nuxt/schema" {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      directus?: ModuleOptions;
    };
  }
}
