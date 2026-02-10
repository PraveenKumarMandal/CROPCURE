# CropCure – Potato Leaf Disease Detection System 🌱

CropCure is a machine learning–based web application that detects potato leaf diseases
using image classification. The system helps identify whether a potato leaf is
**Healthy**, affected by **Early Blight**, or **Late Blight**.

---

## 🌱 Project Overview

CropCure helps farmers detect potato leaf diseases using advanced AI technology. Upload an image of a potato leaf and get instant diagnosis with expert treatment recommendations.

### Features

- 🤖 **AI-Powered Detection**: Advanced machine learning for disease classification
- 📱 **Mobile-First Design**: Responsive interface optimized for farmers
- ⚡ **Real-Time Analysis**: Instant results with confidence scores
- 🌾 **Expert Solutions**: AI-generated treatment recommendations
- 📸 **Camera Integration**: Capture images directly or upload from gallery
- 🎨 **Farmer-Friendly UI**: Clean, intuitive design with agricultural theme

## 🏗️ Project Structure

```
cropcure/
├── frontend/          # React TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API integration
│   │   └── types/         # TypeScript definitions
│   └── package.json
├── backend/           # Flask Python backend
│   ├── models/        # Keras model directory
│   │   └── potato_model.keras  # Your trained model
│   ├── app.py         # Flask application
│   ├── utils.py       # Utility functions
│   └── requirements.txt
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)
- **Trained Keras model** (potato_model.keras)

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd cropcure

# Setup frontend
cd frontend
npm install
cd ..

# Setup backend
cd backend
pip install -r requirements.txt
cd ..
```

### 2. Prepare Your Model

Place your trained Keras model in the backend:

```bash
# Copy your model file to:
backend/models/potato_model.keras
```

**Important**: Your model must output probabilities for these labels in this exact order:
- Index 0: Healthy
- Index 1: Early Blight
- Index 2: Late Blight

### 3. Configure Environment (Optional)

For AI-powered solutions with OpenAI:

```bash
# Windows
set OPENAI_API_KEY=your_openai_api_key_here

# Linux/Mac
export OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
python app.py
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend runs on: http://localhost:3000

### 5. Access the Application

Open your browser and go to: http://localhost:3000

## 🔧 Detailed Setup

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

**Frontend Features:**
- React
- Tailwind CSS for styling
- React Router for navigation
- Mobile-first responsive design
- Camera integration
- Drag & drop file upload

### Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py

```

**Backend Features:**
- Flask REST API
- TensorFlow/Keras model integration
- Image preprocessing
- OpenAI integration for solutions
- CORS support
- Error handling and logging

## 📡 API Endpoints

### Classification
```bash
POST /api/classify
Content-Type: multipart/form-data
Body: image file
Response: { "label": "Early Blight", "confidence": 0.92, "probs": [...] }
```

### Solutions
```bash
POST /api/solution
Content-Type: application/json
Body: { "disease": "Early Blight", "confidence": 0.92 }
Response: { "solution": "AI-generated treatment advice..." }
```

### Health Check
```bash
GET /api/health
Response: { "status": "healthy", "model_loaded": true, "labels": [...] }
```

## 🎨 Design System

### Colors
- **Farm Green**: #2d5016 (Primary)
- **Leaf Green**: #4a7c59 (Secondary)
- **Earth Brown**: #8b4513 (Accent)
- **Sage Green**: #9caf88 (Background)
- **Wheat Gold**: #f4a460 (CTA buttons)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 🔬 Model Requirements

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
    tf.keras.layers.Dense(3, activation='softmax')
])

# Compile and train
model.compile(optimizer='adam', loss='categorical_crossentropy')
# ... training code ...

# Save model
model.save('potato_model.keras')
```
## 👨‍💻 Developer Notes

This project helped me gain hands-on experience in:
- CNN-based image classification
- Model integration with Flask
- Full-stack application structure
- API design and frontend-backend communication

## 📄 License

This project was developed for academic purpose, it is a part of the Smart India Hackathon 2024 solution.


## 📬 Contact

For feedback or suggestions, feel free to connect with me on LinkedIn.
---

**Built with ❤️ for farmers and agricultural innovation**
"# CROPCURE" 
