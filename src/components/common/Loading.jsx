import React from 'react';

const Loader = () => {
  const circles = [0, 1, 2, 3];

  return (
    <div className="flex h-screen w-full items-center justify-center bg-transparent">
      <style>{`
        @keyframes circle-keys {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
        @keyframes dot-keys {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0); }
        }
        @keyframes outline-keys {
          0% { transform: scale(0); outline: solid 20px #FF8C42; opacity: 1; }
          100% { transform: scale(1); outline: solid 0 transparent; outline-offset: 20px; opacity: 0; }
        }
        .animate-circle-custom { animation: circle-keys 2s ease-in-out infinite; }
        .animate-dot-custom { animation: dot-keys 2s ease-in-out infinite; }
        .animate-outline-custom { animation: outline-keys 2s ease-in-out infinite; }
      `}</style>

      {circles.map((i) => (
        <div
          key={i}
          className="relative flex items-center justify-center w-5 h-5 border-2 border-[#2DA14F] rounded-full mx-2.5 animate-circle-custom"
          style={{ animationDelay: `${i * 0.3}s` }}
        >
          <div
            className="absolute w-4 h-4 rounded-full bg-[#D8F3DC] animate-dot-custom"
            style={{ animationDelay: `${i * 0.3}s` }}
          />

          <div
            className="absolute w-5 h-5 rounded-full animate-outline-custom"
            style={{ animationDelay: `${(i * 0.3) + 0.9}s` }}
          />
        </div>
      ))}
    </div>
  );
};

export default Loader;