-- Solution:
SELECT
    gender,
    COUNT(*) AS gender_count
FROM
    students
GROUP BY
    gender;





/*
This SQL query counts the number of students for each gender in the 'students' table.
1. `SELECT gender` retrieves the gender of the students.
2. `COUNT(*)` counts the number of students in each gender group.
3. `AS gender_count` gives a name (alias) to the result, making it easier to understand.
4. `FROM students` specifies the table from which to retrieve the data.
5. `GROUP BY gender` groups the result by the 'gender' column to get counts for each gender.
In summary, this query provides the count of students for each gender.
*/