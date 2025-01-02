SELECT full_name
FROM students
WHERE ( 
    (CASE 
        WHEN bangla > english THEN bangla - english
        ELSE english - bangla 
    END) >= 40 OR
    (CASE 
        WHEN bangla > arts THEN bangla - arts
        ELSE arts - bangla 
    END) >= 40 OR
    (CASE 
        WHEN bangla > math THEN bangla - math
        ELSE math - bangla 
    END) >= 40 OR
    (CASE 
        WHEN bangla > science THEN bangla - science
        ELSE science - bangla 
    END) >= 40 OR
    (CASE 
        WHEN english > arts THEN english - arts
        ELSE arts - english 
    END) >= 40 OR
    (CASE 
        WHEN english > math THEN english - math
        ELSE math - english 
    END) >= 40 OR
    (CASE 
        WHEN english > science THEN english - science
        ELSE science - english 
    END) >= 40 OR
    (CASE 
        WHEN arts > math THEN arts - math
        ELSE math - arts 
    END) >= 40 OR
    (CASE 
        WHEN arts > science THEN arts - science
        ELSE science - arts 
    END) >= 40 OR
    (CASE 
        WHEN math > science THEN math - science
        ELSE science - math 
    END) >= 40
);