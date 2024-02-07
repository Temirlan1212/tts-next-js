import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SettingsFormSchemaProps } from "./form-schema";

interface ElevenLabs {
  voice_settings: SettingsFormSchemaProps;
  setValue: (field: keyof ElevenLabs, value: any) => void;
}

const useElevenLabs = create<ElevenLabs>()(
  persist(
    (set, get) => ({
      voice_settings: {
        stability: 0.4,
        similarity_boost: 0.1,
        style: 0,
        use_speaker_boost: false,
      },
      setValue: (key, value) => set({ ...get(), [key]: value }),
    }),
    {
      name: "eleven-labs",
    }
  )
);

export default useElevenLabs;
