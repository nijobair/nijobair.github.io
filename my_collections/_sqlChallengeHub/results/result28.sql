WITH TotalScores AS (
    SELECT 
        full_name, 
        (bangla + english + arts + math + science) AS total_score
    FROM students
)
SELECT 
    full_name, 
    total_score, 
    RANK() OVER (ORDER BY total_score DESC) AS rank
FROM TotalScores
ORDER BY rank;