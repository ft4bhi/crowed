'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API;

export async function analyzeCattleImage(imageBase64: string, mimeType: string = "image/jpeg") {
  if (!apiKey) {
    return { error: "Gemini API key is not configured." };
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Analyze this image of cattle and provide the following details in strict JSON format:
    {
      "breed": "Breed Name",
      "confidence": 0-100 (integer),
      "disease_analysis": {
        "status": "Healthy" or "Issues Detected",
        "symptoms": ["symptom1", "symptom2"],
        "description": "Brief health assessment"
      },
      "lactation_potential": "Low/Medium/High - Estimate liters/day",
      "maintenance_tips": ["tip1", "tip2"],
      "listing_recommendation": {
        "estimated_price_range": "INR XXXX - XXXX",
        "selling_points": ["point1", "point2"]
      }
    }
    If the image is not significantly clear or does not contain cattle/livestock, return {"error": "Unable to identify cattle. Please try again with a clearer image."}
  `;

  const imageParts = [
    {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType,
      },
    },
  ];

  try {
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    
    // Clean code fences if present
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(cleanText);
  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    return { error: "Failed to analyze image. Please try again." };
  }
}
