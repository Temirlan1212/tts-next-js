import { cn } from "@/lib/utils";
import React from "react";
import useAudioTest from "@/stores/audio";
import { ChevronDown, Play } from "lucide-react";
import { Button } from "../ui/button";
import { AudioStoreType } from "@/models/audio";

export interface PlayerWrapperProps extends React.HTMLAttributes<HTMLElement> {
  slots: {
    Player: React.ReactNode;
  };
  showCloseIcon?: boolean;
}

export const PlayerWrapper = React.forwardRef<
  HTMLElement,
  PlayerWrapperProps & AudioStoreType
>(
  (
    {
      className,
      currentAudio,
      isPlayerOpen,
      showCloseIcon = true,
      setPlayer,
      ...props
    },
    ref
  ) => {
    const currentAudioSrc = currentAudio.src;
    const currentAudioText = currentAudio.text;

    let content = null;

    if (currentAudioSrc) {
      if (isPlayerOpen) {
        content = (
          <div className={"h-full border-t"}>
            {props.slots.Player}
            {showCloseIcon && (
              <Button
                onClick={() => setPlayer(false)}
                variant="ghost"
                className="absolute top-[-38px] right-[10px] py-[0px] px-[10px] rounded-[5px] border-t border-x bg-background"
              >
                <ChevronDown />
              </Button>
            )}
          </div>
        );
      } else if (showCloseIcon) {
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
        className={cn("fixed w-screen bottom-0 left-0 right-0", className)}
        {...props}
      >
        {content}
      </div>
    );
  }
);
PlayerWrapper.displayName = "PlayerWrapper";
