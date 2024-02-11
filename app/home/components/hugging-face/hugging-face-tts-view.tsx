"use client";

import { useState } from "react";
import { HuggingFaceForm } from "./components/hugging-face-form";
import useAudio from "@/stores/audio";
import { useSession } from "next-auth/react";
import { saveUserAudio } from "../../_requests";

/**
 * The main view component for generating sound using a pre-trained model.
 */
export default function HuggingFaceTTSView() {
  // State to manage loading status and audio URL
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setCurrentAudio, setPlayer } = useAudio();
  const { data: session, status } = useSession();
  /**
   * Handles the process of fetching audio data using the provided request.
   * @param {CreateSoundRequest} request - The request containing model URL and text.
   */
  const handleGetAudio = async (request: CreateSoundRequest) => {
    setIsLoading(true);

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
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HuggingFaceForm isLoading={isLoading} handleGetAudio={handleGetAudio} />
    </>
  );
}
