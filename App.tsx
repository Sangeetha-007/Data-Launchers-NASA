import React, { useState, useCallback } from 'react';
import AiButton from './components/AiButton';
import PopupBox from './components/PopupBox';
import logo from './src/assets/logo.png';
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
    // Only trigger on background clicks, not child elements
    if (e.target !== e.currentTarget) return;

    let x = e.clientX;
    let y = e.clientY;

    // Keep popup within viewport
    if (x + POPUP_WIDTH + SCREEN_PADDING > window.innerWidth) {
      x = window.innerWidth - POPUP_WIDTH - SCREEN_PADDING;
    }
    if (y + POPUP_MIN_HEIGHT + SCREEN_PADDING > window.innerHeight) {
      y = window.innerHeight - POPUP_MIN_HEIGHT - SCREEN_PADDING;
    }

    x = Math.max(SCREEN_PADDING, x);
    y = Math.max(SCREEN_PADDING, y);

    setPopup({ x, y });
  }, []);

  return (
    <main
      className="h-screen w-screen bg-green-500 cursor-crosshair relative overflow-hidden"
      onClick={handleScreenClick}
    >
      {/* ✅ Fixed top-left logo */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 z-50">
        <img src={logo} alt="App Logo" className="w-10 h-10 rounded-lg shadow-md" />
      </div>

      {/* Center hint text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider text-green-800 opacity-70">
          Green Screen
        </h1>
        <p className="text-lg md:text-2xl mt-2 text-green-900 opacity-60">
          Click anywhere to add a marker
        </p>
      </div>

      {/* Popup Box */}
      {popup && <PopupBox position={popup} onClose={handleClosePopup} />}

      {/* Floating AI Button */}
      <AiButton />
    </main>
  );
};

export default App;
