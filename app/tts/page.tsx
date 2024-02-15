"use client";

import useAudioUlutSoft from "@/stores/audio_ulut_soft";
import { Dropzone } from "./components/drop-zone/drop-zone";
import { TextFromFilesForm } from "./components/text-from-file/text-from-file";
import { Player, PlayerWrapper } from "@/components/Player";
import { WebCam } from "./components/drop-zone/web-cam";

export default function TTS() {
  const audio_store = useAudioUlutSoft();
  return (
    <div className="w-full flex flex-col gap-3 mb-[200px] sm:mb-[100px]">
      <Dropzone />
      <TextFromFilesForm />
      {/* <WebCam /> */}

      <PlayerWrapper
        {...audio_store}
        slots={{ Player: <Player type="desktop" {...audio_store} /> }}
      />
    </div>
  );
}
