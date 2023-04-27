<script setup lang="ts">
  import { ref } from "vue";

  import TabButton from "./TabButton.vue";

  // Set required to prevet tab names duplication
  const props = defineProps<{ tabs: Set<string>; modelValue?: string }>();
  const emit = defineEmits<{ (e: "update:modelValue", currentTab: string): void }>();

  const currentTabIndex = ref([...props.tabs].findIndex((value) => value === props.modelValue) || 0);

  function getTabStatus(tabIndex: number, currentTabIndex: number): "visited" | "default" | "active" {
    if (tabIndex < currentTabIndex) return "visited";
    if (tabIndex > currentTabIndex) return "default";
    return "active";
  }

  function changeActiveTab(tabIndex: number): void {
    currentTabIndex.value = tabIndex;
    emit("update:modelValue", [...props.tabs][tabIndex]);
  }
</script>

<template>
  <div class="tab-group-wrapper">
    <ul class="tab-group">
      <TabButton
        v-for="(header, idx) in tabs"
        :key="idx"
        :tab-number="idx + 1"
        :header="header"
        :status="getTabStatus(idx, currentTabIndex)"
        @click="changeActiveTab(idx)"
      />
    </ul>
  </div>
</template>

<style scoped>
  .tab-group-wrapper {
    overflow-x: auto;
    width: 100%;
  }

  .tab-group {
    display: flex;
    align-items: center;

    padding: 0;
    margin: 0;
    width: max-content;
  }

  .tab-group :deep(.tab-button:first-child) {
    padding-left: 0;
  }
</style>
