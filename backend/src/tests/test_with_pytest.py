import sqlite3
import os
import pytest
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

def test_loan_missing_user():
  con = sqlite3.connect(os.path.join(ROOT_DIR, '../library.db'))
  con.execute("PRAGMA foreign_keys = ON")
  cur = con.cursor()
  # locally uid 3 does not exist so the test is performed with that in mind. Naturally if that does exist this test won't be valid.
  try:
    cur.execute("INSERT INTO Loans(BID, UID, Return) VALUES(?, ?, ?)", (1, 3, "2023-09-21"))
    assert True
  except:
    assert False

