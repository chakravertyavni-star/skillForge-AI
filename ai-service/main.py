"""
SkillForge AI — Python AI/ML service.

Phase 1: health check only.
Do not add ML models, embeddings, or LLM calls here yet.
The Node.js backend calls this service. The React app does not.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="SkillForge AI Service",
    description="AI/ML layer for competency analysis, recommendations, and NLP.",
    version="0.1.0",
)

# CORS is enabled for local development. Production traffic should come
# from the Node backend, not from the browser.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "skillforge-ai",
        "phase": 1,
        "message": "AI/ML service is running. No models are loaded yet.",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
