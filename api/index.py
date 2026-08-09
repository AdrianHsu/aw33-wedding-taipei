from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# Allow CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev, restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
async def root():
    return {"message": "Wedding Backend is running!"}


# In-memory storage for likes
LIKE_COUNT = 0

@app.get("/api/likes")
async def get_likes():
    return {"likes": LIKE_COUNT}

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "location": "api/index.py"}

@app.get("/api/photos")
async def get_photos():
    # Read from pre-generated photos.json (created at build time)
    photos_json_path = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'public', 'photos.json')
    try:
        with open(photos_json_path, 'r') as f:
            data = json.load(f)
            return data
    except FileNotFoundError:
        return {"photos": [], "error": "photos.json not found - run build script first"}

@app.post("/api/likes")
async def increment_likes():
    try:
        global LIKE_COUNT
        LIKE_COUNT += 1
        return {"likes": LIKE_COUNT}
    except Exception as e:
        import traceback
        print(f"Error incrementing likes: {e}")
        traceback.print_exc()
        return {"error": str(e), "trace": traceback.format_exc()}
