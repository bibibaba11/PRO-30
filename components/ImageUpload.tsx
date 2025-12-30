
import React, { useRef } from 'react';

interface ImageUploadProps {
  label: string;
  onUpload: (base64: string, mimeType: string) => void;
  previewUrl: string | null;
  className?: string;
  icon?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, onUpload, previewUrl, className = "", icon = "fa-cloud-arrow-up" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        onUpload(base64, file.type || 'image/png');
      };
    }
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-2xl hover:border-indigo-500 transition-colors bg-white cursor-pointer group ${className}`} onClick={triggerInput}>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />
      {previewUrl ? (
        <div className="relative w-full aspect-square overflow-hidden rounded-xl">
          <img src={previewUrl} alt="Xem trước" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="text-white text-sm font-medium">Thay đổi ảnh</span>
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-100 transition-colors">
            <i className={`fas ${icon} text-xl`}></i>
          </div>
          <p className="text-sm font-semibold text-gray-700">{label}</p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG hoặc WebP</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
