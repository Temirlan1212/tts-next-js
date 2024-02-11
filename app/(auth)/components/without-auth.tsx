"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const WithoutAuth = async () => {
  const router = useRouter();
  useEffect(() => {
    router.back();
  }, []);

  return "...loading";
};

export default WithoutAuth;
