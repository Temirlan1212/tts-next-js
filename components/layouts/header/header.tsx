import { Button } from "@/components/ui/button";
import { ThemeToggler } from "./theme-toggler";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { LogoComponent } from "./logo";

export default async function Header() {
  const session = await getServerSession(options);
  return (
    <div className="border-b">
      <div className="container flex items-center h-[4rem] justify-between">
        <LogoComponent />
        <div className="flex gap-3">
          <ThemeToggler />
          {/* <ProfileCombox /> */}
          {!!session ? (
            <UserNav {...session} />
          ) : (
            <Link href="sign-in">
              <Button variant="outline">
                <ArrowRightCircle />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
