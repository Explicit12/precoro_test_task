<script setup lang="ts">
  defineProps<{ icon?: boolean }>();
</script>

<template>
  <button
    class="button text text-md text-white text-semi-bold"
    :class="{ button_icon: icon, 'button_primary-bg': !icon }"
  >
    <slot />
  </button>
</template>

<style scoped>
  .button {
    outline: none;
    border: none;
    background: none;

    padding: var(--gap-3) var(--gap-5);
    border-radius: var(--radius-lg);
  }

  .button_primary-bg {
    background-color: var(--c-primary);
  }

  .button_icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button:hover {
    cursor: pointer;
  }

  .button:focus {
    outline: 5px solid var(--c-border);
  }
</style>
