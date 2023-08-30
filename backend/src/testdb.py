import sqlite3
import os
import json
from datetime import date
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

con = sqlite3.connect(os.path.join(ROOT_DIR, 'library.db'))
con.execute("PRAGMA foreign_keys = ON")
cur = con.cursor()
uid = 1
bid = 2
print(str(date.today()))
res = cur.execute("SELECT * FROM Users").fetchall()
print(res)
res = cur.execute("SELECT * FROM Books").fetchall()
print (res)

cur.execute("INSERT INTO Loans(BID, UID, Return) VALUES(?, ?, ?)", (bid, uid, str(date.today())))
con.close()