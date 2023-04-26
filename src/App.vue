<script setup lang="ts">
  import AppButton from "./components/AppButton.vue";
</script>

<template>
  <main class="container">
    <h1 class="container__headline text-semi-bold text-lg text-primary">Click button below to open pop-up</h1>
    <AppButton>Invite User</AppButton>
  </main>
</template>

<style scoped>
  .container {
    margin: 0 auto;
    max-width: var(--br-xl);

    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
