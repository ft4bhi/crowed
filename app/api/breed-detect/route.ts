import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT =
    "Act as a livestock specialist. Analyze the image and return a JSON object with: { breed: string, confidence: number, traits: string[], primary_use: string, is_cow: boolean }. If it is not a cow, set is_cow to false.";

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.GEMINI_API;
        if (!apiKey) {
            return NextResponse.json(
                { error: "Server configuration error: API key missing" },
                { status: 500 }
            );
        }

        const formData = await req.formData();
        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No image provided" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const base64Image = Buffer.from(bytes).toString("base64");

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest",
            systemInstruction: SYSTEM_PROMPT,
        });

        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: file.type || "image/jpeg",
                    data: base64Image,
                },
            },
            "Analyze this image. Respond ONLY with the JSON object, no markdown or extra text.",
        ]);

        const response = await result.response;
        const raw = response.text().trim();

        // Strip markdown code fences if present
        const cleaned = raw.replace(/```json\s*|```/g, "").trim();

        try {
            const data = JSON.parse(cleaned);
            return NextResponse.json(data);
        } catch {
            return NextResponse.json(
                { error: "Failed to parse AI response", raw },
                { status: 500 }
            );
        }
    } catch (error: any) {
        return NextResponse.json(
            { error: "Internal server error", details: error.message || String(error) },
            { status: 500 }
        );
    }
}
