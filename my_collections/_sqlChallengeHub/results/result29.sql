-- Solution:
SELECT
    'Bangla' AS subject,
    MAX(bangla) - MIN(bangla) AS score_range
FROM students
UNION ALL
    SELECT
        'English' AS subject,
        MAX(english) - MIN(english) AS score_range
    FROM students
UNION ALL
    SELECT
        'Arts' AS subject,
        MAX(arts) - MIN(arts) AS score_range
    FROM students
UNION ALL
    SELECT
        'Math' AS subject,
        MAX(math) - MIN(math) AS score_range
    FROM students
UNION ALL
    SELECT
        'Science' AS subject,
        MAX(science) - MIN(science) AS score_range
    FROM students;






/*
This SQL query calculates the range of scores (difference between the maximum and minimum scores) for each subject.
1. The query uses `UNION ALL` to combine the results of multiple `SELECT` statements, each calculating the score range for a different subject.
2. For each subject (`Bangla`, `English`, `Arts`, `Math`, `Science`), it selects the subject name as a string and calculates the range of scores using `MAX` and `MIN` functions.
3. The `MAX` function retrieves the highest score, and the `MIN` function retrieves the lowest score for each subject. The difference between these scores gives the score range.

In summary, this query provides the score range for each subject by calculating the difference between the maximum and minimum scores.
*/