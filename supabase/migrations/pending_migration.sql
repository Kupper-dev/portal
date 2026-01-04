-- Auto-generated migration from Podio Schema

-- Table: customers (Podio App ID: 30429788)
CREATE TABLE IF NOT EXISTS customers (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customers' AND column_name = 'podio_item_id') THEN
    ALTER TABLE customers ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customers' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE customers ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customers' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE customers ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customers' AND column_name = 'created_at') THEN
    ALTER TABLE customers ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customers' AND column_name = 'updated_at') THEN
    ALTER TABLE customers ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'customers' AND column_name = 'last_updated_at') THEN
    ALTER TABLE customers ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
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

-- Table: devices (Podio App ID: 30429789)
CREATE TABLE IF NOT EXISTS devices (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'devices' AND column_name = 'podio_item_id') THEN
    ALTER TABLE devices ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'devices' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE devices ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'devices' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE devices ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'devices' AND column_name = 'created_at') THEN
    ALTER TABLE devices ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'devices' AND column_name = 'updated_at') THEN
    ALTER TABLE devices ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'devices' AND column_name = 'last_updated_at') THEN
    ALTER TABLE devices ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'devices' AND column_name = 'brandmodel') THEN
    ALTER TABLE devices ADD COLUMN "brandmodel" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'devices' AND column_name = 'customer') THEN
    ALTER TABLE devices ADD COLUMN "customer" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'devices' AND column_name = 'type') THEN
    ALTER TABLE devices ADD COLUMN "type" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'devices' AND column_name = 'password') THEN
    ALTER TABLE devices ADD COLUMN "password" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'devices' AND column_name = 'serial') THEN
    ALTER TABLE devices ADD COLUMN "serial" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'devices' AND column_name = 'departmentorcontact') THEN
    ALTER TABLE devices ADD COLUMN "departmentorcontact" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'devices' AND column_name = 'status') THEN
    ALTER TABLE devices ADD COLUMN "status" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'devices' AND column_name = 'nextmaintenance') THEN
    ALTER TABLE devices ADD COLUMN "nextmaintenance" timestamptz;
  END IF;
END$$;

-- Table: services (Podio App ID: 30429812)
CREATE TABLE IF NOT EXISTS services (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'podio_item_id') THEN
    ALTER TABLE services ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE services ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE services ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'created_at') THEN
    ALTER TABLE services ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'updated_at') THEN
    ALTER TABLE services ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'last_updated_at') THEN
    ALTER TABLE services ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'customer') THEN
    ALTER TABLE services ADD COLUMN "customer" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'device') THEN
    ALTER TABLE services ADD COLUMN "device" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'status') THEN
    ALTER TABLE services ADD COLUMN "status" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'date') THEN
    ALTER TABLE services ADD COLUMN "date" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'aproxcompletationdate') THEN
    ALTER TABLE services ADD COLUMN "aproxcompletationdate" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'servicetype') THEN
    ALTER TABLE services ADD COLUMN "servicetype" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'requestorissue') THEN
    ALTER TABLE services ADD COLUMN "requestorissue" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'issuereformulation') THEN
    ALTER TABLE services ADD COLUMN "issuereformulation" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'serviceorsparepart') THEN
    ALTER TABLE services ADD COLUMN "serviceorsparepart" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'technician') THEN
    ALTER TABLE services ADD COLUMN "technician" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'observations') THEN
    ALTER TABLE services ADD COLUMN "observations" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'poweradapter') THEN
    ALTER TABLE services ADD COLUMN "poweradapter" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'accessories') THEN
    ALTER TABLE services ADD COLUMN "accessories" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'databackup') THEN
    ALTER TABLE services ADD COLUMN "databackup" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'price') THEN
    ALTER TABLE services ADD COLUMN "price" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'advancepayment') THEN
    ALTER TABLE services ADD COLUMN "advancepayment" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'performedservices') THEN
    ALTER TABLE services ADD COLUMN "performedservices" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'renderedservices') THEN
    ALTER TABLE services ADD COLUMN "renderedservices" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'diagnosis') THEN
    ALTER TABLE services ADD COLUMN "diagnosis" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'yearmonth') THEN
    ALTER TABLE services ADD COLUMN "yearmonth" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'reminder') THEN
    ALTER TABLE services ADD COLUMN "reminder" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'serviceunder30min') THEN
    ALTER TABLE services ADD COLUMN "serviceunder30min" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'datereceived') THEN
    ALTER TABLE services ADD COLUMN "datereceived" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'datecheckupstart') THEN
    ALTER TABLE services ADD COLUMN "datecheckupstart" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'datediagnosed') THEN
    ALTER TABLE services ADD COLUMN "datediagnosed" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'date_diagnosis') THEN
    ALTER TABLE services ADD COLUMN "date_diagnosis" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'datepartsordered') THEN
    ALTER TABLE services ADD COLUMN "datepartsordered" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'daterepairstart') THEN
    ALTER TABLE services ADD COLUMN "daterepairstart" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'daterepairready') THEN
    ALTER TABLE services ADD COLUMN "daterepairready" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'datedevicedelivered') THEN
    ALTER TABLE services ADD COLUMN "datedevicedelivered" timestamptz;
  END IF;
