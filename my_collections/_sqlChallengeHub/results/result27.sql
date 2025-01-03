WITH BanglaMedian AS (
    SELECT bangla
    FROM students
    ORDER BY bangla
    LIMIT 1
    OFFSET (SELECT COUNT(*) FROM students) / 2
), EnglishMedian AS (
    SELECT english
    FROM students
    ORDER BY english
    LIMIT 1
    OFFSET (SELECT COUNT(*) FROM students) / 2
), ArtsMedian AS (
    SELECT arts
    FROM students
    ORDER BY arts
    LIMIT 1
    OFFSET (SELECT COUNT(*) FROM students) / 2
), MathMedian AS (
    SELECT math
    FROM students
    ORDER BY math
    LIMIT 1
    OFFSET (SELECT COUNT(*) FROM students) / 2
), ScienceMedian AS (
    SELECT science
    FROM students
    ORDER BY science
    LIMIT 1
    OFFSET (SELECT COUNT(*) FROM students) / 2
)
SELECT full_name, bangla, english, arts, math, science
FROM students
WHERE 
    bangla > (SELECT bangla FROM BanglaMedian) AND
    english > (SELECT english FROM EnglishMedian) AND
    arts > (SELECT arts FROM ArtsMedian) AND
    math > (SELECT math FROM MathMedian) AND
    science > (SELECT science FROM ScienceMedian);