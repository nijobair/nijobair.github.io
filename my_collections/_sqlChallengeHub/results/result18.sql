-- Solution:
WITH math_topper AS (
    SELECT math
    FROM students
    ORDER BY math DESC
    LIMIT 5
)
SELECT
    AVG(math) AS avg_top5_math
FROM math_topper;






/*
This SQL query calculates the average Math score of the top 5 students.
1. The Common Table Expression (CTE) `math_topper`:
   - `WITH math_topper AS`: This begins the definition of a CTE named `math_topper`.
   - `SELECT math FROM students ORDER BY math DESC LIMIT 5`: This query selects the Math scores from the `students` table, orders them in descending order, and limits the result to the top 5 scores.
2. The main query:
   - `SELECT AVG(math) AS avg_top5_math FROM math_topper`: This part calculates the average of the Math scores in the `math_topper` CTE and assigns the result an alias `avg_top5_math`.

In summary, this query calculates the average Math score of the top 5 students with the highest Math scores.
*/