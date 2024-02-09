"use client";

import { useState } from "react";
import { ElevenLabsForm } from "./components/eleven-labs-form";
import { ElevenLabsParams } from "./lib/models";
import { ElevenLabsSettingsDialog } from "./components/eleven-labs-settings-dialog";
import useElevenLabs from "./lib/_store";
import useAudio from "@/stores/audio";

/**
 * The main view component for generating sound using a pre-trained model.
 */
export default function ElevenLabsTTSView() {
  // State to manage loading status and audio URL
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const voice_settings = useElevenLabs().voice_settings;
  const { setCurrentAudio } = useAudio();

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
        setCurrentAudio(
          { src: `data:audio/wav;base64,${base64}`, text: request.text },
          { persistToHistory: true }
        );
      }

      // const arrayBuffer = await response.arrayBuffer();
      // const blobUrl = new Blob([arrayBuffer], { type: "audio/mpeg" });
      // const url = URL.createObjectURL(blobUrl);

      // if (url != null) {
      //   setCurrentAudio(
      //     { src: url, text: request.text },
      //     { persistToHistory: true }
      //   );
      // }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="absolute right-0 top-[-50px]">
        <ElevenLabsSettingsDialog />
      </div>

      <ElevenLabsForm isLoading={isLoading} handleGetAudio={handleGetAudio} />
    </>
  );
}