END$$;

-- Table: service_or_spare_part (Podio App ID: 30429856)
CREATE TABLE IF NOT EXISTS service_or_spare_part (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'podio_item_id') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'created_at') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'updated_at') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'last_updated_at') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'description') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "description" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'quantity') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "quantity" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'warranty') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "warranty" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'datestart') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "datestart" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'dateends') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "dateends" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'observations') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "observations" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'price') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "price" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'total') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "total" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'cost') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "cost" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'service_or_spare_part' AND column_name = 'profit') THEN
    ALTER TABLE service_or_spare_part ADD COLUMN "profit" text;
  END IF;
END$$;

-- Table: store (Podio App ID: 30429881)
CREATE TABLE IF NOT EXISTS store (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'podio_item_id') THEN
    ALTER TABLE store ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE store ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE store ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'created_at') THEN
    ALTER TABLE store ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'updated_at') THEN
    ALTER TABLE store ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'last_updated_at') THEN
    ALTER TABLE store ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'customer') THEN
    ALTER TABLE store ADD COLUMN "customer" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'speed') THEN
    ALTER TABLE store ADD COLUMN "speed" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'warranty') THEN
    ALTER TABLE store ADD COLUMN "warranty" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'condition') THEN
    ALTER TABLE store ADD COLUMN "condition" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'date') THEN
    ALTER TABLE store ADD COLUMN "date" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'action') THEN
    ALTER TABLE store ADD COLUMN "action" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'brandmodel') THEN
    ALTER TABLE store ADD COLUMN "brandmodel" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'price') THEN
    ALTER TABLE store ADD COLUMN "price" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'processormodelclock') THEN
    ALTER TABLE store ADD COLUMN "processormodelclock" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'sticker') THEN
    ALTER TABLE store ADD COLUMN "sticker" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'ram') THEN
    ALTER TABLE store ADD COLUMN "ram" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'ssd') THEN
    ALTER TABLE store ADD COLUMN "ssd" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'plus1tb') THEN
    ALTER TABLE store ADD COLUMN "plus1tb" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'touchscreen') THEN
    ALTER TABLE store ADD COLUMN "touchscreen" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'fingerprint') THEN
    ALTER TABLE store ADD COLUMN "fingerprint" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'webcam') THEN
    ALTER TABLE store ADD COLUMN "webcam" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'numpad') THEN
    ALTER TABLE store ADD COLUMN "numpad" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'ethernet') THEN
    ALTER TABLE store ADD COLUMN "ethernet" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'videooutput') THEN
    ALTER TABLE store ADD COLUMN "videooutput" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'usbaports') THEN
    ALTER TABLE store ADD COLUMN "usbaports" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'operativesystem') THEN
    ALTER TABLE store ADD COLUMN "operativesystem" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'batterycyclecount') THEN
    ALTER TABLE store ADD COLUMN "batterycyclecount" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'graphics') THEN
    ALTER TABLE store ADD COLUMN "graphics" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'displaysize') THEN
    ALTER TABLE store ADD COLUMN "displaysize" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'displayresolution') THEN
    ALTER TABLE store ADD COLUMN "displayresolution" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'usbcports') THEN
    ALTER TABLE store ADD COLUMN "usbcports" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'devicein_exchange') THEN
    ALTER TABLE store ADD COLUMN "devicein_exchange" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'priceofdeviceexchange') THEN
    ALTER TABLE store ADD COLUMN "priceofdeviceexchange" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'store' AND column_name = 'updatedpricewithexchange') THEN
    ALTER TABLE store ADD COLUMN "updatedpricewithexchange" text;
  END IF;
