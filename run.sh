python -m venv ./backend/env
source backend/env/bin/activate
pip install -r requirements.txt
npm --prefix ./frontend install
npm --prefix ./frontend run dev & python backend/src/api.py