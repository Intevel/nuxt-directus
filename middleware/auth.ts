import { defineNuxtRouteMiddleware } from 'nuxt/app';
import { useDirectusToken } from '../src/runtime/composables/useDirectusToken';
import { navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware(async (to, _from) => {
    console.log("Middleware triggered");
    const { token } = useDirectusToken();
    console.log("Token value: ", token.value);
    if (!token.value) {
      return navigateTo("/");
    }
});
