-- Solution:
SELECT
    full_name,
    bangla + english + arts + math + science AS total_score
FROM
    students;





/*
This SQL query calculates the total score of each student across multiple subjects.
1. `SELECT full_name` retrieves the full names of the students.
2. `bangla + english + arts + math + science` adds up the scores of the specified subjects.
3. `AS total_score` gives a name (alias) to the result of the addition, making it easier to understand.
4. `FROM students` specifies the table from which to retrieve the data.
In summary, this query provides the total score of each student by summing their scores in Bangla, English, Arts, Math, and Science.
*/