
import React from 'react';
import SnowEffect from './SnowEffect';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Hiệu ứng tuyết rơi chạy ngầm */}
      <SnowEffect />
      
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-magic text-white text-xl"></i>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Q2DIGITAL<span className="text-indigo-600">Edit</span>
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <span className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer">Khám phá</span>
            <span className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer">Hướng dẫn</span>
            <span className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer">Giới thiệu</span>
          </nav>
        </div>
      </header>

      <main className="flex-grow relative z-20">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Cung cấp bởi Google Q2DIGITAL 2.5 Flash Image. Được xây dựng cho sự sáng tạo chuyên nghiệp.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-indigo-600"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-indigo-600"><i className="fab fa-github"></i></a>
            <a href="#" className="text-gray-400 hover:text-indigo-600"><i className="fab fa-discord"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
