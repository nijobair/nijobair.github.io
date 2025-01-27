-- Create Tables
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(50) NOT NULL
);

CREATE TABLE Doctors (
    DoctorID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    DepartmentID INT,
    Specialization VARCHAR(100),
    HireDate DATE,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

CREATE TABLE Patients (
    PatientID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Gender CHAR(1),
    DateOfBirth DATE,
    ContactNumber VARCHAR(15),
    LastVisitDate DATE
);

CREATE TABLE Appointments (
    AppointmentID INT PRIMARY KEY,
    PatientID INT,
    DoctorID INT,
    AppointmentDate DATETIME,
    Status VARCHAR(20),
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
);

CREATE TABLE MedicalRecords (
    RecordID INT PRIMARY KEY,
    PatientID INT,
    DoctorID INT,
    VisitDate DATE,
    Diagnosis VARCHAR(255),
    Treatment VARCHAR(255),
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
);

CREATE TABLE Treatments (
    TreatmentID INT PRIMARY KEY,
    TreatmentName VARCHAR(100),
    Cost DECIMAL(10,2)
);

-- Insert Sample Data
INSERT INTO Departments VALUES
(1, 'Cardiology'),
(2, 'Neurology'),
(3, 'Oncology'),
(4, 'Pediatrics'),
(5, 'Orthopedics'),
(6, 'Emergency Medicine');

INSERT INTO Doctors VALUES
(101, 'Sarah', 'Wilson', 1, 'Cardiologist', '2018-06-15'),
(102, 'Michael', 'Chen', 2, 'Neurologist', '2015-03-22'),
(103, 'Emily', 'Davis', 3, 'Oncologist', '2020-11-01'),
(104, 'James', 'Taylor', 1, 'Cardiologist', '2019-09-10'),
(105, 'Lisa', 'Brown', 2, 'Neurosurgeon', '2017-04-05'),
(106, 'Olivia', 'Martinez', 4, 'Pediatrician', '2021-05-12'),
(107, 'William', 'Anderson', 5, 'Orthopedic Surgeon', '2016-08-03'),
(108, 'Sophia', 'Thomas', 6, 'ER Physician', '2019-11-15'),
(109, 'Benjamin', 'Jackson', 1, 'Cardiologist', '2014-02-22'),
(110, 'Charlotte', 'White', 2, 'Neurologist', '2022-07-01'),
(111, 'Daniel', 'Harris', 3, 'Oncologist', '2018-09-19'),
(112, 'Amelia', 'Clark', 4, 'Pediatrician', '2020-04-11'),
(113, 'Henry', 'Lewis', 5, 'Orthopedist', '2017-12-09'),
(114, 'Mia', 'Walker', 6, 'ER Physician', '2023-01-25'),
(115, 'Ethan', 'Hall', 1, 'Cardiologist', '2015-10-30');

INSERT INTO Patients VALUES
(1001, 'John', 'Doe', 'M', '1985-07-12', '555-1234', '2023-10-15'),
(1002, 'Jane', 'Smith', 'F', '1990-02-25', '555-5678', '2023-10-18'),
(1003, 'Robert', 'Johnson', 'M', '1978-11-03', '555-9012', '2023-10-20'),
(1004, 'Maria', 'Garcia', 'F', '1982-04-19', '555-3456', '2023-10-22'),
(1005, 'David', 'Lee', 'M', '1995-09-30', '555-7890', '2023-10-25'),
(1006, 'Emma', 'Wilson', 'F', '2005-03-18', '555-1122', '2023-11-05'),
(1007, 'Noah', 'Thompson', 'M', '1992-07-22', '555-3344', '2023-11-08'),
(1008, 'Ava', 'Robinson', 'F', '1988-12-05', '555-5566', '2023-11-10'),
(1009, 'Liam', 'Clark', 'M', '1975-09-14', '555-7788', '2023-11-12'),
(1010, 'Isabella', 'Rodriguez', 'F', '1999-04-27', '555-9900', '2023-11-15'),
(1011, 'Lucas', 'Lewis', 'M', '2010-08-03', '555-1212', '2023-11-18'),
(1012, 'Mia', 'Lee', 'F', '1983-01-19', '555-3434', '2023-11-20'),
(1013, 'Oliver', 'Gonzalez', 'M', '1965-06-25', '555-5656', '2023-11-22'),
(1014, 'Sophia', 'Hernandez', 'F', '2001-11-08', '555-7878', '2023-11-25'),
(1015, 'James', 'Young', 'M', '1997-02-14', '555-9090', '2023-11-28'),
(1016, 'Charlotte', 'King', 'F', '1980-05-30', '555-1234', '2023-12-01'),
(1017, 'Elijah', 'Wright', 'M', '1972-10-17', '555-5678', '2023-12-04'),
(1018, 'Harper', 'Lopez', 'F', '1993-03-21', '555-9012', '2023-12-07'),
(1019, 'Alexander', 'Hill', 'M', '1987-07-07', '555-3456', '2023-12-10'),
(1020, 'Evelyn', 'Scott', 'F', '1968-12-12', '555-7890', '2023-12-13');

INSERT INTO Appointments VALUES
(5001, 1001, 101, '2023-10-15 09:00:00', 'Completed'),
(5002, 1002, 102, '2023-10-18 10:30:00', 'No Show'),
(5003, 1003, 103, '2023-10-20 14:00:00', 'Completed'),
(5004, 1004, 104, '2023-10-22 11:00:00', 'Cancelled'),
(5005, 1005, 105, '2023-10-25 15:30:00', 'Completed'),
(5006, 1006, 106, '2023-11-05 10:00:00', 'Completed'),
(5007, 1007, 107, '2023-11-08 14:30:00', 'Completed'),
(5008, 1008, 108, '2023-11-10 08:45:00', 'No Show'),
(5009, 1009, 109, '2023-11-12 11:15:00', 'Completed'),
(5010, 1010, 110, '2023-11-15 09:30:00', 'Cancelled'),
(5011, 1011, 111, '2023-11-18 13:00:00', 'Completed'),
(5012, 1012, 112, '2023-11-20 16:15:00', 'Completed'),
(5013, 1013, 113, '2023-11-22 10:45:00', 'No Show'),
(5014, 1014, 114, '2023-11-25 07:30:00', 'Completed'),
(5015, 1015, 115, '2023-11-28 12:00:00', 'Completed'),
(5016, 1001, 101, '2023-12-01 09:00:00', 'Completed'),
(5017, 1002, 102, '2023-12-04 14:00:00', 'Completed'),
(5018, 1003, 103, '2023-12-07 11:30:00', 'Scheduled'),
(5019, 1004, 104, '2023-12-10 08:45:00', 'Scheduled'),
(5020, 1005, 105, '2023-12-13 16:00:00', 'Scheduled'),
(5021, 1006, 106, '2023-12-16 10:15:00', 'Scheduled'),
(5022, 1007, 107, '2023-12-19 13:30:00', 'Scheduled'),
(5023, 1008, 108, '2023-12-22 09:45:00', 'Scheduled'),
(5024, 1009, 109, '2023-12-25 07:00:00', 'Scheduled'),
(5025, 1010, 110, '2023-12-28 12:30:00', 'Scheduled'),
(5026, 1011, 111, '2024-01-01 15:45:00', 'Scheduled'),
(5027, 1012, 112, '2024-01-04 08:00:00', 'Scheduled'),
(5028, 1013, 113, '2024-01-07 11:15:00', 'Scheduled'),
(5029, 1014, 114, '2024-01-10 14:30:00', 'Scheduled'),
(5030, 1015, 115, '2024-01-13 17:45:00', 'Scheduled'),
(5031, 1016, 101, '2023-11-29 09:30:00', 'Completed'),
(5032, 1017, 102, '2023-12-02 14:45:00', 'Cancelled'),
(5033, 1018, 103, '2023-12-05 08:15:00', 'Completed'),
(5034, 1019, 104, '2023-12-08 11:30:00', 'No Show'),
(5035, 1020, 105, '2023-12-11 16:45:00', 'Completed'),
(5036, 1001, 106, '2023-12-14 07:00:00', 'Completed'),
(5037, 1002, 107, '2023-12-17 12:15:00', 'Completed'),
(5038, 1003, 108, '2023-12-20 09:30:00', 'Completed'),
(5039, 1004, 109, '2023-12-23 14:45:00', 'Cancelled'),
(5040, 1005, 110, '2023-12-26 08:00:00', 'Scheduled'),
(5041, 1006, 111, '2023-12-29 11:15:00', 'Scheduled'),
(5042, 1007, 112, '2024-01-02 16:30:00', 'Scheduled'),
(5043, 1008, 113, '2024-01-05 09:45:00', 'Scheduled'),
(5044, 1009, 114, '2024-01-08 13:00:00', 'Scheduled'),
(5045, 1010, 115, '2024-01-11 07:15:00', 'Scheduled');

INSERT INTO MedicalRecords VALUES
(7001, 1001, 101, '2023-10-15', 'Hypertension', 'Prescribed medication'),
(7002, 1003, 103, '2023-10-20', 'Breast cancer', 'Chemotherapy session'),
(7003, 1005, 105, '2023-10-25', 'Migraine', 'Pain management plan'),
(7004, 1006, 106, '2023-11-05', 'Common cold', 'Antipyretics prescribed'),
(7005, 1007, 107, '2023-11-08', 'Fractured arm', 'Casting applied'),
(7006, 1009, 109, '2023-11-12', 'Arrhythmia', 'Beta blockers prescribed'),
(7007, 1011, 111, '2023-11-18', 'Leukemia', 'Chemotherapy started'),
(7008, 1012, 112, '2023-11-20', 'Childhood asthma', 'Inhaler prescribed'),
(7009, 1014, 114, '2023-11-25', 'Concussion', 'Observation recommended'),
(7010, 1015, 115, '2023-11-28', 'Hypertension', 'Lifestyle modification advice'),
(7011, 1016, 101, '2023-11-29', 'Angina', 'Stress test ordered'),
(7012, 1018, 103, '2023-12-05', 'Skin cancer', 'Biopsy performed'),
(7013, 1020, 105, '2023-12-11', 'Chronic migraine', 'Preventive therapy'),
(7014, 1002, 102, '2023-12-04', 'Epilepsy', 'Medication adjustment'),
(7015, 1004, 104, '2023-12-10', 'Heart murmur', 'Echocardiogram ordered'),
(7016, 1005, 105, '2023-12-13', 'Cluster headaches', 'Oxygen therapy'),
(7017, 1008, 108, '2023-12-22', 'Pneumonia', 'Antibiotics prescribed'),
(7018, 1010, 110, '2023-12-28', 'Multiple sclerosis', 'IV steroids administered'),
(7019, 1013, 113, '2024-01-07', 'Hip replacement', 'Post-op checkup'),
(7020, 1017, 102, '2023-12-02', 'Parkinson''s disease', 'Medication review'),
(7021, 1019, 104, '2023-12-08', 'High cholesterol', 'Statin prescribed'),
(7022, 1003, 103, '2023-12-07', 'Lung cancer', 'Radiation therapy'),
(7023, 1007, 107, '2023-12-19', 'Knee injury', 'Physical therapy recommended');

INSERT INTO Treatments VALUES
(1, 'Chemotherapy', 2500.00),
(2, 'MRI Scan', 1200.50),
(3, 'Echocardiogram', 950.75),
(4, 'Physical Therapy', 300.00),
(5, 'X-Ray', 150.00),
(6, 'Blood Test', 75.25),
(7, 'CT Scan', 500.00),
(8, 'Angioplasty', 15000.00),
(9, 'Colonoscopy', 1200.00),
(10, 'Vaccination', 45.50);