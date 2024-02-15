import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  // Remember to enforce type here and after use some lib like zod.js to check it
  // const file = formData.getAll("file") as unknown as File;

  const response = await fetch("http://35.184.61.173/api/v1/image/", {
    method: "POST",
    body: formData,
  });

  // Check if the HTTP response is not successful
  if (!response.ok) {
    throw new Error("Request failed");
  }
  const responseData = await response.json();
  return new Response(responseData.text);
}
