"use client";
import Logo from "@/public/logo.svg";
import Link from "next/link";

export function LogoComponent() {
  return (
    <Link href="/tts">
      <Logo className="w-[120px] mt-[5px]" />
    </Link>
  );
}
