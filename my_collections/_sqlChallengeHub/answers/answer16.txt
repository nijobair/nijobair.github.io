SELECT
    registration_no,
    full_name,
    bangla
FROM students
WHERE bangla = (
    SELECT max(bangla)
    FROM students
);