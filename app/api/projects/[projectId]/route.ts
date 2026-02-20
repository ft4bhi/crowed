import { NextRequest } from "next/server";

// Legacy route - disabled during migration to cattle marketplace schema.

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  return new Response(JSON.stringify({ error: "Legacy route disabled" }), {
    status: 501,
    headers: { "Content-Type": "application/json" },
  });
}
