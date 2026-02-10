import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About CropCure
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Empowering farmers with AI-powered disease detection for healthier crops
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🌱 Our Mission
          </h2>
          <p className="text-gray-200 text-lg leading-relaxed mb-6">
            CropCure was developed with the goal of empowering farmers by providing accessible and reliable plant disease detection technology. Our mission is to leverage artificial intelligence to support farmers in protecting their crops, improving agricultural productivity, and ensuring food security.
          </p>
          <p className="text-gray-200 text-lg leading-relaxed">
            We aim to bridge the gap between modern technology and traditional farming practices, making advanced disease detection tools available to farmers of all scales. Through this research-driven project, we aspire to contribute to sustainable agriculture and create a meaningful impact in the farming community.
          </p>
        </div>

        {/* Problem Statement */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🎯 Problem Statement
          </h2>
          <div className="space-y-4 text-gray-200">
            <p className="text-lg">
              This application addresses the pressing challenges in agriculture by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Developing AI-powered solutions for early plant disease detection</li>
              <li>Creating accessible technology for small and medium-scale farmers</li>
              <li>Improving crop yield through early disease detection</li>
              <li>Reducing crop losses due to plant diseases</li>
              <li>Providing expert-level agricultural advice through technology</li>
            </ul>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🔬 Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Frontend</h3>
              <ul className="space-y-2 text-gray-200">
                <li>• React with TypeScript</li>
                <li>• Tailwind CSS for styling</li>
                <li>• React Router for navigation</li>
                <li>• Responsive mobile-first design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Backend Integration</h3>
              <ul className="space-y-2 text-gray-200">
                <li>• RESTful API integration</li>
                <li>• Image classification endpoints</li>
                <li>• AI solution generation</li>
                <li>• OpenAI/Gemini integration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            ✨ Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="font-semibold text-white">AI-Powered Detection</h3>
                  <p className="text-gray-200 text-sm">Advanced machine learning models trained on thousands of potato leaf images</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-semibold text-white">Instant Results</h3>
                  <p className="text-gray-200 text-sm">Get diagnosis and treatment recommendations within seconds</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📱</span>
                <div>
                  <h3 className="font-semibold text-white">Mobile-Friendly</h3>
                  <p className="text-gray-200 text-sm">Optimized for mobile devices with camera integration</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🌾</span>
                <div>
                  <h3 className="font-semibold text-white">Expert Solutions</h3>
                  <p className="text-gray-200 text-sm">AI-generated treatment recommendations based on agricultural expertise</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-semibold text-white">Confidence Scoring</h3>
                  <p className="text-gray-200 text-sm">Transparent confidence scores for every diagnosis</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <h3 className="font-semibold text-white">Accessible</h3>
                  <p className="text-gray-200 text-sm">Designed for farmers with varying technical expertise</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            👥 Our Team
          </h2>
          <div className="space-y-6 text-gray-200 text-lg text-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Guidance Supervisor</h3>
              <p>Sibo Prasad Patro</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Team Members</h3>
              <ul className="space-y-2">
                <li>Sneha Tripathy</li>
                <li>Praveen Kumar Mandal</li>
                <li>Deepak Kumar Dey</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-300">
              This project reflects our commitment to advancing agricultural technology and supporting farmers by providing innovative, research-driven solutions that contribute to sustainable farming practices.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Experience CropCure?
          </h2>
          <p className="text-gray-200 mb-6">
            Join the agricultural revolution with AI-powered disease detection
          </p>
          <a
            href="/diagnose"
            className="inline-flex items-center px-8 py-4 bg-wheat-gold text-white text-lg font-semibold rounded-lg hover:bg-yellow-600 transition-colors duration-200 shadow-lg"
          >
            Start Your First Diagnosis
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;