import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  if (!!session) redirect("/sign-up");
  return (
    <div className="container h-[100vh] flex items-center justify-center">
      {children}
    </div>
  );
}
