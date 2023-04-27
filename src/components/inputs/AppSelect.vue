<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from "vue";

  import IconSelect from "../icons/IconSelect.vue";

  import type { Ref } from "vue";

  interface Props {
    options: string[];
    modelValue?: string;
  }

  defineProps<Props>();
  defineEmits<{ (e: "update:modelValue", selected: string): void }>();

  const isOpen = ref(false);
  const selectedRef: Ref<HTMLDivElement | null> = ref(null);

  function onClickOutside(event: Event): void {
    if (!selectedRef.value) return;

    if (!selectedRef.value.contains(event.target as Node)) {
      isOpen.value = false;
    }
  }

  onMounted(() => {
    document.addEventListener("click", onClickOutside);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", onClickOutside);
  });
</script>

<template>
  <div class="custom-select text-medium text-md text-primary">
    <div
      ref="selectedRef"
      class="custom-select__selected"
      :class="{ 'custom-select__selected_open': isOpen }"
      @click="isOpen = !isOpen"
    >
      {{ modelValue || "---" }}

      <IconSelect class="custom-select__selected__icon" />
    </div>
    <Transition>
      <ul class="custom-select__items" v-show="isOpen">
        <li
          class="custom-select__items__item"
          v-for="(option, i) of options"
          :key="i"
          @click="
            $emit('update:modelValue', option);
            isOpen = false;
          "
        >
          {{ option }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
  .custom-select {
    position: relative;
    width: 100%;
    text-align: left;
  }

  .custom-select__selected {
    background-color: var(--white);
    border-radius: var(--radius-sm);
    border: 1px solid var(--c-border);

    padding: var(--gap-2);

    cursor: pointer;
    user-select: none;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--gap-2);
  }

  .custom-select__selected_open {
    border: 1px solid var(--c-active);
    border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  }

  .custom-select__selected__icon {
    fill: var(--primary);
  }

  .custom-select__selected_open .custom-select__selected__icon {
    transform: rotate(180deg);
  }

  /* .custom-select .custom-select__selected:after {
    position: absolute;
    content: "";
    top: 22px;
    right: 1em;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-color: #fff transparent transparent transparent;
  } */

  .custom-select__items {
    background-color: var(--white);
    border-radius: 0 0 0.5rem 0.5rem;
    overflow: hidden;
    position: absolute;

    border: 1px solid var(--c-border);
    border-top: 0;

    margin: 0;
    padding: 0;
    list-style-type: none;

    left: 0;
    right: 0;
    z-index: 1;
  }

  .custom-select__items__item {
    padding-left: 0.5rem;
    cursor: pointer;
    user-select: none;

    padding: var(--gap-2);
  }

  .custom-select__items__item:hover {
    background-color: var(--c-bg-active);
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 250ms ease, transform 500ms ease;
  }

  .v-enter-from,
  .v-leave-to {
    transform: translatey(-25%);
    opacity: 0;
  }
</style>
