import ElevenLabsTTSView from "./components/eleven-labs/eleven-labs-tts-view";
import HuggingFaceTTSView from "./components/hugging-face/hugging-face-tts-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div>
      <Tabs defaultValue="hugging-face">
        <TabsList className="grid w-[fit-content] grid-cols-2">
          <TabsTrigger value="hugging-face">hugging face</TabsTrigger>
          <TabsTrigger value="eleven-labs">eleven-labs</TabsTrigger>
        </TabsList>
        <TabsContent value="hugging-face">
          <HuggingFaceTTSView />
        </TabsContent>
        <TabsContent value="eleven-labs">
          <ElevenLabsTTSView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
