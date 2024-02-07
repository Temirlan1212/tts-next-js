"use client";

import { Button } from "@/components/ui/button";
import Logo from "@/public/logo.svg";
import { ProfileCombox } from "./profile-combox";
import { ThemeToggler } from "./theme-toggler";

export default function Header() {
  return (
    <div className="border-b">
      <div className="container flex items-center h-[4rem] justify-between">
        <Logo className="w-[120px] mt-[5px]" />
        <div className="flex gap-3">
          <ThemeToggler />
          {/* <ProfileCombox /> */}
        </div>
      </div>
    </div>
  );
}
