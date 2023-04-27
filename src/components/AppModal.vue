<script setup lang="ts">
  import AppSeparator from "./AppSeparator.vue";

  interface Props {
    isOpen?: boolean;
  }

  withDefaults(defineProps<Props>(), { isOpen: false });
</script>

<template>
  <Transition name="background">
    <div class="modal" v-if="isOpen">
      <div class="modal__content">
        <div class="modal__container">
          <slot name="header" />
        </div>

        <AppSeparator />
        <div class="modal__container">
          <slot name="content" />
        </div>

        <AppSeparator />
        <div class="modal__container">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
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
    max-width: var(--br-lg);
    height: fit-content;

    overflow: hidden;

    background-color: var(--white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
  }

  .modal__container {
    padding: 0 var(--gap-7);
  }

  .modal__container:first-child {
    padding-top: var(--gap-7);
  }

  .modal__container:last-child {
    padding-bottom: var(--gap-7);
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
