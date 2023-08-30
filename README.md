# library-viable-data

## Start guide
A library management system as part of an interview for Viable Data.

To run, use the shell script run.sh. If you don't want to do this, you can run the commands manually. The contents of the file are:
`pip install -r requirements.txt`
`npm --prefix ./frontend install`
`npm --prefix ./frontend run dev & python backend/src/api.py`

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

### Browser

Firefox has certain issues with accessing resources locally, due to a CORS setting. It seems like this can happen for a number of reasons; if it does, please try another browser. 

This app has responsive design, so feel free to resize the browser window as you wish! Most browsers have a responsive design view tool as well, which is best suited to see this.

### Database

For basic testing purposes, there is one user:
Anya Singh, email: anya@mail.com, password: password123

There are two books:
Book of cool
Guide of guides

The one user is loaning the first book.

You can create additional users through the UI. If you'd like to, you can manually add books to the database. There's a `createdata.py` Python script that should give you a good idea of how that's done.

These should already be in the database. If this does not seem to be the case, from inside of backend, run `python src/createdb.py` and `python src/createdata.py` in that order.

## Notes
The application includes a complete UI with a home and library page, built with React. It uses a Python API with flask and sqlite for the database to manage the library data.

I have included an example of a unit test, but I have not been able to unit test thoroughly. For me, the given time was not enough to comprehensively test using unit tests, so I apologise about that. I wanted to focus more on the frontend and backend.

I recreated the company logo in Figma. Every logo I created for this app was in Figma, but I did not create all of them; the ones I did not are credited in the footer. The image used for the hero banner is a stock image.

If you have any questions at all please do not hesitate to ask them, I will be very happy to assist in any way possible. Thank you for taking a look!