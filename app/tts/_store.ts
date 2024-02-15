import { create } from "zustand";

export interface TTSProps {
  text: string;
  loadings: {
    img2text?: boolean;
    ttsUlutSoft?: boolean;
  };
  setValue: (field: keyof TTSProps, value: any) => void;
  setLoadings: (field: keyof TTSProps["loadings"], value: any) => void;
}

const useTTS = create<TTSProps>()((set, get) => ({
  text: "",
  loadings: {
    img2text: false,
    ttsUlutSoft: false,
  },
  setValue: (key, value) => set({ ...get(), [key]: value }),
  setLoadings: (key, value) => set({ loadings: { [key]: value } }),
}));

export default useTTS;
