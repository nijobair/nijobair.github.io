-- Solution:
SELECT
    COUNT(*) AS failing_students
FROM (
    SELECT *
    FROM students
    WHERE
        bangla < 40 OR
        english < 40 OR
        arts < 40 OR
        math < 40 OR
        science < 40
);





/*
This SQL query counts the number of students who are failing in at least one subject.
1. The inner query `SELECT * FROM students WHERE bangla < 40 OR english < 40 OR arts < 40 OR math < 40 OR science < 40`:
   - `SELECT *` retrieves all columns for students who meet the specified condition.
   - `FROM students` specifies the table from which to retrieve the data.
   - The `WHERE` clause filters the results to include only students who have a score less than 40 in any of the subjects (Bangla, English, Arts, Math, or Science).
   - The inner query returns a subset of students who are failing at least one subject.

2. The outer query `SELECT COUNT(*) AS failing_students`:
   - `COUNT(*)` counts the number of rows returned by the inner query, which represents the number of students failing in at least one subject.
   - `AS failing_students` assigns an alias to the result of the count, making it easier to understand the output.

In summary, this query provides the count of students who have failed in at least one subject by checking if their score in any of the specified subjects is less than 40.
*/