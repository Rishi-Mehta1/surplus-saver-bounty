// Gemini API integration for dynamic pricing

import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error('Gemini API key is missing! Please set VITE_GEMINI_API_KEY in your .env file.');
}

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export async function getGeminiDynamicPrice(originalPrice, expiry) {
  const model = 'gemini-2.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Given an original price of $${originalPrice} and an expiry time of ${expiry}, what should the dynamic discount price be to maximize sales and minimize waste? Return only the price as a number.`,
        },
      ],
    },
  ];

  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    responseMimeType: 'text/plain',
  };

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let result = '';
  for await (const chunk of response) {
    result += chunk.text;
  }
  // Extract the first number from the result
  const match = result.match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : originalPrice;
} 