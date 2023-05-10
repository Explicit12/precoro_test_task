<script setup lang="ts">
  import { ref, computed, onUnmounted } from "vue";

  import useFormData from "@/composables/useFormData";
  import { sendInviteUserInfo } from "../../api/api";

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
  import AppMessage from "../AppMessage.vue";

  const emit = defineEmits<{ (e: "closeClick"): void }>();

  const tabs = ["Main Info", "Available Locations", "Roles"];
  const forms = [MainInfoForm, AvailableLocationsForm, RolesForm];
  const currentTab = ref(tabs[0]);
  const allCompanies = ref(false);
  const allData = useFormData();

  const currentTabIndex = computed(() => tabs.findIndex((tab) => currentTab.value === tab));
  const isLastTab = computed(() => currentTabIndex.value === tabs.length - 1);

  function nextTab(): void {
    if (currentTabIndex.value >= tabs.length - 1) return;

    currentTab.value = tabs[currentTabIndex.value + 1] || tabs[0];
  }

  function onInvite(): void {
    currentTab.value = tabs[0];
    emit("closeClick");
  }

  onUnmounted(() => {
    sendInviteUserInfo(allData.value).then(() => {
      allData.value = {};
    });
  });
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
          <component
            :active-all-companies="allCompanies"
            :is="forms[currentTabIndex]"
            @company-change="() => (allCompanies = false)"
          />
        </KeepAlive>
      </div>

      <div class="roles-massage-wrapper">
        <AppMessage class="roles-massage" v-if="currentTab === 'Roles'">
          <IconInfoVue class="info-icon roles-massage__info-icon" />
          <span class="roles-massage__text">
            The user becomes a <a href="#" class="link">Power user</a> if at least ONE of the following roles is selected: Approve, View only,
            Configuration, Suppliers and Items, Budgets, Warehouse manager.
          </span>
        </AppMessage>
      </div>
      <AppSeparator />

      <div class="modal__footer">
        <div class="user-info-from-toggle" v-if="currentTab === 'Main Info'">
          <ToggleInput v-model="allCompanies" label="Active in all companies" />
          <span class="text-medium text-md text-primary">Active in all companies</span>
          <IconInfoVue class="info-icon" />
        </div>
        <div v-else />

        <AppButton v-if="isLastTab" @click="onInvite">Invite User</AppButton>
        <AppButton v-else @click="nextTab">Next step</AppButton>
      </div>
    </div>
  </AppModal>
</template>

<style scoped>
  .close-icon,
  .info-icon {
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
    flex-direction: column;
    align-items: flex-start;
    gap: var(--gap-5);
  }

  @media screen and (min-width: 640px) {
    .modal__footer {
      gap: 0;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  .user-info-from-toggle {
    display: flex;
    align-items: center;
    gap: var(--gap-3);
  }

  .roles-massage-wrapper {
    padding: var(--gap-7);
  }

  .roles-massage {
    display: flex;
    gap: var(--gap-2);
  }

  .roles-massage__text {
    max-width: 580px;
  }
  
  .roles-massage__info-icon {
    min-width: 24px;
    min-height: 24px;
  }
</style>
