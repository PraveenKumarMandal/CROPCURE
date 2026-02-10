# Model Directory

Place your trained Keras model file here:

- **File name**: `potato_model.keras`
- **Expected labels**: ["Healthy", "Early Blight", "Late Blight"]
- **Input shape**: (224, 224, 3) - RGB images
- **Output**: 3-class classification probabilities

## Model Requirements

Your model should:
1. Accept RGB images of size 224x224 pixels
2. Output probabilities for 3 classes in this exact order:
   - Index 0: Healthy
   - Index 1: Early Blight  
   - Index 2: Late Blight
3. Be saved in Keras format (.keras)

## Training Notes

⚠️ **IMPORTANT**: The label order in your training data must match the LABELS array in app.py:
```python
LABELS = ["Healthy", "Early Blight", "Late Blight"]
```

If your model was trained with different label ordering, you'll need to either:
1. Retrain your model with the correct label order, or
2. Update the LABELS array in app.py to match your model's training order

## Example Model Loading

The backend will automatically load your model on startup:
```python
model = tf.keras.models.load_model('models/potato_model.keras')
```

If the model file is not found, the server will fail to start with a clear error message.
