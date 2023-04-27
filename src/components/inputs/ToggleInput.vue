<script setup lang="ts">
  withDefaults(defineProps<{ modelValue?: boolean; label: string }>(), { modelValue: false });
  defineEmits<{ (e: "update:modelValue", checked: boolean): void }>();
</script>
<template>
  <label class="toggle">
    <input
      v-bind="$attrs"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      type="checkbox"
      class="origin-checkbox"
    />
    <span class="checkmark">
      <span class="checkmark__icon" />
    </span>
    <span class="label text-medium text-md text-primary">
      <slot />
    </span>
  </label>
</template>

<style scoped>
  .toggle {
    overflow: hidden;

    border-radius: 12px;
    border: 1px solid var(--c-border);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .origin-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    height: 22px;
    width: 42px;
    display: inline-block;

    background-color: var(--frosty-pearl);
    padding: 2px;

    transition: background-color 250ms ease;
  }

  .toggle .origin-checkbox:checked ~ .checkmark {
    background-color: var(--c-active);
    transition: background-color 250ms ease;
  }

  .checkmark__icon {
    height: 100%;
    width: auto;
    aspect-ratio: 1 / 1;

    display: inline-block;
    border-radius: 50%;

    background-color: var(--c-active);
    box-shadow: var(--shadow-sm);

    transition: background-color 250ms ease, transform 250ms ease;
  }

  .toggle .origin-checkbox:checked ~ .checkmark .checkmark__icon {
    transform: translateX(100%) translateX(-2px);
    background-color: var(--white);

    transition: background-color 250ms ease, transform 250ms ease;
  }

  .checkmark:hover,
  .label:hover {
    cursor: pointer;
  }

  .origin-checkbox:disabled {
    cursor: none;
  }
</style>
