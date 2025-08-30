# ThinkBot-Review2

A two-part project with a **FastAPI** backend and a **Node/Vite (React or similar)** frontend.

## Project Structure (suggested)

```
ThinkBot-Review2/
├─ backend/
│  ├─ api/
│  │  └─ app.py             # FastAPI entrypoint (app object)
│  ├─ requirements.txt      # Python deps (see below)
│  └─ ...
└─ project/                 # Frontend (Vite/React or similar)
   ├─ package.json
   └─ ...
```

---

## Backend Setup (FastAPI)

1. **Create & activate a virtual environment**

```powershell
cd ThinkBot-Review2\backend
python -m venv .venv
.\.venv\Scripts\activate
```

2. **Install dependencies**

install the core packages directly

```powershell
pip install fastapi uvicorn nltk odfpy tqdm
```

3. **Run the backend (dev)**

```powershell
uvicorn api.app:app --reload
```
---

## Frontend Setup (Node/Vite)

1. **Install packages**

```powershell
cd ThinkBot-Review2\project
npm install
```

2. **Start the dev server**

```powershell
npm run dev
```

---

Open two terminals:

1. **Backend**

   ```powershell
   cd ThinkBot-Review2\backend
   .\.venv\Scripts\activate
   uvicorn api.app:app --reload
   ```
2. **Frontend**

   ```powershell
   cd ThinkBot-Review2\project
   npm run dev
   ```






