import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  integer,
  numeric,
  pgEnum,
  jsonb,
  uniqueIndex,
  date,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ==========================================
// 1. ENUMS
// ==========================================
export const kycStatusEnum = pgEnum("kyc_status", [
  "pending",
  "approved",
  "rejected",
]);
export const kycDocumentTypeEnum = pgEnum("kyc_document_type", [
  "cnic_front",
  "cnic_back",
  "license",
  "selfie",
]);
export const vehicleDocumentTypeEnum = pgEnum("vehicle_document_type", [
  "registration",
  "insurance",
]);
export const vehicleStatusEnum = pgEnum("vehicle_status", [
  "active",
  "under_review",
  "suspended",
]);
export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "ongoing",
  "completed",
  "cancelled",
]);
export const paymentTypeEnum = pgEnum("payment_type", [
  "deposit",
  "rental_fee",
  "refund",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "completed",
  "failed",
  "refunded",
]);
export const disputeStatusEnum = pgEnum("dispute_status", [
  "open",
  "under_review",
  "resolved",
  "rejected",
]);
export const adminLevelEnum = pgEnum("admin_level", [
  "super_admin",
  "moderator",
  "support",
]);

// ------------------------------------------
// BLOCKCHAIN ENUMS — commented out for now.
// Uncomment when escrow/on-chain integration is wired back in.
// ------------------------------------------
// export const txStatusEnum = pgEnum('tx_status', ['pending', 'mined', 'confirmed', 'failed', 'dropped']);
// export const escrowStateEnum = pgEnum('escrow_state', ['awaiting_deposit', 'locked_in_contract', 'released_to_owner', 'refunded_to_renter', 'in_dispute']);

