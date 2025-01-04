-- Solution:
SELECT 
    full_name, 
    ROUND(
        (bangla * 2 + english * 2 + arts + math + science) / 7.0, 2
    ) AS weighted_avg_score
FROM students;






/*
This SQL query calculates the weighted average score of students with specific weights applied to each subject and rounds the result to 2 decimal places.
1. `SELECT full_name, ROUND((bangla * 2 + english * 2 + arts + math + science) / 7.0, 2) AS weighted_avg_score`: Selects the `full_name` and calculates the weighted average score. The weights are: Bangla * 2, English * 2, Arts * 1, Math * 1, and Science * 1. The total is divided by 7.0 to get the average and `ROUND` is used to round the result to 2 decimal places.
2. `FROM students`: Specifies the table from which to retrieve the data.

In summary, this query provides the names and weighted average scores of students, applying specific weights to each subject and rounding the average to two decimal places.
*/