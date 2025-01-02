WITH TotalScores AS (
    SELECT 
        full_name, 
        (bangla + english + arts + math + science) AS total_score
    FROM students
)
SELECT 
    a.full_name AS student1, 
    b.full_name AS student2, 
    a.total_score
FROM TotalScores AS a
    JOIN TotalScores AS b
        ON a.total_score = b.total_score AND a.full_name < b.full_name
WHERE ABS(a.total_score - b.total_score) <= 5;