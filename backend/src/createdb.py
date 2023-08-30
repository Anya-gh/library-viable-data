import sqlite3
import os
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

con = sqlite3.connect(os.path.join(ROOT_DIR, 'library.db'))
cur = con.cursor()

cur.execute("DROP TABLE IF EXISTS Users")

cur.execute("""CREATE TABLE Users
(UID INTEGER PRIMARY KEY,
First_Name TEXT NOT NULL,
Last_Name TEXT NOT NULL,
Email TEXT NOT NULL,
Password TEXT NOT NULL
)""")

cur.execute("DROP TABLE IF EXISTS Books")

cur.execute("""CREATE TABLE Books
(BID INTEGER PRIMARY KEY,
Title TEXT NOT NULL,
Description TEXT NOT NULL,
Image TEXT
)""")

cur.execute("DROP TABLE IF EXISTS Loans")

cur.execute("""CREATE TABLE Loans
(LID INTEGER PRIMARY KEY,
BID INTEGER UNIQUE,
UID INTEGER,
Return DATE,
FOREIGN KEY(BID) REFERENCES Books(BID),
FOREIGN KEY(UID) REFERENCES Users(UID)
)""")

con.close()