<script setup lang="ts">
  import { computed } from "vue";

  import IconCheck from "./icons/IconCheck.vue";

  interface Props {
    tabNumber: number;
    header: string;
    status?: "visited" | "active" | "default";
  }

  const props = withDefaults(defineProps<Props>(), { status: "default" });

  const tabStatusClass = computed(() => ({
    "tab-button_default": props.status === "default",
    "tab-button_active": props.status === "active",
    "tab-button_visited": props.status === "visited",
  }));
</script>

<template>
  <li class="tab-button text text-medium text-md" :class="tabStatusClass">
    <span v-if="status !== 'visited'" class="tab-button__mark">
      {{ tabNumber }}
    </span>
    <span v-else class="tab-button__mark">
      <IconCheck class="check-icon" />
    </span>

    <span class="tab-button__header">
      {{ header }}
    </span>
  </li>
</template>

<style scoped>
  .check-icon {
    stroke: var(--white);
    width: 1.5rem;
    height: 1.5rem;

    transform: scale(1.5);
  }

  .tab-button {
    list-style-type: none;
    padding: var(--gap-5);

    display: flex;
    align-items: center;
    gap: var(--gap-2);

    font-size: 1rem;
    border-bottom: 2px solid;
  }

  .tab-button:hover {
    cursor: pointer;
  }

  .tab-button_default,
  .tab-button_visited {
    color: var(--c-secondary);
    border-color: transparent;
  }

  .tab-button_active {
    color: var(--c-active);
    border-color: var(--c-active);
  }

  .tab-button__mark {
    padding: 0.375rem 0.6875rem;
    border-radius: 100%;

    width: 32px;
    height: 32px;

    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
  }

  .tab-button_default .tab-button__mark {
    background-color: var(--c-bg-idle);
  }

  .tab-button_active .tab-button__mark {
    background-color: var(--c-bg-active);
  }

  .tab-button_visited .tab-button__mark {
    background-color: var(--c-active);
  }
</style>
