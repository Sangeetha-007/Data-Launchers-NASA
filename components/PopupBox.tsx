
import React, { useState, useEffect } from 'react';
import { Position } from '../types';

interface PopupBoxProps {
  position: Position;
  onClose: () => void;
}

const PopupBox: React.FC<PopupBoxProps> = ({ position, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mount animation: trigger transition after a short delay to ensure the element is in the DOM.
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      // The `style` attribute is necessary for dynamic positioning based on user clicks,
      // as Tailwind does not support arbitrary top/left values. All other styling is pure Tailwind.
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      className={`absolute z-40 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col p-4 transform transition-all duration-300 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-gray-800">Location Info</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-800 transition-colors rounded-full p-1 -mt-2 -mr-2"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p className="text-gray-600 text-sm flex-grow">
        This box indicates the selected coordinates on the green screen. You can add tools or information related to this point.
      </p>
    </div>
  );
};

export default PopupBox;
