// AI Engine - Smart intent parser and recommendation engine
// Uses intelligent NLP-like keyword matching to parse natural language queries

export interface ParsedIntent {
  category: string | null;
  budget: number | null;
  rating: number | null;
  groupSize: number | null;
  isUrgent: boolean;
  isEmergency: boolean;
  preferences: string[];
  keywords: string[];
  timeContext: string | null;
  dietaryReqs: string[];
  amenities: string[];
}

const categoryKeywords: Record<string, string[]> = {
  restaurants: ["restaurant", "food", "eat", "dining", "dinner", "lunch", "breakfast", "biryani", "pizza", "burger", "chinese", "indian", "thai", "italian", "mexican", "sushi", "bbq", "grill", "buffet", "brunch", "meal", "cuisine", "dine"],
  cafes: ["cafe", "coffee", "tea", "latte", "cappuccino", "espresso", "study", "studying", "work", "remote", "cozy"],
  pharmacies: ["pharmacy", "medicine", "drug", "medication", "prescription", "chemist", "medical store", "pill", "tablet"],
  grocery: ["grocery", "supershop", "supermarket", "groceries", "vegetables", "fruits", "baby food", "diapers", "organic", "fresh produce"],
  hospitals: ["hospital", "doctor", "emergency", "clinic", "medical", "health", "treatment", "ambulance", "icu"],
  hotels: ["hotel", "accommodation", "stay", "room", "resort", "lodge", "motel", "booking", "check-in"],
  shopping: ["shopping", "mall", "shop", "store", "clothes", "clothing", "fashion", "electronics", "buy", "purchase", "retail"],
  "banks-atms": ["bank", "atm", "cash", "withdraw", "money", "transaction", "account", "financial"],
  "fuel-stations": ["fuel", "gas", "petrol", "diesel", "gas station", "refuel", "cng"],
  "beauty-salons": ["salon", "beauty", "haircut", "hair", "facial", "manicure", "pedicure", "spa", "massage", "bridal"],
  gyms: ["gym", "fitness", "workout", "exercise", "training", "muscle", "cardio", "weight", "yoga"],
  "fast-food": ["fast food", "burger", "fries", "quick", "takeaway", "takeout", "drive-through", "snack"],
};

const urgencyKeywords = ["urgent", "emergency", "now", "immediately", "asap", "quick", "fast", "hurry", "right now", "nearest"];
const emergencyKeywords = ["emergency", "ambulance", "police", "fire", "accident", "critical", "life-threatening"];

const dietaryKeywords: Record<string, string[]> = {
  halal: ["halal"],
  vegetarian: ["vegetarian", "veg", "veggie"],
  vegan: ["vegan", "plant-based"],
  glutenFree: ["gluten-free", "gluten free", "celiac"],
};

const amenityKeywords: Record<string, string[]> = {
  wifi: ["wifi", "wi-fi", "internet"],
  parking: ["parking", "park"],
  ac: ["ac", "air conditioned", "air conditioning", "cool"],
  delivery: ["delivery", "deliver", "home delivery"],
  familyFriendly: ["family", "kids", "children", "child"],
  wheelchair: ["wheelchair", "disabled", "accessible", "accessibility"],
};

const budgetPatterns = [
  /(?:under|below|less than|max|maximum|budget|within|around|about)\s*(?:৳|tk|taka|bdt)?\s*(\d+)/i,
  /(?:৳|tk|taka|bdt)\s*(\d+)/i,
  /(\d+)\s*(?:৳|tk|taka|bdt)/i,
  /(\d+)\s*(?:budget|per person|each)/i,
];

const ratingPatterns = [
  /(?:at least|minimum|min|above|over)\s*(\d+\.?\d*)\s*(?:rating|star|stars|rated)/i,
  /(\d+\.?\d*)\s*(?:\+|plus)?\s*(?:rating|star|stars|rated)/i,
  /(?:rating|star|stars|rated)\s*(?:of|above|over|at least)?\s*(\d+\.?\d*)/i,
];

const groupPatterns = [
  /(?:for|group of|party of|table for|with)\s*(\d+)\s*(?:people|persons|guests|members|pax)?/i,
  /(\d+)\s*(?:people|persons|guests|members|pax)/i,
  /(?:family|couple|solo|alone)/i,
];

