import { useEffect, useRef, useState } from "react";
import {
  TbArrowsShuffle2,
  TbPlayerPause,
  TbPlayerPlay,
  TbPlayerSkipBack,
  TbPlayerSkipForward,
  TbVolume,
  TbVolume3,
} from "react-icons/tb";
// import { usePlayer } from "./usePlayer";
import { secondsToMinutes } from "./utils";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { AudioStoreType } from "@/models/audio";

export type PlayerType = {
  type: "mobile" | "desktop";
} & AudioStoreType;

export const Player = ({
  type = "desktop",
  setCurrentAudio,
  audioList: playList,
  currentAudio,
}: PlayerType) => {
  const [isRandom, setIsRandom] = useState(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);

  //volume can be a local state
  const [volume, setVolume] = useState(100);

  //   close volume on click outside
  const volumeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const closeVolume = (e: any) => {
      if (!volumeRef.current?.contains(e.target)) setIsVolumeOpen(false);
    };
    document.addEventListener("click", closeVolume, true);
    return () => {
      document.removeEventListener("click", closeVolume, true);
    };
  }, []);

  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    audioRef.current = new Audio(currentAudio.src);

    // volume changer
    audioRef.current.addEventListener("volumechange", (e: any) => {
      setVolume(+e.target.volume);
    });

    // play and pause
    audioRef.current.addEventListener("play", () => {
      setCurrentAudio({ isPlaying: true });
    });
    audioRef.current.addEventListener("pause", () => {
      setCurrentAudio({ isPlaying: false });
    });

    // got to the next music when current one finished
    audioRef.current.addEventListener("ended", (e: any) => {
      // skipNext(new URL(e.target.src).pathname);
    });

    //lets trigger when audio is ready
    audioRef.current.addEventListener("canplay", () => {
      audioRef.current?.play();
    });

    // time and duration
    audioRef.current.addEventListener("loadedmetadata", (e: any) => {
      setCurrentAudio({
        curTime: e.target.currentTime,
        duration: e.target.duration,
      });
    });
    audioRef.current.addEventListener("timeupdate", (e: any) => {
      setCurrentAudio({
        curTime: e.target.currentTime,
      });
    });

    return () => {
      audioRef.current?.pause();
    };
  }, [currentAudio.src]);

  const skipNext = (src: string) => {
    const idx = playList.findIndex((m) => m.src === src);
    if (isRandom) return skipRandom(idx);

    // if we are in last music
    if (idx === playList.length - 1) {
      // go to first one
      setCurrentAudio(playList[0], { replace: true });
    } else {
      setCurrentAudio(playList[idx + 1], { replace: true });
    }
  };

  const skipPrev = (src: string) => {
    const idx = playList.findIndex((m) => m.src === src);
    if (isRandom) return skipRandom(idx);

    if (idx === 0) {
      setCurrentAudio(playList[playList.length - 1]);
    } else {
      setCurrentAudio(playList[idx - 1]);
    }
  };

  const skipRandom = (idx: number) => {
    const randIdx = Math.floor(Math.random() * playList.length);
    if (randIdx === idx) {
      skipRandom(idx);
    } else {
      setCurrentAudio(playList[randIdx]);
    }
  };

  return (
    <div className="py-[25px] backdrop-blur-xl shadow-lg shadow-purple-50">
      <div
        className={cn(
          "container flex justify-between flex-wrap gap-5",
          type === "desktop" ? "sm:flex-nowrap" : ""
        )}
      >
        {/* title and thumbnail */}
        <div
          className={cn(
            "flex items-center gap-2",
            type === "desktop" ? "lg:w-3/12" : ""
          )}
        >
          <div className="flex flex-col gap-1">
            <h6 className="text-sm font-semibold truncate max-w-[100px]">
              {currentAudio.text}
            </h6>
            <span className="text-xs text-gray-400">{currentAudio.date}</span>
          </div>
        </div>
        {/* play/pause and next/prev icons */}
        <div
          className={cn(
            "flex items-center justify-center gap-3",
            type === "desktop" ? "lg:w-2/12" : ""
          )}
        >
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => skipPrev(currentAudio.src)}
          >
            <TbPlayerSkipBack size={20} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              if (currentAudio.isPlaying) {
                audioRef.current?.pause();
              } else {
                audioRef.current?.play();
              }
            }}
            className="rounded-full p-1"
          >
            {currentAudio.isPlaying ? (
              <TbPlayerPause size={26} />
            ) : (
              <TbPlayerPlay size={26} />
            )}
          </Button>
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => skipNext(currentAudio.src)}
          >
            <TbPlayerSkipForward size={20} />
          </Button>
        </div>
        {/* progress */}
        <div
          className={cn(
            "hidden  w-6/12 flex-col gap-1 justify-center",
            type === "desktop" ? "lg:flex" : ""
          )}
        >
          <Slider
            trackStyle={{ background: "rgb(126 34 206)" }}
            handleStyle={{
              border: "2px solid rgb(126 34 206)",
              background: "rgb(126 34 206)",
              boxShadow: "none",
              opacity: 1,
            }}
            min={0}
            max={currentAudio.duration}
            value={currentAudio.curTime}
            onChange={(val) => {
              audioRef.current!.currentTime = +val;
            }}
          />

          <div className="flex justify-between text-xs">
            <span>{secondsToMinutes(currentAudio.curTime)}</span>
            <span>{secondsToMinutes(currentAudio?.duration || 1)}</span>
          </div>
        </div>
        {/* settings */}
        <div
          className={cn(
            "flex justify-end gap-3 ",
            type === "desktop" ? "lg:w-1/12" : ""
          )}
        >
          <div className="relative flex items-center h-full" ref={volumeRef}>
            {isVolumeOpen && (
              <div className="flex absolute -top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-lg w-8 h-20 rounded-2xl overflow-hidden py-4 justify-center">
                <Slider
                  vertical
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(val) => {
                    audioRef.current!.volume = +val;
                  }}
                />
              </div>
            )}
            <button onClick={() => setIsVolumeOpen(!isVolumeOpen)}>
              {volume === 0 ? <TbVolume3 size={20} /> : <TbVolume size={20} />}
            </button>
          </div>
          <button onClick={() => setIsRandom(!isRandom)}>
            <TbArrowsShuffle2
              size={20}
              color={isRandom ? "rgb(126 34 206)" : ""}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