END$$;

-- Table: gamer (Podio App ID: 30429901)
CREATE TABLE IF NOT EXISTS gamer (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'podio_item_id') THEN
    ALTER TABLE gamer ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE gamer ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE gamer ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'created_at') THEN
    ALTER TABLE gamer ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'updated_at') THEN
    ALTER TABLE gamer ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'last_updated_at') THEN
    ALTER TABLE gamer ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'customer') THEN
    ALTER TABLE gamer ADD COLUMN "customer" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'date_2') THEN
    ALTER TABLE gamer ADD COLUMN "date_2" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'date') THEN
    ALTER TABLE gamer ADD COLUMN "date" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'action') THEN
    ALTER TABLE gamer ADD COLUMN "action" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'price') THEN
    ALTER TABLE gamer ADD COLUMN "price" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'advancepayment') THEN
    ALTER TABLE gamer ADD COLUMN "advancepayment" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'sticker') THEN
    ALTER TABLE gamer ADD COLUMN "sticker" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'warranty') THEN
    ALTER TABLE gamer ADD COLUMN "warranty" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'motherboard') THEN
    ALTER TABLE gamer ADD COLUMN "motherboard" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'ram') THEN
    ALTER TABLE gamer ADD COLUMN "ram" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'processor') THEN
    ALTER TABLE gamer ADD COLUMN "processor" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'storage') THEN
    ALTER TABLE gamer ADD COLUMN "storage" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'powersupply') THEN
    ALTER TABLE gamer ADD COLUMN "powersupply" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'coolingsystem') THEN
    ALTER TABLE gamer ADD COLUMN "coolingsystem" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'graphicscard') THEN
    ALTER TABLE gamer ADD COLUMN "graphicscard" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'case') THEN
    ALTER TABLE gamer ADD COLUMN "case" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'monitor') THEN
    ALTER TABLE gamer ADD COLUMN "monitor" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'peripherals') THEN
    ALTER TABLE gamer ADD COLUMN "peripherals" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'operativesystem') THEN
    ALTER TABLE gamer ADD COLUMN "operativesystem" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'gamer' AND column_name = 'plus1tb') THEN
    ALTER TABLE gamer ADD COLUMN "plus1tb" jsonb;
  END IF;
END$$;

-- Table: acquired_devices (Podio App ID: 30429926)
CREATE TABLE IF NOT EXISTS acquired_devices (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'podio_item_id') THEN
    ALTER TABLE acquired_devices ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE acquired_devices ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE acquired_devices ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'created_at') THEN
    ALTER TABLE acquired_devices ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'updated_at') THEN
    ALTER TABLE acquired_devices ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'last_updated_at') THEN
    ALTER TABLE acquired_devices ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'customer') THEN
    ALTER TABLE acquired_devices ADD COLUMN "customer" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'action') THEN
    ALTER TABLE acquired_devices ADD COLUMN "action" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'date') THEN
    ALTER TABLE acquired_devices ADD COLUMN "date" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'brandmodel') THEN
    ALTER TABLE acquired_devices ADD COLUMN "brandmodel" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'databackup') THEN
    ALTER TABLE acquired_devices ADD COLUMN "databackup" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'poweradapter') THEN
    ALTER TABLE acquired_devices ADD COLUMN "poweradapter" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'serial') THEN
    ALTER TABLE acquired_devices ADD COLUMN "serial" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'knownissues') THEN
    ALTER TABLE acquired_devices ADD COLUMN "knownissues" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'observations') THEN
    ALTER TABLE acquired_devices ADD COLUMN "observations" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'acquired_devices' AND column_name = 'acquisitioncost') THEN
    ALTER TABLE acquired_devices ADD COLUMN "acquisitioncost" numeric;
  END IF;
END$$;

