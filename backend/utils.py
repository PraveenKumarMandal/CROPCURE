"""
Utility functions for CropCure backend
Image preprocessing and AI solution generation
"""

import os
import json
import logging
from typing import Tuple, List
import numpy as np
from PIL import Image
from openai import OpenAI

logger = logging.getLogger(__name__)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def preprocess_image(image: Image.Image, target_size: Tuple[int, int] = (224, 224)) -> np.ndarray:
    """
    Preprocess image for model prediction
    """
    try:
        if image.mode != 'RGB':
            image = image.convert('RGB')
        image = image.resize(target_size, Image.Resampling.LANCZOS)
        image_array = np.array(image, dtype=np.float32) / 255.0
        image_array = np.expand_dims(image_array, axis=0)
        logger.info(f"Image preprocessed: shape={image_array.shape}, dtype={image_array.dtype}")
        return image_array
    except Exception as e:
        logger.error(f"Image preprocessing error: {str(e)}")
        raise

def get_ai_solution(disease: str, confidence: float) -> str:
    """
    Generate AI-powered solution for detected disease
    """
    try:
        if os.getenv("OPENAI_API_KEY"):
            return get_openai_solution(disease, confidence)
        else:
            logger.info("OpenAI API key not found, using fallback solution")
            return get_fallback_solution(disease, confidence)
    except Exception as e:
        logger.error(f"Error generating solution: {str(e)}")
        return get_fallback_solution(disease, confidence)

def get_openai_solution(disease: str, confidence: float) -> str:
    """
    Generate solution using OpenAI API
    """
    try:
        confidence_percent = int(confidence * 100)

        prompt = f"""
        You are an agricultural expert helping farmers with potato crop diseases. 
        A farmer has uploaded an image of a potato leaf, and our AI system detected:
        - Disease: {disease}
        - Confidence: {confidence_percent}%
        
        Provide a practical, farmer-friendly solution that includes:
        1. Brief explanation of the disease
        2. Immediate action steps
        3. Prevention measures
        4. When to seek professional help

        Keep it concise (2-3 paragraphs), simple, and actionable.
        """

        response = client.chat.completions.create(
            model="gpt-4o-mini",  # ✅ modern model
            messages=[
                {"role": "system", "content": "You are an agricultural expert specializing in potato crop diseases."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.7
        )

        solution = response.choices[0].message.content.strip()
        logger.info(f"OpenAI solution generated for {disease}")
        return solution
    except Exception as e:
        logger.error(f"OpenAI API error: {str(e)}")
        raise

def get_fallback_solution(disease: str, confidence: float) -> str:
    """
    Fallback static solutions
    """
    confidence_percent = int(confidence * 100)
    solutions = {
        "Healthy": f"""
        Great news! Your potato plant appears to be healthy with {confidence_percent}% confidence. 
        Continue with regular care: maintain proper spacing, ensure good drainage, and monitor regularly. 
        Keep up the good work with your crop management practices!
        """,
        "Early Blight": f"""
        Early Blight detected with {confidence_percent}% confidence. This fungal disease causes dark spots on leaves.
        
        Immediate actions:
        • Remove infected leaves and dispose of them away from the field
        • Apply copper-based fungicide (follow label instructions)
        • Improve air circulation by spacing plants properly
        • Avoid overhead watering to prevent spreading
        
        Prevention: Rotate crops, use disease-resistant varieties, and maintain clean field conditions.
        """,
        "Late Blight": f"""
        Late Blight detected with {confidence_percent}% confidence. This is a serious disease that can destroy crops quickly.
        
        URGENT actions needed:
        • Remove and destroy all infected plants immediately
        • Apply fungicide containing chlorothalonil or mancozeb
        • Stop overhead irrigation completely
        • Isolate the affected area to prevent spread
        
        This disease spreads rapidly in wet conditions. Consider consulting a local agricultural extension officer for professional guidance.
        """
    }
    return solutions.get(disease, f"Unknown disease detected: {disease}. Please consult with a local agricultural expert.")

def validate_image_file(file) -> bool:
    """
    Validate uploaded image file
    """
    if not file or file.filename == '':
        return False

    allowed_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.webp'}
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in allowed_extensions:
        return False

    file.seek(0, 2)  
    file_size = file.tell()
    file.seek(0)  
    return file_size <= 10 * 1024 * 1024
