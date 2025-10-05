
import React from 'react';

const AiButton: React.FC = () => {
  const handleClick = () => {
    // In a real application, this would open an AI chat interface.
    alert('AI Assistant activated!');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-full shadow-2xl hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform duration-200 ease-in-out"
      aria-label="Open AI Assistant"
    >
       <span className="text-2xl font-bold">Hi, I am an AI. Talk to me!</span>
    </button>
  );
};

export default AiButton;
