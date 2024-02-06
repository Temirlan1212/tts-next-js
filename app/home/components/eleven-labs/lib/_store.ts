import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SettingsFormSchemaProps } from "./form-schema";

interface ElevenLabs {
  settingsValues: SettingsFormSchemaProps;
  setValue: (field: keyof ElevenLabs, value: any) => void;
}

const useElevenLabs = create<ElevenLabs>()(
  persist(
    (set, get) => ({
      settingsValues: {
        similarity_boost: 10,
        stability: 10,
        style: 20,
        use_speaker_boost: true,
      },
      setValue: (key, value) => set({ ...get(), [key]: value }),
    }),
    {
      name: "eleven-labs",
    }
  )
);

export default useElevenLabs;
