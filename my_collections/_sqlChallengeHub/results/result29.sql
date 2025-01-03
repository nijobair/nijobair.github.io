SELECT
    'Bangla' AS subject,
    MAX(bangla) - MIN(bangla) AS score_range
FROM
    students
UNION ALL
SELECT
    'English' AS subject,
    MAX(english) - MIN(english) AS score_range
FROM
    students
UNION ALL
SELECT
    'Arts' AS subject,
    MAX(arts) - MIN(arts) AS score_range
FROM
    students
UNION ALL
SELECT
    'Math' AS subject,
    MAX(math) - MIN(math) AS score_range
FROM
    students
UNION ALL
SELECT
    'Science' AS subject,
    MAX(science) - MIN(science) AS score_range
FROM
    students;