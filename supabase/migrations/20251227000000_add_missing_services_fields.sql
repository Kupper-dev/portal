-- Add missing columns to services table for dashboard display

ALTER TABLE services
ADD COLUMN IF NOT EXISTS price numeric,
ADD COLUMN IF NOT EXISTS request_or_issue text,
ADD COLUMN IF NOT EXISTS hour_dispositivo_recibido text,
ADD COLUMN IF NOT EXISTS hour_dispositivo_en_revision text,
ADD COLUMN IF NOT EXISTS hour_inicia_reparacion text,
ADD COLUMN IF NOT EXISTS hour_enviar_codigo_de_seguridad text,
ADD COLUMN IF NOT EXISTS hour_dispositivo_entregado text,
ADD COLUMN IF NOT EXISTS hour_enviar_diagnostico text,
ADD COLUMN IF NOT EXISTS hour_refacciones_en_camino text;
