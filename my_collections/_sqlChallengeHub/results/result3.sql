SELECT full_name
FROM students
WHERE arts = (
    SELECT MAX(arts)
    FROM students
);

-- Another Solution:
-- SELECT full_name
-- FROM students
-- ORDER BY arts DESC
-- LIMIT 2;
-- Can you guess why this solution isn't flexible?