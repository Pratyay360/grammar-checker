import genAi from "@/../lib/genai";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  try {
    const text = await request.text();
    const response = await genAi(text);
    return new Response(response, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    // Process the webhook payload
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    });
  }
}
