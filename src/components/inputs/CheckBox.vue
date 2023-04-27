<script setup lang="ts">
  import IconCheckBox from "../icons/IconCheckBox.vue";

  interface Props {
    modelValue?: boolean | string[];
    value?: string;
  }

  const props = withDefaults(defineProps<Props>(), { modelValue: false });
  const emit = defineEmits<{ (e: "update:modelValue", checked: boolean | string[]): void }>();

  const warnMassage = "Value attribute is requred when multiple checkboxed used";

  function onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const isMultiCheckBox = Array.isArray(props.modelValue);

    // if (!props.modelValue) return;
    if (isMultiCheckBox && !props.value) console.warn(warnMassage);

    if (isMultiCheckBox && target.checked) {
      emit("update:modelValue", [...(props.modelValue as []), target.value]);
    } else if (isMultiCheckBox && !target.checked) {
      const filteredValues = (props.modelValue as []).filter((value) => value !== target.value);
      emit("update:modelValue", filteredValues);
    }

    if (!isMultiCheckBox) {
      emit("update:modelValue", target.checked);
    }
  }
</script>

<template>
  <label class="checkbox">
    <input v-bind="$attrs" @input="onInput" :value="value" type="checkbox" class="origin-checkbox" />
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
