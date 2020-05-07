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