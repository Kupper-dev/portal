-- Auto-generated migration from Podio Schema

-- Table: customers (Podio App ID: 30429788)
CREATE TABLE IF NOT EXISTS customers (
  id BIGINT PRIMARY KEY, -- Podio Item ID
  podio_app_item_id INT, -- Ref to app_item_id usually
  created_at TIMESTAMPTZ DEFAULT now(),
  last_event_on TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Columns for customers
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customers' AND column_name = 'name') THEN
    ALTER TABLE customers ADD COLUMN "name" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customers' AND column_name = 'recipient') THEN
    ALTER TABLE customers ADD COLUMN "recipient" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customers' AND column_name = 'phone') THEN
    ALTER TABLE customers ADD COLUMN "phone" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customers' AND column_name = 'email') THEN
    ALTER TABLE customers ADD COLUMN "email" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customers' AND column_name = 'type') THEN
    ALTER TABLE customers ADD COLUMN "type" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customers' AND column_name = 'address') THEN
    ALTER TABLE customers ADD COLUMN "address" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customers' AND column_name = 'whatsapp') THEN
    ALTER TABLE customers ADD COLUMN "whatsapp" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customers' AND column_name = 'auth0id') THEN
    ALTER TABLE customers ADD COLUMN "auth0id" text;
  END IF;
END$$;

-- Table: students (Podio App ID: 30432041)
CREATE TABLE IF NOT EXISTS students (
  id BIGINT PRIMARY KEY, -- Podio Item ID
  podio_app_item_id INT, -- Ref to app_item_id usually
  created_at TIMESTAMPTZ DEFAULT now(),
  last_event_on TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Columns for students
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'name') THEN
    ALTER TABLE students ADD COLUMN "name" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'email') THEN
    ALTER TABLE students ADD COLUMN "email" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'phone') THEN
    ALTER TABLE students ADD COLUMN "phone" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'grade') THEN
    ALTER TABLE students ADD COLUMN "grade" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'progress') THEN
    ALTER TABLE students ADD COLUMN "progress" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'status') THEN
    ALTER TABLE students ADD COLUMN "status" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'level') THEN
    ALTER TABLE students ADD COLUMN "level" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'auth0id') THEN
    ALTER TABLE students ADD COLUMN "auth0id" text;
  END IF;
END$$;
