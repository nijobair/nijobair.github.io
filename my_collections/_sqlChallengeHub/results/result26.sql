-- Solution:
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
        ON a.full_name < b.full_name
WHERE ABS(a.total_score - b.total_score) <= 5;






/*
This SQL query finds pairs of students whose total scores differ by 5 or less.
1. The Common Table Expression (CTE) `TotalScores`:
   - `WITH TotalScores AS`: This begins the definition of a CTE named `TotalScores`.
   - `SELECT full_name, (bangla + english + arts + math + science) AS total_score FROM students`: This query calculates the total score for each student by summing their scores in Bangla, English, Arts, Math, and Science.
2. The main query:
   - `SELECT a.full_name AS student1, b.full_name AS student2, a.total_score FROM TotalScores AS a JOIN TotalScores AS b ON a.full_name < b.full_name WHERE ABS(a.total_score - b.total_score) <= 5`: This part selects pairs of students from the `TotalScores` CTE where the difference between their total scores is 5 or less. The `JOIN` clause pairs students based on their names to avoid duplicate pairs, and the `WHERE` clause filters pairs with a score difference of 5 or less.

In summary, this query provides pairs of students whose total scores differ by 5 or less.
*/