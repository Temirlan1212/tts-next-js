import { cn } from "@/lib/utils";
import React from "react";
import useAudioTest from "@/stores/audio";
import { Player } from "./Player";
import { ChevronDown, Play } from "lucide-react";
import { Button } from "../ui/button";

export interface PlayerWrapperProps extends React.HTMLAttributes<HTMLElement> {}

export const PlayerWrapper = React.forwardRef<HTMLElement, PlayerWrapperProps>(
  ({ className, ...props }, ref) => {
    const currentAudioSrc = useAudioTest().currentAudio.src;
    const currentAudioText = useAudioTest().currentAudio.text;
    const isPlayerOpen = useAudioTest().isPlayerOpen;
    const setPlayer = useAudioTest().setPlayer;

    let content = null;

    if (currentAudioSrc) {
      if (isPlayerOpen) {
        content = (
          <div className={"h-full border-t"}>
            <Player />
            <Button
              onClick={() => setPlayer(false)}
              variant="ghost"
              className="absolute top-[-38px] right-[10px] py-[0px] px-[10px] rounded-[5px] border-t border-x"
            >
              <ChevronDown />
            </Button>
          </div>
        );
      } else {
        content = (
          <div className="w-full flex justify-end">
            <div className="flex flex-col m-4 items-center gap-[5px]">
              <Button
                className="rounded-full h-[50px] w-[50px] "
                onClick={() => setPlayer(true)}
              >
                <Play />
              </Button>

              <p className="text-xs truncate max-w-[60px]">
                {currentAudioText}
              </p>
            </div>
          </div>
        );
      }
    }

    return (
      <div
        className={cn("fixed w-screen bottom-0 inset-x-0", className)}
        {...props}
      >
        {content}
      </div>
    );
  }
);
PlayerWrapper.displayName = "PlayerWrapper";
