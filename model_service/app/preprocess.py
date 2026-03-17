"""
Image preprocessing for chest X-ray inference.

Matches the training pipeline:
  Resize(224, 224) → ToTensor → Normalize(ImageNet stats)

Input: raw image bytes (from HTTP upload)
Output: tensor of shape (1, 3, 224, 224) ready for model inference
"""

from io import BytesIO

import torch
from PIL import Image
from torchvision import transforms


# Same transform as training - must stay in sync for correct predictions
TRANSFORM = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225],
    ),
])


def preprocess_image(image_bytes: bytes) -> torch.Tensor:
    """
    Convert uploaded image bytes to a model-ready tensor.

    Args:
        image_bytes: Raw bytes from the uploaded file (JPEG, PNG, etc.)

    Returns:
        Tensor of shape (1, 3, 224, 224) with batch dimension for the model

    Raises:
        ValueError: If the image cannot be opened or converted to RGB
    """
    # 1. Bytes → PIL Image (same as dataset: open and convert to RGB)
    image = Image.open(BytesIO(image_bytes)).convert("RGB")

    # 2. Apply the same transform pipeline as training
    tensor = TRANSFORM(image)

    # 3. Add batch dimension: (3, 224, 224) → (1, 3, 224, 224)
    #    PyTorch models expect batch-first input
    batch = tensor.unsqueeze(0)

    return batch
