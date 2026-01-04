
-- Migration to add missing Podio fields to 'services' table

-- aproxcompletationdate
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'aproxcompletationdate') THEN
    ALTER TABLE services ADD COLUMN "aproxcompletationdate" timestamptz;
  END IF;
END$$;

-- requestorissue
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'requestorissue') THEN
    ALTER TABLE services ADD COLUMN "requestorissue" text;
  END IF;
END$$;

-- issuereformulation
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'issuereformulation') THEN
    ALTER TABLE services ADD COLUMN "issuereformulation" text;
  END IF;
END$$;

-- price
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'price') THEN
    ALTER TABLE services ADD COLUMN "price" numeric;
  END IF;
END$$;

-- datereceived
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'datereceived') THEN
    ALTER TABLE services ADD COLUMN "datereceived" timestamptz;
  END IF;
END$$;

-- datecheckupstart
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'datecheckupstart') THEN
    ALTER TABLE services ADD COLUMN "datecheckupstart" timestamptz;
  END IF;
END$$;

-- datediagnosed
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'datediagnosed') THEN
    ALTER TABLE services ADD COLUMN "datediagnosed" timestamptz;
  END IF;
END$$;

-- date_diagnosis (from date-diagnosis)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'date_diagnosis') THEN
    ALTER TABLE services ADD COLUMN "date_diagnosis" timestamptz;
  END IF;
END$$;

-- datepartsordered
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'datepartsordered') THEN
    ALTER TABLE services ADD COLUMN "datepartsordered" timestamptz;
  END IF;
END$$;

-- daterepairstart
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'daterepairstart') THEN
    ALTER TABLE services ADD COLUMN "daterepairstart" timestamptz;
  END IF;
END$$;

-- daterepairready
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'daterepairready') THEN
    ALTER TABLE services ADD COLUMN "daterepairready" timestamptz;
  END IF;
END$$;

-- datedevicedelivered
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'datedevicedelivered') THEN
    ALTER TABLE services ADD COLUMN "datedevicedelivered" timestamptz;
  END IF;
END$$;
