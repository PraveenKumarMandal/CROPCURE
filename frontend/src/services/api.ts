import { DiseaseResult, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Backend response types
interface ClassificationResponse {
  label: 'Healthy' | 'Early Blight' | 'Late Blight' | string; // Use string fallback for safety
  confidence: number;
  probs: number[];
}

interface SolutionResponse {
  solution: string;
  disease: string;
  confidence: number;
}

export const apiService = {
  async classifyImage(imageFile: File): Promise<ApiResponse<DiseaseResult>> {
    const formData = new FormData();
    formData.append('image', imageFile); 

    try {
      const response = await fetch(`${API_BASE_URL}/api/classify`, { 
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data: ClassificationResponse = await response.json();

      const diseaseResult: DiseaseResult = {
        disease: data.label as DiseaseResult['disease'],
        confidence: data.confidence,
      };

      return { success: true, data: diseaseResult };
    } catch (error) {
      console.error('Classification error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  async getSolution(disease: string, confidence: number): Promise<ApiResponse<string>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/solution`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disease, confidence }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data: SolutionResponse = await response.json();
      return { success: true, data: data.solution };
    } catch (error) {
      console.error('Solution fetch error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  async submitContactForm(formData: { name: string; email: string; message: string }): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Contact form error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  async healthCheck(): Promise<ApiResponse<{ status: string; model_loaded: boolean; labels: string[] }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Health check error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },
};