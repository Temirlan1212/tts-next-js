import { Dispatch, SetStateAction } from "react";
import { TTSProps } from "./_store";
import { getUlukSoftVoicesForm } from "./components/voices/lib/_store";

export const imageToText = async (
  file: File,
  setLoading?: TTSProps["setLoadings"]
) => {
  try {
    setLoading && setLoading("img2text", true);
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch("/api/generate/image-to-text", {
      method: "POST",
      body: formData,
    });

    return await response.text();
  } catch (error: any) {
    throw new Error(error);
  } finally {
    setLoading && setLoading("img2text", false);
  }
};

export const text2SpeechUlutSoft = async (
  { text }: { text: string },
  setLoading?: TTSProps["setLoadings"]
) => {
  let speaker_id = "1";
  const v = getUlukSoftVoicesForm();
  if (!!v?.speaker_id) speaker_id = v.speaker_id;

  try {
    setLoading && setLoading("ttsUlutSoft", true);
    const response = await fetch("/api/generate/ulut-soft-tts", {
      method: "POST",
      body: JSON.stringify({ text, speaker_id }),
    });

    return await response.text();
  } catch (error: any) {
    throw new Error(error);
  } finally {
    setLoading && setLoading("ttsUlutSoft", false);
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

export const saveUserAudio = async (payload: {
  user_id?: string;
  text?: string;
  src?: string;
  setLoading?: TTSProps["setLoadings"];
}) => {
  if (!payload?.user_id || !payload?.src || !payload?.text) return;
  const setLoading = payload?.setLoading;
  try {
    setLoading && setLoading("saveAudio", true);
    const response = await fetch("/api/user-audio", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (error: any) {
    throw new Error(error);
  } finally {
    setLoading && setLoading("saveAudio", false);
  }
};
