SELECT
    COUNT(*) AS failing_students
FROM (
    SELECT *
    FROM students
    WHERE
        bangla < 40 OR
        english < 40 OR
        arts < 40 OR
        math < 40 OR
        science < 40
);