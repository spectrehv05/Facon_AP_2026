# Database Normalization – FACON Fitness Command Center

## 1. Introduction

FACON Fitness Command Center is a fitness application that records food and
water intake and tracks daily goals.

This normalization analysis is based on the PostgreSQL schema implemented
in `server/index.js`. The current database contains two relations:

- `logs`
- `goals`

The analysis follows First Normal Form (1NF), Second Normal Form (2NF),
Third Normal Form (3NF), and Boyce-Codd Normal Form (BCNF).

Only functional dependencies supported by the current schema are assumed.

## 2. Existing Database Schema

### Relation 1: LOGS

| Attribute | Data Type | Constraint |
|---|---|---|
| id | VARCHAR(255) | PRIMARY KEY |
| date | VARCHAR(50) | |
| food | TEXT | |
| calories | INTEGER | |
| protein | INTEGER | |
| carbs | INTEGER | |
| fats | INTEGER | |
| water_ml | INTEGER | DEFAULT 0 |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

Functional Dependency:

`id → date, food, calories, protein, carbs, fats, water_ml, created_at`

The primary key `id` uniquely identifies every log record.

### Relation 2: GOALS

| Attribute | Data Type | Constraint |
|---|---|---|
| id | VARCHAR(255) | PRIMARY KEY |
| date | VARCHAR(50) | |
| text | TEXT | |
| completed | BOOLEAN | DEFAULT FALSE |
| priority | VARCHAR(20) | DEFAULT 'medium' |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

Functional Dependency:

`id → date, text, completed, priority, created_at`

The primary key `id` uniquely identifies every goal record.

## 3. First Normal Form (1NF)

A relation is in 1NF when every attribute contains a single value
and repeating groups or multivalued attributes are absent.

### LOGS_1NF

| id (PK) | date | food | calories | protein | carbs | fats | water_ml | created_at |
|---|---|---|---|---|---|---|---|

FD:

`id → date, food, calories, protein, carbs, fats, water_ml, created_at`

### GOALS_1NF

| id (PK) | date | text | completed | priority | created_at |
|---|---|---|---|---|---|

FD:

`id → date, text, completed, priority, created_at`

Assessment:

- Every column stores a single database value.
- Each relation has a primary key.
- No repeating groups are represented as separate columns.
- `food` is treated as one food entry or meal description per log.
  If multiple food items are stored as a comma-separated list inside
  one value, that data would not be atomic at the application level
  and should be represented using separate food-item records.

Therefore, both relations satisfy 1NF under the above atomic-value
assumption.

## 4. Second Normal Form (2NF)

A relation is in 2NF when it is in 1NF and every non-prime attribute
depends on the whole candidate key, not only part of it.

### LOGS_2NF

| id (PK) | date | food | calories | protein | carbs | fats | water_ml | created_at |
|---|---|---|---|---|---|---|---|

FD:

`id → date, food, calories, protein, carbs, fats, water_ml, created_at`

### GOALS_2NF

| id (PK) | date | text | completed | priority | created_at |
|---|---|---|---|---|---|

FD:

`id → date, text, completed, priority, created_at`

Assessment:

- Both relations use a single-attribute primary key.
- Partial functional dependencies cannot occur with a single-attribute
  candidate key.
- No decomposition is required to remove partial dependencies.

Therefore, both relations satisfy 2NF.

## 5. Third Normal Form (3NF)

A relation is in 3NF when it is in 2NF and no non-key attribute
transitively determines another non-key attribute.

### LOGS_3NF

| id (PK) | date | food | calories | protein | carbs | fats | water_ml | created_at |
|---|---|---|---|---|---|---|---|

FD:

`id → date, food, calories, protein, carbs, fats, water_ml, created_at`

### GOALS_3NF

| id (PK) | date | text | completed | priority | created_at |
|---|---|---|---|---|---|

FD:

`id → date, text, completed, priority, created_at`

Assessment:

- No additional non-key-to-non-key functional dependencies have been
  established in the current schema.
- No transitive dependency is identified under the declared FDs.
- No decomposition is necessary.

Therefore, both relations satisfy 3NF under the declared functional
dependencies.

## 6. Boyce-Codd Normal Form (BCNF)

A relation is in BCNF when every non-trivial functional dependency
has a superkey as its determinant.

### LOGS_BCNF

| id (PK) | date | food | calories | protein | carbs | fats | water_ml | created_at |
|---|---|---|---|---|---|---|---|

FD:

`id → date, food, calories, protein, carbs, fats, water_ml, created_at`

### GOALS_BCNF

| id (PK) | date | text | completed | priority | created_at |
|---|---|---|---|---|---|

FD:

`id → date, text, completed, priority, created_at`

Assessment:

- The declared non-trivial FDs are determined by primary keys.
- Each determinant (`id`) is a candidate key and therefore a superkey.
- No BCNF violation is identified.

Both relations satisfy BCNF under the declared functional dependencies.

## 7. Final Normalized Schema

The final schema remains unchanged because no decomposition is needed
for the declared functional dependencies.

### LOGS

`logs(id, date, food, calories, protein, carbs, fats, water_ml, created_at)`

Primary Key: `id`

### GOALS

`goals(id, date, text, completed, priority, created_at)`

Primary Key: `id`

| Relation | 1NF | 2NF | 3NF | BCNF |
|---|---|---|---|---|
| logs | Yes* | Yes | Yes | Yes |
| goals | Yes | Yes | Yes | Yes |

*1NF for logs assumes `food` represents one atomic food entry or meal
description rather than a list of independently stored food items.

## 8. Possible Future Improvements

These are design suggestions and are not part of the current schema:

- Use PostgreSQL `DATE` instead of `VARCHAR(50)` for date fields.
- Introduce separate food-item records if a log contains multiple foods.
- Add user ownership if the application supports multiple accounts.
- Add appropriate validation constraints for nutritional values and
  water intake.

These improvements should only be implemented if required by the
application's functionality.

## 9. Conclusion

The current FACON Fitness Command Center database contains the `logs`
and `goals` relations. Under the functional dependencies established
by their primary keys, both relations satisfy 2NF, 3NF, and BCNF.
The 1NF assessment for `logs` depends on treating its `food` value
as atomic.

No unnecessary decomposition has been introduced, and the normalized
schema accurately reflects the existing implementation.
