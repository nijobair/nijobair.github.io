with totals AS (
    SELECT
        full_name,
        bangla + english + arts + math + science AS total_marks
    FROM students
)
SELECT
    full_name,
    total_marks
FROM totals
WHERE total_marks = (
    SELECT MAX(total_marks)
    FROM totals
);