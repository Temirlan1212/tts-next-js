"use client";

import { useState } from "react";
import { ElevenLabsForm } from "./components/eleven-labs-form";

/**
 * The main view component for generating sound using a pre-trained model.
 */
export default function ElevenLabsTTSView() {
  // State to manage loading status and audio URL
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  /**
   * Handles the process of fetching audio data using the provided request.
   * @param {CreateSoundRequest} request - The request containing model URL and text.
   */
  const handleGetAudio = async (request: CreateSoundRequest) => {
    setIsLoading(true);
    setAudioUrl(null);

    try {
      // Make a POST request to the server's API endpoint to generate audio
      const response = await fetch("/api/generate/eleven-labs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: request.text,
        }),
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
