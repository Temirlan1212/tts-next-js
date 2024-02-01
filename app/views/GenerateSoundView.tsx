"use client";

import { GenerateSoundForm } from "@/components/GenerateSoundForm";
import { AudioPlayer } from "@/components/ui/audio-player";
import { useState } from "react";

/**
 * The main view component for generating sound using a pre-trained model.
 */
export default function GenerateSoundView() {
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
      const response = await fetch("/api/generate", {
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

      // Get the audio data as an ArrayBuffer
      const data = await response.arrayBuffer();

      // Convert ArrayBuffer to Blob and create a URL for the audio
      const blob = new Blob([data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(blob);
      setAudioUrl(audioUrl);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // return (
  //   <div className="flex flex-col md:flex-row h-screen">
  //     <div className="w-full md:w-1/3 p-4">
  //       <div className="mr-8 mt-4 mb-4 text-xl">
  //         <h1>Преобразование текста в речь</h1>
  //       </div>
  //       {/* Render the form component for generating sound */}
  //       <GenerateSoundForm handleGetAudio={handleGetAudio} />
  //     </div>
  //     <div className="w-full md:w-2/3 p-4 bg-gray-200 h-screen">
  //       <div className="h-full flex justify-center items-center">
  //         {isLoading ? (
  //           // Show loader when fetching audio data
  //           <Loader />
  //         ) : (
  //           // Display audio player when audio is available
  //           <>
  //             {audioUrl && (
  //               <audio controls>
  //                 <source id="audioSource" type="audio/flac" src={audioUrl!} />
  //               </audio>
  //             )}
  //           </>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="bg-gray-200 h-[100dvh] flex justify-center items-center ">
      <div className="container max-w-[900px] m-auto flex h-auto py-[40px]">
        <div className="w-full bg-white py-5 px-5 rounded-[10px] flex flex-col gap-[10px]">
          <div className="mr-8 mt-4 mb-4 text-xl">
            <h1>Преобразование текста в речь</h1>
          </div>

          <GenerateSoundForm
            isLoading={isLoading}
            handleGetAudio={handleGetAudio}
          />

          <div>
            {audioUrl && (
              <audio controls className="w-full" autoPlay>
                <source id="audioSource" type="audio/flac" src={audioUrl!} />
              </audio>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
