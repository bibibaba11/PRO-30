
import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = 'gemini-2.5-flash-image';

export const editImage = async (
  prompt: string,
  images: { data: string; mimeType: string }[]
): Promise<string> => {
  // Always use {apiKey: process.env.API_KEY} as per instructions
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = {
    parts: [
      ...images.map(img => ({
        inlineData: {
          data: img.data,
          mimeType: img.mimeType
        }
      })),
      { text: prompt }
    ]
  };

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: contents,
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No candidates returned from Gemini API.");
    }

    const parts = response.candidates[0].content.parts;
    for (const part of parts) {
      // Find the image part as recommended
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    throw new Error("No image data found in the response parts.");
  } catch (error: any) {
    console.error("Gemini Edit Error:", error);
    throw error;
  }
};
