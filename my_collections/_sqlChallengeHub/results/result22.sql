-- Solution:
WITH AvgScores AS (
    SELECT 
        AVG(bangla) AS avg_bangla,
        AVG(english) AS avg_english,
        AVG(arts) AS avg_arts,
        AVG(math) AS avg_math,
        AVG(science) AS avg_science
    FROM students
)
SELECT
    full_name,
    bangla,
    english,
    arts,
    math,
    science
FROM
    students,
    AvgScores
WHERE 
    bangla > avg_bangla AND 
    english > avg_english AND 
    arts > avg_arts AND 
    math > avg_math AND 
    science > avg_science;






/*
This SQL query selects the students who have scored above average in all subjects.
1. The Common Table Expression (CTE) `AvgScores`:
   - `WITH AvgScores AS`: This begins the definition of a CTE named `AvgScores`.
   - `SELECT AVG(bangla) AS avg_bangla, AVG(english) AS avg_english, AVG(arts) AS avg_arts, AVG(math) AS avg_math, AVG(science) AS avg_science FROM students`: This query calculates the average scores for Bangla, English, Arts, Math, and Science across all students.
2. The main query:
   - `SELECT full_name, bangla, english, arts, math, science FROM students, AvgScores`: This part selects the `full_name` and scores for each subject from the `students` table and joins it with the `AvgScores` CTE.
   - `WHERE bangla > avg_bangla AND english > avg_english AND arts > avg_arts AND math > avg_math AND science > avg_science`: Filters the results to include only those students whose scores in all subjects are above the average scores calculated in the CTE.

In summary, this query provides the names and scores of students who have scored above the average in all subjects.
*/