-- CP4: Benchmark seed data (run on a SCRATCH database, not production)
DROP TABLE IF EXISTS logs;
DROP TABLE IF EXISTS goals;

CREATE TABLE logs (
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

CREATE TABLE goals (
    id VARCHAR(255) PRIMARY KEY,
    date VARCHAR(50),
    text TEXT,
    completed BOOLEAN DEFAULT FALSE,
    priority VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 200,000 food logs spread over ~2 years
INSERT INTO logs (id, date, food, calories, protein, carbs, fats, water_ml, created_at)
SELECT
    'log_' || g,
    to_char(ts, 'YYYY-MM-DD'),
    'Food item ' || g,
    (random()*800)::int, (random()*60)::int, (random()*120)::int, (random()*50)::int,
    (random()*500)::int,
    ts
FROM (
    SELECT g, TIMESTAMP '2024-11-01' + (random() * 730) * INTERVAL '1 day' AS ts
    FROM generate_series(1, 200000) g
) s;

INSERT INTO goals (id, date, text, completed, priority, created_at)
SELECT 'goal_' || g, to_char(CURRENT_DATE - (g % 365), 'YYYY-MM-DD'),
       'Goal ' || g, (g % 3 = 0), (ARRAY['low','medium','high'])[1 + g % 3],
       now() - (g % 365) * INTERVAL '1 day'
FROM generate_series(1, 50000) g;

VACUUM ANALYZE logs;
VACUUM ANALYZE goals;
