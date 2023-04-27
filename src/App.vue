<script setup lang="ts">
  import { ref, defineAsyncComponent } from "vue";

  import AppButton from "./components/AppButton.vue";
  
  const InviteUserModal = defineAsyncComponent(() => import("./components/modals/InviteUserModal.vue"));

  const isModelOpen = ref(false);
</script>

<template>
  <main class="app-container">
    <h1 class="text-semi-bold text-lg text-primary">Click button below to open pop-up</h1>
    <AppButton @click="() => (isModelOpen = true)">Invite User</AppButton>

    <Teleport to="body">
      <InviteUserModal :is-open="isModelOpen" @close-click="() => (isModelOpen = false)" />
    </Teleport>
  </main>
</template>

<style scoped>
  .app-container {
    margin: 0 auto;
    padding: 0 1rem;
    max-width: var(--br-xl);

    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
