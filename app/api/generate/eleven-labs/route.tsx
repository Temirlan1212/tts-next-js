export async function POST(request: Request): Promise<Response> {
  // Parse the JSON payload from the request body
  const requestBody = await request.json();

  // Check if the 'input' field is provided in the request body
  if (!requestBody.input) {
    throw new Error("Missing 'input' field in the request body");
  }

  // Check if the 'input' field is provided in the request body
  if (!process.env.ELEVEN_LABS_TOKEN) {
    throw new Error("Missing 'Eleven Labs Access Token'");
  }

  if (!process.env.ELEVEN_LABS_URL) {
    throw new Error("Missing 'Eleven Labs url'");
  }

  // Extract the 'modelUrl' and 'input' from the request body
  const input = requestBody.input;

  const response = await fetch(
    `${process.env.ELEVEN_LABS_URL}/v1/text-to-speech/pNInz6obpgDQGcFmaJgB`,
    {
      method: "POST",
      headers: {
        accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVEN_LABS_TOKEN,
      },
      body: JSON.stringify({
        text: input,
        voice_settings: {
          stability: 0,
          similarity_boost: 0,
        },
      }),
    }
  );

  if (!response.ok) {
    return new Response(null, { status: response.status });
  }

  const arrayBuffer = await response.arrayBuffer();

  return new Response(arrayBuffer, {
    headers: {
      "Content-Type": "audio/mpeg", // Adjust the content type based on the actual audio format
    },
  });
}
