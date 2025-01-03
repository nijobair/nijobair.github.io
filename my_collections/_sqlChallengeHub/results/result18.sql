WITH math_topper AS (
    SELECT math
    FROM students
    ORDER BY math DESC
    LIMIT 5
)
SELECT
    AVG(math) AS avg_top5_math
FROM math_topper;