import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ElevenLabsSettingsFormProps } from "../lib/models";
import { EleventLabsSettingsForm } from "./eleven-labs-settings-form";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function ElevenLabsSettingsDialog({
  onSubmit,
}: Partial<ElevenLabsSettingsFormProps>) {
  const [open, setOpen] = useState(false);
  const handleSubmit: ElevenLabsSettingsFormProps["onSubmit"] = (data) => {
    onSubmit && onSubmit(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MixerHorizontalIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Голосовые настройки</DialogTitle>
        </DialogHeader>
        <EleventLabsSettingsForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
