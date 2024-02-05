import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren<any>) {
  return (
    <div className="container">
      {/* <div className="mr-8 mt-4 mb-4 text-xl">
        <h1>Преобразование текста в речь</h1>
      </div> */}
      <main className="h-[100dvh] flex justify-center items-center">
        <div className="container rounded-[10px] m-auto flex h-auto py-[20px] border border-slate-200">
          <div className="w-full bg-white py-5 px-5 rounded-[10px] flex flex-col gap-[10px]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
