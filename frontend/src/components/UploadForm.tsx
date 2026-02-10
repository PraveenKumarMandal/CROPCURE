import React, { useRef, useState } from 'react';

interface UploadFormProps {
  onImageSelect: (file: File) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  selectedImage: File | null;
}

const UploadForm: React.FC<UploadFormProps> = ({ 
  onImageSelect, 
  onAnalyze, 
  isAnalyzing, 
  selectedImage 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const openCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Create a video element for camera capture
      const video = document.createElement('video');
      video.style.display = 'none';
      document.body.appendChild(video);
      
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
          
          // Create a canvas to capture the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          video.addEventListener('loadedmetadata', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            // Show camera preview in a modal or new window
            const modal = document.createElement('div');
            modal.style.cssText = `
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0,0,0,0.8);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1000;
            `;
            
            const preview = document.createElement('video');
            preview.srcObject = stream;
            preview.style.cssText = 'max-width: 90%; max-height: 90%; border-radius: 8px;';
            preview.controls = true;
            
            const captureBtn = document.createElement('button');
            captureBtn.textContent = 'Capture';
            captureBtn.style.cssText = `
              position: absolute;
              bottom: 20px;
              left: 50%;
              transform: translateX(-50%);
              padding: 10px 20px;
              background: #4a7c59;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            `;
            
            captureBtn.onclick = () => {
              ctx?.drawImage(video, 0, 0);
              canvas.toBlob((blob) => {
                if (blob) {
                  const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
                  handleFileSelect(file);
                }
                stream.getTracks().forEach(track => track.stop());
                document.body.removeChild(modal);
                document.body.removeChild(video);
              }, 'image/jpeg');
            };
            
            modal.appendChild(preview);
            modal.appendChild(captureBtn);
            document.body.appendChild(modal);
          });
        })
        .catch((err) => {
          console.error('Error accessing camera:', err);
          alert('Unable to access camera. Please try uploading a file instead.');
        });
    } else {
      alert('Camera not supported on this device.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          dragActive
            ? 'border-leaf-green bg-sage-green bg-opacity-20'
            : 'border-gray-300 hover:border-leaf-green'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="text-6xl text-leaf-green">📸</div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Upload Potato Leaf Image
            </h3>
            <p className="text-gray-500 mb-4">
              Drag and drop an image here, or click to select a file
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-leaf-green text-white rounded-lg hover:bg-farm-green transition-colors duration-200"
            >
              Choose File
            </button>
            
            <button
              onClick={openCamera}
              className="px-6 py-2 bg-earth-brown text-white rounded-lg hover:bg-soil-brown transition-colors duration-200"
            >
              📷 Use Camera
            </button>
          </div>
        </div>
      </div>
      
      {selectedImage && (
        <div className="mt-6">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Selected Image:</h4>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected potato leaf"
                className="w-full sm:w-48 h-48 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>File:</strong> {selectedImage.name}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Size:</strong> {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  onClick={onAnalyze}
                  disabled={isAnalyzing}
                  className={`w-full sm:w-auto px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                    isAnalyzing
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-wheat-gold text-white hover:bg-yellow-600'
                  }`}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Leaf'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