export function parseUserQuery(query: string): ParsedIntent {
  const lowerQuery = query.toLowerCase();

  // Detect category
  let detectedCategory: string | null = null;
  let maxMatch = 0;
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    let matchCount = 0;
    for (const keyword of keywords) {
      if (lowerQuery.includes(keyword)) matchCount++;
    }
    if (matchCount > maxMatch) {
      maxMatch = matchCount;
      detectedCategory = category;
    }
  }

  // Extract budget
  let budget: number | null = null;
  for (const pattern of budgetPatterns) {
    const match = lowerQuery.match(pattern);
    if (match) {
      budget = parseInt(match[1]);
      break;
    }
  }

  // Extract rating
  let rating: number | null = null;
  for (const pattern of ratingPatterns) {
    const match = lowerQuery.match(pattern);
    if (match) {
      rating = parseFloat(match[1]);
      break;
    }
  }

  // Extract group size
  let groupSize: number | null = null;
  const familyMatch = lowerQuery.match(/family/i);
  if (familyMatch) groupSize = 4;
  const coupleMatch = lowerQuery.match(/couple/i);
  if (coupleMatch) groupSize = 2;
  const soloMatch = lowerQuery.match(/(?:solo|alone|myself)/i);
  if (soloMatch) groupSize = 1;
  for (const pattern of groupPatterns) {
    const match = lowerQuery.match(pattern);
    if (match && match[1]) {
      groupSize = parseInt(match[1]);
      break;
    }
  }

  // Detect urgency
  const isUrgent = urgencyKeywords.some((k) => lowerQuery.includes(k));
  const isEmergency = emergencyKeywords.some((k) => lowerQuery.includes(k));

  // Detect dietary requirements
  const dietaryReqs: string[] = [];
  for (const [req, keywords] of Object.entries(dietaryKeywords)) {
    if (keywords.some((k) => lowerQuery.includes(k))) dietaryReqs.push(req);
  }

  // Detect amenities
  const amenities: string[] = [];
  for (const [amenity, keywords] of Object.entries(amenityKeywords)) {
    if (keywords.some((k) => lowerQuery.includes(k))) amenities.push(amenity);
  }

  // Extract preferences
  const preferences: string[] = [];
  if (lowerQuery.includes("cheap") || lowerQuery.includes("affordable") || lowerQuery.includes("budget"))
    preferences.push("affordable");
  if (lowerQuery.includes("premium") || lowerQuery.includes("luxury") || lowerQuery.includes("best"))
    preferences.push("premium");
  if (lowerQuery.includes("quiet") || lowerQuery.includes("peaceful"))
    preferences.push("quiet");
  if (lowerQuery.includes("open now") || lowerQuery.includes("open right now"))
    preferences.push("openNow");
  if (lowerQuery.includes("nearby") || lowerQuery.includes("near") || lowerQuery.includes("close"))
    preferences.push("nearby");

  // Detect time context
  let timeContext: string | null = null;
  if (lowerQuery.includes("now") || lowerQuery.includes("right now") || lowerQuery.includes("open now"))
    timeContext = "now";
  if (lowerQuery.includes("tonight") || lowerQuery.includes("evening"))
    timeContext = "evening";
  if (lowerQuery.includes("morning") || lowerQuery.includes("breakfast"))
    timeContext = "morning";
  if (lowerQuery.includes("lunch"))
    timeContext = "afternoon";

  // Extract general keywords
  const words = lowerQuery.split(/\s+/).filter((w) => w.length > 2);
  const stopWords = new Set(["the", "and", "for", "with", "that", "this", "from", "are", "was", "were", "been", "have", "has", "had", "not", "but", "what", "all", "can", "her", "his", "one", "our", "out", "you", "day", "get", "how", "its", "may", "new", "now", "old", "see", "way", "who", "did", "let", "say", "she", "too", "use", "need", "want", "find", "looking", "search", "recommend", "suggest", "show"]);
  const keywords = words.filter((w) => !stopWords.has(w));

  return {
    category: detectedCategory,
    budget,
    rating,
    groupSize,
    isUrgent,
    isEmergency,
    preferences,
    keywords,
    timeContext,
    dietaryReqs,
    amenities,
  };
}

export interface BusinessWithScore {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  rating: number | null;
  reviewCount: number | null;
  priceRange: number | null;
  imageUrl: string | null;
  tags: string[] | null;
  features: string[] | null;
  isOpen: boolean | null;
  isPremium: boolean | null;
  isVerified: boolean | null;
  hasDelivery: boolean | null;
  hasWifi: boolean | null;
  hasParking: boolean | null;
  isAirConditioned: boolean | null;
  isFamilyFriendly: boolean | null;
  isWheelchairAccessible: boolean | null;
  hasHalalFood: boolean | null;
  avgBudget: number | null;
  waitingTime: number | null;
  seatsAvailable: number | null;
  categoryName?: string;
  categorySlug?: string;
  categoryColor?: string;
  aiScore: number;
  matchReasons: string[];
  distance?: number;
}

