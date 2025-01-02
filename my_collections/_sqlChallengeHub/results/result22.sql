WITH AvgScores AS (
    SELECT 
        AVG(bangla) AS avg_bangla,
        AVG(english) AS avg_english,
        AVG(arts) AS avg_arts,
        AVG(math) AS avg_math,
        AVG(science) AS avg_science
    FROM students
)
SELECT full_name, bangla, english, arts, math, science
FROM students, AvgScores
WHERE 
    CAST(bangla AS INT) > avg_bangla AND 
    CAST(english AS INT) > avg_english AND 
    CAST(arts AS INT) > avg_arts AND 
    CAST(math AS INT) > avg_math AND 
    CAST(science AS INT) > avg_science;