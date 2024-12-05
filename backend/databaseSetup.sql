USE s103800614_db;

CREATE TABLE IF NOT EXISTS items (
    `itemID` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255),
    `cost` DECIMAL(10,2) NOT NULL,
    `imageReference` VARCHAR(255) NOT NULL,
    `category` VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    `userID` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `DOB` DATE,
    `phone` VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS transactions (
    `transactionID` INT AUTO_INCREMENT PRIMARY KEY,
    `date` TIMESTAMP NOT NULL,
    `itemID` INT NOT NULL,
    `fromUserID` INT NOT NULL,
    `toUserID` INT NOT NULL,
    `cost` DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (`fromUserID`) REFERENCES users (`userID`),
    FOREIGN KEY (`toUserID`) REFERENCES users (`userID`),
    FOREIGN KEY (`itemID`) REFERENCES items (`itemID`),
	
    CONSTRAINT CHK_UserIDs CHECK (fromUserID <> toUserID)
);

INSERT INTO items (name, description, cost, imageReference, category)
VALUES ('Apple Pancakes', 'Apple flavoured pancakes', '3', 'Apple', 'fruit'),
('Bacon Pancakes', 'Bacon flavoured pancakes', '9', 'Bacon', 'savoury'),
('Banana Pancakes', 'Banana flavoured pancakes', '7', 'Banana', 'fruit'),
('Berry Pancakes', 'Berry flavoured pancakes', '10', 'Berry', 'fruit'),
('Carrot Pancakes', 'Carrot flavoured pancakes', '8', 'Carrot', 'vegetable'),
('Chocolate Pancakes', 'Chocolate covered pancakes', '8', 'Chocolate', 'sweet'),
('Coconut Pancakes', 'Coconut flavoured pancakes', '35', 'Coconut', 'vegetable'),
('Lemon Pancakes', 'Lemon flavoured pancakes', '8', 'Lemon', 'fruit'),
('Pineapple Pancakes', 'Pineapple flavoured pancakes', '8', 'Pineapple', 'fruit'),
('Pumpkin Pancakes', 'Pumpkin flavoured pancakes', '1', 'Pumpkin', 'fruit'),
('Smores Pancakes', 'Smores covered pancakes', '99', 'Smores', 'sweet'),
('Standard Pancakes', 'Unflavoured pancakes', '83', 'Standard', 'neutral');

INSERT INTO users(username, email, DOB, phone)
VALUES('adrian.chiera', 'adrian.chiera@gmail.com', '2003-01-14', '123-456-7890'),
('ravissshh', 'ravissshh@gmail.com', '2003-02-21', '098-765-4321'),
('sbayanta', 'sbayanta@gmail.com', '2003-04-15', '567-890-1234');

INSERT INTO transactions(date, itemID, fromUserID, toUserID, cost)
VALUES ('2023-06-18', 4, 1, 2, 5),
('2023-03-04', 8, 2, 3, 50),
('2022-07-14', 12, 3, 1, 83);
