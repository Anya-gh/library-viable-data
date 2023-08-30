# library-viable-data

## Start guide
A library management system as part of an interview for Viable Data.

To run, use the shell script run.sh. If you don't want to do this, you can run the commands manually. The contents of the file are:
  pip install -r requirements.txt
  npm --prefix ./frontend install
  npm --prefix ./frontend run dev & python backend/src/api.py

If this does not work for whatever reason, please install the packages manually. You can see which packages need to be installed by inspecting the files, but I have listed them here nonetheless:

### Backend
- flask
- pytest
- sqlite

### Frontend
- React
- Typescript
- Tailwind
- Framer motion

## Notes
The application includes a complete UI with a home and library page, built with React. It uses a Python API with flask and sqlite for the database to manage the library data.

I have included an example of a unit test, but I have not been able to unit test thoroughly. For me, the given time was not enough to comprehensively test using unit tests, so I apologise about that. I wanted to focus more on the frontend and backend.

Thank you for taking a look!

