"use client";

import ElevenLabsTTSView from "./components/eleven-labs/eleven-labs-tts-view";
import HuggingFaceTTSView from "./components/hugging-face/hugging-face-tts-view";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useTab } from "@/hooks/useTab";
import { useEffect, useState } from "react";
import { ModelCombox } from "./components/model-combox";
import { PlayGround, Player } from "@/components/Player";
import useAudioTest from "@/stores/audio";

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
  const currentAudioSrc = useAudioTest().currentAudio.src;
  const [tab, setTab] = useState(MODELS[0].value);

  useEffect(() => {
    const hash = window?.location?.hash.replace("#", "");
    if (hash) setTab(hash);
  }, []);

  return (
    <div className="w-full flex flex-col gap-3">
      <ModelCombox setTab={setTab} models={MODELS} defaultValue={tab} />

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

      {currentAudioSrc && <Player />}
    </div>
  );
}
