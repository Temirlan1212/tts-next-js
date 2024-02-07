"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/public/voice-logo.png";
import { ProfileCombox } from "./profile-combox";
import { ThemeToggler } from "./theme-toggler";

export default function Header() {
  return (
    <div className="border-b">
      <div className="container flex items-center h-[4rem] justify-between">
        <Button variant="ghost">
          <Image src={logo} alt={"logo"} width={50} />
        </Button>
        <div className="flex gap-3">
          <ThemeToggler />
          <ProfileCombox />
        </div>
      </div>
    </div>
  );
}
