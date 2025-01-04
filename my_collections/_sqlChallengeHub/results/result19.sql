-- Solution:
SELECT
    full_name,
    arts
FROM students
WHERE arts > (
    SELECT AVG(arts)
    FROM students
)
ORDER BY arts DESC;






/*
This SQL query selects the names and Arts scores of students who have scored above the average in Arts, and orders the results in descending order of their Arts scores.
1. `SELECT full_name, arts`: Selects the `full_name` and `arts` score of students.
2. `FROM students`: Specifies the table from which to retrieve the data.
3. `WHERE arts > (SELECT AVG(arts) FROM students)`: Filters the results to include only those students whose Arts score is greater than the average Arts score. The subquery `SELECT AVG(arts) FROM students` calculates the average Arts score.
4. `ORDER BY arts DESC`: Orders the results by the `arts` scores in descending order.

In summary, this query provides the names and Arts scores of students who scored above average in Arts, sorted from highest to lowest score.
*/