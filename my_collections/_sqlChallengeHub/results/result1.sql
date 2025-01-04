-- Solution:
SELECT
    ROUND(
        AVG(bangla), 2
    ) AS avg_bangla_score
FROM
    students;





/*
This SQL query calculates the average score of the 'bangla' column from the 'students' table.
1. `AVG(bangla)` computes the average score of the 'bangla' column.
2. `ROUND(..., 2)` rounds the average score to 2 decimal places for precision.
3. `AS avg_bangla_score` gives a name (alias) to the result, making it easier to understand.
4. `FROM students` specifies the table from which to retrieve the data.
In summary, this query provides the average Bangla score of all students, rounded to two decimal places.
*/