import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              CropCure
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto">
              Smart Potato Leaf Disease Classifier
            </p>
            <p className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto">
              AI-powered disease detection for healthy potato farming. 
              Get instant diagnosis and expert solutions for your crops.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/diagnose"
                className="inline-flex items-center px-8 py-4 bg-wheat-gold text-white text-lg font-semibold rounded-lg hover:bg-yellow-600 transition-colors duration-200 shadow-lg"
              >
                🌱 Start Diagnosis
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-farm-green transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose CropCure?
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Advanced AI technology meets agricultural expertise to help farmers protect their crops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <div className="text-5xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Detection</h3>
              <p className="text-gray-200">
                Advanced machine learning algorithms analyze potato leaf images with high accuracy
              </p>
            </div>

            <div className="text-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-3">Instant Results</h3>
              <p className="text-gray-200">
                Get immediate diagnosis and confidence scores within seconds of uploading
              </p>
            </div>

            <div className="text-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <div className="text-5xl mb-4">🌾</div>
              <h3 className="text-xl font-semibold text-white mb-3">Expert Solutions</h3>
              <p className="text-gray-200">
                Receive AI-generated treatment recommendations tailored to your specific disease
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disease Types Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Detect Common Potato Diseases
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Our AI can identify the most common potato leaf diseases affecting farmers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-semibold text-green-600 mb-3">Healthy</h3>
                <p className="text-gray-600">
                  Your potato plants are in good condition with no signs of disease
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-yellow-600 mb-3">Early Blight</h3>
                <p className="text-gray-600">
                  Fungal disease causing dark spots on leaves, manageable with proper treatment
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center">
                <div className="text-6xl mb-4">🚨</div>
                <h3 className="text-xl font-semibold text-red-600 mb-3">Late Blight</h3>
                <p className="text-gray-600">
                  Serious fungal disease that can quickly destroy entire crops if not treated
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-farm-green">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Protect Your Crops?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Join thousands of farmers who trust CropCure for accurate disease detection
          </p>
          <Link
            to="/diagnose"
            className="inline-flex items-center px-8 py-4 bg-wheat-gold text-white text-lg font-semibold rounded-lg hover:bg-yellow-600 transition-colors duration-200 shadow-lg"
          >
            Start Your Diagnosis Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
