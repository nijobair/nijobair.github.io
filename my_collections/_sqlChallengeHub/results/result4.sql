SELECT
    gender,
    COUNT(*) AS gender_count
FROM students
GROUP BY gender;