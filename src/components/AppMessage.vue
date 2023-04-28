<template>
  <div class="message text-secondary text-medium text-sm">
    <slot />
  </div>
</template>

<style scoped>
  .message {
    background-color: var(--c-bg-active);

    box-sizing: border-box;
    width: 100%;
    padding: 10px 12px;
    border-radius: var(--radius-sm);
  }
</style>