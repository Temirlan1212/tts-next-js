"use client";

import { useState } from "react";
import { ElevenLabsForm } from "./components/eleven-labs-form";
import { ElevenLabsParams } from "./lib/models";
import { ElevenLabsSettingsDialog } from "./components/eleven-labs-settings-dialog";

/**
 * The main view component for generating sound using a pre-trained model.
 */
export default function ElevenLabsTTSView() {
  // State to manage loading status and audio URL
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  /**
   * Handles the process of fetching audio data using the provided request.
   * @param {ElevenLabsParams} request - The request containing model URL and text.
   */
  const handleGetAudio = async (request: ElevenLabsParams) => {
    setIsLoading(true);
    setAudioUrl(null);

    try {
      // Make a POST request to the server's API endpoint to generate audio
      const response = await fetch("/api/generate/eleven-labs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch audio data.");
      }

      const arrayBuffer = await response.arrayBuffer();
      const blobUrl = new Blob([arrayBuffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blobUrl);

      if (url != null) {
        setAudioUrl(url);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="absolute right-0 top-[-50px]">
        <ElevenLabsSettingsDialog onSubmit={(v) => console.log(v)} />
      </div>

      <ElevenLabsForm isLoading={isLoading} handleGetAudio={handleGetAudio} />

      <div className="mt-4">
        {audioUrl && (
          <audio controls className="w-full" autoPlay>
            <source id="audioSource" type="audio/flac" src={audioUrl!} />
          </audio>
        )}
      </div>
    </>
  );
}
