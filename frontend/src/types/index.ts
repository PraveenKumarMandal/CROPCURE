export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface DiseaseResult {
  disease: 'Healthy' | 'Early Blight' | 'Late Blight';
  confidence: number;
  solution?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}