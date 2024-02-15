import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  if (!process.env.PYTHON_URL) {
    throw new Error("Missing 'Hugging Face Access Token'");
  }

  const response = await fetch(process.env.PYTHON_URL + "/api/v1/image/", {
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
