import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  varchar,
  boolean,
  decimal,
  json,
} from "drizzle-orm/pg-core";

// -------------------- Users --------------------
export const users = pgTable("users", {
  uid: varchar("uid", { length: 255 }).primaryKey(),
  displayName: varchar("display_name", { length: 255 }),
  bio: text("bio"),
  userRole: varchar("user_role", { length: 50 }).default("user").notNull(),
  phone: varchar("phone", { length: 20 }),
  whatsappNumber: varchar("whatsapp_number", { length: 20 }),
  address: text("address"),
  farmingExperience: integer("farming_experience"), // Years of experience
  profilePhoto: varchar("profile_photo", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// -------------------- Listings (Livestock) --------------------
export const listings = pgTable("listings", {
  id: serial("id").primaryKey(),

  // -- Seller Info --
  sellerUid: varchar("seller_uid", { length: 255 }).references(() => users.uid).notNull(),

  // -- Animal Basic Info --
  type: varchar("type", { length: 50 }).notNull(), // Cow, Buffalo, Bull, etc.
  breed: varchar("breed", { length: 100 }),
  age: integer("age"), // in months or years, maybe store as months
  ageUnit: varchar("age_unit", { length: 20 }).default("years"), // months / years
  gender: varchar("gender", { length: 20 }), // Male / Female

  // -- Production & Health --
  lactationStage: varchar("lactation_stage", { length: 50 }), // 1st, 2nd, Dry, etc.
  milkProduction: decimal("milk_production", { precision: 5, scale: 2 }), // Liters per day
  fatPercentage: decimal("fat_percentage", { precision: 4, scale: 2 }),
  pregnancyStatus: varchar("pregnancy_status", { length: 50 }), // Pregnant, Not Pregnant, etc.
  calfDetails: text("calf_details"), // "Male calf, 2 months old"
  vaccinationInfo: text("vaccination_info"),
  source: varchar("source", { length: 50 }), // Home-raised, Market

  // -- Media --
  images: json("images").$type<string[]>(), // Array of image URLs
  video: varchar("video", { length: 500 }), // Video URL

  // -- Location --
  locationLat: decimal("location_lat", { precision: 10, scale: 7 }),
  locationLng: decimal("location_lng", { precision: 10, scale: 7 }),
  district: varchar("district", { length: 100 }),
  state: varchar("state", { length: 100 }),
  pincode: varchar("pincode", { length: 20 }),

  // -- Pricing & Status --
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  isNegotiable: boolean("is_negotiable").default(false),
  status: varchar("status", { length: 20 }).default("active"), // active, sold, draft

  // -- Engagement Metrics --
  viewCount: integer("view_count").default(0),
  callCount: integer("call_count").default(0),
  whatsappCount: integer("whatsapp_count").default(0),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// -------------------- Wishlist --------------------
export const wishlist = pgTable("wishlist", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => users.uid).notNull(),
  listingId: integer("listing_id").references(() => listings.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// -------------------- Vendors (Future Scope - Become Seller Tab) --------------------
// Keeping placeholder for now or can implement if needed immediately
