-- Delete table if it exists
DROP TABLE IF EXISTS village_x;

-- Select all rows from the table
SELECT * FROM village_x WHERE religion IS NULL;

-- See all the tables in the database
SELECT name FROM sqlite_master WHERE type='table';

SELECT 
    full_name, 
    ROUND(
        (bangla * 2 + english * 2 + arts + math + science) / 7.0, 2
    ) AS weighted_avg_score
FROM students;