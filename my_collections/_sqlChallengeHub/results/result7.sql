SELECT
    registration_no,
    full_name
FROM students
WHERE science = (
    SELECT MAX(science)
    FROM students
);