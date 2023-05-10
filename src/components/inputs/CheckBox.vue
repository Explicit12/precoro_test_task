<script setup lang="ts">
  import { computed, watch } from "vue";

  import IconCheckBox from "../icons/IconCheckBox.vue";

  interface Props {
    modelValue?: boolean | string[];
    value?: string;
    checked?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), { modelValue: false });
  const emit = defineEmits<{ (e: "update:modelValue", checked: boolean | string[]): void }>();

  const warnMassage = "Value attribute is requred when multiple checkboxed used";

  const isChecked = computed(() => {
    if (Array.isArray(props.modelValue) && props.value) {
      return props.modelValue.includes(props.value);
    }

    return props.checked;
  });

  function setNewModelValue(isChecked: boolean): void {
    const isMultiCheckBox = Array.isArray(props.modelValue);

    if (isMultiCheckBox && !props.value) console.warn(warnMassage);

    if (isMultiCheckBox && isChecked && props.value) {
      emit("update:modelValue", [...(props.modelValue as []), props.value]);
    } else if (isMultiCheckBox && !isChecked) {
      const filteredValues = (props.modelValue as []).filter((value) => value !== props.value);
      emit("update:modelValue", filteredValues);
    }

    if (!isMultiCheckBox) {
      emit("update:modelValue", isChecked);
    }
  }

  function onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    setNewModelValue(target.checked);
  }

  watch(() => props.checked, setNewModelValue);
</script>

<template>
  <label class="checkbox">
    <input
      v-bind="$attrs"
      @input="onInput"
      :value="modelValue"
      type="checkbox"
      class="origin-checkbox"
      :checked="isChecked"
    />
    <span class="checkmark">
      <IconCheckBox class="checkmark-icon" />
    </span>
    <span class="label text-medium text-md text-primary">
      <slot />
    </span>
  </label>
</template>

<style scoped>
  .checkbox {
    display: flex;
    align-items: center;
    gap: var(--gap-2);
  }

  .origin-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    height: 18px;
    width: 18px;
    display: inline-block;

    background-color: var(--white);
    border: 1px solid var(--c-border);
    border-radius: 4px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .checkbox .origin-checkbox:checked ~ .checkmark {
    background-color: var(--c-active);
  }

  .checkmark-icon {
    display: none;
    stroke: var(--white);
    stroke-width: 5px;

    width: 10px;
    height: 8px;
  }

  .checkbox .origin-checkbox:checked ~ .checkmark .checkmark-icon {
    display: block;
  }

  .checkmark:hover,
  .label:hover {
    cursor: pointer;
  }
</style>
