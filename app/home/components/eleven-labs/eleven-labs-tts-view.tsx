"use client";

import { useState } from "react";
import { ElevenLabsForm } from "./components/eleven-labs-form";
import { ElevenLabsParams } from "./lib/models";
import { ElevenLabsSettingsDialog } from "./components/eleven-labs-settings-dialog";
import useElevenLabs from "./lib/_store";
import useAudio from "@/stores/audio";
import useAudioBd from "@/stores/audio_bd";
import { useSession } from "next-auth/react";
import { saveUserAudio } from "../../_requests";

/**
 * The main view component for generating sound using a pre-trained model.
 */
export default function ElevenLabsTTSView() {
  // State to manage loading status and audio URL
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const voice_settings = useElevenLabs().voice_settings;
  const { setCurrentAudio, setPlayer } = useAudio();
  const { data: session, status } = useSession();
  const { setAudioList } = useAudioBd();
  /**
   * Handles the process of fetching audio data using the provided request.
   * @param {ElevenLabsParams} request - The request containing model URL and text.
   */
  const handleGetAudio = async (request: ElevenLabsParams) => {
    setIsLoading(true);

    try {
      // Make a POST request to the server's API endpoint to generate audio
      const response = await fetch("/api/generate/eleven-labs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...request, voice_settings }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch audio data.");
      }
      const base64 = await response.text();
      if (base64 != null) {
        const base64audio = `data:audio/wav;base64,${base64}`;
        setPlayer(true);
        setCurrentAudio(
          { src: base64audio, text: request.text },
          { persistToHistory: true }
        );
        setIsLoading(false);

        if (status === "authenticated" && session.user?.role?._id) {
          if (request.text) {
            await saveUserAudio({
              src: base64audio,
              text: request.text,
              user_id: session.user?.role?._id,
            });
            setAudioList([]);
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="absolute right-[6px] top-[6px]">
        <ElevenLabsSettingsDialog />
      </div>

      <ElevenLabsForm isLoading={isLoading} handleGetAudio={handleGetAudio} />
    </>
  );
}
