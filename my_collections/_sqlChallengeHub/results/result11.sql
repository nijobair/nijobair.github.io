SELECT
    ROUND(
        AVG(arts), 2
    ) AS avg_arts_score
FROM students
WHERE gender = 'Female';