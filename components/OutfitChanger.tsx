
import React, { useState } from 'react';
import { editImage } from '../services/geminiService';
import ImageUpload from './ImageUpload';
import ResultDisplay from './ResultDisplay';

const OutfitChanger: React.FC = () => {
  const [modelImage, setModelImage] = useState<{ base64: string; mimeType: string } | null>(null);
  const [productImage, setProductImage] = useState<{ base64: string; mimeType: string } | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    if (!modelImage || !productImage) return;
    setLoading(true);
    try {
      const prompt = "The first image is a person (the model). The second image shows a clothing item. Perform a high-quality virtual try-on: replace the model's current clothes with the exact clothing item from the second image. Ensure realistic draping, texture, and lighting on the person. Maintain the person's identity and background.";
      // Fix: Map base64 to data for both images to match the expected parameter type of editImage
      const res = await editImage(prompt, [
        { data: modelImage.base64, mimeType: modelImage.mimeType },
        { data: productImage.base64, mimeType: productImage.mimeType }
      ]);
      setResult(res);
    } catch (e) {
      alert("Lỗi khi đổi trang phục: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Thử Đồ Ảo</h2>
        <p className="text-gray-500 text-sm mb-6">Tải lên ảnh người mẫu và món đồ thời trang mà họ sẽ mặc.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUpload 
            label="1. Tải ảnh người mẫu" 
            previewUrl={modelImage ? `data:${modelImage.mimeType};base64,${modelImage.base64}` : null}
            onUpload={(base64, mimeType) => setModelImage({ base64, mimeType })}
            icon="fa-user"
          />
          <ImageUpload 
            label="2. Tải món đồ thời trang" 
            previewUrl={productImage ? `data:${productImage.mimeType};base64,${productImage.base64}` : null}
            onUpload={(base64, mimeType) => setProductImage({ base64, mimeType })}
            icon="fa-shirt"
          />
        </div>

        <div className="mt-8 flex flex-col items-center">
          <button
            disabled={loading || !modelImage || !productImage}
            onClick={handleProcess}
            className="w-full md:w-auto md:px-12 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <i className="fas fa-circle-notch fa-spin"></i>
                <span>Đang chuyển đổi...</span>
              </>
            ) : (
              <>
                <i className="fas fa-wand-sparkles"></i>
                <span>Thay Đổi Trang Phục</span>
              </>
            )}
          </button>
        </div>
      </div>

      <ResultDisplay resultBase64={result} onClear={() => setResult(null)} title="Diện mạo mới đã tạo" />
    </div>
  );
};

export default OutfitChanger;
