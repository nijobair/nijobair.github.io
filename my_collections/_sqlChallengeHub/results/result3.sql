-- Solution:
SELECT full_name
FROM students
WHERE arts = (
    SELECT MAX(arts)
    FROM students
);





/*
This SQL query finds the student(s) with the highest score in the arts.
1. `SELECT full_name` retrieves the full names of the students.
2. `FROM students` specifies the table from which to retrieve the data.
3. `WHERE arts =` sets the condition to filter students.
4. The subquery `SELECT MAX(arts) FROM students` finds the highest score in the arts.
5. The main query retrieves the names of students who have this highest score.
In summary, this query provides the names of students with the top score in the arts.
*/