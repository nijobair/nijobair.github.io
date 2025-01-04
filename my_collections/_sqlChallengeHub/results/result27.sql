-- Solution:
WITH BanglaMedian AS (
    SELECT AVG(bangla) AS median_bangla
    FROM (
        SELECT bangla
        FROM students
        ORDER BY bangla
        LIMIT 2 - (SELECT COUNT(*) FROM students) % 2
        OFFSET (SELECT (COUNT(*) - 1) / 2 FROM students)
    )
), EnglishMedian AS (
    SELECT AVG(english) AS median_english
    FROM (
        SELECT english
        FROM students
        ORDER BY english
        LIMIT 2 - (SELECT COUNT(*) FROM students) % 2
        OFFSET (SELECT (COUNT(*) - 1) / 2 FROM students)
    )
), ArtsMedian AS (
    SELECT AVG(arts) AS median_arts
    FROM (
        SELECT arts
        FROM students
        ORDER BY arts
        LIMIT 2 - (SELECT COUNT(*) FROM students) % 2
        OFFSET (SELECT (COUNT(*) - 1) / 2 FROM students)
    )
), MathMedian AS (
    SELECT AVG(math) AS median_math
    FROM (
        SELECT math
        FROM students
        ORDER BY math
        LIMIT 2 - (SELECT COUNT(*) FROM students) % 2
        OFFSET (SELECT (COUNT(*) - 1) / 2 FROM students)
    )
), ScienceMedian AS (
    SELECT AVG(science) AS median_science
    FROM (
        SELECT science
        FROM students
        ORDER BY science
        LIMIT 2 - (SELECT COUNT(*) FROM students) % 2
        OFFSET (SELECT (COUNT(*) - 1) / 2 FROM students)
    )
)
SELECT full_name, bangla, english, arts, math, science
FROM students
WHERE 
    bangla > (SELECT median_bangla FROM BanglaMedian) AND
    english > (SELECT median_english FROM EnglishMedian) AND
    arts > (SELECT median_arts FROM ArtsMedian) AND
    math > (SELECT median_math FROM MathMedian) AND
    science > (SELECT median_science FROM ScienceMedian);






/*
This SQL query selects students whose scores in all subjects are above the median scores for those subjects.
1. The Common Table Expressions (CTEs) calculate the median scores for each subject:
   - `BanglaMedian`, `EnglishMedian`, `ArtsMedian`, `MathMedian`, `ScienceMedian`: Each CTE calculates the median score for a specific subject by ordering the scores and selecting the middle value(s). The `AVG` function is used to handle both even and odd numbers of students.
2. The main query:
   - `SELECT full_name, bangla, english, arts, math, science FROM students`: Selects the `full_name` and scores for each subject from the `students` table.
   - `WHERE bangla > (SELECT median_bangla FROM BanglaMedian) AND ...`: Filters the results to include only those students whose scores in all subjects are above the median scores calculated in the CTEs.

In summary, this query provides the names and scores of students who have scored above the median in all subjects.
*/