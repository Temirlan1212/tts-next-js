import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchAudioList } from "../../_requests";
import useAudio from "@/stores/audio_bd";
import { AudioType, UserAudioTypeRes } from "@/models/audio";
import { Music2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecatangleSkeleton } from "@/components/skeletons/rectangle-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AudioList() {
  const { currentAudio, setCurrentAudio, setAudioList, audioList } = useAudio();
  const [loading, setLoading] = useState<boolean>(false);
  const user_id = useSession().data?.user?.role?._id;
  const status = useSession().status;

  useEffect(() => {
    if (audioList.length < 1) fetchAudioList(user_id, setAudioList, setLoading);
  }, [user_id, audioList]);

  const handleAudio = (audio: AudioType) => {
    if (currentAudio.src && currentAudio.src === audio.src)
      setCurrentAudio({ src: undefined, text: "" });
    else setCurrentAudio(audio);
  };

  let content = null;

  if (loading && status !== "unauthenticated")
    content = <RecatangleSkeleton rows={10} className="h-[100px]" />;

  if (!loading && status !== "unauthenticated") {
    if (audioList.length < 1) {
      content = <div className="text-center m-auto font-semibold">Пусто</div>;
    } else {
      content = (audioList as unknown as UserAudioTypeRes[]).map(
        (audio, index) => {
          const isPlaying = currentAudio.isPlaying;
          const isSelected = currentAudio.src === audio.src;
          return (
            <div
              key={index}
              onClick={() => handleAudio({ ...audio, id: audio._id })}
              className={cn(
                "min-h-[200px] sm:min-h-[115px] flex gap-2 text-xs relative cursor-pointer border duration-300 rounded-sm overflow-hidden p-2 flex-wrap",
                isSelected ? "bg-slate-50" : ""
              )}
            >
              <div className="w-full sm:w-[80px] h-24 justify-center items-center bg-slate-200 flex rounded-sm">
                <Music2 />
              </div>
              <div className="w-8/12 flex flex-col gap-2 justify-center">
                <h6 className="font-semibold text-sm">{audio.text}</h6>
                <p className="text-xs text-gray-400">{audio.createdAt}</p>
              </div>
              {/* <div className="flex justify-center items-center text-3xl pr-2">
          {isPlaying ? <TbPlayerPause /> : <TbPlayerPlay />}
        </div> */}
            </div>
          );
        }
      );
    }
  }

  if (status === "unauthenticated") {
    content = (
      <div className="flex gap-3 flex-col items-center mt-5">
        <p className="text-sm">
          Войдите в аккаунт чтобы посмотреть историю аудиозаписей
        </p>
        <Link href="/sign-in">
          <Button variant="outline">Войти</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <div className="flex flex-col max-w-lg gap-4 mx-4 md:mx-auto mt-6 mb-20">
        {content}
      </div>
    </div>
  );
}
