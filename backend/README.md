# SkillForge AI — Backend (Phase 1)

Node.js + Express application API. Owns CRUD, auth (later), and calls the Python AI service.

```bash
cp .env.example .env
npm install
npm run dev
```

- http://localhost:5000/api/health
- http://localhost:5000/api/health/ai  (proxies to FastAPI `/health`)
