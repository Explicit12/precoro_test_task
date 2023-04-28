import { ref, unref } from "vue";

const allData = ref({});

export default function useFormData(data?: any): any {
  if (data) allData.value = { ...allData.value, ...unref(data) };

  return allData;
}
