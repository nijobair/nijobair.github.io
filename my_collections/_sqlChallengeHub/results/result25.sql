SELECT 
    full_name, 
    ROUND(
        (bangla * 2 + english * 2 + arts + math + science) / 7.0, 2
    ) AS weighted_avg_score
FROM students;