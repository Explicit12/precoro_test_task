<script setup lang="ts">
  import { computed } from "vue";

  interface Props {
    direction?: "vertical" | "horizontal";
  }

  const props = withDefaults(defineProps<Props>(), { direction: "horizontal" });

  const separatorClasses = computed(() => ({
    separator_vertical: props.direction === "vertical",
    separator_horizontal: props.direction === "horizontal",
  }));
</script>

<template>
  <hr class="separator" :class="separatorClasses" />
</template>

<style scoped>
  .separator {
    margin: 0;
    border: none;
  }

  .separator_vertical {
    height: 100vh;
    max-height: 100%;
    width: 1px;
    border-left: 1px solid var(--c-border);
  }

  .separator_horizontal {
    width: 100%;
    border-bottom: 1px solid var(--c-border);
  }
</style>
