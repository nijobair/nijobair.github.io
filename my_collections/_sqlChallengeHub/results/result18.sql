WITH cte AS (
    SELECT math
    FROM students
    ORDER BY CAST(math AS INT) DESC
    LIMIT 5
)
SELECT
    avg(math) AS avg_top5_math
FROM cte;