-- Table: quotations (Podio App ID: 30429927)
CREATE TABLE IF NOT EXISTS quotations (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'podio_item_id') THEN
    ALTER TABLE quotations ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE quotations ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE quotations ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'created_at') THEN
    ALTER TABLE quotations ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'updated_at') THEN
    ALTER TABLE quotations ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'last_updated_at') THEN
    ALTER TABLE quotations ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'customer') THEN
    ALTER TABLE quotations ADD COLUMN "customer" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'action') THEN
    ALTER TABLE quotations ADD COLUMN "action" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'date') THEN
    ALTER TABLE quotations ADD COLUMN "date" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'serviceorsparepart') THEN
    ALTER TABLE quotations ADD COLUMN "serviceorsparepart" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'type') THEN
    ALTER TABLE quotations ADD COLUMN "type" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'price') THEN
    ALTER TABLE quotations ADD COLUMN "price" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'advancepayment') THEN
    ALTER TABLE quotations ADD COLUMN "advancepayment" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'bankaccount') THEN
    ALTER TABLE quotations ADD COLUMN "bankaccount" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'bankaccountrendered') THEN
    ALTER TABLE quotations ADD COLUMN "bankaccountrendered" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'serviceimage') THEN
    ALTER TABLE quotations ADD COLUMN "serviceimage" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'quotations' AND column_name = 'servicedetails') THEN
    ALTER TABLE quotations ADD COLUMN "servicedetails" text;
  END IF;
END$$;

-- Table: plans (Podio App ID: 30429978)
CREATE TABLE IF NOT EXISTS plans (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'podio_item_id') THEN
    ALTER TABLE plans ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE plans ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE plans ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'created_at') THEN
    ALTER TABLE plans ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'updated_at') THEN
    ALTER TABLE plans ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'last_updated_at') THEN
    ALTER TABLE plans ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'customer') THEN
    ALTER TABLE plans ADD COLUMN "customer" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'action') THEN
    ALTER TABLE plans ADD COLUMN "action" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'type') THEN
    ALTER TABLE plans ADD COLUMN "type" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'employees') THEN
    ALTER TABLE plans ADD COLUMN "employees" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'numberofvisits') THEN
    ALTER TABLE plans ADD COLUMN "numberofvisits" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'numberofdevices') THEN
    ALTER TABLE plans ADD COLUMN "numberofdevices" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'devices') THEN
    ALTER TABLE plans ADD COLUMN "devices" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'location') THEN
    ALTER TABLE plans ADD COLUMN "location" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'date') THEN
    ALTER TABLE plans ADD COLUMN "date" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'monthlyfee') THEN
    ALTER TABLE plans ADD COLUMN "monthlyfee" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'onsitevisits') THEN
    ALTER TABLE plans ADD COLUMN "onsitevisits" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'remoteservices') THEN
    ALTER TABLE plans ADD COLUMN "remoteservices" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'serviceorsparepart') THEN
    ALTER TABLE plans ADD COLUMN "serviceorsparepart" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'quotations') THEN
    ALTER TABLE plans ADD COLUMN "quotations" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'notificationsettings') THEN
    ALTER TABLE plans ADD COLUMN "notificationsettings" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'tickets') THEN
    ALTER TABLE plans ADD COLUMN "tickets" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plans' AND column_name = 'appointments') THEN
    ALTER TABLE plans ADD COLUMN "appointments" jsonb;
  END IF;
END$$;

-- Table: invoices (Podio App ID: 30458040)
CREATE TABLE IF NOT EXISTS invoices (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'podio_item_id') THEN
    ALTER TABLE invoices ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE invoices ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE invoices ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'created_at') THEN
    ALTER TABLE invoices ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'updated_at') THEN
    ALTER TABLE invoices ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'last_updated_at') THEN
    ALTER TABLE invoices ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'customer') THEN
    ALTER TABLE invoices ADD COLUMN "customer" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'type') THEN
    ALTER TABLE invoices ADD COLUMN "type" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'action') THEN
    ALTER TABLE invoices ADD COLUMN "action" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'date') THEN
    ALTER TABLE invoices ADD COLUMN "date" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'monthlyfee') THEN
    ALTER TABLE invoices ADD COLUMN "monthlyfee" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'services') THEN
    ALTER TABLE invoices ADD COLUMN "services" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'tickets') THEN
    ALTER TABLE invoices ADD COLUMN "tickets" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'appointments') THEN
    ALTER TABLE invoices ADD COLUMN "appointments" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'serviceorsparepart') THEN
    ALTER TABLE invoices ADD COLUMN "serviceorsparepart" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'numberofvisits') THEN
    ALTER TABLE invoices ADD COLUMN "numberofvisits" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'numberofdevices') THEN
    ALTER TABLE invoices ADD COLUMN "numberofdevices" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'minutesused') THEN
    ALTER TABLE invoices ADD COLUMN "minutesused" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'visitsused') THEN
    ALTER TABLE invoices ADD COLUMN "visitsused" text;
  END IF;
END$$;

