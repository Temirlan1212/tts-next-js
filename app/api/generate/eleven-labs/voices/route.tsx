import { NextResponse } from "next/server";

export async function GET(): Promise<Response> {
  // Check if the 'input' field is provided in the request body
  if (!process.env.ELEVEN_LABS_TOKEN) {
    throw new Error("Missing 'Eleven Labs Access Token'");
  }

  if (!process.env.ELEVEN_LABS_URL) {
    throw new Error("Missing 'Eleven Labs Url'");
  }

  const response = await fetch(`${process.env.ELEVEN_LABS_URL}/v1/voices`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": process.env.ELEVEN_LABS_TOKEN,
    },
  });

  if (!response.ok) {
    return new NextResponse(
      JSON.stringify({
        message: "validation failed",
      }),
      { status: response.status }
    );
  }

  const responseData = await response.json();

  return new Response(JSON.stringify(responseData.voices));
}
