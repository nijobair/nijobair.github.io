-- Solution:
SELECT 
    gender,
    ROUND(
        AVG(bangla)
    ) AS avg_bangla,
    ROUND(
        AVG(english)
    ) AS avg_english,
    ROUND(
        AVG(arts)
    ) AS avg_arts,
    ROUND(
        AVG(math)
    ) AS avg_math,
    ROUND(
        AVG(science)
    ) AS avg_science
FROM students
GROUP BY gender;






/*
This SQL query calculates the average scores of Bangla, English, Arts, Math, and Science for each gender, rounding the averages to the nearest whole number.
1. `SELECT gender, ROUND(AVG(bangla)) AS avg_bangla, ...`: Selects the `gender` and calculates the rounded average scores for Bangla, English, Arts, Math, and Science.
2. `FROM students`: Specifies the table from which to retrieve the data.
3. `GROUP BY gender`: Groups the results by gender to calculate the average scores for each group.

In summary, this query provides the rounded average scores for Bangla, English, Arts, Math, and Science for each gender group.
*/