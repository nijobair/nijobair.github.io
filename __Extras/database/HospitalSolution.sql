-- Department Workload Analysis
-- Which departments have the highest number of appointments? How does this correlate with the number of doctors in each department?
SELECT
    DepartmentName,
    COUNT(*) AS Appointments,
    COUNT(DISTINCT doc.DoctorID) AS Doctors,
    COUNT(*) / COUNT(DISTINCT doc.DoctorID) AS AppointmentsPerDoctor
FROM Departments AS dep
LEFT JOIN Doctors AS doc
    ON dep.DepartmentID = doc.DepartmentID
LEFT JOIN Appointments AS app
    ON doc.DoctorID = app.DoctorID
GROUP BY dep.DepartmentID;

-- Patient Demographics
-- What is the age distribution of our patients, and how does it vary between different departments? Are there specific health conditions more prevalent in certain age groups?
SELECT
    dep.DepartmentName,
    AVG(strftime('%Y', 'now') - pat.DateOfBirth) AS AverageAge,
    -- MIN(pat.Age) AS MinAge,
    -- MAX(pat.Age) AS MaxAge,
    COUNT(*) AS Patients
FROM Departments AS dep
LEFT JOIN Doctors AS doc
    ON dep.DepartmentID = doc.DepartmentID
LEFT JOIN Appointments AS app
    ON doc.DoctorID = app.DoctorID
LEFT JOIN Patients AS pat
    ON app.PatientID = pat.PatientID
GROUP BY dep.DepartmentID;

-- Treatment Cost Analysis
-- What is the average cost of treatments per department? Which treatments account for the highest total expenditure?


-- Doctor Performance
-- Which doctors have the highest number of completed appointments vs. no-shows/cancellations? How does experience (years since hire) relate to appointment completion rates?


-- Patient Retention
-- What percentage of patients return for multiple visits? Are there patterns in the time between visits for chronic condition patients?


-- Resource Allocation
-- Based on historical data, can we predict peak times for appointments in different departments? How might this affect staff scheduling?
