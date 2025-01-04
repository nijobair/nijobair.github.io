-- Solution:
SELECT
    full_name,
    bangla
FROM students
WHERE bangla = (
    SELECT MIN(bangla)
    FROM students
);





/*
This SQL query finds the student(s) with the lowest score in Bangla.
1. `SELECT full_name, bangla` retrieves the full names and Bangla scores of the students.
2. `FROM students` specifies the table from which to retrieve the data.
3. `WHERE bangla =` sets the condition to filter students.
4. The subquery `SELECT MIN(bangla) FROM students` finds the lowest score in the Bangla subject.
5. The main query retrieves the names and scores of students who have this lowest score.
In summary, this query provides the names and Bangla scores of students with the lowest Bangla score.
*/