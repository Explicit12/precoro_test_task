<script setup lang="ts">
  import { ref, defineAsyncComponent } from "vue";

  import AppButton from "./components/AppButton.vue";

  const InviteUserModal = defineAsyncComponent(() => import("./components/modals/InviteUserModal.vue"));

  const isModalOpen = ref(false);
</script>

<template>
  <main class="app-container">
    <h1 class="text-semi-bold text-lg text-primary">Click button below to open pop-up</h1>
    <AppButton @click="() => (isModalOpen = true)">Invite User</AppButton>

    <Teleport to="body">
      <Transition name="background">
        <InviteUserModal v-if="isModalOpen" :is-open="isModalOpen" @close-click="() => (isModalOpen = false)" />
      </Transition>
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

  .background-enter-active,
  .background-leave-active {
    transition: background-color 250ms ease, opacity 500ms ease;
  }

  .background-enter-from,
  .background-leave-to {
    background-color: rgba(18, 18, 18, 0);
    opacity: 0;
  }
</style>
