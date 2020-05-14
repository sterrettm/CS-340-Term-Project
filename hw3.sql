
-- (a) Table initialization code

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

-- (b) Sample Data

INSERT INTO Users(userID, username, password, birthDate, schoolMajor) VALUES
-- Note that password is meant to be a hashed password, so it doesn't really
-- mean anything in terms of SQL logic, only application logic. So I'm just using
-- a nonsense hash "$2b$"
(1, "Samson"  , "$2b$", "2004-03-01", NULL),
(2, "sterretm", "$2b$", "2011-11-05", "Computer Systems"),
(3, "gaul",     "$2b$", "1990-01-01", NULL),
(4, "kiersten", "$2b$", "2002-04-01", "Microbiology"),
(5, "catherine","$2b$", "2016-09-10", NULL),
(6, "apples",   "$2b$", "1984-03-09", "Nuclear Engineering"),
(7, "scrapheap","$2b$", "1998-09-08", NULL),
(8, "noggin",   "$2b$", "1966-04-07", "Mathematics"),
(9, "aluminum", "$2b$", "2003-01-02", "Materials Science"),
(10,"whateven", "$2b$", "2010-10-10", NULL);

INSERT INTO UserPhoneNumbers(userID, phoneNumber) VALUES
(1, "(537) 565-9690"),
(1, "(940) 755-5241"),
(2, "(384) 586-3402"),
(3, "(624) 251-2562"),
(4, "(224) 316-1763"),
(5, "(706) 864-0425"),
(6, "(889) 431-9931"),
(7, "(896) 934-3794"),
(8, "(457) 925-5027"),
(9, "(465) 412-8235"),
(10,"(803) 995-3311");

INSERT INTO UserLocations(userID, location) VALUES
(1, "847 Smith Street, Smithtown, NY 11787"),
(2, "766 Joy Ridge Street, Reisterstown, MD 21136"),
(3, "3 E. Crescent Drive, Natchez, MS 39120"),
(4, "9309 East Ave., Albany, NY 12203"),
(5, "724 Liberty Ave., San Diego, CA 92111"),
(6, "93 North Hickory Dr., Hackettstown, NJ 07840"),
(7, "7365 Morris St., Fort Lee, NJ 07024"),
(8, "9686 Depot Street, Christiansburg, VA 24073"),
(9, "95 Arrowhead Ave., Newark, NJ 07103"),
(10,"61 Princeton Court, Canonsburg, PA 15317");

INSERT INTO PrivateMessages(messageID, sentAt, sendUserID, recvUserID, message) VALUES
(NULL, "2020-03-14 12:04:02.000000", 1, 7, "Hello World!"),
(NULL, "2020-03-14 12:04:02.000000", 4, 3, "This is a message"),
(NULL, "2020-03-14 12:04:02.000000", 8, 1, "How was your day?"),
(NULL, "2020-03-14 12:04:02.000000", 8,10, "What even"),
(NULL, "2020-03-14 12:04:02.000000", 6, 8, "A datapoint"),
(NULL, "2020-03-14 12:04:02.000000", 3, 9, "A message"),
(NULL, "2020-03-14 12:04:02.000000", 1, 5, "sendUserID is an attribute"),
(NULL, "2020-03-14 12:04:02.000000", 2, 8, "Calculators are interesting"),
(NULL, "2020-03-14 12:04:02.000000", 4, 2, "Apples"),
(NULL, "2020-03-14 12:04:02.000000", 7, 6, "Nuclear Engineering?");

INSERT INTO Friends (userID1, userID2) VALUES
(1,4),
(2,4),
(6,4),
(7,6),
(2,10),
(5,10),
(3,10),
(7,2),
(8,1),
(3,5);

INSERT INTO UserInterests (userID, interest) VALUES
(1,"Hockey"),
(2,"Chess"),
(6,"Video Games"),
(7,"Cooking"),
(2,"Baseball"),
(5,"Board Games"),
(3,"Hockey"),
(7,"Geocaching"),
(8,"Video Games"),
(3,"Soccer");

