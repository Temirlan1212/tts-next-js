"use client";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignOutLink({
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ redirect: false });
    router.refresh();
    setLoading(false);
  };
  return (
    <div onClick={handleSignOut}>
      {loading ? (
        <div className="flex w-[100%] justify-between p-[6px] items-center">
          <Loader2 className="animate-spin" />
          ......
        </div>
      ) : (
        children
      )}
    </div>
  );
}
