import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WebCam } from "./web-cam";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";

export function WebCamDialog({
  onSubmit,
}: {
  onSubmit: (url: string, files: FileList) => void;
}) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(null);
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = () => {
    if (url && files) onSubmit(url, files);
    setOpen(false);
    setUrl(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hover:bg-slate-200 rounded-sm" variant="outline">
          <Camera />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Сфотографировать</DialogTitle>
          <DialogDescription>
            Фотография должна содержать текст.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <WebCam setUrl={setUrl} url={url} setFiles={setFiles} />
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={handleSubmit}>
            Загрузить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
