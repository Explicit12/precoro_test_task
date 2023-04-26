<script setup lang="ts">
  import { ref } from "vue";

  import AppButton from "./components/AppButton.vue";
  import AppModal from "./components/AppModal.vue";

  const isModelOpen = ref(false);
</script>

<template>
  <main class="container">
    <h1 class="container__headline text-semi-bold text-lg text-primary">Click button below to open pop-up</h1>
    <AppButton @click="() => (isModelOpen = true)">Invite User</AppButton>

    <Teleport to="body">
      <AppModal :is-open="isModelOpen" />
    </Teleport>
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
