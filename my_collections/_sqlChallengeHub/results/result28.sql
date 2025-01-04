-- Solution:
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






/*
This SQL query ranks students based on their total scores in descending order.
1. The Common Table Expression (CTE) `TotalScores`:
   - `WITH TotalScores AS`: This begins the definition of a CTE named `TotalScores`.
   - `SELECT full_name, (bangla + english + arts + math + science) AS total_score FROM students`: This query calculates the total score for each student by summing their scores in Bangla, English, Arts, Math, and Science.
2. The main query:
   - `SELECT full_name, total_score, RANK() OVER (ORDER BY total_score DESC) AS rank FROM TotalScores`: This part selects the `full_name` and `total_score` from the `TotalScores` CTE and calculates the rank of each student based on their total score in descending order using the `RANK()` window function.
   - `ORDER BY rank`: Orders the results by the calculated rank.

In summary, this query provides the names, total scores, and ranks of students based on their total scores in descending order.
*/