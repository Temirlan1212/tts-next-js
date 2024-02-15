import { Expand, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface PreviewImageProps {
  previewImage: string;
  onReset: (e: any) => void;
}

export const PreviewImage: React.FC<PreviewImageProps> = ({
  previewImage,
  onReset,
}) => {
  return (
    <div className="group relative flex items-center justify-center bg-gray-50 dark:bg-background border border-dashed border-gray-300 p-2 rounded-lg relative">
      <X
        onClick={onReset}
        className="absolute z-10 top-[-10px] right-[-10px] bg-slate-100 hover:bg-slate-200 cursor-pointer text-gray-600 w-[24px] h-[24px] p-[2px] border rounded-full"
      />

      <img
        src={previewImage}
        className=" object-cover rounded-lg h-[230px] w-[230px]"
        alt="Preview"
      />

      <ImagePreviewDialog previewImage={previewImage} />
    </div>
  );
};

export function ImagePreviewDialog({ previewImage }: { previewImage: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Expand className="absolute z-10 top-[-10px] left-[-10px] bg-slate-100 hover:bg-slate-200 cursor-pointer text-gray-600 w-[24px] h-[24px] p-[4px] border rounded-full" />
      </DialogTrigger>
      <DialogContent className="w-full h-full max-w-[60dvw] max-h-[80dvh] overflow-auto">
        <div className="flex items-center space-x-2">
          <img
            src={previewImage}
            alt="Preview"
            className="border p-2 rounded-lg border-dashed"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
