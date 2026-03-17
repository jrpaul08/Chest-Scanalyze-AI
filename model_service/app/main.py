"""
FastAPI inference service for chest X-ray disease detection.

Endpoints:
  GET  /health  - Health check
  POST /predict - Upload image, receive disease probabilities
"""

import torch

from fastapi import FastAPI, File, HTTPException, UploadFile

from .model_loader import load_model
from .preprocess import preprocess_image

app = FastAPI(
    title="Chest X-Ray Inference",
    description="ML inference service for chest X-ray disease detection",
)

# Model loaded once at startup, reused for all requests
model = None

# Configurable for model changes (classes, threshold, etc.)
PREDICTION_THRESHOLD = 0.3


@app.on_event("startup")
async def startup():
    """Load the model when the server starts."""
    global model
    model = load_model()


@app.get("/health")
async def health():
    """Health check for Docker/load balancers."""
    return {"status": "ok"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Run inference on an uploaded chest X-ray image.

    Returns logits converted to probabilities (sigmoid) for each disease class.
    """
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    # 1. Read uploaded file bytes
    try:
        image_bytes = await file.read()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read file: {e}")

    if not image_bytes:
        raise HTTPException(status_code=400, detail="Empty file")

    # 2. Preprocess: bytes → tensor (1, 3, 224, 224)
    try:
        tensor = preprocess_image(image_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image: {e}")

    # Ensure tensor is on CPU (avoids device mismatch if preprocess changes)
    tensor = tensor.to("cpu")

    # 3. Inference (no gradients needed)
    with torch.no_grad():
        logits = model(tensor)

    # 4. Logits → probabilities via sigmoid (matches BCEWithLogitsLoss)
    probs = torch.sigmoid(logits).cpu().numpy().flatten().tolist()

    # 5. Binary predictions at threshold (adapts to any number of classes)
    binary = [1 if p >= PREDICTION_THRESHOLD else 0 for p in probs]

    return {
        "probabilities": probs,
        "binary_predictions": binary,
        "num_classes": len(probs),
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
