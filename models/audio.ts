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

export interface AudioStoreType {
  isPlayerOpen: boolean;
  audioList: AudioType[];
  currentAudio: CurrentAudioProps;
  setCurrentAudio: (
    cm: Partial<CurrentAudioProps>,
    options?: { replace?: boolean; persistToHistory?: boolean }
  ) => void;
  setPlayer: (v: boolean) => void;
}

export interface UserAudioTypeRes {
  _id: string;
  text: string;
  src: string;
  user_id: string;
  createdAt: string;
  updatedAt: string;
}