-- Table: appointments (Podio App ID: 30432187)
CREATE TABLE IF NOT EXISTS appointments (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'podio_item_id') THEN
    ALTER TABLE appointments ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE appointments ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE appointments ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'created_at') THEN
    ALTER TABLE appointments ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'updated_at') THEN
    ALTER TABLE appointments ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'last_updated_at') THEN
    ALTER TABLE appointments ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'customer') THEN
    ALTER TABLE appointments ADD COLUMN "customer" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'planadministrator') THEN
    ALTER TABLE appointments ADD COLUMN "planadministrator" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'date') THEN
    ALTER TABLE appointments ADD COLUMN "date" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'status') THEN
    ALTER TABLE appointments ADD COLUMN "status" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'location') THEN
    ALTER TABLE appointments ADD COLUMN "location" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'moredetails') THEN
    ALTER TABLE appointments ADD COLUMN "moredetails" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'servicetype') THEN
    ALTER TABLE appointments ADD COLUMN "servicetype" text;
  END IF;
END$$;

-- Table: tickets (Podio App ID: 30452168)
CREATE TABLE IF NOT EXISTS tickets (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'podio_item_id') THEN
    ALTER TABLE tickets ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE tickets ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE tickets ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'created_at') THEN
    ALTER TABLE tickets ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'updated_at') THEN
    ALTER TABLE tickets ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'last_updated_at') THEN
    ALTER TABLE tickets ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'customer') THEN
    ALTER TABLE tickets ADD COLUMN "customer" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'planadministrator') THEN
    ALTER TABLE tickets ADD COLUMN "planadministrator" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'status') THEN
    ALTER TABLE tickets ADD COLUMN "status" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'action') THEN
    ALTER TABLE tickets ADD COLUMN "action" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'type') THEN
    ALTER TABLE tickets ADD COLUMN "type" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'servicetype') THEN
    ALTER TABLE tickets ADD COLUMN "servicetype" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'price') THEN
    ALTER TABLE tickets ADD COLUMN "price" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'date') THEN
    ALTER TABLE tickets ADD COLUMN "date" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'diagnosis') THEN
    ALTER TABLE tickets ADD COLUMN "diagnosis" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'observations') THEN
    ALTER TABLE tickets ADD COLUMN "observations" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'performedservices') THEN
    ALTER TABLE tickets ADD COLUMN "performedservices" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'renderedservices') THEN
    ALTER TABLE tickets ADD COLUMN "renderedservices" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'serviceorsparepart') THEN
    ALTER TABLE tickets ADD COLUMN "serviceorsparepart" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'yearmonth') THEN
    ALTER TABLE tickets ADD COLUMN "yearmonth" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'reminder') THEN
    ALTER TABLE tickets ADD COLUMN "reminder" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'serviceunder30min') THEN
    ALTER TABLE tickets ADD COLUMN "serviceunder30min" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tickets' AND column_name = 'maxresolutiondate') THEN
    ALTER TABLE tickets ADD COLUMN "maxresolutiondate" timestamptz;
  END IF;
END$$;

-- Table: students (Podio App ID: 30432041)
CREATE TABLE IF NOT EXISTS students (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'podio_item_id') THEN
    ALTER TABLE students ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE students ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE students ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'created_at') THEN
    ALTER TABLE students ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'updated_at') THEN
    ALTER TABLE students ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'last_updated_at') THEN
    ALTER TABLE students ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'name') THEN
    ALTER TABLE students ADD COLUMN "name" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'signindate') THEN
    ALTER TABLE students ADD COLUMN "signindate" timestamptz;
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
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'progress') THEN
    ALTER TABLE students ADD COLUMN "progress" numeric;
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

-- Table: courses (Podio App ID: 30432042)
CREATE TABLE IF NOT EXISTS courses (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'podio_item_id') THEN
    ALTER TABLE courses ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE courses ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE courses ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'created_at') THEN
    ALTER TABLE courses ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'updated_at') THEN
    ALTER TABLE courses ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'last_updated_at') THEN
    ALTER TABLE courses ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'coursename') THEN
    ALTER TABLE courses ADD COLUMN "coursename" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'status') THEN
    ALTER TABLE courses ADD COLUMN "status" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'description') THEN
    ALTER TABLE courses ADD COLUMN "description" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'syllabus') THEN
    ALTER TABLE courses ADD COLUMN "syllabus" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'duration') THEN
    ALTER TABLE courses ADD COLUMN "duration" numeric;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'price') THEN
    ALTER TABLE courses ADD COLUMN "price" numeric;
  END IF;
