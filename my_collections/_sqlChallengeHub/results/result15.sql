-- Solution:
SELECT
    full_name,
    math - science AS difference
FROM students
WHERE math > science
ORDER BY difference
LIMIT 10;






/*
This SQL query selects the full names of students and the difference between their Math and Science scores, but only for those students whose Math score is greater than their Science score.
1. `SELECT full_name, math - science AS difference`: This part selects the `full_name` and calculates the difference between the Math and Science scores, assigning it the alias `difference`.
2. `FROM students`: Specifies the table from which to retrieve the data.
3. `WHERE math > science`: Filters the results to include only those students whose Math score is greater than their Science score.
4. `ORDER BY difference`: Orders the results by the `difference` in ascending order.
5. `LIMIT 10`: Limits the results to the top 10 records.

In summary, this query provides the names and score differences of the top 10 students whose Math score is higher than their Science score, ordered by the smallest difference first.
*/