INSERT INTO LoginTokens (tokenID, userID, issueDateTime, expiryDateTime, token) VALUES
(NULL, 1, "2020-03-14 12:04:02.000000", "2020-12-00 12:04:02.000000", "ABC"),
(NULL, 2, "2020-03-18 12:04:02.000000", "2020-12-00 12:04:02.000000", "QUR"),
(NULL, 3, "2020-03-22 12:04:02.000000", "2020-12-00 12:04:02.000000", "EXJ"),
(NULL, 4, "2020-03-03 12:04:02.000000", "2020-12-00 12:04:02.000000", "PLI"),
(NULL, 5, "2020-03-11 12:04:02.000000", "2020-12-00 12:04:02.000000", "NAH"),
(NULL, 6, "2020-03-14 12:04:02.000000", "2020-12-00 12:04:02.000000", "AVB"),
(NULL, 7, "2020-03-08 12:04:02.000000", "2020-12-00 12:04:02.000000", "QRQ"),
(NULL, 8, "2020-03-06 12:04:02.000000", "2020-12-00 12:04:02.000000", "XAA"),
(NULL, 9, "2020-03-02 12:04:02.000000", "2020-12-00 12:04:02.000000", "ZEN"),
(NULL,10, "2020-03-09 12:04:02.000000", "2020-12-00 12:04:02.000000", "APP");

-- (c) queries

-- This query gets all users that have a shared interest with the user given be the :username variable

SELECT user.userID, user.username, user2.userID AS otherUserID, user2.username AS otherUsername, us1.interest
FROM Users AS user
JOIN UserInterests AS us1 ON user.userID = us1.userID
JOIN UserInterests AS us2 ON us1.interest = us2.interest
JOIN Users AS user2       ON us2.userID = user2.userID 
WHERE user.userID <> user2.userID AND 
user.username=:username;

-- Get all private messages between two userIDs and whether the first user sent or received it, ordered by 
-- the time the message was sent

SELECT * FROM (
(SELECT message, sentAt, "sent" as sentOrRecv FROM PrivateMessages
WHERE sendUserID=:userID1 AND recvUserID=:userID2)
UNION
(SELECT message, sentAt, "recv" as sentOrRecv FROM PrivateMessages
WHERE sendUserID=:userID2 AND recvUserID=:userID1)
) AS x
ORDER BY sentAt;

-- This query gets all non-expired tokens for the user with username

SELECT token FROM LoginTokens AS LT
WHERE LT.userID = (SELECT userID FROM Users WHERE username=:username) AND
LT.expiryDateTime > NOW() AND LT.issueDateTime < NOW(); 

-- This query gets all the friends for the user with username

SELECT other.userID, other.username FROM Users AS user
JOIN Friends AS f ON user.userID = f.userID1
JOIN Users AS other ON f.userID2=other.userID
WHERE user.username=:username
UNION
SELECT other.userID, other.username FROM Users AS user
JOIN Friends AS f ON user.userID = f.userID2
JOIN Users AS other ON f.userID1=other.userID
WHERE user.username=:username;

-- This query adds a new user to the database; it will fail with a uniqueness
-- constraint error if the username is taken, which can be handled in the application

INSERT INTO Users(username, password, birthDate) VALUES (:username, :password, :birthDate);

-- This creates a new post from the currently logged in user (whose ID is referred to as userID)
-- to another user (whose ID is referred to as otherUserID)

INSERT INTO PrivateMessages(sendUserId, recvUserId, message, sentAt) VALUES (:userId, :otherUserID, :message, :currentDateTime);

-- This query removes a friend relationship between two users
-- We need to check two conditions because our current user might be
-- userID1 or userID2 in the friend relation

DELETE FROM Friends WHERE
(userID1 = :userID AND userID2 = :friendUserID)
OR
(userID1 = :friendUserID AND userID2 = :userID);

-- This query deletes one of a users location values
-- The value for the :location variable will need to be obtained from a previous query

DELETE FROM UserLocations WHERE userID = :userID AND location = :location;

-- This query deletes one of a users phone numbers
-- This will probably also need to come from a previous select query to match exactly

DELETE FROM UserPhoneNumbers WHERE userID = :userID AND phoneNumber = :phoneNumber;

-- Because date times are hard to deal with, and we only need to know the current one,
-- we will make a procedure to add a new private message

DELIMITER $$

CREATE PROCEDURE newPrivateMessage(
IN sendID int(11),
IN recvID int(11),
IN msg varchar(1024)
)
BEGIN
    INSERT INTO PrivateMessages(sendUserID, recvUserID, message, sentAt) VALUES
    (sendID, recvID, msg, NOW());
END $$

DELIMITER ;

-- We will also make a similar procedure for inserting a new login token, as this also 
-- has multiple datetimes better handled in 
-- The token value itself is 64 base-64 encoded values, generated in a 
-- cryptographically random way in Node.js

DELIMITER $$

CREATE PROCEDURE newLoginToken(
IN usrID int(11),
IN tokenStr varchar(64),
IN hoursToExpiry int(11))
BEGIN
    INSERT INTO LoginTokens(userID, token, issueDateTime, expiryDateTime) VALUES
    (usrID, tokenStr, NOW(), (NOW() + INTERVAL hoursToExpiry HOUR));
END $$

DELIMITER ;