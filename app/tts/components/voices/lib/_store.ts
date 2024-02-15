import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FormSchemaProps } from "./form-schema";

interface UlukSoftVoicesProps {
  form: FormSchemaProps;
  setValue: (field: keyof UlukSoftVoicesProps, value: any) => void;
}

const LOCAL_STORAGE_NAME = "ulut-soft-voices-form";

const usePersistedForm = create<UlukSoftVoicesProps>()(
  persist(
    (set, get) => ({
      form: {
        speaker_id: "1",
      },
      setValue: (key, value) => set({ ...get(), [key]: value }),
    }),
    {
      name: LOCAL_STORAGE_NAME,
    }
  )
);

export default usePersistedForm;

export const getUlukSoftVoicesForm = () => {
  try {
    const response = window.localStorage.getItem(LOCAL_STORAGE_NAME);
    if (!!response) {
      const item: { state: { form: FormSchemaProps } } = JSON.parse(response);
      if (item?.state?.form) return item.state.form;
    }
  } catch (error) {}
};
