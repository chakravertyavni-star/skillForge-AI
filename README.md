# SkillForge AI

Intelligent Skill Assessment and Personalized Learning Platform for learners and officials in India's Official Statistical System.

This repository is being built in phases. **Phase 1** is the project foundation only: three services that start independently, with a clear path from React to Express to FastAPI.

```
React frontend  →  Node.js/Express backend  →  Python FastAPI AI/ML service
     :5173                  :5000                         :8000
```

The browser never talks to the AI service or to LLM APIs. Secrets stay in backend / AI-service environment variables.

## Phase 1 scope

Included:

- React + Vite frontend with a landing page and API client
- Express backend with `GET /api/health`
- FastAPI AI service with `GET /health`
- A thin backend call to the AI health endpoint (`GET /api/health/ai`) so the intended communication path can be verified

Not included yet (later phases): authentication, MongoDB, skill models, assessments, recommendations, PDF/NLP, quiz generation, Docker.

## Folder structure

```
.
├── frontend/          React + Vite UI
├── backend/           Node.js + Express application API
└── ai-service/        Python FastAPI AI/ML service
```

See the comments in each folder for what belongs there.

## Run locally

Use three terminals. Copy each `.env.example` to `.env` first if you want to override defaults.

### 1. Backend (port 5000)

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Verify: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 2. AI/ML service (port 8000)

```bash
cd ai-service
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Verify: [http://localhost:8000/health](http://localhost:8000/health)

### 3. Frontend (port 5173)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Verify: [http://localhost:5173](http://localhost:5173)

Optional: from the landing page, use **Check backend health** and **Check AI service via backend**. The second button calls `GET /api/health/ai` on Express, which then calls FastAPI.
