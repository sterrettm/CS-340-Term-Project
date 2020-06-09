DELIMITER $$

DROP PROCEDURE IF EXISTS newLoginToken $$
CREATE PROCEDURE newLoginToken(
IN usrID int(11),
IN tokenStr varchar(64),
IN hoursToExpiry int(11))
BEGIN
    INSERT INTO LoginTokens(userID, token, issueDateTime, expiryDateTime) VALUES
    (usrID, tokenStr, NOW(), (NOW() + INTERVAL hoursToExpiry HOUR));
END $$

DROP PROCEDURE IF EXISTS getFriends $$
CREATE PROCEDURE getFriends(
IN userIDIn int(11))
BEGIN
    SELECT other.userID, other.username FROM Users AS user
    JOIN Friends AS f ON user.userID = f.userID1
    JOIN Users AS other ON f.userID2=other.userID
    WHERE user.userID=userIDIn
    UNION
    SELECT other.userID, other.username FROM Users AS user
    JOIN Friends AS f ON user.userID = f.userID2
    JOIN Users AS other ON f.userID1=other.userID
    WHERE user.userID=userIDIn;
END $$

DROP PROCEDURE IF EXISTS getMessages $$
CREATE PROCEDURE getMessages(
IN currUserID int(11),
IN otherUserID int(11))
BEGIN
    SELECT * FROM (
    (SELECT message, sentAt, "sent" as sentOrRecv FROM PrivateMessages
    WHERE sendUserID=currUserID AND recvUserID=otherUserID)
    UNION
    (SELECT message, sentAt, "recv" as sentOrRecv FROM PrivateMessages
    WHERE sendUserID=otherUserID AND recvUserID=currUserID)
    ) AS x
    ORDER BY sentAt;
END $$

DROP PROCEDURE IF EXISTS getMessagedPeople $$
CREATE PROCEDURE getMessagedPeople(
IN currUserID int(11)
)
BEGIN
    SELECT DISTINCT user.userID, user.username FROM PrivateMessages as message
    JOIN Users AS user ON 
    ((message.sendUserID = currUserID AND user.userID = message.recvUserID) ||
    ( message.recvUserID = currUserID AND user.userID = message.sendUserID))
    ORDER BY message.sentAt;
END $$

DELIMITER ;