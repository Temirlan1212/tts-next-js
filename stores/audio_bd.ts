import { create } from "zustand";
import { v4 } from "uuid";
import { AudioStoreType, CurrentAudioProps } from "@/models/audio";

const defaultAudio: CurrentAudioProps = {
  id: v4(),
  src: "",
  text: "",
  date: "",
  isPlaying: false,
};

const useAudio = create<
  AudioStoreType & { setAudioList: (v: AudioStoreType["audioList"]) => void }
>()((set, get) => ({
  isPlayerOpen: true,
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
  },
  setAudioList: (v) => set({ audioList: v }),
}));

export default useAudio;
