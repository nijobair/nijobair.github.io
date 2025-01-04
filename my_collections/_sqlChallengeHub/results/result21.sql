-- Solution:
SELECT full_name 
FROM students 
WHERE
    bangla > 80 AND
    english > 80 AND
    arts > 80 AND
    math > 80 AND
    science > 80;






/*
This SQL query selects the names of students who have scored more than 80 in all subjects.
1. `SELECT full_name FROM students`: Selects the `full_name` of students from the `students` table.
2. `WHERE bangla > 80 AND english > 80 AND arts > 80 AND math > 80 AND science > 80`: Filters the results to include only those students who have scored more than 80 in Bangla, English, Arts, Math, and Science.

In summary, this query provides the names of students who have achieved more than 80 marks in all subjects.
*/