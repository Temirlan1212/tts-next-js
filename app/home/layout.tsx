import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren<any>) {
  return (
    <div className="container">
      {/* <div className="mr-8 mt-4 mb-4 text-xl">
        <h1>Преобразование текста в речь</h1>
      </div> */}
      <main>{children}</main>
    </div>
  );
}
