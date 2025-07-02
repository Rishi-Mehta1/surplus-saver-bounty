import { getGeminiDynamicPrice } from './gemini';

// Mock AI service for price suggestions
export async function getDynamicPrice(originalPrice, expiry) {
  // Use Gemini API for dynamic pricing
  return await getGeminiDynamicPrice(originalPrice, expiry);
} 