// ==========================================
// 2. IDENTITY & CORE USER SCHEMAS
// ==========================================
export const users = pgTable("users", {
  id: uuid("id").primaryKey(), // Direct reference to Supabase auth.users
  fullName: text("full_name").notNull(),
  email: text("email").unique().notNull(),
  phoneNumber: text("phone_number").unique(),
  // walletAddress: text('wallet_address').unique(), // BLOCKCHAIN — re-add when wallet linking is implemented
  profilePictureUrl: text("profile_picture_url"),
  isKycVerified: boolean("is_kyc_verified").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const admins = pgTable("admins", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  adminLevel: adminLevelEnum("admin_level").default("support").notNull(),
  assignedAt: timestamp("assigned_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const userKycDocuments = pgTable("user_kyc_documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  documentType: kycDocumentTypeEnum("document_type").notNull(),
  documentUrl: text("document_url").notNull(),
  status: kycStatusEnum("status").default("pending").notNull(),
  reviewedBy: uuid("reviewed_by").references(() => admins.userId, {
    onDelete: "set null",
  }),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==========================================
// 3. VEHICLE & ASSET SCHEMAS
// ==========================================
export const vehicles = pgTable("vehicles", {
  id: uuid("id").defaultRandom().primaryKey(),
  ownerId: uuid("owner_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  plateNumber: text("plate_number").unique().notNull(),
  transmission: text("transmission").notNull(), // 'manual', 'automatic'
  fuelType: text("fuel_type").notNull(),
  seats: integer("seats").notNull(),
  city: text("city").notNull(), // plain text for now — swap for PostGIS geography later if "near me" search is needed
  dailyRate: numeric("daily_rate", { precision: 10, scale: 2 }).notNull(),
  status: vehicleStatusEnum("status").default("under_review").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const vehicleImages = pgTable(
  "vehicle_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    vehicleId: uuid("vehicle_id")
      .references(() => vehicles.id, { onDelete: "cascade" })
      .notNull(),
    imageUrl: text("image_url").notNull(),
    isPrimary: boolean("is_primary").default(false).notNull(),
    displayOrder: integer("display_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    // Partial unique index — max one primary image per vehicle
    singlePrimaryImage: uniqueIndex("only_one_primary_image")
      .on(table.vehicleId)
      .where(sql`${table.isPrimary} = true`),
  }),
);

export const vehicleDocuments = pgTable("vehicle_documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  vehicleId: uuid("vehicle_id")
    .references(() => vehicles.id, { onDelete: "cascade" })
    .notNull(),
  documentType: vehicleDocumentTypeEnum("document_type").notNull(),
  documentUrl: text("document_url").notNull(),
  status: kycStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==========================================
// 4. BOOKINGS & AVAILABILITY
// ==========================================
// NOTE: daterange + EXCLUDE USING gist double-booking protection removed —
// Drizzle doesn't support EXCLUDE constraints natively yet (open feature
// request, no built-in helper). Using plain start/end dates for now.
// Double-booking must be checked at the application/API layer until an
// EXCLUDE constraint is added via a manual SQL migration later.

export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  renterId: uuid("renter_id")
    .references(() => users.id)
    .notNull(),
  vehicleId: uuid("vehicle_id")
    .references(() => vehicles.id)
    .notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: bookingStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const vehicleBlocks = pgTable("vehicle_blocks", {
  id: uuid("id").defaultRandom().primaryKey(),
  vehicleId: uuid("vehicle_id")
    .references(() => vehicles.id, { onDelete: "cascade" })
    .notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==========================================
// 5. PAYMENTS (non-blockchain, for now)
// ==========================================
export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingId: uuid("booking_id")
    .references(() => bookings.id)
    .notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  paymentType: paymentTypeEnum("payment_type").notNull(),
  status: paymentStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ------------------------------------------
// BLOCKCHAIN ESCROW LEDGER — commented out for now.
// Re-enable once smart contracts are deployed and wallet integration is ready.
// ------------------------------------------
// export const escrowLedgers = pgTable('escrow_ledgers', {
//   id: uuid('id').defaultRandom().primaryKey(),
//   bookingId: uuid('booking_id').references(() => bookings.id).notNull(),
//   contractAddress: text('contract_address').notNull(),
//   amountWei: numeric('amount_wei', { precision: 78, scale: 0 }).notNull(),
//   state: escrowStateEnum('state').default('awaiting_deposit').notNull(),
//   updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
// });
//
// export const blockchainTransactions = pgTable('blockchain_transactions', {
//   id: uuid('id').defaultRandom().primaryKey(),
//   escrowId: uuid('escrow_id').references(() => escrowLedgers.id).notNull(),
//   txHash: text('tx_hash').unique().notNull(),
//   walletAddress: text('wallet_address').notNull(),
//   action: text('action').notNull(), // 'deposit', 'release', 'refund'
//   status: txStatusEnum('status').default('pending').notNull(),
//   blockNumber: numeric('block_number'),
//   gasUsed: numeric('gas_used'),
//   createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
// });

// ==========================================
// 6. DISPUTES, REVIEWS, & AUDITS
// ==========================================
export const disputes = pgTable("disputes", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingId: uuid("booking_id")
    .references(() => bookings.id)
    .unique()
    .notNull(), // 1:1
  raisedBy: uuid("raised_by")
    .references(() => users.id)
    .notNull(),
  reason: text("reason").notNull(),
  status: disputeStatusEnum("status").default("open").notNull(),
  resolvedBy: uuid("resolved_by").references(() => admins.userId, {
    onDelete: "set null",
  }),
  resolutionNotes: text("resolution_notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  resolvedAt: timestamp("resolved_at", { withTimezone: true }),
});

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingId: uuid("booking_id")
      .references(() => bookings.id, { onDelete: "cascade" })
      .notNull(),
    reviewerId: uuid("reviewer_id")
      .references(() => users.id)
      .notNull(),
    revieweeId: uuid("reviewee_id")
      .references(() => users.id)
      .notNull(),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    oneReviewPerBooking: uniqueIndex("one_review_per_booking").on(
      table.bookingId,
      table.reviewerId,
    ),
  }),
);

export const adminLogs = pgTable("admin_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  adminId: uuid("admin_id")
    .references(() => admins.userId, { onDelete: "cascade" })
    .notNull(),
  actionType: text("action_type").notNull(),
  payload: jsonb("payload"),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ==========================================
// 7. MESSAGING & NOTIFICATIONS
// ==========================================
export const conversations = pgTable(
  "conversations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    renterId: uuid("renter_id")
      .references(() => users.id)
      .notNull(),
    ownerId: uuid("owner_id")
      .references(() => users.id)
      .notNull(),
    vehicleId: uuid("vehicle_id")
      .references(() => vehicles.id)
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniqueConversation: uniqueIndex("unique_conversation").on(
      table.renterId,
      table.ownerId,
      table.vehicleId,
    ),
  }),
);

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id")
    .references(() => conversations.id, { onDelete: "cascade" })
    .notNull(),
  senderId: uuid("sender_id")
    .references(() => users.id)
    .notNull(),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const deviceTokens = pgTable("device_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  fcmToken: text("fcm_token").unique().notNull(),
  platform: text("platform").notNull(), // 'android', 'ios', 'web'
  isActive: boolean("is_active").default(true).notNull(),
  lastFailedAt: timestamp("last_failed_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  payload: jsonb("payload"),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
