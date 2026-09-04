# SkillForge AI — AI/ML service (Phase 1)

Python FastAPI service. Competency models, recommendations, and NLP will live here later. Phase 1 only exposes a health check.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Open http://localhost:8000/health
