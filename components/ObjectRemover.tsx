
import React, { useRef, useState, useEffect } from 'react';
import { editImage } from '../services/geminiService';
import ImageUpload from './ImageUpload';
import ResultDisplay from './ResultDisplay';

const ObjectRemover: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<{ base64: string; mimeType: string } | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [brushSize, setBrushSize] = useState(30);
  const [description, setDescription] = useState('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  const handleUpload = (base64: string, mimeType: string) => {
    setSourceImage({ base64, mimeType });
    setResult(null);
  };

  const handleRemove = async () => {
    if (!sourceImage) return;
    setLoading(true);
    try {
      const prompt = description 
        ? `In the image provided, remove the ${description} seamlessly. Fill the background naturally based on the surrounding texture and lighting.`
        : "Remove the highlighted objects from this image and fill the background seamlessly.";
      
      // Fix: Map base64 to data to match the expected parameter type of editImage
      const res = await editImage(prompt, [{ data: sourceImage.base64, mimeType: sourceImage.mimeType }]);
      setResult(res);
    } catch (e) {
      alert("Lỗi khi xóa vật thể: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sourceImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        const maxWidth = 800;
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = `data:${sourceImage.mimeType};base64,${sourceImage.base64}`;
    }
  }, [sourceImage]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    draw(e);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    if (sourceImage) handleUpload(sourceImage.base64, sourceImage.mimeType);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Xóa Vật Thể</h2>
        <p className="text-gray-500 text-sm mb-6">Tải ảnh lên và tô lên vật thể bạn muốn biến mất.</p>
        
        {!sourceImage ? (
          <ImageUpload 
            label="Tải ảnh cần chỉnh sửa" 
            onUpload={handleUpload} 
            previewUrl={null}
            className="h-64"
          />
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-gray-50 rounded-2xl p-4 flex flex-col items-center">
                <div className="mb-4 flex items-center justify-between w-full px-2">
                  <div className="flex items-center space-x-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Kích thước cọ</label>
                    <input 
                      type="range" min="5" max="100" 
                      value={brushSize} 
                      onChange={(e) => setBrushSize(parseInt(e.target.value))}
                      className="accent-indigo-600"
                    />
                  </div>
                  <button onClick={clearCanvas} className="text-xs text-red-600 font-bold hover:underline">
                    Xóa nét vẽ
                  </button>
                </div>
                <div className="canvas-container cursor-crosshair border border-gray-200 rounded-xl overflow-hidden bg-white shadow-inner">
                  <canvas 
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                </div>
              </div>

              <div className="w-full md:w-72 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Cần xóa gì? (Không bắt buộc)</label>
                  <textarea 
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm h-32"
                    placeholder="v.d. người ở phía sau, thùng rác, logo..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button
                  disabled={loading}
                  onClick={handleRemove}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-circle-notch fa-spin"></i>
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-eraser"></i>
                      <span>Xóa Vật Thể</span>
                    </>
                  )}
                </button>
                <button onClick={() => setSourceImage(null)} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 font-medium">
                  Tải ảnh khác
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ResultDisplay resultBase64={result} onClear={() => setResult(null)} title="Vật thể đã được xóa" />
    </div>
  );
};

export default ObjectRemover;
