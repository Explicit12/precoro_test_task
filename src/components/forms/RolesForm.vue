<script setup lang="ts">
  import { ref, watch } from "vue";

  import CheckBox from "../inputs/CheckBox.vue";
  import IconWarning from "../icons/IconWarning.vue";

  import type { Ref } from "vue";

  const fields = [
    "Warehouse requests",
    "Purchase requests",
    "Request for proposals",
    "Purchase orders",
    "Receipts",
    "Invoices",
    "Expenses",
  ];

  const managementFields = ["Configuration", "Suppliers and items", "Budgets", "Warehouse manager", "Reports"];

  const viewOnly: Ref<string[]> = ref([]);
  const create: Ref<string[]> = ref([]);
  const approve: Ref<string[]> = ref([]);
  const pay: Ref<string[]> = ref([]);

  const allViewOnly = ref(false);
  const allCreate = ref(false);
  const allApprove = ref(false);
  const allPay = ref(false);

  const adminAccess = ref(false);
  const allManagment = ref(false);
  const managementFieldsModel: Ref<string[]> = ref([]);

  watch(allViewOnly, (newVal) => {
    if (newVal) viewOnly.value = fields;
  });

  watch(allCreate, (newVal) => {
    if (newVal) create.value = fields;
  });

  watch(allApprove, (newVal) => {
    if (newVal) approve.value = fields;
  });

  watch(allPay, (newVal) => {
    if (newVal) pay.value = fields;
  });

  watch(allManagment, (newVal) => {
    if (newVal) managementFieldsModel.value = managementFields;
  });
</script>

<template>
  <div class="container-wrapper">
    <form class="roles-form" @submit.prevent>
      <div class="roles-from__section-one">
        <div class="roles-from__section-one__right-top-checkboxes">
          <div class="roles-from__section-one__right-top-checkboxes__checkbox">
            <span class="text-medium text-md text-secondary">Access to:</span>
            <span class="text-semi-bold text-md text-primary">All below</span>
          </div>

          <div class="roles-from__section-one__right-top-checkboxes__checkbox">
            <span class="text-medium text-md text-secondary">View only</span>
            <CheckBox v-model="allViewOnly" />
          </div>

          <div class="roles-from__section-one__right-top-checkboxes__checkbox">
            <span class="text-medium text-md text-secondary">Create</span>
            <CheckBox v-model="allCreate" />
          </div>

          <div class="roles-from__section-one__right-top-checkboxes__checkbox">
            <span class="text-medium text-md text-secondary">Approve</span>
            <CheckBox v-model="allApprove" />
          </div>

          <div class="roles-from__section-one__right-top-checkboxes__checkbox">
            <span class="text-medium text-md text-secondary">Pay</span>
            <CheckBox v-model="allPay" />
          </div>
        </div>

        <div class="roles-from__section-one__right-checkboxes" v-for="(field, idx) in fields" :key="idx">
          <span class="roles-from__section-one__right-checkboxes__label text-medium text-md text-primary">
            {{ field }}
          </span>

          <CheckBox v-model="viewOnly" :value="field" />
          <CheckBox v-model="create" :value="field" />
          <CheckBox v-model="approve" :value="field" />
          <CheckBox v-model="pay" :value="field" />
        </div>
      </div>

      <div class="roles-from__section-two">
        <div>
          <div class="roles-from__section-two__top-checkboxes">
            <span class="text-medium text-md text-secondary">Management</span>
            <CheckBox v-model="allManagment">
              <span class="text-semi-bold">All bellow</span>
            </CheckBox>
          </div>

          <div class="roles-from__section-two__managment-checkboxes">
            <CheckBox
              class="roles-from__section-two__managment-checkboxes__checkbox"
              v-model="managementFieldsModel"
              v-for="(managementField, idx) in managementFields"
              :key="idx"
              :value="managementField"
            >
              {{ managementField }}
            </CheckBox>
          </div>
        </div>

        <CheckBox v-model="adminAccess">
          <div class="admin-checkbox-label">
            Admin (Full access)
            <IconWarning class="icon-warning" />
          </div>
        </CheckBox>
      </div>
    </form>
  </div>
</template>

<style scoped>
  .container-wrapper {
    overflow-x: auto;
  }

  .roles-form {
    display: flex;
    min-width: max-content;
  }

  .roles-from__section-one {
    padding-right: 40px;
    border-right: 1px solid var(--c-border);
  }

  .roles-from__section-one__right-checkboxes,
  .roles-from__section-one__right-top-checkboxes {
    display: grid;
    grid-template-columns: 2fr repeat(4, 1fr);
    justify-items: center;
    padding: var(--gap-5) 0;
  }

  .roles-from__section-one__right-checkboxes__label {
    justify-self: start;
  }

  .roles-from__section-one__right-top-checkboxes__checkbox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--gap-7);
  }

  .roles-from__section-one__right-top-checkboxes__checkbox:first-child {
    justify-self: flex-start;
    align-items: flex-start;
  }

  .roles-form__separator {
    max-height: 100%;
  }
  .icon-warning {
    stroke: var(--c-attention);
    width: 1.5rem;
    height: auto;
  }

  .admin-checkbox-label {
    display: flex;
    align-items: center;
    gap: var(--gap-5);
  }

  .roles-from__section-two {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 40px;
  }
  .roles-from__section-two__top-checkboxes {
    display: flex;
    flex-direction: column;
    gap: var(--gap-7);
  }

  .roles-from__section-two__managment-checkboxes {
    display: flex;
    flex-direction: column;
    gap: var(--gap-5);
    padding-top: var(--gap-5);
  }
</style>
