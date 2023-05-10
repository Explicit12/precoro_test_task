<script setup lang="ts">
  import { ref, onDeactivated } from "vue";

  import useFormData from "../../composables/useFormData";

  import CheckBox from "../inputs/CheckBox.vue";
  import IconWarning from "../icons/IconWarning.vue";

  import type { Ref } from "vue";

  interface CheckRights {
    viewOnly: string[];
    create: string[];
    approve: string[];
    pay: string[];
    management: string[];
  }

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

  const adminAccess = ref(false);
  const checkRights: Ref<CheckRights> = ref({
    viewOnly: [],
    create: [],
    approve: [],
    pay: [],
    management: [],
  });

  function checkWholeCol(event: Event, colName: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (!isChecked) {
      checkRights.value[colName as keyof CheckRights] = [];
      return;
    };

    if (colName === "management") {
      checkRights.value.management = managementFields;
    } else {
      checkRights.value[colName as keyof CheckRights] = fields;
    }
  }

  onDeactivated(() => {
    const data = {
      adminAccess: adminAccess.value,
      management: checkRights.value.management,
      accessTo: {
        viewOnly: checkRights.value.viewOnly,
        create: checkRights.value.create,
        approve: checkRights.value.approve,
        pay: checkRights.value.pay,
      },
    };

    useFormData(data);
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
            <CheckBox
              @input="(event: InputEvent) => checkWholeCol(event, 'viewOnly')"
              :checked="checkRights.viewOnly.length === fields.length"
            />
          </div>

          <div class="roles-from__section-one__right-top-checkboxes__checkbox">
            <span class="text-medium text-md text-secondary">Create</span>
            <CheckBox
              @input="(event: InputEvent) => checkWholeCol(event, 'create')"
              :checked="checkRights.create.length === fields.length"
            />
          </div>

          <div class="roles-from__section-one__right-top-checkboxes__checkbox">
            <span class="text-medium text-md text-secondary">Approve</span>
            <CheckBox
              @input="(event: InputEvent) => checkWholeCol(event, 'approve')"
              :checked="checkRights.approve.length === fields.length"
            />
          </div>

          <div class="roles-from__section-one__right-top-checkboxes__checkbox">
            <span class="text-medium text-md text-secondary">Pay</span>
            <CheckBox
              @input="(event: InputEvent) => checkWholeCol(event, 'pay')"
              :checked="checkRights.pay.length === fields.length"
            />
          </div>
        </div>

        <div class="roles-from__section-one__right-checkboxes" v-for="(field, idx) in fields" :key="idx">
          <span class="roles-from__section-one__right-checkboxes__label text-medium text-md text-primary">
            {{ field }}
          </span>

          <CheckBox v-model="checkRights.viewOnly" :value="field" />
          <CheckBox v-model="checkRights.create" :value="field" />
          <CheckBox v-model="checkRights.approve" :value="field" />
          <CheckBox v-model="checkRights.pay" :value="field" />
        </div>
      </div>

      <div class="roles-from__section-two">
        <div>
          <div class="roles-from__section-two__top-checkboxes">
            <span class="text-medium text-md text-secondary">Management</span>
            <CheckBox
              @input="(event: InputEvent) => checkWholeCol(event, 'management')"
              :checked="checkRights.management.length === managementFields.length"
            >
              <span class="text-semi-bold">All bellow</span>
            </CheckBox>
          </div>

          <div class="roles-from__section-two__management-checkboxes">
            <CheckBox
              class="roles-from__section-two__management-checkboxes__checkbox"
              v-model="checkRights.management"
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

  .roles-from__section-one__right-top-checkboxes {
    padding-top: 0;
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

  .roles-from__section-two__management-checkboxes {
    display: flex;
    flex-direction: column;
    gap: var(--gap-5);
    padding-top: var(--gap-5);
  }
</style>
