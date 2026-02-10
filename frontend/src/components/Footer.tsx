import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-farm-green text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-8 h-8 bg-leaf-green rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">🌱</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">CropCure</h3>
              <p className="text-sm text-gray-300">Empowering Farmers with AI</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-300 mb-2">
              Smart Potato Leaf Disease Classifier
            </p>
            <p className="text-xs text-gray-400">
              © 2025 CropCure. Built for Farmers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
