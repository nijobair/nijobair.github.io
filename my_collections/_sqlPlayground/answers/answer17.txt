with cte AS (
    SELECT
        full_name,
        bangla + english + arts + math + science AS total_marks
    FROM students
)
SELECT
    full_name,
    total_marks
FROM cte
WHERE total_marks = (
    SELECT min(total_marks) FROM cte
);