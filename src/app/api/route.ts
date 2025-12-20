import genAi from "@/../lib/genai";
export const dynamic = 'force-dynamic'

// Helper function to validate the response
function isValidResponse(response: any): boolean {
  // Check if response exists and is a string with content
  return typeof response === 'string' && response.trim().length > 0;
}

export async function POST(request: Request) {
  try {
    const text = await request.text();

    // Validate the input
    if (!text || text.trim().length === 0) {
      return new Response("Invalid input: Empty text provided", { status: 400 });
    }

    const response = await genAi(text);

    // Validate the response before returning
    if (!isValidResponse(response)) {
      return new Response("Invalid response from AI service", { status: 500 });
    }

    return new Response(response, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 500, // Changed from 400 to 500 since this is a server error
    });
  }
}
