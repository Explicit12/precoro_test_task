<script setup lang="ts">
  interface Props {
    isOpen?: boolean;
  }

  withDefaults(defineProps<Props>(), { isOpen: false });
</script>

<template>
  <Transition name="background">
    <div class="modal" v-if="isOpen">
      <div class="modal__content">
        <slot />
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
    height: 100vh;

    max-height: 100vh;

    display: flex;
    justify-content: center;
    padding: 0 1rem;
    padding-top: var(--gap-9);
    box-sizing: border-box;

    background-color: rgba(18, 18, 18, 0.1);
    backdrop-filter: blur(8px);
  }

  .modal__content {
    /* width: 100%; */
    max-width: var(--br-lg);

    overflow: hidden;

    padding: var(--gap-7);
    height: fit-content;

    background-color: var(--white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
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
