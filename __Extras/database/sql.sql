-- Delete table if it exists
DROP TABLE IF EXISTS students;

-- Select all rows from the village_x table
SELECT SUM(english) FROM students;

-- Create the table
CREATE TABLE students (
    registration_no VARCHAR(10) PRIMARY KEY,
    full_name VARCHAR(100),
    gender VARCHAR(10),
    bangla VARCHAR(3),
    english VARCHAR(3),
    arts VARCHAR(3),
    math VARCHAR(3),
    science VARCHAR(3)
);

-- Insert the data into the table
INSERT INTO students (registration_no, full_name, gender, bangla, english, arts, math, science) VALUES
('2024001', 'Ayesha Rahman', 'Female', '85', '78', '90', '82', '75'),
('2024002', 'Hasan Kaya', 'Male', '58', '65', '68', '78', '60'),
('2024003', 'Fatima Akter', 'Female', '80', '85', '75', '78', '82'),
('2024004', 'Emir Yildiz', 'Male', '70', '75', '80', '76', '68'),
('2024005', 'Mehedi Hassan', 'Male', '65', '72', '70', '85', '72'),
('2024006', 'Elif Demir', 'Female', '90', '88', '82', '90', '80'),
('2024007', 'Shakib Alam', 'Male', '75', '80', '85', '85', '78'),
('2024008', 'Aylin Ozdemir', 'Female', '68', '72', '80', '72', '65'),
('2024009', 'Rahat Chowdhury', 'Male', '85', '92', '90', '85', '88'),
('2024010', 'Selin Kilic', 'Female', '75', '70', '80', '78', '70'),
('2024011', 'Arif Mia', 'Male', '88', '85', '75', '90', '80'),
('2024012', 'Burak Celik', 'Male', '70', '75', '80', '76', '68'),
('2024013', 'Nafisa Rahman', 'Female', '80', '85', '75', '78', '82'),
('2024014', 'Zeynep Aydin', 'Female', '68', '72', '80', '72', '65'),
('2024015', 'Sajid Khan', 'Male', '65', '72', '70', '85', '72'),
('2024016', 'Merve Yilmaz', 'Female', '75', '70', '80', '78', '70'),
('2024017', 'Riyad Hossain', 'Male', '88', '85', '75', '90', '80'),
('2024018', 'Can Koc', 'Male', '70', '75', '80', '76', '68'),
('2024019', 'Shirin Begum', 'Female', '80', '85', '75', '78', '82'),
('2024020', 'Emine Arslan', 'Female', '68', '72', '80', '72', '65'),
('2024021', 'Tariq Ahmed', 'Male', '85', '92', '90', '85', '88'),
('2024022', 'Leyla Guzel', 'Female', '75', '70', '80', '78', '70'),
('2024023', 'Jamal Ali', 'Male', '88', '85', '75', '90', '80'),
('2024024', 'Deniz Yilmaz', 'Female', '70', '75', '80', '76', '68'),
('2024025', 'Karim Uddin', 'Male', '80', '85', '75', '78', '82'),
('2024026', 'Ahmet Yildirim', 'Male', '68', '72', '80', '72', '65'),
('2024027', 'Mizan Rahman', 'Male', '65', '72', '70', '85', '72'),
('2024028', 'Ece Toprak', 'Female', '75', '70', '80', '78', '70'),
('2024029', 'Shahin Sarkar', 'Male', '88', '85', '75', '90', '80'),
('2024030', 'Amina Islam', 'Female', '55', '60', '65', '70', '58'),
('2024031', 'Selim Kaya', 'Male', '60', '67', '70', '75', '62'),
('2024032', 'Nusrat Jahan', 'Female', '78', '82', '85', '88', '80'),
('2024033', 'Omer Demir', 'Male', '50', '55', '60', '65', '58'),
('2024034', 'Razia Begum', 'Female', '65', '70', '75', '80', '68'),
('2024035', 'Mustafa Ali', 'Male', '40', '45', '50', '55', '48'),
('2024036', 'Dilara Arslan', 'Female', '85', '90', '92', '95', '88'),
('2024037', 'Ibrahim Khan', 'Male', '60', '65', '70', '75', '68'),
('2024038', 'Ayse Yildiz', 'Female', '55', '60', '65', '70', '58'),
('2024039', 'Talha Hossain', 'Male', '45', '50', '55', '60', '52'),
('2024040', 'Nazmul Islam', 'Male', '35', '90', '30', '95', '92'),
('2024041', 'Tahmidur Rahman', 'Male', '85', '88', '85', '87', '86'),
('2024042', 'Ramim Gazi', 'Male', '60', '65', '62', '68', '70'),
('2024043', 'Shadman Sakib', 'Male', '78', '70', '65', '70', '80'),
('2024044', 'Bayan Ahmad', 'Female', '30', '92', '88', '93', '90'),
('2024045', 'Pir Ahmet', 'Male', '45', '50', '40', '92', '90'),
('2024046', 'AK Abid', 'Male', '50', '88', '92', '55', '60');