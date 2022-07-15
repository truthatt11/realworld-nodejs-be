use mydb;
DROP TABLE IF EXISTS User;
CREATE TABLE IF NOT EXISTS User (
    email VARCHAR(255) PRIMARY KEY NOT NULL,
    token VARCHAR(255),
    username VARCHAR(255),
    bio VARCHAR(255),
    image VARCHAR(255)
);