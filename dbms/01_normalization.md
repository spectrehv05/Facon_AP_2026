# Database Normalization – FACON Fitness Command Center

## 1. Application Overview

FACON is a fitness tracking application that allows users to record food intake, track nutritional values, monitor water intake, and manage daily goals.

The backend uses **Node.js**, **Express**, and **PostgreSQL**. The database tables documented here are based on the table definitions currently present in `server/index.js`.

This document describes the current schema and evaluates it against First, Second, Third, and Boyce-Codd Normal Forms (1NF, 2NF, 3NF, and BCNF).

> **Scope note:** This document reflects the schema currently implemented in the repository. It does not assume the existence of user, food-catalogue, or weight-history tables unless they are added to the database implementation.

## 2. Current Database Schema

The backend currently creates two tables: `logs` and `goals`.

### 2.1 `logs` table

| Column | Data type | Constraint / default | Description |
|---|---|---|---|
| `id` | `VARCHAR(255)` | PRIMARY KEY | Unique identifier for a food/water log |
| `date` | `VARCHAR(50)` | — | Date associated with the log |
| `food` | `TEXT` | — | Food or meal description |
| `calories` | `INTEGER` | — | Calories recorded |
| `protein` | `INTEGER` | — | Protein amount recorded |
| `carbs` | `INTEGER` | — | Carbohydrate amount recorded |
| `fats` | `INTEGER` | — | Fat amount recorded |
| `water_ml` | `INTEGER` | DEFAULT `0` | Water intake in millilitres |
| `created_at` | `TIMESTAMP` | DEFAULT `CURRENT_TIMESTAMP` | Record creation timestamp |

**Primary key:** `id`

### 2.2 `goals` table

| Column | Data type | Constraint / default | Description |
|---|---|---|---|
| `id` | `VARCHAR(255)` | PRIMARY KEY | Unique identifier for a goal |
| `date` | `VARCHAR(50)` | — | Date associated with the goal |
| `text` | `TEXT` | — | Goal description |
| `completed` | `BOOLEAN` | DEFAULT `FALSE` | Whether the goal is completed |
| `priority` | `VARCHAR(20)` | DEFAULT `'medium'` | Goal priority |
| `created_at` | `TIMESTAMP` | DEFAULT `CURRENT_TIMESTAMP` | Record creation timestamp |

**Primary key:** `id`

## 3. Functional Dependencies

Based on the primary keys defined in the current implementation, the following functional dependencies hold:

For the `logs` relation:

```text
id → date, food, calories, protein, carbs, fats, water_ml, created_at
```

For the `goals` relation:

```text
id → date, text, completed, priority, created_at
```

The schema does not currently declare additional candidate keys or business rules such as a food description uniquely determining its nutritional values. Therefore, no such dependencies are assumed in this analysis.

## 4. First Normal Form (1NF)

A relation is in 1NF when:

- Every column contains a single value for each row.
- There are no repeating groups or arrays of values in a field.
- Each row can be uniquely identified.

### Application to FACON

Both tables have primary keys (`logs.id` and `goals.id`) and use scalar database columns.

The `logs.food` field is a text description. It is atomic for this design only when one log stores one food item or one meal description as a single recorded entry. If the application stores a comma-separated list of separate food items in this field, that field would not be atomic and the design would need a separate food-item/log-detail structure.

**1NF assessment:** The current schema is compatible with 1NF provided each `food` value represents one atomic log entry rather than a list of independently tracked food items.

## 5. Second Normal Form (2NF)

A relation is in 2NF when:

- It is already in 1NF.
- Every non-key attribute is fully functionally dependent on the whole candidate key.
- No non-key attribute depends on only part of a composite candidate key.

### Application to FACON

Both current tables use a single-column primary key:

- `logs`: `id`
- `goals`: `id`

A single-column key cannot have a partial dependency on only part of a composite key. Under the functional dependencies listed above, all non-key attributes depend on the complete primary key.

**2NF assessment:** Both `logs` and `goals` satisfy 2NF, assuming the 1NF condition described above is met.

## 6. Third Normal Form (3NF)

A relation is in 3NF when:

- It is already in 2NF.
- No non-key attribute has a transitive dependency on a candidate key through another non-key attribute.

### Application to FACON

In the current schema, the declared dependencies are from each table's primary key to its remaining attributes.

No additional dependency between non-key columns is established by the current table definitions. For example, the schema does not define a separate `food_id` or a food catalogue in which a food identifier determines nutritional values.

Therefore, based on the dependencies currently represented in the code, no transitive dependency has been identified.

**3NF assessment:** Both tables satisfy 3NF under the functional dependencies currently established by the implementation.

## 7. Boyce-Codd Normal Form (BCNF)

A relation is in BCNF when, for every non-trivial functional dependency:

```text
X → Y
```

`X` must be a superkey.

### Application to FACON

The current functional dependencies are:

```text
logs.id  → all other attributes in logs
goals.id → all other attributes in goals
```

The determinants (`logs.id` and `goals.id`) are primary keys and therefore superkeys. No other non-trivial functional dependencies are specified in the current schema.

**BCNF assessment:** Both tables satisfy BCNF under the functional dependencies currently known. This conclusion should be revisited if additional business rules or dependencies are introduced.

## 8. Final Normalized Schema (Current Implementation)

The current normalized design can be represented as:

```text
LOGS(
    id PRIMARY KEY,
    date,
    food,
    calories,
    protein,
    carbs,
    fats,
    water_ml,
    created_at
)

GOALS(
    id PRIMARY KEY,
    date,
    text,
    completed,
    priority,
    created_at
)
```

There is currently no foreign-key relationship between these two tables in the implemented schema. Each table stores a separate kind of record.

## 9. Possible Future Improvements

The following are design opportunities, not descriptions of tables that currently exist:

1. **Use a date type:** Consider changing `date` from `VARCHAR(50)` to PostgreSQL `DATE` if the field always stores a calendar date.
2. **Support multiple food items per meal:** If one meal can contain multiple independently tracked foods, introduce separate meal/log and food-item detail records rather than storing a list in `logs.food`.
3. **Add user ownership:** If multiple users will use the application, introduce a `users` table and a `user_id` foreign key in user-owned records such as `logs` and `goals`.
4. **Use a food catalogue when appropriate:** If the application needs reusable food records with standard nutritional values, a separate food catalogue can avoid repeating the same food metadata across logs.
5. **Validate numeric values:** Add suitable checks for non-negative calories, macros, and water intake where required by the application.

These improvements should be implemented in the database and backend before being described as part of the actual schema.

## 10. Conclusion

The current FACON database contains two relations: `logs` and `goals`. Both use a single-column primary key. Based on the functional dependencies established by the current implementation, the tables are in 2NF, 3NF, and BCNF. Their 1NF status depends on `logs.food` being stored as one atomic food or meal description per row.

This analysis documents the existing database honestly and distinguishes implemented structures from possible future enhancements.
