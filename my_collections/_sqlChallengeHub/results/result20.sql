WITH RankedScores AS (
    SELECT 
        full_name, 
        bangla, 
        english, 
        arts, 
        math, 
        science,
        ROW_NUMBER() OVER (PARTITION BY 'Bangla' ORDER BY bangla DESC) AS bangla_rank,
        ROW_NUMBER() OVER (PARTITION BY 'English' ORDER BY english DESC) AS english_rank,
        ROW_NUMBER() OVER (PARTITION BY 'Arts' ORDER BY arts DESC) AS arts_rank,
        ROW_NUMBER() OVER (PARTITION BY 'Math' ORDER BY math DESC) AS math_rank,
        ROW_NUMBER() OVER (PARTITION BY 'Science' ORDER BY science DESC) AS science_rank
    FROM students
)
SELECT 
    full_name, 
    bangla AS score, 'Bangla' AS subject FROM RankedScores WHERE bangla_rank <= 3
UNION ALL
SELECT 
    full_name, 
    english AS score, 'English' AS subject FROM RankedScores WHERE english_rank <= 3
UNION ALL
SELECT 
    full_name, 
    arts AS score, 'Arts' AS subject FROM RankedScores WHERE arts_rank <= 3
UNION ALL
SELECT 
    full_name, 
    math AS score, 'Math' AS subject FROM RankedScores WHERE math_rank <= 3
UNION ALL
SELECT 
    full_name, 
    science AS score, 'Science' AS subject FROM RankedScores WHERE science_rank <= 3
ORDER BY subject, score DESC;