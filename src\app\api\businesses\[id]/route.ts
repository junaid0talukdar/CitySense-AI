import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { businesses, categories, reviews } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const businessId = parseInt(id);
    if (isNaN(businessId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const [business] = await db.select().from(businesses).where(eq(businesses.id, businessId));
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    let category = null;
    if (business.categoryId) {
      const [cat] = await db.select().from(categories).where(eq(categories.id, business.categoryId));
      category = cat || null;
    }

    const businessReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.businessId, businessId));

    return NextResponse.json({
      ...business,
      category,
      reviews: businessReviews,
    });
  } catch (error) {
    console.error("Business fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch business" }, { status: 500 });
  }
}
