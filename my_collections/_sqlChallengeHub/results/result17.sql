-- Solution:
WITH totals AS (
    SELECT
        full_name,
        bangla + english + arts + math + science AS total_marks
    FROM students
)
SELECT
    full_name,
    total_marks
FROM totals
WHERE total_marks = (
    SELECT MIN(total_marks) FROM totals
);






/*
This SQL query finds the student(s) with the lowest total marks across all subjects.
1. The Common Table Expression (CTE) `totals`:
   - `WITH totals AS`: This begins the definition of a CTE named `totals`.
   - `SELECT full_name, bangla + english + arts + math + science AS total_marks`: This query selects the `full_name` of each student and calculates their total marks by summing their scores in Bangla, English, Arts, Math, and Science. The result is given an alias `total_marks`.
   - `FROM students`: Specifies the table from which to retrieve the data.
2. The main query:
   - `SELECT full_name, total_marks FROM totals`: This part retrieves the `full_name` and `total_marks` from the `totals` CTE.
   - `FROM totals`: Specifies that the data should be selected from the `totals` CTE defined earlier.
   - `WHERE total_marks = (SELECT MIN(total_marks) FROM totals)`: This condition filters the results to include only the student(s) with the lowest total marks. The subquery `SELECT MIN(total_marks) FROM totals` finds the lowest value of `total_marks` in the `totals` CTE.

In summary, this query calculates the total marks for each student, then selects the student(s) with the lowest total marks.
*/