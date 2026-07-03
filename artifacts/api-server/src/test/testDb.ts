import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "@workspace/db/schema";

type TestDb = ReturnType<typeof drizzle<typeof schema>>;

let testDb: TestDb | undefined;
let testClient: PGlite | undefined;

const CREATE_SQL = `
CREATE TABLE admin_users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE shipments (
  id serial PRIMARY KEY,
  tracking_number text NOT NULL UNIQUE,
  reference_number text,
  invoice_number text,
  status text NOT NULL DEFAULT 'booking_confirmed',
  origin text NOT NULL,
  destination text NOT NULL,
  service_type text,
  description text,
  weight numeric,
  pieces integer,
  estimated_delivery text,
  actual_delivery text,
  shipper_name text,
  consignee_name text,
  consignee_phone text,
  consignee_email text,
  notes text,
  notifications_enabled text DEFAULT 'true',
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE status_updates (
  id serial PRIMARY KEY,
  shipment_id integer NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status text NOT NULL,
  location text NOT NULL,
  description text,
  timestamp timestamp NOT NULL DEFAULT now()
);

CREATE TABLE gallery_items (
  id serial PRIMARY KEY,
  media_type text NOT NULL DEFAULT 'image',
  object_key text NOT NULL,
  widths text NOT NULL DEFAULT '480,800,1200,1600,2000',
  width integer NOT NULL DEFAULT 0,
  height integer NOT NULL DEFAULT 0,
  blur_data_url text,
  title text NOT NULL DEFAULT 'Operation',
  title_ar text,
  description text,
  description_ar text,
  alt_text text,
  category text NOT NULL DEFAULT 'operations',
  location text,
  location_ar text,
  month_year text,
  video_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
`;

/**
 * Rebuild a fresh in-memory Postgres for a clean, isolated test run.
 * Called before each test so no state leaks between cases.
 */
const TABLES = ["gallery_items", "status_updates", "shipments", "admin_users"];

export async function resetTestDb(): Promise<TestDb> {
  if (!testClient) {
    testClient = new PGlite();
    await testClient.exec(CREATE_SQL);
    testDb = drizzle(testClient, { schema });
  } else {
    await testClient.exec(
      `TRUNCATE ${TABLES.join(", ")} RESTART IDENTITY CASCADE;`,
    );
  }
  return testDb!;
}

export function getTestDb(): TestDb {
  if (!testDb) {
    throw new Error("Test DB not initialized. Did the setup beforeEach run?");
  }
  return testDb;
}
