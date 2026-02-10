# CropCure Backend

Flask API server for AI-powered potato leaf disease classification.

## Features

- 🤖 **AI Model Integration**: Load and serve Keras models for disease classification
- 🖼️ **Image Processing**: Automatic image preprocessing and validation
- 🧠 **AI Solutions**: OpenAI-powered treatment recommendations with fallback
- 📡 **RESTful API**: Clean endpoints for frontend integration
- 🔒 **CORS Support**: Cross-origin requests enabled for frontend
- 📊 **Health Monitoring**: Built-in health check and logging

## API Endpoints

### `POST /api/classify`
Classify potato leaf images for disease detection.

**Input**: `multipart/form-data` with `image` field
**Output**: 
```json
{
  "label": "Early Blight",
  "confidence": 0.92,
  "probs": [0.05, 0.92, 0.03]
}
```

### `POST /api/solution`
Get AI-generated treatment solutions.

**Input**:
```json
{
  "disease": "Early Blight",
  "confidence": 0.92
}
```

**Output**:
```json
{
  "solution": "Early Blight detected with 92% confidence...",
  "disease": "Early Blight",
  "confidence": 0.92
}
```

### `POST /api/contact`
Handle contact form submissions.

**Input**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great app!"
}
```

### `GET /api/health`
Health check endpoint.

**Output**:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "labels": ["Healthy", "Early Blight", "Late Blight"]
}
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Prepare Your Model

Place your trained Keras model in the `models/` directory:

```bash
# Your model file should be named:
backend/models/potato_model.keras
```

**Important**: Ensure your model outputs probabilities for these labels in this exact order:
- Index 0: Healthy
- Index 1: Early Blight
- Index 2: Late Blight

### 3. Set Environment Variables (Optional)

For AI-powered solutions with OpenAI:

```bash
# Windows
set OPENAI_API_KEY=your_openai_api_key_here

# Linux/Mac
export OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## Model Requirements

Your Keras model must meet these specifications:

- **Input Shape**: `(224, 224, 3)` - RGB images
- **Output Shape**: `(3,)` - 3-class probabilities
- **Label Order**: `["Healthy", "Early Blight", "Late Blight"]`
- **Format**: Saved as `.keras` file

### Example Model Training

```python
import tensorflow as tf

# Your model architecture
model = tf.keras.Sequential([
    # ... your layers
    tf.keras.layers.Dense(3, activation='softmax')  # 3 classes
])

# Compile with categorical crossentropy
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train your model...
# ...

# Save in Keras format
model.save('potato_model.keras')
```

## Configuration

### Environment Variables

- `OPENAI_API_KEY`: OpenAI API key for AI solutions (optional)
- `PORT`: Server port (default: 5000)
- `FLASK_ENV`: Set to 'development' for debug mode

### Model Configuration

Update `LABELS` in `app.py` if your model uses different label ordering:

```python
LABELS = ["Healthy", "Early Blight", "Late Blight"]
```

## Error Handling

The API provides detailed error messages:

- **400**: Bad request (missing fields, invalid data)
- **500**: Server error (model loading, processing errors)

Example error response:
```json
{
  "error": "No image provided"
}
```

## Logging

The server logs important events:

- Model loading status
- Classification results
- API errors
- Contact form submissions

## Production Deployment

### Using Gunicorn

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Docker (Optional)

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

## Troubleshooting

### Model Loading Issues

1. **File not found**: Ensure `potato_model.keras` is in `backend/models/`
2. **Label mismatch**: Verify label order matches your training data
3. **Shape mismatch**: Check input/output shapes match requirements

### Common Errors

- **"Model not loaded"**: Check model file path and format
- **"Classification failed"**: Verify image format and preprocessing
- **"OpenAI API error"**: Check API key or use fallback solutions

## Development

### Testing the API

```bash
# Health check
curl http://localhost:5000/api/health

# Test classification (replace with actual image)
curl -X POST -F "image=@test_image.jpg" http://localhost:5000/api/classify
```

### Adding New Features

1. Add new endpoints in `app.py`
2. Update `utils.py` for new utility functions
3. Test with frontend integration
4. Update this README

## Support

For issues or questions:
1. Check the logs for error details
2. Verify model requirements
3. Test API endpoints individually
4. Check environment variables
