"use client";

import ElevenLabsTTSView from "./components/eleven-labs/eleven-labs-tts-view";
import HuggingFaceTTSView from "./components/hugging-face/hugging-face-tts-view";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useTab } from "@/hooks/useTab";
import { useEffect, useState } from "react";
import { ModelCombox } from "./components/model-combox";
import { Player, PlayerWrapper } from "@/components/Player";
import { useSession } from "next-auth/react";
import { AudioListSheet } from "./components/audio-list/audio-list-sheet";
import useAudio from "@/stores/audio";

const MODELS = [
  {
    value: "eleven-labs",
    label: "Eleven-labs",
  },
  {
    value: "hugging-face",
    label: "Hugging-face",
  },
];

export default function Home() {
  const { handleBindTab } = useTab();
  const [tab, setTab] = useState(MODELS[0].value);
  const session = useSession().data;
  const audio_store = useAudio();

  useEffect(() => {
    const hash = window?.location?.hash.replace("#", "");
    if (hash) setTab(hash);
    // fetchVoices(session?.user?.role?._id);
  }, [session]);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-3 justify-between">
        <ModelCombox setTab={setTab} models={MODELS} defaultValue={tab} />
        <AudioListSheet />
      </div>

      <div className="w-full rounded-[10px] m-auto flex h-auto border relative">
        <div className="w-full py-5 px-5 rounded-[10px] flex flex-col gap-[10px]">
          <Tabs
            value={tab}
            onValueChange={(v) => handleBindTab({ value: v, callback: setTab })}
          >
            <TabsContent value={MODELS[0].value}>
              <ElevenLabsTTSView />
            </TabsContent>
            <TabsContent value={MODELS[1].value}>
              <HuggingFaceTTSView />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* <PlayGround /> */}

      <PlayerWrapper
        {...audio_store}
        slots={{ Player: <Player type={"desktop"} {...audio_store} /> }}
      />
    </div>
  );
}
