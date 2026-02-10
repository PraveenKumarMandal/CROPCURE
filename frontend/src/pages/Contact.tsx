import React, { useState } from 'react';
import { ContactFormData } from '../types';
import { apiService } from '../services/api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const result = await apiService.submitContactForm(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Have questions, feedback, or suggestions? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Send us a Message
            </h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <span className="text-xl mr-2">✅</span>
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <span className="text-xl mr-2">❌</span>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-white placeholder-gray-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-white placeholder-gray-300"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent text-white placeholder-gray-300 resize-vertical"
                  placeholder="Tell us about your experience, suggestions, or any questions you have..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-wheat-gold text-white hover:bg-yellow-600'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <p className="text-gray-200">contact@cropcure.com</p>
                    <p className="text-sm text-gray-300">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🌐</div>
                  <div>
                    <h3 className="font-semibold text-white">Website</h3>
                    <p className="text-gray-200">www.cropcure.com</p>
                    <p className="text-sm text-gray-300">Visit our main website</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <h3 className="font-semibold text-white">CropCure : Built for Farmers</h3>
                    <p className="text-gray-200">Smart Potato Leaf Disease Classifier</p>
                    <p className="text-sm text-gray-300">Agricultural Technology</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                💬 Feedback Topics
              </h3>
              <ul className="space-y-2 text-gray-200">
                <li>• Disease detection accuracy</li>
                <li>• User interface improvements</li>
                <li>• Additional disease types</li>
                <li>• Mobile app features</li>
                <li>• Integration with farming tools</li>
                <li>• General suggestions</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                🚀 What's Next?
              </h3>
              <p className="text-gray-200 mb-4">
                We're constantly working to improve CropCure based on farmer feedback:
              </p>
              <ul className="space-y-2 text-gray-200 text-sm">
                <li>• Support for more crop types</li>
                <li>• Advanced treatment recommendations</li>
                <li>• Weather-based disease predictions</li>
                <li>• Integration with IoT sensors</li>
                <li>• Multi-language support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
