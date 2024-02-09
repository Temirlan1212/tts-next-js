"use client";

import { useState } from "react";
import { HuggingFaceForm } from "./components/hugging-face-form";
import useAudio from "@/stores/audio";

/**
 * The main view component for generating sound using a pre-trained model.
 */
export default function HuggingFaceTTSView() {
  // State to manage loading status and audio URL
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { setCurrentAudio } = useAudio();

  /**
   * Handles the process of fetching audio data using the provided request.
   * @param {CreateSoundRequest} request - The request containing model URL and text.
   */
  const handleGetAudio = async (request: CreateSoundRequest) => {
    setIsLoading(true);
    setAudioUrl(null);

    try {
      // Make a POST request to the server's API endpoint to generate audio

      const response = await fetch("/api/generate/hugging-face", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: request.text,
          modelUrl: request.modelUrl,
        }),
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

      // Get the audio data as an ArrayBuffer
      // const data = await response.arrayBuffer();

      // // Convert ArrayBuffer to Blob and create a URL for the audio
      // const blob = new Blob([data], { type: "audio/mpeg" });
      // const audioUrl = URL.createObjectURL(blob);
      // setAudioUrl(audioUrl);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HuggingFaceForm isLoading={isLoading} handleGetAudio={handleGetAudio} />

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
