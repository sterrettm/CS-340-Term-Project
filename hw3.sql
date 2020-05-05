
-- Table initialization logic

CREATE TABLE `Users`(
    `userID` int(11) PRIMARY KEY AUTO_INCREMENT,
    `username` varchar(64) NOT NULL,
    `password` varchar(64) NOT NULL,
    `birthDate` date NOT NULL,
    `schoolMajor` varchar(255),
    CONSTRAINT `unique_usernames` UNIQUE (username)
)engine=InnoDB;

CREATE TABLE `UserPhoneNumbers`(
    `userID` int(11) NOT NULL,
    `phoneNumber` varchar(32) NOT NULL,
    PRIMARY KEY (userID, phoneNumber)
)engine=InnoDB;

CREATE TABLE `UserLocations`(
    `userID` int(11) NOT NULL,
    `location` varchar(256) NOT NULL,
    PRIMARY KEY (userID, location)
)engine=InnoDB;

CREATE TABLE `PrivateMessages`(
    `messageID` int(11) PRIMARY KEY AUTO_INCREMENT,
    `sentAt` date NOT NULL,
    `sendUserID` int(11) NOT NULL,
    `recvUserID` int(11) NOT NULL,
    `meesage` varchar(1024) NOT NULL,
    FOREIGN KEY (sendUserID) REFERENCES Users(id),
    FOREIGN KEY (recvUserID) REFERENCES Users(id)
)engine=InnoDB;

CREATE TABLE `Friends`(
    `userID1` int(11) NOT NULL,
    `userID2` int(11) NOT NULL,
    PRIMARY KEY (userID1, userID2)
)engine=InnoDB;

