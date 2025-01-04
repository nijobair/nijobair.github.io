-- Solution:
SELECT full_name
FROM students
WHERE
    math >= 85 AND
    science >= 85;





/*
This SQL query finds the students who scored 85 or higher in both Math and Science.
1. `SELECT full_name` retrieves the full names of the students.
2. `FROM students` specifies the table from which to retrieve the data.
3. `WHERE math >= 85 AND science >= 85` filters the results to include only students who scored 85 or higher in both Math and Science.
In summary, this query provides the names of students who have high scores (85 or above) in both Math and Science.
*/