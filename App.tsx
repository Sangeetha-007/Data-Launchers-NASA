
import React, { useState, useCallback } from 'react';
import AiButton from './components/AiButton';
import PopupBox from './components/PopupBox';
import { Position } from './types';

// Estimated dimensions of the popup for screen boundary calculations
const POPUP_WIDTH = 288; // w-72 in Tailwind
const POPUP_MIN_HEIGHT = 120; // Estimated minimum height
const SCREEN_PADDING = 16; // 1rem padding from screen edges

const App: React.FC = () => {
  const [popup, setPopup] = useState<Position | null>(null);

  const handleClosePopup = useCallback(() => {
    setPopup(null);
  }, []);

  const handleScreenClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent opening a new popup if a click happens inside an existing one
    // by checking if the direct click target is the green screen container itself.
    if (e.target !== e.currentTarget) {
      return;
    }

    let x = e.clientX;
    let y = e.clientY;

    // Adjust position to prevent the popup from rendering off-screen
    if (x + POPUP_WIDTH + SCREEN_PADDING > window.innerWidth) {
      x = window.innerWidth - POPUP_WIDTH - SCREEN_PADDING;
    }
    if (y + POPUP_MIN_HEIGHT + SCREEN_PADDING > window.innerHeight) {
      y = window.innerHeight - POPUP_MIN_HEIGHT - SCREEN_PADDING;
    }

    // Ensure x and y are not negative
    x = Math.max(SCREEN_PADDING, x);
    y = Math.max(SCREEN_PADDING, y);

    setPopup({ x, y });
  }, []);

  return (
    <main 
      className="h-screen w-screen bg-green-500 cursor-crosshair relative overflow-hidden"
      onClick={handleScreenClick}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-green-800 opacity-50 select-none">
              <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider">Green Screen</h1>
              <p className="text-lg md:text-2xl mt-2">Click anywhere to add a marker</p>
          </div>
      </div>
      
      {popup && <PopupBox position={popup} onClose={handleClosePopup} />}
      
      <AiButton />
    </main>
  );
};

export default App;
