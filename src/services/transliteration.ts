import {
  GoogleGenAI,
  ThinkingLevel,
} from '@google/genai';

import { serverEnv } from '@/config/env';

export async function transliterate(text: string): Promise<string> {

    // API key is now only on the server
    const GEMINI_API_KEY = serverEnv().GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set on the server");
    }

    const ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
    });

    const tools = [
      {
        googleSearch: {
        }
      },
    ];

    const config = {
      temperature: 0.3,
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.HIGH,
      },
      tools,
      systemInstruction: [
          {
            text: `You are a specialized transliteration engine for a music app. Your goal is to convert non-Latin script lyrics (e.g., K-pop, J-pop, Hindi, Tamil, Malayalam) into English text. Maintain the line structure of the original lyrics. Provide ONLY the transliterated text without translations or explanations.`,
          }
      ],
    };

    const model = 'gemini-3-flash-preview';

    const contents = [
      {
        role: 'user',
        parts: [
          {
            text,
          },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let result = "";
    for await (const chunk of response) {
      result += chunk.text;
    }

    return result;
}

export function isMostlyLatin(text: string): boolean {
  // Remove numbers, whitespace, and common symbols/punctuation
  const cleanText = text.replace(/[\s\d\p{P}]/gu, "");
  if (cleanText.length === 0) return true;
  
  // Count Latin characters
  const latinChars = cleanText.match(/[\p{Script=Latin}]/gu) || [];
  const ratio = latinChars.length / cleanText.length;
  
  // If more than 80% of the characters are Latin, we consider it "English" 
  // or at least already in a Latin script that doesn't need transliteration.
  return ratio > 0.8;
}
