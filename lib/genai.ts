import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export default async function genAi(s: string) {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API!);
  const MODEL_NAME = "gemini-pro";
  const generationConfig = {
    temperature: 0.45,
    candidateCount: 1,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1024,
  };
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  const parts = [
    {
      text: s,
    },
  ];
  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });
  const response = result.response;
  let text: any = Array.isArray(response)
    ? response[0]?.candidates?.[0]?.content?.parts?.[0]?.text
    : response?.candidates?.[0]?.content?.parts?.[0]?.text;

  // Clean the text by removing unwanted quotes and punctuation
  if (typeof text === 'string') {
    text = text.replace(/[""]/g, "").trim(); // Remove double quotes
  }

  return text || s; // Return cleaned text or original if cleaning fails
}
