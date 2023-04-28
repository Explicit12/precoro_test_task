<script setup lang="ts">
  interface Props {
    isOpen?: boolean;
  }

  withDefaults(defineProps<Props>(), { isOpen: false });
</script>

<template>
  <div class="modal" v-if="isOpen">
    <div class="modal__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
  .modal {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;

    width: 100vw;
    min-height: 100vh;

    display: flex;
    justify-content: center;
    padding: 0 1rem;
    padding-top: var(--gap-9);
    box-sizing: border-box;

    background-color: rgba(18, 18, 18, 0.1);
    backdrop-filter: blur(8px);
  }

  .modal__content {
    max-width: 888px;
    width: 100%;
    height: fit-content;

    overflow: hidden;

    background-color: var(--white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
  }
</style>
