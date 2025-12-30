
import React, { useState } from 'react';
import { editImage } from '../services/geminiService';
import ImageUpload from './ImageUpload';
import ResultDisplay from './ResultDisplay';

const BackgroundRemover: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<{ base64: string; mimeType: string } | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    if (!sourceImage) return;
    setLoading(true);
    try {
      const prompt = "Carefully remove the entire background of this image. Keep only the main subject (person or object). Place the subject on a solid, clean pure white background with professional edge detection and no artifacts.";
      // Fix: Map base64 to data to match the expected parameter type of editImage
      const res = await editImage(prompt, [{ data: sourceImage.base64, mimeType: sourceImage.mimeType }]);
      setResult(res);
    } catch (e) {
      alert("Lỗi khi xóa nền: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Xóa Nền</h2>
        <p className="text-gray-500 text-sm mb-6">Tách chủ thể khỏi phông nền ngay lập tức.</p>
        
        <div className="flex flex-col items-center space-y-6">
          <ImageUpload 
            label="Tải ảnh lên" 
            previewUrl={sourceImage ? `data:${sourceImage.mimeType};base64,${sourceImage.base64}` : null}
            onUpload={(base64, mimeType) => setSourceImage({ base64, mimeType })}
            className="w-full max-w-lg h-64"
          />

          <button
            disabled={loading || !sourceImage}
            onClick={handleRemove}
            className="w-full md:w-auto md:px-12 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <i className="fas fa-circle-notch fa-spin"></i>
                <span>Đang xóa nền...</span>
              </>
            ) : (
              <>
                <i className="fas fa-scissors"></i>
                <span>Xóa Nền</span>
              </>
            )}
          </button>
        </div>
      </div>

      <ResultDisplay resultBase64={result} onClear={() => setResult(null)} title="Kết quả xóa nền sạch" />
    </div>
  );
};

export default BackgroundRemover;
