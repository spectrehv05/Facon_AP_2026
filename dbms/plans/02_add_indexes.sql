-- CP4: Optimization
-- Supports ORDER BY created_at DESC (R01 / R01b) without a full sort.
CREATE INDEX IF NOT EXISTS idx_logs_created_at_desc ON logs (created_at DESC);
ANALYZE logs;
