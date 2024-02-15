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
