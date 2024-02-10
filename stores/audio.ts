import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 } from "uuid";
import { AudioType, CurrentAudioProps } from "@/models/audio";

const defaultAudio: CurrentAudioProps = {
  id: v4(),
  src: "",
  text: "",
  date: "",
  isPlaying: false,
};

interface Audio {
  isPlayerOpen: boolean;
  audioList: AudioType[];
  currentAudio: CurrentAudioProps;
  setCurrentAudio: (
    cm: Partial<CurrentAudioProps>,
    options?: { replace?: boolean; persistToHistory?: boolean }
  ) => void;
  setPlayer: (v: boolean) => void;
}

const useAudio = create<Audio>()(
  persist(
    (set, get) => ({
      isPlayerOpen: false,
      audioList: [],
      currentAudio: defaultAudio,
      setPlayer: (v) => set({ isPlayerOpen: v }),
      setCurrentAudio: (value: Partial<CurrentAudioProps>, options) => {
        let newValue: CurrentAudioProps = {
          ...(value as CurrentAudioProps),
          date: new Date().toISOString(),
          id: v4(),
        };

        if (options?.replace && newValue.src !== get().currentAudio.src) {
          set({ currentAudio: newValue });
        } else {
          set({ currentAudio: { ...get().currentAudio, ...newValue } });
        }

        const handleHistoryPersist = (value: CurrentAudioProps) => {
          const { audioList } = get();
          const found = audioList.find((item) => item.text === value.text);
          if (found) {
            set({
              audioList: get().audioList.map((item) => {
                if (item.text === value.text) {
                  return value;
                } else {
                  return item;
                }
              }),
            });
          }

          if (!found) {
            set({ audioList: [...get().audioList, value] });
          }
        };

        if (options?.persistToHistory) handleHistoryPersist(get().currentAudio);
      },
    }),
    {
      name: "audio",
    }
  )
);

export default useAudio;
