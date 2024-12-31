SELECT 
    gender,
    ROUND(
        AVG(bangla)
    ) AS avg_bangla,
    ROUND(
        AVG(english)
    ) AS avg_english,
    ROUND(
        AVG(arts)
    ) AS avg_arts,
    ROUND(
        AVG(math)
    ) AS avg_math,
    ROUND(
        AVG(science)
    ) AS avg_science
FROM students
GROUP BY gender;