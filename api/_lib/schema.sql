-- Parva Realty — Admin Dashboard schema
-- Run this once against your Postgres database (see scripts/migrate.js).

CREATE TABLE IF NOT EXISTS properties (
  id                SERIAL PRIMARY KEY,
  name              TEXT NOT NULL,
  location          TEXT NOT NULL,
  type              TEXT NOT NULL DEFAULT '',
  bedrooms          INT NOT NULL DEFAULT 1,
  unit_types        TEXT DEFAULT '',
  area              TEXT DEFAULT '',
  price             TEXT DEFAULT '',
  price_aed         TEXT DEFAULT '',
  rental_yield      NUMERIC(5,2) DEFAULT 0,
  appreciation      NUMERIC(5,2) DEFAULT 0,
  developer         TEXT DEFAULT '',
  completion        TEXT DEFAULT '',
  tag               TEXT DEFAULT '',
  tag_col           TEXT DEFAULT '#C9A44A',
  tier              TEXT NOT NULL DEFAULT 'Mid-Range',
  standout          TEXT DEFAULT '',
  description       TEXT DEFAULT '',
  image             TEXT DEFAULT '',
  gallery           JSONB NOT NULL DEFAULT '[]',
  zone              TEXT DEFAULT '',
  views             INT DEFAULT 0,
  floors            INT DEFAULT 0,
  total_units       INT NOT NULL DEFAULT 0,
  available_units   INT NOT NULL DEFAULT 0,
  status            TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'unavailable')),
  min_deposit       TEXT DEFAULT '',
  handover_quarter  TEXT DEFAULT '',
  amenities         JSONB NOT NULL DEFAULT '[]',
  payment_plan      JSONB NOT NULL DEFAULT '[]',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_log (
  id             SERIAL PRIMARY KEY,
  property_id    INT,
  property_name  TEXT,
  admin_name     TEXT NOT NULL,
  action         TEXT NOT NULL, -- created | updated | deleted | status_changed
  field          TEXT,
  old_value      TEXT,
  new_value      TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties (status);
CREATE INDEX IF NOT EXISTS idx_properties_zone ON properties (zone);
