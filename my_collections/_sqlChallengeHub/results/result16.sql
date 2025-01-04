-- Solution:
SELECT
    registration_no,
    full_name,
    bangla
FROM students
WHERE bangla = (
    SELECT MAX(bangla)
    FROM students
);






/*
This SQL query finds the student(s) with the highest score in Bangla.
1. `SELECT registration_no, full_name, bangla`: Selects the `registration_no`, `full_name`, and `bangla` score of students.
2. `FROM students`: Specifies the table from which to retrieve the data.
3. `WHERE bangla = (SELECT MAX(bangla) FROM students)`: Filters the results to include only the student(s) with the highest Bangla score. The subquery `SELECT MAX(bangla) FROM students` finds the highest Bangla score in the `students` table.

In summary, this query provides the registration number, full name, and Bangla score of the student(s) who have the highest Bangla score.
*/