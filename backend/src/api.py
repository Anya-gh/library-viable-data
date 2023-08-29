import json
import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
print(os.path.join(ROOT_DIR, 'library.db'))
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def index():
    return jsonify({'default': 'test'})

@app.route('/books')
def books():
    con = sqlite3.connect(os.path.join(ROOT_DIR, 'library.db'))
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
    res = cur.execute("SELECT * FROM Books").fetchall()
    con.close()
    return jsonify(res)

@app.route('/users')
def users():
    con = sqlite3.connect(os.path.join(ROOT_DIR, 'library.db'))
    con.execute("PRAGMA foreign_keys = ON")
    cur = con.cursor()
    res = cur.execute("SELECT * FROM Users").fetchall()
    con.close()
    return jsonify(res)

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
      return jsonify(res)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=105)