# Base: Python 3.9 (matches MLflow model's python_version)
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy dependency list first (better layer caching: deps only rebuild when requirements change)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code and model artifacts
COPY app/ ./app/
COPY models/ ./models/

# Expose the inference API port
EXPOSE 8000

# Run the FastAPI app with uvicorn
# --host 0.0.0.0: accept connections from outside the container
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
