import { NextResponse, NextRequest } from "next/server";

// Legacy route - disabled during migration to cattle marketplace schema.
// Original functionality: CRUD for categories and category option values.

export async function GET() {
  return NextResponse.json([]);
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "Legacy route disabled" }, { status: 501 });
}

export async function PUT(req: NextRequest) {
  return NextResponse.json({ message: "Legacy route disabled" }, { status: 501 });
}

export async function DELETE(req: NextRequest) {
  return NextResponse.json({ message: "Legacy route disabled" }, { status: 501 });
}