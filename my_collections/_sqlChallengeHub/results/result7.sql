-- Solution:
SELECT
    registration_no,
    full_name
FROM students
WHERE science = (
    SELECT MAX(science)
    FROM students
);





/*
This SQL query finds the student(s) with the highest score in science.
1. `SELECT registration_no, full_name` retrieves the registration numbers and full names of the students.
2. `FROM students` specifies the table from which to retrieve the data.
3. `WHERE science =` sets the condition to filter students.
4. The subquery `SELECT MAX(science) FROM students` finds the highest score in the science subject.
5. The main query retrieves the registration numbers and names of students who have this highest score.
In summary, this query provides the registration numbers and names of students with the top score in science.
*/