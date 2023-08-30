import json
import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os
import re
from datetime import date
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
print(os.path.join(ROOT_DIR, 'library.db'))
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def index():
    return jsonify({'default': 'test'})

@app.route('/login', methods=["POST"])
def login():
    if request.method == "POST":
      email = request.form['email']
      password = request.form['password']
      con = sqlite3.connect(os.path.join(ROOT_DIR, 'library.db'))
      con.execute("PRAGMA foreign_keys = ON")
      cur = con.cursor()
      res = cur.execute("SELECT COUNT() FROM Users WHERE email==(?) and password==(?)", (email, password)).fetchone()
      con.close()
      if res[0] == 1:
        return jsonify({"code": True, "err": None, "body": {"user": email}})
      else:
        return jsonify({"code": False, "err": "Email and password combination invalid."})

@app.route('/signup', methods=["POST"])
def signup():
    if request.method == "POST":
        email = request.form['email']
        password = request.form['password']
        notnone_pattern = r'\S+'
        if (not re.match(notnone_pattern, email)):
            return jsonify({"code": False, "err": "Email is invalid."})
        if (not re.match(notnone_pattern, password)):
            return jsonify({"code": False, "err": "Password is invalid."})
        name_pattern = r'\S+\s\S+$'
        if (not re.match(name_pattern, request.form['fullname'])):
            return jsonify({"code": False, "err": "Name is invalid."})
        firstname, lastname = request.form['fullname'].split(' ', 1)
        con = sqlite3.connect(os.path.join(ROOT_DIR, 'library.db'))
        con.execute("PRAGMA foreign_keys = ON")
        cur = con.cursor()
        res = cur.execute("SELECT COUNT() FROM Users WHERE email==(?)", (email,)).fetchone()
        if (res[0] != 1):
            try:
                cur.execute("INSERT INTO Users(First_Name, Last_Name, Email, Password) VALUES(?, ?, ?, ?)", (firstname, lastname, email, password))
                con.commit()
                con.close()
                return jsonify({"code": True, "err": None, "body": {"user": email}})
            except:
                return jsonify({"code": False, "err": "Failed to insert data."})
        return jsonify({"code": False, "err": "Email already exists."})

@app.route('/requestInfo', methods=["POST"])
def exists():
    if request.method == "POST":
        email=json.loads(request.data)['email']
        con = sqlite3.connect(os.path.join(ROOT_DIR, 'library.db'))
        con.execute("PRAGMA foreign_keys = ON")
        cur = con.cursor()
        res = cur.execute("SELECT COUNT() FROM Users WHERE email==(?)", (email,)).fetchone()
        if (res[0] == 1):
            res = cur.execute("SELECT UID, First_name, Last_name FROM Users WHERE email==(?)", (email,)).fetchone()
            uid, firstname, lastname = cur.execute("SELECT UID, First_name, Last_name FROM Users WHERE email==(?)", (email,)).fetchone()
            return jsonify({"code": True, "err": None, "body" : {"uid": uid, "firstname": firstname, "lastname": lastname}})
        else:
            return jsonify({"code": False, "err": "User does not exist.", "body": None})

@app.route('/getBooks', methods=["GET"])
def books():
    if request.method == "GET":
        con = sqlite3.connect(os.path.join(ROOT_DIR, 'library.db'))
        con.execute("PRAGMA foreign_keys = ON")
        cur = con.cursor()
        res = cur.execute("SELECT Books.Title, Books.Description, LoanedBooks.First_Name, LoanedBooks.Last_Name, LoanedBooks.Email, LoanedBooks.Return, LoanedBooks.UID, Books.BID from Books LEFT OUTER JOIN (SELECT Users.First_Name, Users.Last_Name, Users.Email, Loans.Return, Loans.UID, Loans.BID FROM Loans JOIN Users WHERE Loans.UID == Users.UID) as LoanedBooks on Books.BID == LoanedBooks.BID").fetchall()
        data = []
        for row in res:
            title, description, firstname, lastname, email, returndate, uid, bid = row
            data.append({"title": title, "description": description, "firstname": firstname, "lastname": lastname, "email": email, "returndate": returndate, "uid": uid, "bid": bid})
        return jsonify(data)

@app.route('/loan', methods=["POST"])
def loan():
    if request.method == "POST":
        uid = json.loads(request.data)['uid']
        bid = json.loads(request.data)['bid']        
        con = sqlite3.connect(os.path.join(ROOT_DIR, 'library.db'))
        con.execute("PRAGMA foreign_keys = ON")
        cur = con.cursor()
        try:
            cur.execute("INSERT INTO Loans(BID, UID, Return) VALUES(?, ?, ?)", (bid, uid, str(date.today())))
            con.commit()
            con.close()
            return jsonify({"code": True, "err": None})
        except:
            return jsonify({"code": False, "err": "Failed to insert data."})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=105)