"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

export default function NextAuthProvider(props: SessionProviderProps) {
  return <SessionProvider {...props}>{props.children}</SessionProvider>;
}
