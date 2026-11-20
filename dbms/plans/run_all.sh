#!/usr/bin/env bash
# Usage: DB=facon_bench ./run_all.sh     (run from dbms/plans/)
# Needs: psql on PATH and a scratch database, e.g.  createdb facon_bench
set -euo pipefail
DB="${DB:-facon_bench}"
P="psql -X -d $DB -v ON_ERROR_STOP=1"

$P -f 00_seed.sql
for i in 1 2 3; do                     # 3 runs each, so warm-cache timings are visible
  $P -f 01_before.sql > "plan_before_run${i}.txt" 2>&1
done
$P -f 02_add_indexes.sql
for i in 1 2 3; do
  $P -f 03_after.sql > "plan_after_run${i}.txt" 2>&1
done
echo "Done. Plans saved in $(pwd)"
grep -H "Execution Time" plan_*_run*.txt
