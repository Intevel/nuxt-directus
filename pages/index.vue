<template>
    <div class="container">
      <h1>Nuxt-Directus-Docker</h1>
      <form @submit.prevent="onSubmit" class="login-form">
        <input v-model="email" placeholder="Email" class="input-field">
        <input v-model="password" type="password" placeholder="Password" class="input-field">
        <button type="submit" class="submit-button">
          Login with Directus
        </button>
      </form>
      <button class="oauth-button" @click="loginWithProvider('discord')">
        Login with OAuth
      </button>
    </div>
  </template>
  

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'nuxt/app'
import { useDirectusAuth } from '../src/runtime/composables/useDirectusAuth'

const { login, loginWithProvider } = useDirectusAuth();
const router = useRouter();

const email = ref('');
const password = ref('');

const onSubmit = async () => {
    try {
        await login({ email: email.value, password: password.value });
        router.push('/dashboard');
    } catch (e) {
        console.log(e);
    }
}
</script>
