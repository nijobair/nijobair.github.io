SELECT
    full_name,
    math - science AS difference
FROM students
WHERE math > science
ORDER BY difference
LIMIT 10;