import React from 'react';
import { DiseaseResult } from '../types';

interface ResultCardProps {
  result: DiseaseResult;
  isLoading?: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, isLoading = false }) => {
  const getDiseaseColor = (disease: string) => {
    switch (disease) {
      case 'Healthy':
        return 'text-green-600 bg-green-100';
      case 'Early Blight':
        return 'text-yellow-600 bg-yellow-100';
      case 'Late Blight':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getDiseaseIcon = (disease: string) => {
    switch (disease) {
      case 'Healthy':
        return '✅';
      case 'Early Blight':
        return '⚠️';
      case 'Late Blight':
        return '🚨';
      default:
        return '❓';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        </div>
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">
          {getDiseaseIcon(result.disease)}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Analysis Complete
        </h3>
      </div>

      <div className="space-y-4">
        {/* Disease Classification */}
        <div className="text-center">
          <div className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${getDiseaseColor(result.disease)}`}>
            {result.disease}
          </div>
        </div>

        {/* Confidence Score */}
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">Confidence Score</div>
          <div className="flex items-center justify-center">
            <div className="w-32 bg-gray-200 rounded-full h-3 mr-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  result.confidence >= 80 ? 'bg-green-500' :
                  result.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
            <span className={`text-lg font-bold ${getConfidenceColor(result.confidence)}`}>
              {result.confidence}%
            </span>
          </div>
        </div>

        {/* AI-Powered Solution */}
        {result.solution && (
          <div className="mt-6 p-4 bg-sage-green bg-opacity-10 rounded-lg">
            <h4 className="text-lg font-semibold text-farm-green mb-3 flex items-center">
              <span className="mr-2">🤖</span>
              AI-Powered Solution
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {result.solution}
            </p>
          </div>
        )}

        {/* Additional Information */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">What this means:</h4>
          <div className="text-sm text-gray-600">
            {result.disease === 'Healthy' && (
              <p>Your potato plant appears to be healthy! Continue with regular care and monitoring.</p>
            )}
            {result.disease === 'Early Blight' && (
              <p>Early blight is a common fungal disease. Early detection and treatment can help prevent spread.</p>
            )}
            {result.disease === 'Late Blight' && (
              <p>Late blight is a serious disease that can quickly destroy crops. Immediate action is recommended.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
