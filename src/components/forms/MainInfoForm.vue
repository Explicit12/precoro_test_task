<script setup lang="ts">
  import { onBeforeMount, onDeactivated, ref, watch } from "vue";

  import useFormData from "../../composables/useFormData";

  import TextInput from "../inputs/TextInput.vue";
  import AppSelect from "../inputs/AppSelect.vue";

  const props = defineProps<{ activeAllCompanies: boolean }>();
  const emit = defineEmits<{ (e: "companyChange"): void }>();

  const companies = ["Precoro", "Google", "Apple"];

  const availableCompany = ref(companies[0]);
  const firstName = ref("");
  const lastName = ref("");
  const email = ref("");
  const position = ref("");
  const phoneNumber = ref("");

  watch(
    () => props.activeAllCompanies,
    (newVal) => {
      if (newVal) availableCompany.value = "All";
      else availableCompany.value = companies[0];
    },
  );

  watch(availableCompany, (newVal) => {
    if (newVal !== "All") emit("companyChange");
  });

  onBeforeMount(() => {
    if (props.activeAllCompanies) {
      availableCompany.value = "All";
    } else {
      availableCompany.value = companies[0];
    }
  });

  onDeactivated(() => {
    const data = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      position: position.value,
      phoneNumber: phoneNumber.value,
      availableCompany: availableCompany.value,
    };

    useFormData(data);
  });
</script>

<template>
  <form @submit.prevent class="main-info-form">
    <div class="main-info-form__col">
      <TextInput v-model="firstName" id="first-name" label="First Name" />
      <TextInput v-model="email" id="email" label="Email" />
      <TextInput v-model="position" id="position" label="Position" />
    </div>

    <div class="main-info-form__col">
      <TextInput v-model="lastName" id="last-name" label="Last Name" />
      <TextInput v-model="phoneNumber" id="phone-number" label="Phone Number" />

      <div>
        <span class="text-medium text-sm text-secondary">Available in company</span>
        <AppSelect v-model="availableCompany" :options="companies" />
      </div>
    </div>
  </form>
</template>

<style scoped>
  .main-info-form {
    display: flex;
    gap: var(--gap-6);
    flex-direction: column;
    width: 100%;
  }

  .main-info-form__col {
    display: flex;
    flex-direction: column;
    gap: var(--gap-6);
  }

  @media screen and (min-width: 640px) {
    .main-info-form {
      flex-direction: row;
    }
  }
</style>
