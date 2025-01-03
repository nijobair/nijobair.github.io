WITH AvgScores AS (
    SELECT 
        AVG(bangla) AS avg_bangla,
        AVG(english) AS avg_english,
        AVG(arts) AS avg_arts,
        AVG(math) AS avg_math,
        AVG(science) AS avg_science
    FROM students
)
SELECT
    full_name,
    bangla,
    english,
    arts,
    math,
    science
FROM
    students,
    AvgScores
WHERE 
    bangla > avg_bangla AND 
    english > avg_english AND 
    arts > avg_arts AND 
    math > avg_math AND 
    science > avg_science;