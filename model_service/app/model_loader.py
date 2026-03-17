"""
Model loading for inference.

Loads the MLflow PyTorch model once at startup and exposes it for predictions.
Uses CPU (map_location="cpu") for consistent local/Docker deployment.
"""

from pathlib import Path

import mlflow.pytorch


# Path to the MLflow model artifact (relative to model_service/)
# __file__ → app/model_loader.py → parent.parent → model_service/
MODEL_DIR = Path(__file__).resolve().parent.parent / "models" / "resnet_base_model"


def load_model():
    """
    Load the MLflow PyTorch model for inference.

    Returns:
        Loaded PyTorch model in eval mode, on CPU
    """
    if not MODEL_DIR.exists():
        raise FileNotFoundError(f"Model directory not found: {MODEL_DIR}")

    print(f"Loading model from: {MODEL_DIR}")

    model = mlflow.pytorch.load_model(
        str(MODEL_DIR),
        map_location="cpu",  # Force CPU; ignore any CUDA weights
    )
    model.eval()  # Disable dropout, batch norm training behavior
    return model
