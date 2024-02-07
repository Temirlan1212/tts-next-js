"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/public/voice-logo.png";
import { ProfileCombox } from "./profile-combox";

export default function Header() {
  return (
    <div className="border border-slate-200">
      <div className="container flex items-center h-[4rem] justify-between">
        <Button variant="ghost">
          <Image src={logo} alt={"logo"} width={50} />
        </Button>
        <div>
          <ProfileCombox />
        </div>
      </div>
    </div>
  );
}
