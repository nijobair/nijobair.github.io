SELECT
    full_name,
    arts
FROM students
WHERE arts > (
    SELECT avg(arts)
    FROM students
)
ORDER BY CAST(arts AS INT) DESC;