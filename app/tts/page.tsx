"use client";

import { Dropzone } from "./components/drop-zone/drop-zone";

export default function TTS() {
  return (
    <div className="w-full flex flex-col gap-3">
      <Dropzone />
    </div>
  );
}
