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
  if (!requestBody.modelUrl) {
    throw new Error("Missing 'model url' field in the request body");
  }

  // Check if the 'input' field is provided in the request body
  if (!requestBody.input) {
    throw new Error("Missing 'input' field in the request body");
  }

  // Check if the 'input' field is provided in the request body
  if (!process.env.HUGGING_FACE_TOKEN) {
    throw new Error("Missing 'Hugging Face Access Token'");
  }

  // Extract the 'modelUrl' and 'input' from the request body
  const modelUrl = requestBody.modelUrl;
  const input = requestBody.input;

  // Make a POST request to the specified 'modelUrl' using Hugging Face token for authorization
  const response = await fetch(modelUrl, {
    headers: {
      Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`, // Use the correct token
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ inputs: input }),
  });

  // Check if the HTTP response is not successful
  if (!response.ok) {
    throw new Error("Request failed");
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  return new Response(base64);
}