END$$;

-- Table: classes (Podio App ID: 30432049)
CREATE TABLE IF NOT EXISTS classes (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'classes' AND column_name = 'podio_item_id') THEN
    ALTER TABLE classes ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'classes' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE classes ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'classes' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE classes ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'classes' AND column_name = 'created_at') THEN
    ALTER TABLE classes ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'classes' AND column_name = 'updated_at') THEN
    ALTER TABLE classes ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'classes' AND column_name = 'last_updated_at') THEN
    ALTER TABLE classes ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'classes' AND column_name = 'name') THEN
    ALTER TABLE classes ADD COLUMN "name" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'classes' AND column_name = 'students') THEN
    ALTER TABLE classes ADD COLUMN "students" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'classes' AND column_name = 'action') THEN
    ALTER TABLE classes ADD COLUMN "action" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'classes' AND column_name = 'schedule') THEN
    ALTER TABLE classes ADD COLUMN "schedule" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'classes' AND column_name = 'instructor') THEN
    ALTER TABLE classes ADD COLUMN "instructor" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'classes' AND column_name = 'date') THEN
    ALTER TABLE classes ADD COLUMN "date" timestamptz;
  END IF;
END$$;

-- Table: enrollments (Podio App ID: 30432051)
CREATE TABLE IF NOT EXISTS enrollments (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'podio_item_id') THEN
    ALTER TABLE enrollments ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE enrollments ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE enrollments ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'created_at') THEN
    ALTER TABLE enrollments ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'updated_at') THEN
    ALTER TABLE enrollments ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'last_updated_at') THEN
    ALTER TABLE enrollments ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'student') THEN
    ALTER TABLE enrollments ADD COLUMN "student" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'action') THEN
    ALTER TABLE enrollments ADD COLUMN "action" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'class') THEN
    ALTER TABLE enrollments ADD COLUMN "class" jsonb;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'status') THEN
    ALTER TABLE enrollments ADD COLUMN "status" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'completiondate') THEN
    ALTER TABLE enrollments ADD COLUMN "completiondate" timestamptz;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'enrollments' AND column_name = 'performance') THEN
    ALTER TABLE enrollments ADD COLUMN "performance" numeric;
  END IF;
END$$;

-- Table: chapters (Podio App ID: 30451972)
CREATE TABLE IF NOT EXISTS chapters (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'chapters' AND column_name = 'podio_item_id') THEN
    ALTER TABLE chapters ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'chapters' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE chapters ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'chapters' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE chapters ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'chapters' AND column_name = 'created_at') THEN
    ALTER TABLE chapters ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'chapters' AND column_name = 'updated_at') THEN
    ALTER TABLE chapters ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'chapters' AND column_name = 'last_updated_at') THEN
    ALTER TABLE chapters ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'chapters' AND column_name = 'name') THEN
    ALTER TABLE chapters ADD COLUMN "name" text;
  END IF;
END$$;

-- Table: technicians (Podio App ID: 30588065)
CREATE TABLE IF NOT EXISTS technicians (
  podio_item_id BIGINT PRIMARY KEY,
  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref
  podio_app_item_id INT, -- User-facing 'App Item ID'
  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'technicians' AND column_name = 'podio_item_id') THEN
    ALTER TABLE technicians ADD COLUMN "podio_item_id" BIGINT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'technicians' AND column_name = 'podio_app_item_id') THEN
    ALTER TABLE technicians ADD COLUMN "podio_app_item_id" INT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'technicians' AND column_name = 'podio_formatted_id') THEN
    ALTER TABLE technicians ADD COLUMN "podio_formatted_id" TEXT;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'technicians' AND column_name = 'created_at') THEN
    ALTER TABLE technicians ADD COLUMN "created_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'technicians' AND column_name = 'updated_at') THEN
    ALTER TABLE technicians ADD COLUMN "updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'technicians' AND column_name = 'last_updated_at') THEN
    ALTER TABLE technicians ADD COLUMN "last_updated_at" TIMESTAMPTZ;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'technicians' AND column_name = 'title') THEN
    ALTER TABLE technicians ADD COLUMN "title" text;
  END IF;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'technicians' AND column_name = 'whatsapp') THEN
    ALTER TABLE technicians ADD COLUMN "whatsapp" text;
  END IF;
END$$;

