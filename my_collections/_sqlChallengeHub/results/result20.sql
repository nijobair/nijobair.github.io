-- Solution:
WITH RankedScores AS (
    SELECT 
        full_name, 
        bangla, 
        english, 
        arts, 
        math, 
        science,
        ROW_NUMBER() OVER (PARTITION BY 'Bangla' ORDER BY bangla DESC) AS bangla_rank,
        ROW_NUMBER() OVER (PARTITION BY 'English' ORDER BY english DESC) AS english_rank,
        ROW_NUMBER() OVER (PARTITION BY 'Arts' ORDER BY arts DESC) AS arts_rank,
        ROW_NUMBER() OVER (PARTITION BY 'Math' ORDER BY math DESC) AS math_rank,
        ROW_NUMBER() OVER (PARTITION BY 'Science' ORDER BY science DESC) AS science_rank
    FROM students
)
SELECT 
    full_name, 
    bangla AS score, 'Bangla' AS subject FROM RankedScores WHERE bangla_rank <= 3
UNION ALL
SELECT 
    full_name, 
    english AS score, 'English' AS subject FROM RankedScores WHERE english_rank <= 3
UNION ALL
SELECT 
    full_name, 
    arts AS score, 'Arts' AS subject FROM RankedScores WHERE arts_rank <= 3
UNION ALL
SELECT 
    full_name, 
    math AS score, 'Math' AS subject FROM RankedScores WHERE math_rank <= 3
UNION ALL
SELECT 
    full_name, 
    science AS score, 'Science' AS subject FROM RankedScores WHERE science_rank <= 3
ORDER BY subject, score DESC;






/*
This SQL query finds the top 3 students for each subject and lists their scores.
1. The Common Table Expression (CTE) `RankedScores`:
   - `WITH RankedScores AS`: This begins the definition of a CTE named `RankedScores`.
   - `SELECT full_name, bangla, english, arts, math, science, ROW_NUMBER() OVER (PARTITION BY 'Bangla' ORDER BY bangla DESC) AS bangla_rank, ...`: This part selects the `full_name` and scores for each subject, and calculates the rank for each subject using the `ROW_NUMBER` function. The `PARTITION BY` clause should be `bangla`, `english`, etc., instead of the subject name in quotes.
   - `FROM students`: Specifies the table from which to retrieve the data.
2. The main query:
   - `SELECT full_name, bangla AS score, 'Bangla' AS subject FROM RankedScores WHERE bangla_rank <= 3 UNION ALL ...`: This part selects the top 3 students for each subject from the `RankedScores` CTE and combines the results using `UNION ALL`.
   - `ORDER BY subject, score DESC`: Orders the results by subject and then by score in descending order.

In summary, this query lists the top 3 students for each subject along with their scores, ordered by subject and score.
*/