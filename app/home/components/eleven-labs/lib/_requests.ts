import { Dispatch, SetStateAction } from "react";

export const fetchVoices = async (callback: Dispatch<SetStateAction<any>>) => {
  try {
    const response = await fetch("/api/generate/eleven-labs/voices");
    const voices = await response.json();
    callback(voices);
  } catch (error: any) {
    throw new Error(error);
  }
};
