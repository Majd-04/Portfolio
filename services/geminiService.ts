import { GoogleGenAI } from "@google/genai";

export const improveText = async (text: string, context: string): Promise<string> => {
  // IMPORTANT: In a real scenario, this key comes from process.env.
  // For this specific demo environment, we assume the key is available.
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key is missing.");
    return "API Key missing. Cannot generate text.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const prompt = `
      You are a professional portfolio editor for a senior software engineer.
      Context: The user is updating their ${context}.
      Task: Rewrite the following text to be more professional, concise, and impactful.
      Maintain the original meaning but improve clarity and grammar.
      
      Original Text:
      "${text}"
      
      Return ONLY the rewritten text, no markdown, no quotes.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return text; // Fallback to original
  }
};
