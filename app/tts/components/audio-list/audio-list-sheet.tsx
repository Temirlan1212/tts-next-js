import { Player, PlayerWrapper } from "@/components/Player";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AudioList } from "./audio-list";
import { cn } from "@/lib/utils";
import useTTS from "../../_store";
import useAudioUlutSoftHistory from "@/stores/audio_ulut_soft copy";

export function AudioListSheet() {
  const audio_store = useAudioUlutSoftHistory();
  const isLoading = useTTS().loadings.saveAudio;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" loading={isLoading}>
          Аудиозаписи
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 !max-w-full sm:!max-w-[500px] w-full">
        <div className="h-full flex flex-col justify-between ">
          <div className="flex flex-col py-5 pb-0">
            <SheetHeader>
              <SheetTitle className="text-start px-5">
                История аудиозаписей
              </SheetTitle>
              {/* <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription> */}
            </SheetHeader>
            <div
              className={cn(
                "h-full overflow-auto px-5",
                !audio_store.currentAudio.src ? "h-[95vh]" : "h-[84dvh]"
              )}
            >
              <AudioList />
            </div>
          </div>

          <PlayerWrapper
            {...audio_store}
            showCloseIcon={false}
            className="relative w-full bg-background"
            slots={{ Player: <Player type={"mobile"} {...audio_store} /> }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
