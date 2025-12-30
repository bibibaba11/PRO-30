
import React from 'react';

const SnowEffect: React.FC = () => {
  // Tạo 50 bông tuyết với các thuộc tính ngẫu nhiên
  const snowflakes = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 10 + 5}s`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: Math.random() * 0.7 + 0.3,
    size: `${Math.random() * 4 + 2}px`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-10vh) translateX(0);
            }
            25% {
              transform: translateY(20vh) translateX(15px);
            }
            50% {
              transform: translateY(50vh) translateX(-15px);
            }
            75% {
              transform: translateY(80vh) translateX(15px);
            }
            100% {
              transform: translateY(110vh) translateX(0);
            }
          }
          .snowflake {
            position: absolute;
            top: -10px;
            background: white;
            border-radius: 50%;
            filter: blur(1px);
            animation: fall linear infinite;
          }
        `}
      </style>
      {snowflakes.map((snow) => (
        <div
          key={snow.id}
          className="snowflake"
          style={{
            left: snow.left,
            width: snow.size,
            height: snow.size,
            opacity: snow.opacity,
            animationDuration: snow.animationDuration,
            animationDelay: snow.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect;
