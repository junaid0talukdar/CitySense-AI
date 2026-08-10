import { NextResponse } from "next/server";
import { seed } from "@/db/seed";
import { db, isDatabaseConfigured } from "@/db";
import { categories } from "@/db/schema";

export async function POST() {
  try {
    if (!isDatabaseConfigured) {
      return NextResponse.json({ message: "Database not configured. Demo mode is active." });
    }

    const existing = await db.select().from(categories);
    if (existing.length > 0) {
      return NextResponse.json({ message: "Database already seeded" });
    }
    await seed();
    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
