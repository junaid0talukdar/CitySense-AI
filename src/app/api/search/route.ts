import { NextRequest, NextResponse } from "next/server";
import type { InferSelectModel } from "drizzle-orm";
import { db } from "@/db";
import { businesses, categories } from "@/db/schema";
import { parseUserQuery, calculateAIScore, generateAIResponse } from "@/lib/ai-engine";
import type { BusinessWithScore } from "@/lib/ai-engine";

type CategoryRow = InferSelectModel<typeof categories>;
type BusinessRow = InferSelectModel<typeof businesses>;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const categorySlug = searchParams.get("category") || "";

  try {
    const allCategories = (await db.select().from(categories)) as CategoryRow[];
    const categoryMap = new Map(allCategories.map((c: CategoryRow) => [c.id, c]));

    const allBusinesses = (await db.select().from(businesses)) as BusinessRow[];

    const enrichedBusinesses = allBusinesses.map((b: BusinessRow) => {
      const cat = b.categoryId ? categoryMap.get(b.categoryId) : null;
      return {
        ...b,
        categoryName: (cat as CategoryRow | undefined)?.name || "Other",
        categorySlug: (cat as CategoryRow | undefined)?.slug || "other",
        categoryColor: (cat as CategoryRow | undefined)?.color || "#888",
        distance: Math.round((0.5 + Math.random() * 4.5) * 10) / 10,
      };
    });

    let intent = parseUserQuery(query || categorySlug);

    // If category filter is provided but no query
    if (categorySlug && !query) {
      intent = { ...intent, category: categorySlug };
    }

    const scored: BusinessWithScore[] = enrichedBusinesses.map((b) => {
      const { score, reasons } = calculateAIScore(
        b as Omit<BusinessWithScore, "aiScore" | "matchReasons">,
        intent
      );
      return {
        ...b,
        tags: b.tags as string[] | null,
        features: b.features as string[] | null,
        photos: undefined as unknown as string[] | null,
        aiScore: score,
        matchReasons: reasons,
      };
    });

    // Filter by category if specified
    let filtered = scored;
    if (intent.category) {
      const catFiltered = scored.filter((b) => b.categorySlug === intent.category);
      if (catFiltered.length > 0) {
        filtered = catFiltered;
      }
    }

    // Sort by AI score
    filtered.sort((a, b) => b.aiScore - a.aiScore);

    const aiResponse = query ? generateAIResponse(intent) : "Here are the top recommendations for you:";

    return NextResponse.json({
      results: filtered,
      intent,
      aiResponse,
      totalResults: filtered.length,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
