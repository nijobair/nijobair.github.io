SELECT
    full_name,
    bangla
FROM students
WHERE bangla = (
    SELECT MIN(bangla)
    FROM students
);