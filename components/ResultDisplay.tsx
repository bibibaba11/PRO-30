
import React from 'react';
import { downloadImage } from '../utils/imageUtils';

interface ResultDisplayProps {
  resultBase64: string | null;
  onClear: () => void;
  title?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultBase64, onClear, title = "Kết quả" }) => {
  if (!resultBase64) return null;

  return (
    <div className="mt-8 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => downloadImage(resultBase64, 'gemini-chinh-sua.png')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center space-x-2 shadow-sm"
          >
            <i className="fas fa-download"></i>
            <span>Tải về</span>
          </button>
          <button 
            onClick={onClear}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
          >
            Đặt lại
          </button>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
        <img 
          src={`data:image/png;base64,${resultBase64}`} 
          alt="Kết quả tạo ra" 
          className="max-w-full mx-auto"
        />
      </div>
    </div>
  );
};

export default ResultDisplay;
