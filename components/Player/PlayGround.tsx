import { AudioType } from "@/models/audio";
import useAudioTest from "@/stores/audio";
import { TbPlayerPause, TbPlayerPlay } from "react-icons/tb";

export const PlayGround = () => {
  const { currentAudio, setCurrentAudio, audioList } = useAudioTest();
  const handleAudio = (audio: AudioType) => {
    if (currentAudio.src) setCurrentAudio({ src: undefined });
    else setCurrentAudio(audio);
  };

  return (
    <div className="w-screen h-screen overflow-auto bg-[#1e1e2f]">
      <div className="flex flex-col max-w-lg gap-4 mx-4 md:mx-auto mt-6 mb-20">
        {audioList.map((audio) => {
          const isPlaying = currentAudio.src === audio.src;
          return (
            <div
              key={audio.id}
              onClick={() => handleAudio(audio)}
              className={`${
                isPlaying ? " border-purple-500" : "border-transparent"
              } flex gap-2 text-xs relative cursor-pointer transition-shadow duration-300 shadow-lg hover:shadow-none bg-[#27293d] rounded-2xl overflow-hidden text-white border-2 border-dashed`}
            >
              <div className="w-3/12 h-24">
                <img
                  className="rounded-lg h-full w-full object-cover"
                  alt={audio.text}
                  src={""}
                />
              </div>
              <div className="w-8/12 flex flex-col gap-2 justify-center">
                <h6 className="font-semibold text-sm">{audio.text}</h6>
                <p className="text-xs text-gray-400">{audio.date}</p>
              </div>
              <div className="w-1/12 flex justify-center items-center text-3xl bg-black/10">
                {isPlaying ? <TbPlayerPause /> : <TbPlayerPlay />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
