export async function POST(request: Request): Promise<Response> {
  // Parse the JSON payload from the request body
  const requestBody = await request.json();

  console.log(requestBody, "requestBody");

  // Check if the 'input' field is provided in the request body
  if (!requestBody.text) {
    throw new Error("Missing 'text' field in the request body");
  }

  if (!requestBody.voice) {
    throw new Error("Missing 'voice' field in the request body");
  }

  if (!requestBody.voice_settings) {
    throw new Error("Missing 'voice_settings' field in the request body");
  }

  // Check if the 'input' field is provided in the request body
  if (!process.env.ELEVEN_LABS_TOKEN) {
    throw new Error("Missing 'Eleven Labs Access Token'");
  }

  if (!process.env.ELEVEN_LABS_URL) {
    throw new Error("Missing 'Eleven Labs url'");
  }

  // Extract the 'modelUrl' and 'input' from the request body
  const { text, voice, voice_settings } = requestBody;

  const response = await fetch(
    `${process.env.ELEVEN_LABS_URL}/v1/text-to-speech/${voice}`,
    {
      method: "POST",
      headers: {
        accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVEN_LABS_TOKEN,
      },
      body: JSON.stringify({
        model_id: "eleven_multilingual_v2",
        text,
        voice_settings,
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
