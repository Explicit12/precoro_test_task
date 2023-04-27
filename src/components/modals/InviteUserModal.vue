<script setup lang="ts">
  import { ref, computed } from "vue";

  import AppButton from "../AppButton.vue";
  import AppModal from "../AppModal.vue";
  import IconClose from "../icons/IconClose.vue";
  import TabButtonGroup from "../TabButtonGroup.vue";
  import ToggleInput from "../inputs/ToggleInput.vue";
  import AppSeparator from "../AppSeparator.vue";
  import IconInfoVue from "../icons/IconInfo.vue";

  import MainInfoForm from "../forms/MainInfoForm.vue";
  import AvailableLocationsForm from "../forms/AvailableLocationsForm.vue";
  import RolesForm from "../forms/RolesForm.vue";

  defineEmits<{ (e: "closeClick"): void }>();

  const tabs = ["Main Info", "Available Locations", "Roles"];
  const forms = [MainInfoForm, AvailableLocationsForm, RolesForm];
  const currentTab = ref(tabs[0]);
  const AllCompanies = ref(false);

  const currentTabIndex = computed(() => tabs.findIndex((tab) => currentTab.value === tab));
  const isLastTab = computed(() => currentTabIndex.value === tabs.length - 1);

  function nextTab(): void {
    if (currentTabIndex.value >= tabs.length - 1) return;

    currentTab.value = tabs[currentTabIndex.value + 1] || tabs[0];
  }
</script>

<template>
  <AppModal class="modal">
    <div>
      <header class="modal__header">
        <div class="modal__header__top-nav">
          <h2 class="modal__headline text-semi-bold text-lg text-primary">Invite User</h2>
          <AppButton icon aria-label="Close button">
            <IconClose class="close-icon" @click="$emit('closeClick')" />
          </AppButton>
        </div>
        <nav class="modal__header_bottom-nav">
          <TabButtonGroup :tabs="new Set(tabs)" v-model="currentTab" />
        </nav>
      </header>

      <AppSeparator />

      <div class="modal__content">
        <KeepAlive>
          <component :is="forms[currentTabIndex]" />
        </KeepAlive>
      </div>

      <AppSeparator />

      <div class="modal__footer">
        <div class="user-info-from-toggle" v-if="currentTab === 'Main Info'">
          <ToggleInput v-model="AllCompanies" label="Active in all companies" />
          <span class="text-medium text-md text-primary">
            Active in all companies
          </span>
          <IconInfoVue class="info-icon" />
        </div>
        <div v-else />

        <AppButton v-if="isLastTab">Invite User</AppButton>
        <AppButton v-else @click="nextTab">Next step</AppButton>
      </div>
    </div>
  </AppModal>
</template>

<style scoped>
  .close-icon, .info-icon {
    fill: var(--c-secondary-dark);
    stroke: var(--c-secondary-dark);
    width: 2rem;
    height: auto;
  }

  .info-icon {
    stroke: none;
    width: 1.5rem;
  }

  .modal__footer,
  .modal__header,
  .modal__content {
    padding: var(--gap-7);
  }

  .modal__header {
    padding-bottom: 0;
  }

  .modal__header__top-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .modal__headline {
    margin: 0;
  }

  .modal__content {
    display: flex;
  }

  .modal__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .user-info-from-toggle {
    display:  flex;
    align-items: center;
    gap: var(--gap-3);
  }
</style>
