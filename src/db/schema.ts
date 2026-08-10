import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  doublePrecision,
  jsonb,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  icon: varchar("icon", { length: 50 }).notNull(),
  color: varchar("color", { length: 20 }).notNull(),
  description: text("description"),
  businessCount: integer("business_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const businesses = pgTable("businesses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  description: text("description"),
  address: text("address").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  website: varchar("website", { length: 255 }),
  priceRange: integer("price_range").default(2), // 1-4
  rating: doublePrecision("rating").default(0),
  reviewCount: integer("review_count").default(0),
  imageUrl: text("image_url"),
  photos: jsonb("photos").$type<string[]>(),
  tags: jsonb("tags").$type<string[]>(),
  features: jsonb("features").$type<string[]>(),
  openingHours: jsonb("opening_hours").$type<Record<string, string>>(),
  isOpen: boolean("is_open").default(true),
  isPremium: boolean("is_premium").default(false),
  isVerified: boolean("is_verified").default(false),
  hasDelivery: boolean("has_delivery").default(false),
  hasWifi: boolean("has_wifi").default(false),
  hasParking: boolean("has_parking").default(false),
  isAirConditioned: boolean("is_air_conditioned").default(false),
  isFamilyFriendly: boolean("is_family_friendly").default(false),
  isWheelchairAccessible: boolean("is_wheelchair_accessible").default(false),
  hasHalalFood: boolean("has_halal_food").default(false),
  avgBudget: integer("avg_budget"),
  waitingTime: integer("waiting_time"), // minutes
  seatsAvailable: integer("seats_available"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").references(() => businesses.id),
  userName: varchar("user_name", { length: 100 }).notNull(),
  rating: doublePrecision("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const searchHistory = pgTable("search_history", {
  id: serial("id").primaryKey(),
  query: text("query").notNull(),
  parsedIntent: jsonb("parsed_intent"),
  resultCount: integer("result_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").references(() => businesses.id),
  createdAt: timestamp("created_at").defaultNow(),
});
