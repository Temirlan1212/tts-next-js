import { Dispatch, SetStateAction } from "react";

export const saveUserAudio = async (payload: {
  user_id: string;
  text: string;
  src: string;
}) => {
  try {
    const response = await fetch("/api/user-audio", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchAudioList = async (
  user_id?: string,
  setLoading?: Dispatch<SetStateAction<boolean>>
) => {
  try {
    if (!user_id) return;
    setLoading && setLoading(true);
    const response = await fetch("/api/user-audio?user_id=" + user_id);
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  } finally {
    setLoading && setLoading(false);
  }
};
