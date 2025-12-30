
import React, { useState } from 'react';
import Layout from './components/Layout';
import OutfitChanger from './components/OutfitChanger';
import ObjectRemover from './components/ObjectRemover';
import BackgroundRemover from './components/BackgroundRemover';
import { EditMode } from './types';

const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<EditMode>(EditMode.OUTFIT);

  const tabs = [
    { id: EditMode.OUTFIT, label: 'Đổi Trang Phục', icon: 'fa-shirt' },
    { id: EditMode.REMOVE_OBJECT, label: 'Xóa Vật Thể', icon: 'fa-eraser' },
    { id: EditMode.REMOVE_BG, label: 'Xóa Nền', icon: 'fa-scissors' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Công cụ Ảnh AI Thế hệ Mới
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Các công cụ chỉnh sửa ảnh chuyên nghiệp được cung cấp bởi các mô hình thị giác tiên tiến nhất.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl shadow-inner border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMode(tab.id)}
                className={`
                  flex items-center space-x-2 px-6 py-3 text-sm font-bold rounded-xl transition-all
                  ${activeMode === tab.id 
                    ? 'bg-white text-indigo-600 shadow-md transform scale-105' 
                    : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50'
                  }
                `}
              >
                <i className={`fas ${tab.icon}`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="transition-all duration-300">
          {activeMode === EditMode.OUTFIT && <OutfitChanger />}
          {activeMode === EditMode.REMOVE_OBJECT && <ObjectRemover />}
          {activeMode === EditMode.REMOVE_BG && <BackgroundRemover />}
        </div>
      </div>
    </Layout>
  );
};

export default App;
