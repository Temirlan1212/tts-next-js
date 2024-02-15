import React, { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import { imageToText, text2SpeechUlutSoft } from "../../_requests";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PreviewImage } from "./preview-image";
import useTTS from "../../_store";
import useAudioUlutSoft from "@/stores/audio_ulut_soft";

interface DropzoneProps {
  // Define props if needed
}

export const Dropzone: React.FC<DropzoneProps> = () => {
  const loading_img2text = useTTS().loadings.img2text;
  const loading_ttsUlutSoft = useTTS().loadings.ttsUlutSoft;
  const setCurrentAudio = useAudioUlutSoft().setCurrentAudio;
  const setPlayer = useAudioUlutSoft().setPlayer;
  const setLoadings = useTTS().setLoadings;
  const setValue = useTTS().setValue;
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>();

  const handleSubmit = async () => {
    if (files == null) return;
    const text = await imageToText(files[0], setLoadings);
    const audio = await text2SpeechUlutSoft({ text }, setLoadings);
    const base64audio = `data:audio/wav;base64,${audio}`;
    setPlayer(true);
    setValue("text", text);
    setCurrentAudio({ src: base64audio, text }, { persistToHistory: false });
  };

  const hanldeOnChange = (files: FileList | null) => {
    if (files == null) return;
    setFiles(files);
    handleImagePreview(files);
  };

  const handleImagePreview = (files: FileList) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    try {
      reader?.readAsDataURL(file);
    } catch (error) {}
  };

  const resetImagePreview = () => setPreviewImage(undefined);

  const resetAllWithStopPropogation = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    resetAll();
  };

  const resetAll = () => {
    setFiles(null);
    resetImagePreview();
    setValue("text", "");
    setCurrentAudio({ text: "", src: "" });
  };

  const isSelected = !!files;

  return (
    <div className="flex w-full flex-col gap-3 relative">
      <div className="flex gap-4 flex-col sm:flex-row">
        <Label
          htmlFor="dropzone-file"
          className="relative dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 dark:bg-background hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <UploadCloud className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Нажмите, чтобы загрузить</span>{" "}
              или перетащите
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <FileInput
            id="dropzone-file"
            className="hidden"
            multiple
            onChange={(e) => hanldeOnChange(e.target.files)}
          />
          {isSelected && (
            <div className="gap-4 flex-wrap bg-slate-500 absolute w-full h-full flex justify-center items-center rounded-lg bg-opacity-25 backdrop-blur-sm">
              <div className="flex flex-col sm:!flex-row w-[fit-content] gap-4">
                <Button
                  className="w-[fit-content] p-[25px] w-[160px]"
                  onClick={handleSubmit}
                  loading={loading_img2text || loading_ttsUlutSoft}
                >
                  Преобразовать
                </Button>
                <Button
                  className="w-[fit-content] p-[25px] w-[160px]"
                  onClick={resetAllWithStopPropogation}
                  variant="outline"
                >
                  Новое
                </Button>
              </div>
            </div>
          )}
        </Label>

        {previewImage && !!files && (
          <PreviewImage
            previewImage={previewImage}
            onReset={resetAllWithStopPropogation}
          />
        )}
      </div>
    </div>
  );
};
