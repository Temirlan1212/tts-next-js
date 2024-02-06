"use client";

import ElevenLabsTTSView from "./components/eleven-labs/eleven-labs-tts-view";
import HuggingFaceTTSView from "./components/hugging-face/hugging-face-tts-view";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useTab } from "@/hooks/useTab";
import { useState } from "react";
import { ModelCombox } from "./components/model-combox";

const MODELS = [
  {
    value: "hugging-face",
    label: "Hugging-face",
  },
  {
    value: "eleven-labs",
    label: "Eleven-labs",
  },
];

export default function Home() {
  const { handleBindTab, tabDefaultValue } = useTab();
  const [tab, setTab] = useState(tabDefaultValue(MODELS[0].value));

  return (
    <div className="w-full flex flex-col gap-3">
      <ModelCombox setTab={setTab} models={MODELS} defaultValue={tab} />

      <div className="w-full rounded-[10px] m-auto flex h-auto border border-slate-200">
        <div className="w-full bg-white py-5 px-5 rounded-[10px] flex flex-col gap-[10px]">
          <Tabs
            value={tab}
            onValueChange={(v) => handleBindTab({ value: v, callback: setTab })}
          >
            <TabsContent value={MODELS[0].value}>
              <HuggingFaceTTSView />
            </TabsContent>
            <TabsContent value={MODELS[1].value}>
              <ElevenLabsTTSView />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