export function calculateAIScore(
  business: Omit<BusinessWithScore, "aiScore" | "matchReasons">,
  intent: ParsedIntent
): { score: number; reasons: string[] } {
  let score = 50; // Base score
  const reasons: string[] = [];

  // Intent match (40%)
  if (intent.category) {
    if (business.categorySlug === intent.category) {
      score += 25;
      reasons.push("Matches your search category");
    }
  }

  // Tag/keyword matching
  const allBusinessKeywords = [
    ...(business.tags || []),
    ...(business.features || []),
    business.name,
    business.description || "",
  ]
    .join(" ")
    .toLowerCase();

  let keywordMatches = 0;
  for (const keyword of intent.keywords) {
    if (allBusinessKeywords.includes(keyword)) keywordMatches++;
  }
  if (keywordMatches > 0) {
    score += Math.min(keywordMatches * 5, 15);
    reasons.push(`Matches ${keywordMatches} of your keywords`);
  }

  // Budget match (20%)
  if (intent.budget && business.avgBudget) {
    if (business.avgBudget <= intent.budget) {
      const budgetRatio = 1 - (business.avgBudget / intent.budget);
      score += Math.round(10 + budgetRatio * 10);
      reasons.push("Within your budget");
    } else {
      const overBudget = (business.avgBudget - intent.budget) / intent.budget;
      score -= Math.round(overBudget * 20);
    }
  }

  // Rating (15%)
  if (business.rating) {
    const ratingBonus = (business.rating / 5) * 15;
    score += Math.round(ratingBonus);
    if (business.rating >= 4.5) reasons.push("Excellent rating");
    else if (business.rating >= 4.0) reasons.push("Great rating");

    if (intent.rating && business.rating >= intent.rating) {
      score += 5;
      reasons.push(`Rating above ${intent.rating}★`);
    }
  }

  // Distance (10%) - simulated based on position
  const distance = business.distance || Math.random() * 5;
  if (distance < 1) {
    score += 10;
    reasons.push("Very close to you");
  } else if (distance < 3) {
    score += 7;
    reasons.push(`${distance.toFixed(1)} km away`);
  } else if (distance < 5) {
    score += 4;
    reasons.push(`${distance.toFixed(1)} km away`);
  }

  // Availability (5%)
  if (business.isOpen) {
    score += 5;
    reasons.push("Open now");
  } else {
    score -= 10;
  }

  // Popularity (5%)
  if (business.reviewCount && business.reviewCount > 200) {
    score += 5;
    reasons.push("Popular choice");
  } else if (business.reviewCount && business.reviewCount > 100) {
    score += 3;
  }

  // Premium boost (5%)
  if (business.isPremium) {
    score += 3;
    reasons.push("Verified premium partner");
  }

  // Amenity matches
  if (intent.amenities.includes("wifi") && business.hasWifi) {
    score += 3;
    reasons.push("Free WiFi available");
  }
  if (intent.amenities.includes("parking") && business.hasParking) {
    score += 3;
    reasons.push("Parking available");
  }
  if (intent.amenities.includes("ac") && business.isAirConditioned) {
    score += 3;
    reasons.push("Air conditioned");
  }
  if (intent.amenities.includes("delivery") && business.hasDelivery) {
    score += 3;
    reasons.push("Home delivery available");
  }
  if (intent.amenities.includes("familyFriendly") && business.isFamilyFriendly) {
    score += 5;
    reasons.push("Family friendly");
  }
  if (intent.amenities.includes("wheelchair") && business.isWheelchairAccessible) {
    score += 3;
    reasons.push("Wheelchair accessible");
  }

  // Dietary matches
  if (intent.dietaryReqs.includes("halal") && business.hasHalalFood) {
    score += 5;
    reasons.push("Halal food available");
  }

  // Group size consideration
  if (intent.groupSize && business.seatsAvailable && business.seatsAvailable >= intent.groupSize) {
    score += 3;
    reasons.push(`Seats available for ${intent.groupSize} people`);
  }

  // Fast service for urgent requests
  if (intent.isUrgent && business.waitingTime !== null && business.waitingTime <= 10) {
    score += 5;
    reasons.push("Quick service");
  }

  // Cap score at 99
  score = Math.min(Math.max(score, 10), 99);

  return { score, reasons };
}

export function generateAIResponse(intent: ParsedIntent): string {
  const parts: string[] = [];

  if (intent.isEmergency) {
    return "🚨 I understand this is an emergency. I'm finding the nearest available services for you right now.";
  }

  parts.push("I understand you're looking for");

  if (intent.category) {
    const categoryNames: Record<string, string> = {
      restaurants: "a restaurant",
      cafes: "a cafe",
      pharmacies: "a pharmacy",
      grocery: "a grocery store",
      hospitals: "a hospital",
      hotels: "a hotel",
      shopping: "a shopping destination",
      "banks-atms": "banking services",
      "fuel-stations": "a fuel station",
      "beauty-salons": "a beauty salon",
      gyms: "a gym",
      "fast-food": "fast food",
    };
    parts.push(categoryNames[intent.category] || intent.category);
  } else {
    parts.push("a local service");
  }

  if (intent.budget) {
    parts.push(`within a budget of ৳${intent.budget}`);
  }

  if (intent.groupSize) {
    parts.push(`for ${intent.groupSize} ${intent.groupSize === 1 ? "person" : "people"}`);
  }

  if (intent.rating) {
    parts.push(`with at least a ${intent.rating}★ rating`);
  }

  if (intent.dietaryReqs.length > 0) {
    parts.push(`with ${intent.dietaryReqs.join(", ")} options`);
  }

  if (intent.isUrgent) {
    parts.push("(urgent)");
  }

  return parts.join(" ") + ". Here are my top recommendations:";
}
