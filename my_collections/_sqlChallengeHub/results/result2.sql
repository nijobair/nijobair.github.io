-- Solution:
SELECT COUNT(*) AS math_toppers
FROM students
WHERE math > 80;





/*
This SQL query counts the number of students who scored more than 80 in math.
1. `COUNT(*)` counts all the rows that meet the condition.
2. `AS math_toppers` gives a name (alias) to the result, making it easier to understand.
3. `FROM students` specifies the table from which to retrieve the data.
4. `WHERE math > 80` filters the results to include only students with a math score greater than 80.
In summary, this query provides the count of students who scored higher than 80 in math.
*/