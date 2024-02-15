/**
 * Handles an HTTP POST request to generate audio using a pre-trained model.
 * Expects a JSON payload with 'modelUrl' and 'input' fields.
 * @param {Request} request - The incoming HTTP request.
 * @returns {Response} - The generated audio as an HTTP response.
 */
export async function POST(request: Request): Promise<Response> {
  // Parse the JSON payload from the request body
  const requestBody = await request.json();

  // Check if the 'modelUrl' field is provided in the request body
  if (!requestBody.text) {
    throw new Error("Missing 'model url' field in the request body");
  }

  if (!requestBody.speaker_id) {
    throw new Error("Missing 'model url' field in the request body");
  }

  // Check if the 'input' field is provided in the request body
  if (!process.env.ULUT_SOFT_URL) {
    throw new Error("Missing 'ULUT SOFT URL'");
  }

  if (!process.env.ULUT_SOFT_TTS_TOKEN) {
    throw new Error("Missing 'ULUT SOFT TTS Token'");
  }

  // Extract the 'modelUrl' and 'input' from the request body
  const text = requestBody.text;
  const speaker_id = requestBody.speaker_id;

  // Make a POST request to the specified 'modelUrl' using Hugging Face token for authorization
  const response = await fetch(process.env.ULUT_SOFT_URL + "/api/tts", {
    headers: {
      Authorization: `Bearer ${process.env.ULUT_SOFT_TTS_TOKEN}`, // Use the correct token
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ text, speaker_id: speaker_id }),
  });

  // Check if the HTTP response is not successful
  if (!response.ok) {
    throw new Error("Request failed");
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  return new Response(base64);
}
