import { resolve } from "path";
import { fileURLToPath } from "url";
import defu from "defu";
import { defineNuxtModule, addPlugin } from "@nuxt/kit";
import { DirectusQueryParams } from "./runtime/types";
export interface ModuleOptions {
  /**
   * Directus API URL
   * @default process.env.DIRECTUS_URL
   * @type string
   */
  url?: string;
  /**
   * Auto fetch user
   * @default true
   * @type boolean
   */
  autoFetch?: boolean;
  /**
   * fetch user params
   * @type boolean
   */
  fetchUserParams?: DirectusQueryParams;
  /**
   * Auth Token
   * @type string
   */
  token?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-directus",
    configKey: "directus",
    compatibility: {
      nuxt: "^3.0.0 || ^2.16.0",
      bridge: true,
    },
  },
  defaults: {
    url: process.env.DIRECTUS_URL,
    autoFetch: true,
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.directus = defu(
      nuxt.options.runtimeConfig.public.directus,
      {
        url: options.url,
        autoFetch: options.autoFetch,
        fetchUserParams: options.fetchUserParams,
        token: options.token
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
