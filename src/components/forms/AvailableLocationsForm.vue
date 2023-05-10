<script setup lang="ts">
  import { ref, watch, onDeactivated, computed } from "vue";

  import useFormData from "@/composables/useFormData";

  import CheckBox from "../inputs/CheckBox.vue";
  import AppSelect from "../inputs/AppSelect.vue";

  import type { Ref } from "vue";

  const allLocations = [
    "Berlin",
    "Venice Office",
    "USA Office",
    "Canada",
    "Poland Office",
    "Mexico",
    "Ukraine Kiyv Lukivska 7 Main Office",
  ];

  const choicedMainLocation = ref(allLocations[0]);
  const choicedLocations: Ref<string[]> = ref([]);

  const availableLocations = computed(() => {
    return allLocations.filter((location) => location !== choicedMainLocation.value);
  });

  function setLocationCheckBoxes(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (!isChecked) {
      choicedLocations.value = [];
      return;
    }

    choicedLocations.value = availableLocations.value;
  }

  watch(choicedMainLocation, () => {
    choicedLocations.value = [];
  });

  onDeactivated(() => {
    const data = {
      mainLocation: choicedLocations.value,
      locations: choicedLocations.value,
    };

    useFormData(data);
  });
</script>

<template>
  <form @submit.prevent class="locations-form">
    <div class="locations-form__top-bar">
      <div>
        <span class="text-medium text-sm text-secondary">
          Main Location
          <span class="text-danger">*</span>
        </span>
        <AppSelect
          class="locations-form__top-bar__select"
          v-model="choicedMainLocation"
          :options="availableLocations"
        />
      </div>
      <CheckBox @input="setLocationCheckBoxes" :checked="choicedLocations.length === availableLocations.length">
        Select All Locations
      </CheckBox>
    </div>

    <span class="text-medium text-md text-secondary">Available Locations</span>
    <div class="locations-form__bottom-bar">
      <div class="locations-form__bottom-bar__col">
        <CheckBox
          v-model="choicedLocations"
          v-for="(location, idx) in availableLocations.slice(0, 4)"
          :key="idx"
          :value="location"
        >
          {{ location }}
        </CheckBox>
      </div>

      <div class="locations-form__bottom-bar__col">
        <CheckBox
          v-model="choicedLocations"
          v-for="(location, idx) in availableLocations.slice(5, availableLocations.length)"
          :key="idx"
          :value="location"
        >
          {{ location }}
        </CheckBox>
      </div>
    </div>
  </form>
</template>

<style scoped>
  .locations-form,
  .locations-form__top-bar,
  .locations-form__bottom-bar,
  .locations-form__bottom-bar__col {
    display: flex;
    flex-direction: column;
  }

  .locations-form__top-bar {
    gap: var(--gap-7);
    padding-bottom: var(--gap-7);
  }

  .locations-form__bottom-bar {
    gap: var(--gap-5);
    padding-top: var(--gap-5);
  }

  .locations-form__bottom-bar__col {
    gap: var(--gap-5);
  }

  .locations-form__top-bar__select {
    padding-top: 4px;
  }

  @media screen and (min-width: 640px) {
    .locations-form__bottom-bar {
      flex-direction: row;
      gap: var(--gap-9);
    }
  }
</style>
