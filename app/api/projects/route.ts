import { NextRequest, NextResponse } from 'next/server';

// Legacy route - disabled during migration to cattle marketplace schema.
// Original functionality: CRUD for projects with team members, categories, etc.

export async function GET(req: NextRequest) {
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