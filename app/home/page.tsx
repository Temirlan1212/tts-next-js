"use client";

import ElevenLabsTTSView from "./components/eleven-labs/eleven-labs-tts-view";
import HuggingFaceTTSView from "./components/hugging-face/hugging-face-tts-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTab } from "@/hooks/useTab";
import { useState } from "react";

const defaultTabValue = "hugging-face";

export default function Home() {
  const { handleBindTab, tabDefaultValue } = useTab();
  const [tab, setTab] = useState(tabDefaultValue(defaultTabValue));

  return (
    <div>
      <Tabs
        value={tab}
        onValueChange={(v) => handleBindTab({ value: v, callback: setTab })}
      >
        <TabsList className="grid w-[fit-content] grid-cols-2">
          <TabsTrigger value={defaultTabValue}>hugging face</TabsTrigger>
          <TabsTrigger value="eleven-labs">eleven-labs</TabsTrigger>
        </TabsList>
        <TabsContent value={defaultTabValue}>
          <HuggingFaceTTSView />
        </TabsContent>
        <TabsContent value="eleven-labs">
          <ElevenLabsTTSView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
