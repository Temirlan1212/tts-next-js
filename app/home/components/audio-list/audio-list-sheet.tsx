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
import useAudio from "@/stores/audio_bd";

export function AudioListSheet() {
  const audio_store = useAudio();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Аудиозаписи</Button>
      </SheetTrigger>
      <SheetContent className="p-0 !max-w-full sm:!max-w-[500px] w-full">
        <div className="h-full flex flex-col justify-between ">
          <div className="flex flex-col p-5 pb-0">
            <SheetHeader>
              <SheetTitle className="text-start">
                История аудиозаписей
              </SheetTitle>
              {/* <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription> */}
            </SheetHeader>
            <div className="h-full overflow-auto h-[84dvh]">
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
