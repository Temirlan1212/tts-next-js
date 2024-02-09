export type AudioType = {
  id: string;
  text: string;
  src: string;
  date?: string;
};

export interface CurrentAudioProps extends AudioType {
  duration?: number;
  curTime?: number;
  isPlaying?: boolean;
}
