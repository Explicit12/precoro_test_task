<script setup lang="ts">
  import { ref } from "vue";

  import AppButton from "./components/AppButton.vue";
  import AppModal from "./components/AppModal.vue";
  import IconClose from "./components/icons/IconClose.vue";
  import TabButtonGroup from "./components/TabButtonGroup.vue";

  const isModelOpen = ref(false);

  const tabs = new Set(["Main Info", "Available Locations", "Roles"]);
  const currentTab = ref([...tabs][0]);
</script>

<template>
  <main class="app-container">
    <h1 class="text-semi-bold text-lg text-primary">Click button below to open pop-up</h1>
    <AppButton @click="() => (isModelOpen = true)">Invite User</AppButton>

    <Teleport to="body">
      <AppModal class="modal" :is-open="isModelOpen">
        <header class="modal__header">
          <h2 class="text-semi-bold text-lg text-primary">Invite User</h2>
          <AppButton icon aria-label="Close button">
            <IconClose class="close-icon" @click="() => (isModelOpen = false)" />
          </AppButton>
        </header>

        <TabButtonGroup :tabs="tabs" v-model="currentTab" />
      </AppModal>
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

  .close-icon {
    fill: var(--c-secondary-dark);
    stroke: var(--c-secondary-dark);
    width: 2rem;
    height: auto;
  }

  .modal__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
