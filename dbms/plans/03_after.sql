-- CP4: Query plans AFTER optimization (idx_logs_created_at_desc added)
\timing on

\echo '===== R01: SELECT * FROM logs ORDER BY created_at DESC ====='
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM logs ORDER BY created_at DESC;

\echo '===== R01b: same query with LIMIT 50 (realistic app usage) ====='
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM logs ORDER BY created_at DESC LIMIT 50;

\echo '===== R02: INSERT INTO logs (rolled back) ====='
BEGIN;
EXPLAIN (ANALYZE, BUFFERS)
INSERT INTO logs (id, date, food, calories, protein, carbs, fats, water_ml)
VALUES ('bench_new_1', '2026-11-20', 'Test meal', 500, 30, 60, 15, 250)
RETURNING *;
ROLLBACK;

\echo '===== R03: DELETE FROM logs WHERE id = ... (rolled back) ====='
BEGIN;
EXPLAIN (ANALYZE, BUFFERS)
DELETE FROM logs WHERE id = 'log_100000';
ROLLBACK;
