-- FACON Fitness App
-- CP3: Application SQL Queries
-- PostgreSQL

-- ============================================
-- R01 | READ | Fetch all food logs, newest first
-- API: GET /api/logs
-- ============================================
SELECT *
FROM logs
ORDER BY created_at DESC;


-- ============================================
-- R02 | WRITE | Insert a food log
-- API: POST /api/logs
-- Parameters: id, date, food, calories, protein, carbs, fats, water_ml
-- ============================================
INSERT INTO logs (
    id, date, food, calories, protein, carbs, fats, water_ml
)
VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
)
RETURNING *;


-- ============================================
-- R03 | WRITE | Delete a food log by ID
-- API: DELETE /api/logs/:id
-- Parameter: id
-- ============================================
DELETE FROM logs
WHERE id = $1;


-- ============================================
-- DDL | Create logs table
-- ============================================
CREATE TABLE IF NOT EXISTS logs (
    id VARCHAR(255) PRIMARY KEY,
    date VARCHAR(50),
    food TEXT,
    calories INTEGER,
    protein INTEGER,
    carbs INTEGER,
    fats INTEGER,
    water_ml INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- DDL | Create goals table
-- ============================================
CREATE TABLE IF NOT EXISTS goals (
    id VARCHAR(255) PRIMARY KEY,
    date VARCHAR(50),
    text TEXT,
    completed BOOLEAN DEFAULT FALSE,
    priority VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- DDL | Migrations
-- ============================================
ALTER TABLE goals
ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'medium';

ALTER TABLE logs
ADD COLUMN IF NOT EXISTS water_ml INTEGER DEFAULT 0;
