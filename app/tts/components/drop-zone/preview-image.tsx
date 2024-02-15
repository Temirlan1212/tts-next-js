import { X } from "lucide-react";

interface PreviewImageProps {
  previewImage: string;
  onReset: (e: any) => void;
}

export const PreviewImage: React.FC<PreviewImageProps> = ({
  previewImage,
  onReset,
}) => {
  return (
    <div className="flex items-center justify-center bg-gray-50 dark:bg-background border border-dashed border-gray-300 p-2 rounded-lg relative">
      <X
        onClick={onReset}
        className="absolute top-[-10px] right-[-10px] bg-slate-100 hover:bg-slate-200 cursor-pointer text-gray-600 w-[20px] h-[20px] border rounded-full"
      />
      <img
        src={previewImage}
        className="object-cover rounded-lg h-[230px] w-[230px]"
        alt="Preview"
      />
    </div>
  );
};
