import sqlite3
import os
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

con = sqlite3.connect(os.path.join(ROOT_DIR, 'library.db'))
con.execute("PRAGMA foreign_keys = ON")
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
Image TEXT,
UID INTEGER,
FOREIGN KEY(UID) REFERENCES Users(UID)
)""")

con.close()