import sqlite3
import os
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

con = sqlite3.connect(os.path.join(ROOT_DIR, 'library.db'))
con.execute("PRAGMA foreign_keys = ON")
cur = con.cursor()

users_data = [
    ("Anya", "Singh", "anya@mail.com", "password123")
]

books_data = [
    ("Book of cool", "Really cool book.", None),
    ("Guide of guides", "Learn everything you need to know!", None),
]

loan_data =[
    (1, 1, "2023-08-31")
]

cur.executemany("INSERT INTO Users(First_name, Last_name, Email, Password) VALUES(?, ?, ?, ?)", users_data)
cur.executemany("INSERT INTO Books(Title, Description, Image) VALUES(?, ?, ?)", books_data)
cur.executemany("INSERT INTO Loans(BID, UID, Return) VALUES(?, ?, ?)", loan_data)

con.commit()

res = cur.execute("SELECT * FROM Users")
print(res.fetchall())
res = cur.execute("SELECT * FROM Books")
print(res.fetchall())
res = cur.execute("SELECT * FROM Loans")
print(res.fetchall())