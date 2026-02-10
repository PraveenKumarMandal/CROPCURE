import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import ResultCard from '../components/ResultCard';
import { DiseaseResult } from '../types';
import { apiService } from '../services/api';

const Classification: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Classify the image
      const classificationResult = await apiService.classifyImage(selectedImage);
      
      if (!classificationResult.success || !classificationResult.data) {
        throw new Error(classificationResult.error || 'Classification failed');
      }

      const diseaseData = classificationResult.data;
      
      // Get AI solution
      const solutionResult = await apiService.getSolution(
        diseaseData.disease, 
        diseaseData.confidence
      );

      const finalResult: DiseaseResult = {
        ...diseaseData,
        solution: solutionResult.success ? solutionResult.data : undefined
      };

      setResult(finalResult);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Disease Classification
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Upload a clear image of your potato leaf and get instant AI-powered disease detection
          </p>
        </div>

        {/* Upload Section */}
        {!result && (
          <div className="mb-8">
            <UploadForm
              onImageSelect={handleImageSelect}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              selectedImage={selectedImage}
            />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <span className="text-xl mr-2">❌</span>
              <div>
                <strong>Error:</strong> {error}
              </div>
            </div>
            <button
              onClick={handleReset}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <div className="mb-8">
            <ResultCard 
              result={{ disease: 'Healthy', confidence: 0 }} 
              isLoading={true} 
            />
          </div>
        )}

        {/* Results Display */}
        {result && !isAnalyzing && (
          <div className="space-y-6">
            <ResultCard result={result} />
            
            <div className="text-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-leaf-green text-white font-semibold rounded-lg hover:bg-farm-green transition-colors duration-200"
              >
                Analyze Another Image
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!selectedImage && !result && (
          <div className="mt-12 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
              📋 How to Get the Best Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">✅ Do:</h4>
                <ul className="text-gray-200 space-y-2 text-sm">
                  <li>• Use clear, well-lit images</li>
                  <li>• Focus on individual leaves</li>
                  <li>• Include both healthy and affected areas</li>
                  <li>• Take photos during daylight hours</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-white">❌ Avoid:</h4>
                <ul className="text-gray-200 space-y-2 text-sm">
                  <li>• Blurry or dark images</li>
                  <li>• Multiple leaves overlapping</li>
                  <li>• Images with heavy shadows</li>
                  <li>• Very small or distant shots</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classification;
