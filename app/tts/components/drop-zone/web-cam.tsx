import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import Webcam, { WebcamProps } from "react-webcam";

interface WebCamProps extends Partial<WebcamProps> {
  setUrl: Dispatch<SetStateAction<null>>;
  setFiles: Dispatch<SetStateAction<FileList | null>>;
  url: null;
}
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export const WebCam: React.FC<WebCamProps> = ({ setFiles, setUrl, url }) => {
  const webcamRef = useRef<any>(null);

  const capturePhoto = useCallback(async () => {
    if (webcamRef.current == null) return;
    const imageSrc = webcamRef.current?.getScreenshot();

    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "File name", { type: "image/png" });
        const fileList = new DataTransfer();
        fileList.items.add(file);
        if (fileList.files) setFiles(fileList.files);
        if (!!imageSrc) setUrl(imageSrc);
      });
  }, [webcamRef]);

  const onUserMedia = (e: any) => {};

  return (
    <div className="flex flex-col gap-3">
      {!url && (
        <Webcam
          ref={webcamRef}
          audio={true}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={onUserMedia}
        />
      )}

      {url && (
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )}

      <div className="flex gap-3">
        <Button
          disabled={!!url}
          className="w-full"
          variant="outline"
          onClick={capturePhoto}
        >
          Снять
        </Button>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setUrl(null)}
          disabled={!url}
        >
          Переснять
        </Button>
      </div>
    </div>
  );
};
