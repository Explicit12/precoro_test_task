<script setup lang="ts">
  defineProps<{ id: string; label: string }>();
</script>

<template>
  <div class="input-container">
    <label :for="id" class="text text-medium text-sm text-secondary">
      {{ label }}
    </label>
    <input v-bind="$attrs" class="input text-medium text-md text-primary" type="text" :name="id" :id="id" />
  </div>
</template>

<style scoped>
  .input-container {
    display: flex;
    flex-direction: column;
    gap: var(--gap-1);
  }

  .input {
    width: 100%;
    background-color: var(--white);
    border: 1px solid var(--c-border);
    padding: var(--gap-2);
    border-radius: var(--radius-sm);
  }

  .input:focus {
    border-color: var(--c-primary);
  }

  .input:invalid {
    border-color: var(--c-danger);
  }
</style>