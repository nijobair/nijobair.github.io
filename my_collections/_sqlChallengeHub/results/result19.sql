SELECT
    full_name,
    arts
FROM students
WHERE arts > (
    SELECT AVG(arts)
    FROM students
)
ORDER BY arts DESC;