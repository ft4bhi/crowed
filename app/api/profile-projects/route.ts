import { NextRequest, NextResponse } from 'next/server';
// import { db } from '@/lib/db';
// import { projects, teamMembers, projectOptions, categories, categoryOptionValues } from '@/lib/schema';
// import { eq, and } from 'drizzle-orm';
// import { adminAuth } from '@/lib/firebase/firebaseadmin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Legacy route disabled for build stability during migration to OlexCows
    // const authHeader = req.headers.get("authorization");
    // const token = authHeader?.split("Bearer ")[1];

    // if (!token) {
    //   return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 });
    // }

    // const decodedToken = await adminAuth.verifyIdToken(token);
    // ...

    return NextResponse.json([]); 
  } catch (err) {
    console.error("Error in /api/profile-projects:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
