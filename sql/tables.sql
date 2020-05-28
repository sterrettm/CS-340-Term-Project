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
    FOREIGN KEY (userID) REFERENCES Users(userID),
    PRIMARY KEY (userID, phoneNumber)
)engine=InnoDB;

CREATE TABLE `UserLocations`(
    `userID` int(11) NOT NULL,
    `location` varchar(256) NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID),
    PRIMARY KEY (userID, location)
)engine=InnoDB;

CREATE TABLE `PrivateMessages`(
    `messageID` int(11) PRIMARY KEY AUTO_INCREMENT,
    `sentAt` datetime NOT NULL,
    `sendUserID` int(11) NOT NULL,
    `recvUserID` int(11) NOT NULL,
    `message` varchar(1024) NOT NULL,
    FOREIGN KEY (sendUserID) REFERENCES Users(userID),
    FOREIGN KEY (recvUserID) REFERENCES Users(userID)
)engine=InnoDB;

CREATE TABLE `Friends`(
    `userID1` int(11) NOT NULL,
    `userID2` int(11) NOT NULL,
    FOREIGN KEY (userID1) REFERENCES Users(userID),
    FOREIGN KEY (userID2) REFERENCES Users(userID),
    PRIMARY KEY (userID1, userID2)
)engine=InnoDB;

CREATE TABLE `LoginTokens`(
    `tokenID` int(11) PRIMARY KEY AUTO_INCREMENT,
    `userID` int(11) NOT NULL,
    `token` varchar(64) NOT NULL,
    `issueDateTime`  datetime NOT NULL,
    `expiryDateTime` datetime NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID)
)engine=InnoDB;

CREATE TABLE `UserInterests`(
    `userID` int(11),
    `interest` varchar(128),
    FOREIGN KEY (userID) REFERENCES Users(userID),
    PRIMARY KEY (userID, interest)
)engine=InnoDB;