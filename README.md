# TestWorkShopCnxDev

create table sql : 
CREATE TABLE Person (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    Phone VARCHAR(100),
    Username VARCHAR(100),
    CreatedAt VARCHAR(100)
);

CREATE TABLE User (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    PASSWORD VARCHAR(255) NOT NULL,
    PersonId INT UNIQUE,
    FOREIGN KEY (PersonId) REFERENCES Person(Id) ON DELETE CASCADE
);
CREATE TABLE Movies (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    overview TEXT NOT NULL,
    release_date DATE NOT NULL
);


ยิง post man api 
http://localhost:5010/api/movies/upcoming
