from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import logging
import uuid

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # allow cross-origin requests from React

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Global variables
model = None
MODEL_INPUT_SIZE = (256, 256)
MODEL_LABELS = ["Potato___Early_blight", "Potato___Late_blight", "Potato___healthy"]
LABEL_MAP = {
    "Potato___Early_blight": "Early Blight",
    "Potato___Late_blight": "Late Blight",
    "Potato___healthy": "Healthy"
}
SIMPLIFIED_LABELS = list(LABEL_MAP.values())

# Load model function
def load_model_once():
    global model
    if model is None:
        try:
            logging.debug("Loading model...")
            model_path = os.path.join(os.getcwd(), "models", "potato_model.keras")

            if not os.path.exists(model_path):
                model_path_flat = os.path.join(os.getcwd(), "potato_model.keras")
                if os.path.exists(model_path_flat):
                    model_path = model_path_flat

            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model file not found at expected path: {model_path}. Please ensure 'models/potato_model.keras' exists relative to the script.")

            os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
            model = load_model(model_path)
            logging.info("✅ Model loaded successfully")
        except Exception as e:
            logging.error(f"❌ Error loading model: {e}")
            raise

# Preprocess image
def preprocess_image(img_path):
    try:
        logging.debug(f"Preprocessing image: {img_path}")
        img = image.load_img(img_path, target_size=MODEL_INPUT_SIZE)

        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)

        logging.debug(f"Loaded image array shape: {img_array.shape}")
        return img_array
    except Exception as e:
        logging.error(f"❌ Error in preprocessing image: {e}")
        raise

# Classify image
def classify_image(img_path):
    try:
        load_model_once()

        logging.debug(f"Attempting classification on unique path: {img_path}")

        img_array = preprocess_image(img_path)
        logging.debug("Running prediction...")
        probabilities = model.predict(img_array, verbose=0)[0]

        predicted_class_idx = np.argmax(probabilities)
        confidence = round(float(probabilities[predicted_class_idx] * 100), 2)

        raw_label = MODEL_LABELS[predicted_class_idx]
        simplified_label = LABEL_MAP[raw_label]

        result = {
            'label': simplified_label,
            'confidence': confidence,
            'raw_label': raw_label,
            'probs': [round(float(prob * 100), 2) for prob in probabilities]
        }
        logging.debug(f"✅ Prediction result: {result}")
        return result
    except Exception as e:
        logging.error(f"❌ Error in classifying image: {e}")
        raise

# Routes
@app.route('/')
def home():
    # Note: Flask's render_template requires a 'templates' folder, 
    # but since this project is React-based, we'll return a simple string 
    # if a template isn't available to avoid a runtime error when debugging.
    return "Potato Disease Classifier Backend is Running."

@app.route('/api/classify', methods=['POST'])
def classify_route():
    temp_file_path = None
    try:
        if 'image' not in request.files:
            logging.warning("⚠️ No file part in request")
            return jsonify({'error': 'No file part'}), 400

        file = request.files['image']
        if file.filename == '':
            logging.warning("⚠️ No selected file")
            return jsonify({'error': 'No selected file'}), 400

        os.makedirs("uploads", exist_ok=True)
        original_filename = file.filename
        file_extension = os.path.splitext(original_filename)[1]
        unique_filename = str(uuid.uuid4()) + file_extension
        temp_file_path = os.path.join("uploads", unique_filename)
        file.save(temp_file_path)

        result = classify_image(temp_file_path)
        return jsonify(result)
    except Exception as e:
        logging.error(f"❌ Error in /api/classify route: {e}")
        return jsonify({'error': str(e)}), 500
    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
            logging.debug(f"🗑️ Cleaned up file: {temp_file_path}")

@app.route('/api/solution', methods=['POST'])
def solution_route():
    try:
        data = request.get_json()
        disease = data.get('disease')
        confidence = data.get('confidence')

        if not disease or confidence is None:
            return jsonify({'error': 'Invalid input (disease or confidence missing)'}), 400

        if disease == "Healthy":
            solution_text = "Your potato plant is healthy! Continue monitoring for any signs of disease and maintain good cultural practices like proper watering and spacing."
        elif disease == "Early Blight":
            solution_text = f"Early Blight (Confidence: {confidence:.2f}%) detected. Management includes: 1. Remove and destroy infected leaves. 2. Apply a recommended fungicide (e.g., chlorothalonil or mancozeb). 3. Ensure proper plant spacing and avoid overhead watering to reduce leaf wetness."
        elif disease == "Late Blight":
            solution_text = f"🚨 Late Blight (Confidence: {confidence:.2f}%) detected. This is a severe threat! Immediate action is critical: 1. Apply a systemic fungicide immediately. 2. Remove and destroy all infected plant material (do not compost). 3. Monitor neighboring plants daily for rapid spread. Consult a local agricultural extension office without delay."
        else:
            solution_text = f"Diagnosis complete (Confidence: {confidence:.2f}%). The disease is recognized as {disease}. Please consult a local agricultural expert for the best next steps."
        
        return jsonify({
            'solution': solution_text,
            'disease': disease,
            'confidence': confidence
        })
    except Exception as e:
        logging.error(f"❌ Error in /api/solution route: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_route():
    return jsonify({
        'status': 'ok',
        'model_loaded': model is not None,
        'labels': SIMPLIFIED_LABELS
    })

# Main entry point
if __name__ == "__main__":
    logging.debug("🚀 Starting Flask app...")
    try:
        load_model_once()
    except Exception:
        pass
        
    app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=False)